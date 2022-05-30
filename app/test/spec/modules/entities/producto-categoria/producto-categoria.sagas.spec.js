import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import ProductoCategoriaSagas from '../../../../../app/modules/entities/producto-categoria/producto-categoria.sagas';
import ProductoCategoriaActions from '../../../../../app/modules/entities/producto-categoria/producto-categoria.reducer';

const { getProductoCategoria, getAllProductoCategorias, updateProductoCategoria, deleteProductoCategoria } = ProductoCategoriaSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getProductoCategoria(1);
  const step = stepper(getProductoCategoria(FixtureAPI, { productoCategoriaId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ProductoCategoriaActions.productoCategoriaSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getProductoCategoria(FixtureAPI, { productoCategoriaId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ProductoCategoriaActions.productoCategoriaFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllProductoCategorias();
  const step = stepper(getAllProductoCategorias(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ProductoCategoriaActions.productoCategoriaAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllProductoCategorias(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ProductoCategoriaActions.productoCategoriaAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateProductoCategoria({ id: 1 });
  const step = stepper(updateProductoCategoria(FixtureAPI, { productoCategoria: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ProductoCategoriaActions.productoCategoriaUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateProductoCategoria(FixtureAPI, { productoCategoria: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ProductoCategoriaActions.productoCategoriaUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteProductoCategoria({ id: 1 });
  const step = stepper(deleteProductoCategoria(FixtureAPI, { productoCategoriaId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ProductoCategoriaActions.productoCategoriaDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteProductoCategoria(FixtureAPI, { productoCategoriaId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ProductoCategoriaActions.productoCategoriaDeleteFailure()));
});
