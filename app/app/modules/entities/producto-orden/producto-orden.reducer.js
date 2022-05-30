import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  productoOrdenRequest: ['productoOrdenId'],
  productoOrdenAllRequest: ['options'],
  productoOrdenUpdateRequest: ['productoOrden'],
  productoOrdenDeleteRequest: ['productoOrdenId'],

  productoOrdenSuccess: ['productoOrden'],
  productoOrdenAllSuccess: ['productoOrdenList', 'headers'],
  productoOrdenUpdateSuccess: ['productoOrden'],
  productoOrdenDeleteSuccess: [],

  productoOrdenFailure: ['error'],
  productoOrdenAllFailure: ['error'],
  productoOrdenUpdateFailure: ['error'],
  productoOrdenDeleteFailure: ['error'],

  productoOrdenReset: [],
});

export const ProductoOrdenTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  deleting: false,
  updateSuccess: false,
  productoOrden: { id: undefined },
  productoOrdenList: [],
  errorOne: null,
  errorAll: null,
  errorUpdating: null,
  errorDeleting: null,
});

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({
    fetchingOne: true,
    errorOne: false,
    productoOrden: INITIAL_STATE.productoOrden,
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
  const { productoOrden } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    productoOrden,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { productoOrdenList } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    productoOrdenList,
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { productoOrden } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    productoOrden,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    productoOrden: INITIAL_STATE.productoOrden,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    productoOrden: INITIAL_STATE.productoOrden,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    productoOrdenList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    productoOrden: state.productoOrden,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    productoOrden: state.productoOrden,
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PRODUCTO_ORDEN_REQUEST]: request,
  [Types.PRODUCTO_ORDEN_ALL_REQUEST]: allRequest,
  [Types.PRODUCTO_ORDEN_UPDATE_REQUEST]: updateRequest,
  [Types.PRODUCTO_ORDEN_DELETE_REQUEST]: deleteRequest,

  [Types.PRODUCTO_ORDEN_SUCCESS]: success,
  [Types.PRODUCTO_ORDEN_ALL_SUCCESS]: allSuccess,
  [Types.PRODUCTO_ORDEN_UPDATE_SUCCESS]: updateSuccess,
  [Types.PRODUCTO_ORDEN_DELETE_SUCCESS]: deleteSuccess,

  [Types.PRODUCTO_ORDEN_FAILURE]: failure,
  [Types.PRODUCTO_ORDEN_ALL_FAILURE]: allFailure,
  [Types.PRODUCTO_ORDEN_UPDATE_FAILURE]: updateFailure,
  [Types.PRODUCTO_ORDEN_DELETE_FAILURE]: deleteFailure,
  [Types.PRODUCTO_ORDEN_RESET]: reset,
});
