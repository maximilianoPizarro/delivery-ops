import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import ProductoSagas from '../../../../../app/modules/entities/producto/producto.sagas';
import ProductoActions from '../../../../../app/modules/entities/producto/producto.reducer';

const { getProducto, getAllProductos, updateProducto, deleteProducto } = ProductoSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getProducto(1);
  const step = stepper(getProducto(FixtureAPI, { productoId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ProductoActions.productoSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getProducto(FixtureAPI, { productoId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ProductoActions.productoFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllProductos();
  const step = stepper(getAllProductos(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ProductoActions.productoAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllProductos(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ProductoActions.productoAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateProducto({ id: 1 });
  const step = stepper(updateProducto(FixtureAPI, { producto: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ProductoActions.productoUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateProducto(FixtureAPI, { producto: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ProductoActions.productoUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteProducto({ id: 1 });
  const step = stepper(deleteProducto(FixtureAPI, { productoId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ProductoActions.productoDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteProducto(FixtureAPI, { productoId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ProductoActions.productoDeleteFailure()));
});
