import API_BASE_URL from '../config/api';

const API_URL = `${API_BASE_URL}/api/productos`;

const handleResponse = async (res) => {
  if (!res.ok) throw new Error(`Error ${res.status}`);
  return res.json();
};

export const getProductos = () =>
  fetch(API_URL).then(handleResponse);

export const getProductoById = (id) =>
  fetch(`${API_URL}/${id}`).then(handleResponse);

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

export const getProductosDestacados = () =>
  fetch(`${API_URL}/destacados`).then(handleResponse);