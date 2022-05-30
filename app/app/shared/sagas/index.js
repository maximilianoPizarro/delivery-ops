import { takeLatest, all } from 'redux-saga/effects';
import API from '../services/api';
import FixtureAPI from '../services/fixture-api';
import AppConfig from '../../config/app-config';

/* ------------- Types ------------- */

import { StartupTypes } from '../reducers/startup.reducer';
import { LoginTypes } from '../../modules/login/login.reducer';
import { AccountTypes } from '../../shared/reducers/account.reducer';
import { RegisterTypes } from '../../modules/account/register/register.reducer';
import { ForgotPasswordTypes } from '../../modules/account/password-reset/forgot-password.reducer';
import { ChangePasswordTypes } from '../../modules/account/password/change-password.reducer';
import { UserTypes } from '../../shared/reducers/user.reducer';
import { ProductoTypes } from '../../modules/entities/producto/producto.reducer';
import { ProductoCategoriaTypes } from '../../modules/entities/producto-categoria/producto-categoria.reducer';
import { ClienteTypes } from '../../modules/entities/cliente/cliente.reducer';
import { CarritoTypes } from '../../modules/entities/carrito/carrito.reducer';
import { ProductoOrdenTypes } from '../../modules/entities/producto-orden/producto-orden.reducer';
// jhipster-react-native-saga-redux-import-needle

/* ------------- Sagas ------------- */

import { startup } from './startup.saga';
import { login, logout, loginLoad } from '../../modules/login/login.sagas';
import { register } from '../../modules/account/register/register.sagas';
import { forgotPassword } from '../../modules/account/password-reset/forgot-password.sagas';
import { changePassword } from '../../modules/account/password/change-password.sagas';
import { getAccount, updateAccount } from '../../shared/sagas/account.sagas';
import UserSagas from '../../shared/sagas/user.sagas';
import ProductoSagas from '../../modules/entities/producto/producto.sagas';
import ProductoCategoriaSagas from '../../modules/entities/producto-categoria/producto-categoria.sagas';
import ClienteSagas from '../../modules/entities/cliente/cliente.sagas';
import CarritoSagas from '../../modules/entities/carrito/carrito.sagas';
import ProductoOrdenSagas from '../../modules/entities/producto-orden/producto-orden.sagas';
// jhipster-react-native-saga-method-import-needle

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = AppConfig.useFixtures ? FixtureAPI : API.create();

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // JHipster accounts
    takeLatest(LoginTypes.LOGIN_LOAD, loginLoad, api),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(LoginTypes.LOGOUT_REQUEST, logout, api),

    takeLatest(ProductoTypes.PRODUCTO_REQUEST, ProductoSagas.getProducto, api),
    takeLatest(ProductoTypes.PRODUCTO_ALL_REQUEST, ProductoSagas.getAllProductos, api),
    takeLatest(ProductoTypes.PRODUCTO_UPDATE_REQUEST, ProductoSagas.updateProducto, api),
    takeLatest(ProductoTypes.PRODUCTO_DELETE_REQUEST, ProductoSagas.deleteProducto, api),

    takeLatest(ProductoCategoriaTypes.PRODUCTO_CATEGORIA_REQUEST, ProductoCategoriaSagas.getProductoCategoria, api),
    takeLatest(ProductoCategoriaTypes.PRODUCTO_CATEGORIA_ALL_REQUEST, ProductoCategoriaSagas.getAllProductoCategorias, api),
    takeLatest(ProductoCategoriaTypes.PRODUCTO_CATEGORIA_UPDATE_REQUEST, ProductoCategoriaSagas.updateProductoCategoria, api),
    takeLatest(ProductoCategoriaTypes.PRODUCTO_CATEGORIA_DELETE_REQUEST, ProductoCategoriaSagas.deleteProductoCategoria, api),

    takeLatest(ClienteTypes.CLIENTE_REQUEST, ClienteSagas.getCliente, api),
    takeLatest(ClienteTypes.CLIENTE_ALL_REQUEST, ClienteSagas.getAllClientes, api),
    takeLatest(ClienteTypes.CLIENTE_UPDATE_REQUEST, ClienteSagas.updateCliente, api),
    takeLatest(ClienteTypes.CLIENTE_DELETE_REQUEST, ClienteSagas.deleteCliente, api),

    takeLatest(CarritoTypes.CARRITO_REQUEST, CarritoSagas.getCarrito, api),
    takeLatest(CarritoTypes.CARRITO_ALL_REQUEST, CarritoSagas.getAllCarritos, api),
    takeLatest(CarritoTypes.CARRITO_UPDATE_REQUEST, CarritoSagas.updateCarrito, api),
    takeLatest(CarritoTypes.CARRITO_DELETE_REQUEST, CarritoSagas.deleteCarrito, api),

    takeLatest(ProductoOrdenTypes.PRODUCTO_ORDEN_REQUEST, ProductoOrdenSagas.getProductoOrden, api),
    takeLatest(ProductoOrdenTypes.PRODUCTO_ORDEN_ALL_REQUEST, ProductoOrdenSagas.getAllProductoOrdens, api),
    takeLatest(ProductoOrdenTypes.PRODUCTO_ORDEN_UPDATE_REQUEST, ProductoOrdenSagas.updateProductoOrden, api),
    takeLatest(ProductoOrdenTypes.PRODUCTO_ORDEN_DELETE_REQUEST, ProductoOrdenSagas.deleteProductoOrden, api),
    // jhipster-react-native-saga-redux-connect-needle

    takeLatest(RegisterTypes.REGISTER_REQUEST, register, api),
    takeLatest(ForgotPasswordTypes.FORGOT_PASSWORD_REQUEST, forgotPassword, api),
    takeLatest(ChangePasswordTypes.CHANGE_PASSWORD_REQUEST, changePassword, api),
    takeLatest(UserTypes.USER_REQUEST, UserSagas.getUser, api),
    takeLatest(UserTypes.USER_UPDATE_REQUEST, UserSagas.updateUser, api),
    takeLatest(UserTypes.USER_DELETE_REQUEST, UserSagas.deleteUser, api),
    takeLatest(UserTypes.USER_ALL_REQUEST, UserSagas.getAllUsers, api),

    takeLatest(AccountTypes.ACCOUNT_REQUEST, getAccount, api),
    takeLatest(AccountTypes.ACCOUNT_UPDATE_REQUEST, updateAccount, api),
  ]);
}
