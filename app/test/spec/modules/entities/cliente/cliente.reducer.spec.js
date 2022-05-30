import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/cliente/cliente.reducer';

test('attempt retrieving a single cliente', () => {
  const state = reducer(INITIAL_STATE, Actions.clienteRequest({ id: 1 }));

  expect(state.fetchingOne).toBe(true);
  expect(state.cliente).toEqual({ id: undefined });
});

test('attempt retrieving a list of cliente', () => {
  const state = reducer(INITIAL_STATE, Actions.clienteAllRequest({ id: 1 }));

  expect(state.fetchingAll).toBe(true);
  expect(state.clienteList).toEqual([]);
});

test('attempt updating a cliente', () => {
  const state = reducer(INITIAL_STATE, Actions.clienteUpdateRequest({ id: 1 }));

  expect(state.updating).toBe(true);
});
test('attempt to deleting a cliente', () => {
  const state = reducer(INITIAL_STATE, Actions.clienteDeleteRequest({ id: 1 }));

  expect(state.deleting).toBe(true);
});

test('success retrieving a cliente', () => {
  const state = reducer(INITIAL_STATE, Actions.clienteSuccess({ id: 1 }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toBe(null);
  expect(state.cliente).toEqual({ id: 1 });
});

test('success retrieving a list of cliente', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.clienteAllSuccess([{ id: 1 }, { id: 2 }], { link: '</?page=1>; rel="last",</?page=0>; rel="first"', 'x-total-count': 5 }),
  );

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toBe(null);
  expect(state.clienteList).toEqual([{ id: 1 }, { id: 2 }]);
  expect(state.links).toEqual({ first: 0, last: 1 });
  expect(state.totalItems).toEqual(5);
});

test('success updating a cliente', () => {
  const state = reducer(INITIAL_STATE, Actions.clienteUpdateSuccess({ id: 1 }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toBe(null);
  expect(state.cliente).toEqual({ id: 1 });
});
test('success deleting a cliente', () => {
  const state = reducer(INITIAL_STATE, Actions.clienteDeleteSuccess());

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toBe(null);
  expect(state.cliente).toEqual({ id: undefined });
});

test('failure retrieving a cliente', () => {
  const state = reducer(INITIAL_STATE, Actions.clienteFailure({ error: 'Not found' }));

  expect(state.fetchingOne).toBe(false);
  expect(state.errorOne).toEqual({ error: 'Not found' });
  expect(state.cliente).toEqual({ id: undefined });
});

test('failure retrieving a list of cliente', () => {
  const state = reducer(INITIAL_STATE, Actions.clienteAllFailure({ error: 'Not found' }));

  expect(state.fetchingAll).toBe(false);
  expect(state.errorAll).toEqual({ error: 'Not found' });
  expect(state.clienteList).toEqual([]);
});

test('failure updating a cliente', () => {
  const state = reducer(INITIAL_STATE, Actions.clienteUpdateFailure({ error: 'Not found' }));

  expect(state.updating).toBe(false);
  expect(state.errorUpdating).toEqual({ error: 'Not found' });
  expect(state.cliente).toEqual(INITIAL_STATE.cliente);
});
test('failure deleting a cliente', () => {
  const state = reducer(INITIAL_STATE, Actions.clienteDeleteFailure({ error: 'Not found' }));

  expect(state.deleting).toBe(false);
  expect(state.errorDeleting).toEqual({ error: 'Not found' });
  expect(state.cliente).toEqual(INITIAL_STATE.cliente);
});

test('resetting state for cliente', () => {
  const state = reducer({ ...INITIAL_STATE, deleting: true }, Actions.clienteReset());
  expect(state).toEqual(INITIAL_STATE);
});
