import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/carrito/carrito.reducer';

test('attempt retrieving a single carrito', () => {
  const state = reducer(INITIAL_STATE, Actions.carritoRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.carrito).toEqual({ id: undefined });
});

test('attempt retrieving a list of carrito', () => {
  const state = reducer(INITIAL_STATE, Actions.carritoAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.carritoList).toEqual([]);
});

test('attempt updating a carrito', () => {
  const state = reducer(INITIAL_STATE, Actions.carritoUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt to deleting a carrito', () => {
  const state = reducer(INITIAL_STATE, Actions.carritoDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a carrito', () => {
  const state = reducer(INITIAL_STATE, Actions.carritoSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.carrito).toEqual({ id: 1 });
});

test('success retrieving a list of carrito', () => {
  const state = reducer(INITIAL_STATE, Actions.carritoAllSuccess([{ id: 1 }, { id: 2 }]));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.carritoList).toEqual([{ id: 1 }, { id: 2 }]);
});

test('success updating a carrito', () => {
  const state = reducer(INITIAL_STATE, Actions.carritoUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.carrito).toEqual({ id: 1 });
});
test('success deleting a carrito', () => {
  const state = reducer(INITIAL_STATE, Actions.carritoDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.carrito).toEqual({ id: undefined });
});

test('failure retrieving a carrito', () => {
  const state = reducer(INITIAL_STATE, Actions.carritoFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.carrito).toEqual({ id: undefined });
});

test('failure retrieving a list of carrito', () => {
  const state = reducer(INITIAL_STATE, Actions.carritoAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.carritoList).toEqual([]);
});

test('failure updating a carrito', () => {
  const state = reducer(INITIAL_STATE, Actions.carritoUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.carrito).toEqual(INITIAL_STATE.carrito);
});
test('failure deleting a carrito', () => {
  const state = reducer(INITIAL_STATE, Actions.carritoDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.carrito).toEqual(INITIAL_STATE.carrito);
});

test('resetting state for carrito', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.carritoReset());
  expect(state).toEqual(INITIAL_STATE);
});
