import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import ProductoActions from './producto.reducer';

function* getProducto(api, action) {
  const { productoId } = action;
  // make the call to the api
  const apiCall = call(api.getProducto, productoId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ProductoActions.productoSuccess(response.data));
  } else {
    yield put(ProductoActions.productoFailure(response.data));
  }
}

function* getAllProductos(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllProductos, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ProductoActions.productoAllSuccess(response.data, response.headers));
  } else {
    yield put(ProductoActions.productoAllFailure(response.data));
  }
}

function* updateProducto(api, action) {
  const { producto } = action;
  // make the call to the api
  const idIsNotNull = !(producto.id === null || producto.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateProducto : api.createProducto, producto);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ProductoActions.productoUpdateSuccess(response.data));
  } else {
    yield put(ProductoActions.productoUpdateFailure(response.data));
  }
}

function* deleteProducto(api, action) {
  const { productoId } = action;
  // make the call to the api
  const apiCall = call(api.deleteProducto, productoId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ProductoActions.productoDeleteSuccess());
  } else {
    yield put(ProductoActions.productoDeleteFailure(response.data));
  }
}

export default {
  getAllProductos,
  getProducto,
  deleteProducto,
  updateProducto,
};
