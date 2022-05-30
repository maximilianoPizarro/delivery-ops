import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import CarritoActions from './carrito.reducer';
import { convertDateTimeFromServer } from '../../../shared/util/date-transforms';

function* getCarrito(api, action) {
  const { carritoId } = action;
  // make the call to the api
  const apiCall = call(api.getCarrito, carritoId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(CarritoActions.carritoSuccess(response.data));
  } else {
    yield put(CarritoActions.carritoFailure(response.data));
  }
}

function* getAllCarritos(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllCarritos, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(CarritoActions.carritoAllSuccess(response.data, response.headers));
  } else {
    yield put(CarritoActions.carritoAllFailure(response.data));
  }
}

function* updateCarrito(api, action) {
  const { carrito } = action;
  // make the call to the api
  const idIsNotNull = !(carrito.id === null || carrito.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateCarrito : api.createCarrito, carrito);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(CarritoActions.carritoUpdateSuccess(response.data));
  } else {
    yield put(CarritoActions.carritoUpdateFailure(response.data));
  }
}

function* deleteCarrito(api, action) {
  const { carritoId } = action;
  // make the call to the api
  const apiCall = call(api.deleteCarrito, carritoId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(CarritoActions.carritoDeleteSuccess());
  } else {
    yield put(CarritoActions.carritoDeleteFailure(response.data));
  }
}
function mapDateFields(data) {
  data.fecha = convertDateTimeFromServer(data.fecha);
  return data;
}

export default {
  getAllCarritos,
  getCarrito,
  deleteCarrito,
  updateCarrito,
};
