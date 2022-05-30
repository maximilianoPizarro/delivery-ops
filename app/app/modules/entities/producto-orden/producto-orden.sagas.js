import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import ProductoOrdenActions from './producto-orden.reducer';

function* getProductoOrden(api, action) {
  const { productoOrdenId } = action;
  // make the call to the api
  const apiCall = call(api.getProductoOrden, productoOrdenId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ProductoOrdenActions.productoOrdenSuccess(response.data));
  } else {
    yield put(ProductoOrdenActions.productoOrdenFailure(response.data));
  }
}

function* getAllProductoOrdens(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllProductoOrdens, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ProductoOrdenActions.productoOrdenAllSuccess(response.data, response.headers));
  } else {
    yield put(ProductoOrdenActions.productoOrdenAllFailure(response.data));
  }
}

function* updateProductoOrden(api, action) {
  const { productoOrden } = action;
  // make the call to the api
  const idIsNotNull = !(productoOrden.id === null || productoOrden.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateProductoOrden : api.createProductoOrden, productoOrden);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ProductoOrdenActions.productoOrdenUpdateSuccess(response.data));
  } else {
    yield put(ProductoOrdenActions.productoOrdenUpdateFailure(response.data));
  }
}

function* deleteProductoOrden(api, action) {
  const { productoOrdenId } = action;
  // make the call to the api
  const apiCall = call(api.deleteProductoOrden, productoOrdenId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ProductoOrdenActions.productoOrdenDeleteSuccess());
  } else {
    yield put(ProductoOrdenActions.productoOrdenDeleteFailure(response.data));
  }
}

export default {
  getAllProductoOrdens,
  getProductoOrden,
  deleteProductoOrden,
  updateProductoOrden,
};
