import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import ClienteActions from './cliente.reducer';

function* getCliente(api, action) {
  const { clienteId } = action;
  // make the call to the api
  const apiCall = call(api.getCliente, clienteId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ClienteActions.clienteSuccess(response.data));
  } else {
    yield put(ClienteActions.clienteFailure(response.data));
  }
}

function* getAllClientes(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllClientes, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ClienteActions.clienteAllSuccess(response.data, response.headers));
  } else {
    yield put(ClienteActions.clienteAllFailure(response.data));
  }
}

function* updateCliente(api, action) {
  const { cliente } = action;
  // make the call to the api
  const idIsNotNull = !(cliente.id === null || cliente.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateCliente : api.createCliente, cliente);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ClienteActions.clienteUpdateSuccess(response.data));
  } else {
    yield put(ClienteActions.clienteUpdateFailure(response.data));
  }
}

function* deleteCliente(api, action) {
  const { clienteId } = action;
  // make the call to the api
  const apiCall = call(api.deleteCliente, clienteId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ClienteActions.clienteDeleteSuccess());
  } else {
    yield put(ClienteActions.clienteDeleteFailure(response.data));
  }
}

export default {
  getAllClientes,
  getCliente,
  deleteCliente,
  updateCliente,
};
