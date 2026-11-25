import { useCallback, useEffect, useMemo, useState } from "react";
import { decodeToken } from "../utils/decodeToken.js";
import AuthContext from "./authContext.js";

function getRole(token) {
  if (!token) return null;
  const payload = decodeToken(token);
  if (!payload || typeof payload.sub !== "string") return null;
  if (payload.role === undefined) return "cliente";
  return payload.role === "admin" || payload.role === "cliente"
    ? payload.role
    : null;
}

function isExpired(token) {
  const payload = decodeToken(token);
  return !payload || (typeof payload.exp === "number" && payload.exp <= Date.now() / 1000);
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => sessionStorage.getItem("token"));
  const [role, setRole] = useState(() => getRole(sessionStorage.getItem("token")));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    Promise.resolve().then(() => {
      if (!active) return;
      if (token && (isExpired(token) || !getRole(token))) {
        sessionStorage.removeItem("token");
        setToken(null);
        setRole(null);
      } else {
        setRole(getRole(token));
      }
      setLoading(false);
    });

    return () => {
      active = false;
    };
  }, [token]);

  const authenticate = useCallback((newToken) => {
    const newRole = getRole(newToken);
    if (!newRole) {
      throw new Error("El token de acceso no es válido.");
    }

    sessionStorage.setItem("token", newToken);
    setToken(newToken);
    setRole(newRole);
    setLoading(false);
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem("token");
    setToken(null);
    setRole(null);
  }, []);

  const value = useMemo(
    () => ({
      token,
      role,
      isAdmin: role === "admin",
      isCliente: role === "cliente",
      isAuthenticated: Boolean(token && role),
      loading,
      authenticate,
      logout,
    }),
    [token, role, loading, authenticate, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
