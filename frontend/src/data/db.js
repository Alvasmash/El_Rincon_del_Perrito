/* Capa de acceso a datos conectada a la API REST del backend Spring Boot mediante Axios */
import apiClient from '../api/apiClient';

/* ---------------- PRODUCTOS ---------------- */
export async function getProducts() {
  const { data } = await apiClient.get('/products');
  return data;
}

export async function getProductById(id) {
  const { data } = await apiClient.get(`/products/${id}`);
  return data;
}

export async function createProduct(product) {
  const { data } = await apiClient.post('/products', product);
  return data;
}

export async function updateProduct(id, updatedFields) {
  const { data } = await apiClient.put(`/products/${id}`, updatedFields);
  return data;
}

export async function deleteProduct(id) {
  await apiClient.delete(`/products/${id}`);
  return true;
}

/* ---------------- CATEGORÍAS ---------------- */
export async function getCategories() {
  const { data } = await apiClient.get('/categories');
  return data;
}

export async function createCategory(cat) {
  const { data } = await apiClient.post('/categories', cat);
  return data;
}

export async function updateCategory(id, updatedFields) {
  const { data } = await apiClient.put(`/categories/${id}`, updatedFields);
  return data;
}

export async function deleteCategory(id) {
  await apiClient.delete(`/categories/${id}`);
  return true;
}

/* ---------------- USUARIOS ---------------- */
export async function getUsers() {
  const { data } = await apiClient.get('/users');
  return data;
}

export async function getUserByRut(rut) {
  const { data } = await apiClient.get(`/users/${encodeURIComponent(rut)}`);
  return data;
}

export async function createUser(user) {
  const { data } = await apiClient.post('/users', user);
  return data;
}

export async function updateUser(rut, updatedFields) {
  const { data } = await apiClient.put(`/users/${encodeURIComponent(rut)}`, updatedFields);
  return data;
}

export async function deleteUser(rut) {
  await apiClient.delete(`/users/${encodeURIComponent(rut)}`);
  return true;
}

/* ---------------- ÓRDENES ---------------- */
export async function getOrders() {
  const { data } = await apiClient.get('/orders');
  return data;
}

export async function getOrderById(id) {
  if (!id) return null;
  const cleanId = String(id).replace('#', '');
  const { data } = await apiClient.get(`/orders/${encodeURIComponent(cleanId)}`);
  return data;
}

export async function createOrder(orderData) {
  const { data } = await apiClient.post('/orders', orderData);
  return data;
}

/* ---------------- CONTACTO ---------------- */
export async function sendContactMessage(contactData) {
  const { data } = await apiClient.post('/contact', contactData);
  return data;
}
