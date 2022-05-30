import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/producto-categoria/producto-categoria.reducer';

test('attempt retrieving a single productoCategoria', () => {
  const state = reducer(INITIAL_STATE, Actions.productoCategoriaRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.productoCategoria).toEqual({ id: undefined });
});

test('attempt retrieving a list of productoCategoria', () => {
  const state = reducer(INITIAL_STATE, Actions.productoCategoriaAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.productoCategoriaList).toEqual([]);
});

test('attempt updating a productoCategoria', () => {
  const state = reducer(INITIAL_STATE, Actions.productoCategoriaUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt to deleting a productoCategoria', () => {
  const state = reducer(INITIAL_STATE, Actions.productoCategoriaDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a productoCategoria', () => {
  const state = reducer(INITIAL_STATE, Actions.productoCategoriaSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.productoCategoria).toEqual({ id: 1 });
});

test('success retrieving a list of productoCategoria', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.productoCategoriaAllSuccess([{ id: 1 }, { id: 2 }], {
      link: '</?page=1>; rel="last",</?page=0>; rel="first"',
      'x-total-count': 5,
    }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.productoCategoriaList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a productoCategoria', () => {
  const state = reducer(INITIAL_STATE, Actions.productoCategoriaUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.productoCategoria).toEqual({ id: 1 });
});
test('success deleting a productoCategoria', () => {
  const state = reducer(INITIAL_STATE, Actions.productoCategoriaDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.productoCategoria).toEqual({ id: undefined });
});

test('failure retrieving a productoCategoria', () => {
  const state = reducer(INITIAL_STATE, Actions.productoCategoriaFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.productoCategoria).toEqual({ id: undefined });
});

test('failure retrieving a list of productoCategoria', () => {
  const state = reducer(INITIAL_STATE, Actions.productoCategoriaAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.productoCategoriaList).toEqual([]);
});

test('failure updating a productoCategoria', () => {
  const state = reducer(INITIAL_STATE, Actions.productoCategoriaUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.productoCategoria).toEqual(INITIAL_STATE.productoCategoria);
});
test('failure deleting a productoCategoria', () => {
  const state = reducer(INITIAL_STATE, Actions.productoCategoriaDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.productoCategoria).toEqual(INITIAL_STATE.productoCategoria);
});

test('resetting state for productoCategoria', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.productoCategoriaReset());
  expect(state).toEqual(INITIAL_STATE);
});
