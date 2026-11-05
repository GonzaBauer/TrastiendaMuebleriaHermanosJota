export function decodeToken(token) {
  try {
    const encodedPayload = token.split(".")[1];
    if (!encodedPayload) return null;

    const base64 = encodedPayload.replace(/-/g, "+").replace(/_/g, "/");
    const paddedBase64 = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    const bytes = Uint8Array.from(atob(paddedBase64), (character) =>
      character.charCodeAt(0),
    );
    const payload = JSON.parse(new TextDecoder().decode(bytes));

    return payload && typeof payload === "object" && !Array.isArray(payload)
      ? payload
      : null;
  } catch {
    return null;
  }
}
