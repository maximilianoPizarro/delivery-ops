import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/producto/producto.reducer';

test('attempt retrieving a single producto', () => {
  const state = reducer(INITIAL_STATE, Actions.productoRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.producto).toEqual({ id: undefined });
});

test('attempt retrieving a list of producto', () => {
  const state = reducer(INITIAL_STATE, Actions.productoAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.productoList).toEqual([]);
});

test('attempt updating a producto', () => {
  const state = reducer(INITIAL_STATE, Actions.productoUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt to deleting a producto', () => {
  const state = reducer(INITIAL_STATE, Actions.productoDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a producto', () => {
  const state = reducer(INITIAL_STATE, Actions.productoSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.producto).toEqual({ id: 1 });
});

test('success retrieving a list of producto', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.productoAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.productoList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a producto', () => {
  const state = reducer(INITIAL_STATE, Actions.productoUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.producto).toEqual({ id: 1 });
});
test('success deleting a producto', () => {
  const state = reducer(INITIAL_STATE, Actions.productoDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.producto).toEqual({ id: undefined });
});

test('failure retrieving a producto', () => {
  const state = reducer(INITIAL_STATE, Actions.productoFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.producto).toEqual({ id: undefined });
});

test('failure retrieving a list of producto', () => {
  const state = reducer(INITIAL_STATE, Actions.productoAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.productoList).toEqual([]);
});

test('failure updating a producto', () => {
  const state = reducer(INITIAL_STATE, Actions.productoUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.producto).toEqual(INITIAL_STATE.producto);
});
test('failure deleting a producto', () => {
  const state = reducer(INITIAL_STATE, Actions.productoDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.producto).toEqual(INITIAL_STATE.producto);
});

test('resetting state for producto', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.productoReset());
  expect(state).toEqual(INITIAL_STATE);
});
