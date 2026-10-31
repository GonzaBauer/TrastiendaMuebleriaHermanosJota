import API_BASE_URL from '../config/api';

const API_URL = `${API_BASE_URL}/api/productos`;

const readBody = async (res) => {
  const body = await res.text();
  if (!body) return null;

  try {
    return JSON.parse(body);
  } catch {
    return null;
  }
};

const getErrorMessage = (data, status) => {
  if (typeof data?.message === 'string' && data.message) return data.message;
  if (typeof data?.error === 'string' && data.error) return data.error;

  if (Array.isArray(data?.errors)) {
    const messages = data.errors
      .map((error) =>
        typeof error === 'string' ? error : error?.message || error?.msg,
      )
      .filter(Boolean);

    if (messages.length > 0) return messages.join(' ');
  }

  return `No se pudo completar la operación (HTTP ${status}).`;
};

const handleResponse = async (res) => {
  const data = await readBody(res);
  if (!res.ok) throw new Error(getErrorMessage(data, res.status));
  return data;
};

export const getProductos = (signal) =>
  fetch(API_URL, { signal }).then(handleResponse);

export const getProductoById = (id, signal) =>
  fetch(`${API_URL}/${id}`, { signal }).then(handleResponse);

export const createProducto = (data) =>
  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(handleResponse);

export const updateProducto = (id, data) =>
  fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(handleResponse);

export const deleteProducto = (id) =>
  fetch(`${API_URL}/${id}`, { method: 'DELETE' }).then(handleResponse);

export const getProductosDestacados = (signal) =>
  fetch(`${API_URL}/destacados`, { signal }).then(handleResponse);
