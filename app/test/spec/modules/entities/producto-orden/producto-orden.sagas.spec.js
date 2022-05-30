import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import ProductoOrdenSagas from '../../../../../app/modules/entities/producto-orden/producto-orden.sagas';
import ProductoOrdenActions from '../../../../../app/modules/entities/producto-orden/producto-orden.reducer';

const { getProductoOrden, getAllProductoOrdens, updateProductoOrden, deleteProductoOrden } = ProductoOrdenSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getProductoOrden(1);
  const step = stepper(getProductoOrden(FixtureAPI, { productoOrdenId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ProductoOrdenActions.productoOrdenSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getProductoOrden(FixtureAPI, { productoOrdenId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ProductoOrdenActions.productoOrdenFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllProductoOrdens();
  const step = stepper(getAllProductoOrdens(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ProductoOrdenActions.productoOrdenAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllProductoOrdens(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ProductoOrdenActions.productoOrdenAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateProductoOrden({ id: 1 });
  const step = stepper(updateProductoOrden(FixtureAPI, { productoOrden: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ProductoOrdenActions.productoOrdenUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateProductoOrden(FixtureAPI, { productoOrden: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ProductoOrdenActions.productoOrdenUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteProductoOrden({ id: 1 });
  const step = stepper(deleteProductoOrden(FixtureAPI, { productoOrdenId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ProductoOrdenActions.productoOrdenDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteProductoOrden(FixtureAPI, { productoOrdenId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ProductoOrdenActions.productoOrdenDeleteFailure()));
});
