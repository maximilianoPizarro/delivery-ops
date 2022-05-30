// a library to wrap and simplify api calls
import apisauce from 'apisauce';

import AppConfig from '../../config/app-config';

// our "constructor"
const create = (baseURL = AppConfig.apiUrl) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
    },
    // 10 second timeout...
    timeout: 10000,
  });

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const setAuthToken = (userAuth) => api.setHeader('Authorization', 'Bearer ' + userAuth);
  const removeAuthToken = () => api.deleteHeader('Authorization');
  const login = (userAuth) => api.post('api/authenticate', userAuth);
  const register = (user) => api.post('api/register', user);
  const forgotPassword = (data) =>
    api.post('api/account/reset-password/init', data, {
      headers: { 'Content-Type': 'text/plain', Accept: 'application/json, text/plain, */*' },
    });

  const getAccount = () => api.get('api/account');
  const updateAccount = (account) => api.post('api/account', account);
  const changePassword = (currentPassword, newPassword) =>
    api.post(
      'api/account/change-password',
      { currentPassword, newPassword },
      { headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/plain, */*' } },
    );

  const getUser = (userId) => api.get('api/users/' + userId);
  const getAllUsers = (options) => api.get('api/users', options);
  const createUser = (user) => api.post('api/users', user);
  const updateUser = (user) => api.put('api/users', user);
  const deleteUser = (userId) => api.delete('api/users/' + userId);

  const getProducto = (productoId) => api.get('api/productos/' + productoId);
  const getAllProductos = (options) => api.get('api/productos', options);
  const createProducto = (producto) => api.post('api/productos', producto);
  const updateProducto = (producto) => api.put(`api/productos/${producto.id}`, producto);
  const deleteProducto = (productoId) => api.delete('api/productos/' + productoId);

  const getProductoCategoria = (productoCategoriaId) => api.get('api/producto-categorias/' + productoCategoriaId);
  const getAllProductoCategorias = (options) => api.get('api/producto-categorias', options);
  const createProductoCategoria = (productoCategoria) => api.post('api/producto-categorias', productoCategoria);
  const updateProductoCategoria = (productoCategoria) => api.put(`api/producto-categorias/${productoCategoria.id}`, productoCategoria);
  const deleteProductoCategoria = (productoCategoriaId) => api.delete('api/producto-categorias/' + productoCategoriaId);

  const getCliente = (clienteId) => api.get('api/clientes/' + clienteId);
  const getAllClientes = (options) => api.get('api/clientes', options);
  const createCliente = (cliente) => api.post('api/clientes', cliente);
  const updateCliente = (cliente) => api.put(`api/clientes/${cliente.id}`, cliente);
  const deleteCliente = (clienteId) => api.delete('api/clientes/' + clienteId);

  const getCarrito = (carritoId) => api.get('api/carritos/' + carritoId);
  const getAllCarritos = (options) => api.get('api/carritos', options);
  const createCarrito = (carrito) => api.post('api/carritos', carrito);
  const updateCarrito = (carrito) => api.put(`api/carritos/${carrito.id}`, carrito);
  const deleteCarrito = (carritoId) => api.delete('api/carritos/' + carritoId);

  const getProductoOrden = (productoOrdenId) => api.get('api/producto-ordens/' + productoOrdenId);
  const getAllProductoOrdens = (options) => api.get('api/producto-ordens', options);
  const createProductoOrden = (productoOrden) => api.post('api/producto-ordens', productoOrden);
  const updateProductoOrden = (productoOrden) => api.put(`api/producto-ordens/${productoOrden.id}`, productoOrden);
  const deleteProductoOrden = (productoOrdenId) => api.delete('api/producto-ordens/' + productoOrdenId);
  // jhipster-react-native-api-method-needle

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    createUser,
    updateUser,
    getAllUsers,
    getUser,
    deleteUser,

    createProducto,
    updateProducto,
    getAllProductos,
    getProducto,
    deleteProducto,

    createProductoCategoria,
    updateProductoCategoria,
    getAllProductoCategorias,
    getProductoCategoria,
    deleteProductoCategoria,

    createCliente,
    updateCliente,
    getAllClientes,
    getCliente,
    deleteCliente,

    createCarrito,
    updateCarrito,
    getAllCarritos,
    getCarrito,
    deleteCarrito,

    createProductoOrden,
    updateProductoOrden,
    getAllProductoOrdens,
    getProductoOrden,
    deleteProductoOrden,
    // jhipster-react-native-api-export-needle
    setAuthToken,
    removeAuthToken,
    login,
    register,
    forgotPassword,
    getAccount,
    updateAccount,
    changePassword,
  };
};

// let's return back our create method as the default.
export default {
  create,
};
