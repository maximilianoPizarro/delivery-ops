import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/producto-orden/producto-orden.reducer';

test('attempt retrieving a single productoOrden', () => {
  const state = reducer(INITIAL_STATE, Actions.productoOrdenRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.productoOrden).toEqual({ id: undefined });
});

test('attempt retrieving a list of productoOrden', () => {
  const state = reducer(INITIAL_STATE, Actions.productoOrdenAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.productoOrdenList).toEqual([]);
});

test('attempt updating a productoOrden', () => {
  const state = reducer(INITIAL_STATE, Actions.productoOrdenUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt to deleting a productoOrden', () => {
  const state = reducer(INITIAL_STATE, Actions.productoOrdenDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a productoOrden', () => {
  const state = reducer(INITIAL_STATE, Actions.productoOrdenSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.productoOrden).toEqual({ id: 1 });
});

test('success retrieving a list of productoOrden', () => {
  const state = reducer(INITIAL_STATE, Actions.productoOrdenAllSuccess([{ id: 1 }, { id: 2 }]));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.productoOrdenList).toEqual([{ id: 1 }, { id: 2 }]);
});

test('success updating a productoOrden', () => {
  const state = reducer(INITIAL_STATE, Actions.productoOrdenUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.productoOrden).toEqual({ id: 1 });
});
test('success deleting a productoOrden', () => {
  const state = reducer(INITIAL_STATE, Actions.productoOrdenDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.productoOrden).toEqual({ id: undefined });
});

test('failure retrieving a productoOrden', () => {
  const state = reducer(INITIAL_STATE, Actions.productoOrdenFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.productoOrden).toEqual({ id: undefined });
});

test('failure retrieving a list of productoOrden', () => {
  const state = reducer(INITIAL_STATE, Actions.productoOrdenAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.productoOrdenList).toEqual([]);
});

test('failure updating a productoOrden', () => {
  const state = reducer(INITIAL_STATE, Actions.productoOrdenUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.productoOrden).toEqual(INITIAL_STATE.productoOrden);
});
test('failure deleting a productoOrden', () => {
  const state = reducer(INITIAL_STATE, Actions.productoOrdenDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.productoOrden).toEqual(INITIAL_STATE.productoOrden);
});

test('resetting state for productoOrden', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.productoOrdenReset());
  expect(state).toEqual(INITIAL_STATE);
});
