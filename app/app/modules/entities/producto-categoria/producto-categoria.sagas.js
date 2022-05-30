import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import ProductoCategoriaActions from './producto-categoria.reducer';

function* getProductoCategoria(api, action) {
  const { productoCategoriaId } = action;
  // make the call to the api
  const apiCall = call(api.getProductoCategoria, productoCategoriaId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ProductoCategoriaActions.productoCategoriaSuccess(response.data));
  } else {
    yield put(ProductoCategoriaActions.productoCategoriaFailure(response.data));
  }
}

function* getAllProductoCategorias(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllProductoCategorias, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ProductoCategoriaActions.productoCategoriaAllSuccess(response.data, response.headers));
  } else {
    yield put(ProductoCategoriaActions.productoCategoriaAllFailure(response.data));
  }
}

function* updateProductoCategoria(api, action) {
  const { productoCategoria } = action;
  // make the call to the api
  const idIsNotNull = !(productoCategoria.id === null || productoCategoria.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateProductoCategoria : api.createProductoCategoria, productoCategoria);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ProductoCategoriaActions.productoCategoriaUpdateSuccess(response.data));
  } else {
    yield put(ProductoCategoriaActions.productoCategoriaUpdateFailure(response.data));
  }
}

function* deleteProductoCategoria(api, action) {
  const { productoCategoriaId } = action;
  // make the call to the api
  const apiCall = call(api.deleteProductoCategoria, productoCategoriaId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ProductoCategoriaActions.productoCategoriaDeleteSuccess());
  } else {
    yield put(ProductoCategoriaActions.productoCategoriaDeleteFailure(response.data));
  }
}

export default {
  getAllProductoCategorias,
  getProductoCategoria,
  deleteProductoCategoria,
  updateProductoCategoria,
};
