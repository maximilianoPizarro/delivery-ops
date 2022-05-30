import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  productoCategoriaRequest: ['productoCategoriaId'],
  productoCategoriaAllRequest: ['options'],
  productoCategoriaUpdateRequest: ['productoCategoria'],
  productoCategoriaDeleteRequest: ['productoCategoriaId'],

  productoCategoriaSuccess: ['productoCategoria'],
  productoCategoriaAllSuccess: ['productoCategoriaList', 'headers'],
  productoCategoriaUpdateSuccess: ['productoCategoria'],
  productoCategoriaDeleteSuccess: [],

  productoCategoriaFailure: ['error'],
  productoCategoriaAllFailure: ['error'],
  productoCategoriaUpdateFailure: ['error'],
  productoCategoriaDeleteFailure: ['error'],

  productoCategoriaReset: [],
});

export const ProductoCategoriaTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  deleting: false,
  updateSuccess: false,
  productoCategoria: { id: undefined },
  productoCategoriaList: [],
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
    productoCategoria: INITIAL_STATE.productoCategoria,
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
  const { productoCategoria } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    productoCategoria,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { productoCategoriaList, headers } = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    productoCategoriaList: loadMoreDataWhenScrolled(state.productoCategoriaList, productoCategoriaList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { productoCategoria } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    productoCategoria,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    productoCategoria: INITIAL_STATE.productoCategoria,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    productoCategoria: INITIAL_STATE.productoCategoria,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    productoCategoriaList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    productoCategoria: state.productoCategoria,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    productoCategoria: state.productoCategoria,
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PRODUCTO_CATEGORIA_REQUEST]: request,
  [Types.PRODUCTO_CATEGORIA_ALL_REQUEST]: allRequest,
  [Types.PRODUCTO_CATEGORIA_UPDATE_REQUEST]: updateRequest,
  [Types.PRODUCTO_CATEGORIA_DELETE_REQUEST]: deleteRequest,

  [Types.PRODUCTO_CATEGORIA_SUCCESS]: success,
  [Types.PRODUCTO_CATEGORIA_ALL_SUCCESS]: allSuccess,
  [Types.PRODUCTO_CATEGORIA_UPDATE_SUCCESS]: updateSuccess,
  [Types.PRODUCTO_CATEGORIA_DELETE_SUCCESS]: deleteSuccess,

  [Types.PRODUCTO_CATEGORIA_FAILURE]: failure,
  [Types.PRODUCTO_CATEGORIA_ALL_FAILURE]: allFailure,
  [Types.PRODUCTO_CATEGORIA_UPDATE_FAILURE]: updateFailure,
  [Types.PRODUCTO_CATEGORIA_DELETE_FAILURE]: deleteFailure,
  [Types.PRODUCTO_CATEGORIA_RESET]: reset,
});
