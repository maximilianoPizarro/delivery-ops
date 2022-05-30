import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import CarritoSagas from '../../../../../app/modules/entities/carrito/carrito.sagas';
import CarritoActions from '../../../../../app/modules/entities/carrito/carrito.reducer';

const { getCarrito, getAllCarritos, updateCarrito, deleteCarrito } = CarritoSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getCarrito(1);
  const step = stepper(getCarrito(FixtureAPI, { carritoId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CarritoActions.carritoSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getCarrito(FixtureAPI, { carritoId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CarritoActions.carritoFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllCarritos();
  const step = stepper(getAllCarritos(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CarritoActions.carritoAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllCarritos(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CarritoActions.carritoAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateCarrito({ id: 1 });
  const step = stepper(updateCarrito(FixtureAPI, { carrito: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CarritoActions.carritoUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateCarrito(FixtureAPI, { carrito: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CarritoActions.carritoUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteCarrito({ id: 1 });
  const step = stepper(deleteCarrito(FixtureAPI, { carritoId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CarritoActions.carritoDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteCarrito(FixtureAPI, { carritoId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CarritoActions.carritoDeleteFailure()));
});
