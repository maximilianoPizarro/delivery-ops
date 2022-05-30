import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import ClienteSagas from '../../../../../app/modules/entities/cliente/cliente.sagas';
import ClienteActions from '../../../../../app/modules/entities/cliente/cliente.reducer';

const { getCliente, getAllClientes, updateCliente, deleteCliente } = ClienteSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getCliente(1);
  const step = stepper(getCliente(FixtureAPI, { clienteId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ClienteActions.clienteSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getCliente(FixtureAPI, { clienteId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ClienteActions.clienteFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllClientes();
  const step = stepper(getAllClientes(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ClienteActions.clienteAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllClientes(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ClienteActions.clienteAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateCliente({ id: 1 });
  const step = stepper(updateCliente(FixtureAPI, { cliente: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ClienteActions.clienteUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateCliente(FixtureAPI, { cliente: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ClienteActions.clienteUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteCliente({ id: 1 });
  const step = stepper(deleteCliente(FixtureAPI, { clienteId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ClienteActions.clienteDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteCliente(FixtureAPI, { clienteId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ClienteActions.clienteDeleteFailure()));
});
