import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  clienteRequest: ['clienteId'],
  clienteAllRequest: ['options'],
  clienteUpdateRequest: ['cliente'],
  clienteDeleteRequest: ['clienteId'],

  clienteSuccess: ['cliente'],
  clienteAllSuccess: ['clienteList', 'headers'],
  clienteUpdateSuccess: ['cliente'],
  clienteDeleteSuccess: [],

  clienteFailure: ['error'],
  clienteAllFailure: ['error'],
  clienteUpdateFailure: ['error'],
  clienteDeleteFailure: ['error'],

  clienteReset: [],
});

export const ClienteTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  deleting: false,
  updateSuccess: false,
  cliente: { id: undefined },
  clienteList: [],
  errorOne: null,
  errorAll: null,
  errorUpdating: null,
  errorDeleting: null,
  links: { next: 0 },
  totalItems: 0,
});

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({
    fetchingOne: true,
    errorOne: false,
    cliente: INITIAL_STATE.cliente,
  });

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    errorAll: false,
  });

// request to update from an api
export const updateRequest = (state) =>
  state.merge({
    updateSuccess: false,
    updating: true,
  });
// request to delete from an api
export const deleteRequest = (state) =>
  state.merge({
    deleting: true,
  });

// successful api lookup for single entity
export const success = (state, action) => {
  const { cliente } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    cliente,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { clienteList, headers } = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    clienteList: loadMoreDataWhenScrolled(state.clienteList, clienteList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { cliente } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    cliente,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    cliente: INITIAL_STATE.cliente,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    cliente: INITIAL_STATE.cliente,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    clienteList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    cliente: state.cliente,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    cliente: state.cliente,
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CLIENTE_REQUEST]: request,
  [Types.CLIENTE_ALL_REQUEST]: allRequest,
  [Types.CLIENTE_UPDATE_REQUEST]: updateRequest,
  [Types.CLIENTE_DELETE_REQUEST]: deleteRequest,

  [Types.CLIENTE_SUCCESS]: success,
  [Types.CLIENTE_ALL_SUCCESS]: allSuccess,
  [Types.CLIENTE_UPDATE_SUCCESS]: updateSuccess,
  [Types.CLIENTE_DELETE_SUCCESS]: deleteSuccess,

  [Types.CLIENTE_FAILURE]: failure,
  [Types.CLIENTE_ALL_FAILURE]: allFailure,
  [Types.CLIENTE_UPDATE_FAILURE]: updateFailure,
  [Types.CLIENTE_DELETE_FAILURE]: deleteFailure,
  [Types.CLIENTE_RESET]: reset,
});
