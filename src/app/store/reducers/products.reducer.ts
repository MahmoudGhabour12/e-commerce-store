import { Action, createReducer, on } from '@ngrx/store';
import { findIndex, remove } from 'lodash-es';

import { ProductsActions } from '../actions/products.action';
import { ProductsState } from '../states/products.state';

/**
 * The initial state from which the state starts.
 */
const initialState: ProductsState = {
  products: [],
  error: null,
  isSearching: false,
  isSearchCompleted: false,
  selectedProduct: null,
  isFinding: false,
  isFindCompleted: false,
  isCreating: false,
  isCreateCompleted: false,
  isUpdating: false,
  isUpdateCompleted: false,
  isDeleting: false,
  isDeleteCompleted: false,
};

const reducer = createReducer(
  initialState,

  //#region SEARCH_PRODUCTS
  on(ProductsActions.SearchProducts, (state): ProductsState => {
    return {
      ...state,
      isSearching: true,
      isSearchCompleted: false,
      error: null,
    };
  }),

  on(ProductsActions.SearchProductsFail, (state, error): ProductsState => {
    return {
      ...state,
      error,
      isSearching: false,
      isSearchCompleted: false,
    };
  }),

  on(ProductsActions.SearchProductsSuccess, (state, { products }): ProductsState => {
    return {
      ...state,
      products,
      error: null,
      isSearching: false,
      isSearchCompleted: true,
    };
  }),

  //#endregion SEARCH_PRODUCTS

  //#endregion SEARCH_CATEGORIES

  //#region FIND_PRODUCTS
  on(ProductsActions.FindProduct, (state): ProductsState => {
    return {
      ...state,
      isFinding: true,
      isFindCompleted: false,
      error: null,
    };
  }),

  on(ProductsActions.FindProductFail, (state, error): ProductsState => {
    return {
      ...state,
      error,
      isFinding: false,
      isFindCompleted: false,
    };
  }),

  on(ProductsActions.FindProductSuccess, (state, data): ProductsState => {
    let products = [...state.products];
    const productIndex = findIndex(products, (product) => product.id === data.id);

    /* If product was found, update it. */
    if (productIndex >= 0) {
      products[productIndex] = data;
    } else {
      /* else, insert it to the beginning of the array. */
      products = [data, ...products];
    }

    return {
      ...state,
      products,
      selectedProduct: data,
      error: null,
      isFinding: false,
      isFindCompleted: true,
    };
  }),

  //#endregion FIND_PRODUCTS

  //#region CREATE_PRODUCT
  on(ProductsActions.CreateProduct, (state): ProductsState => {
    return {
      ...state,
      isCreating: true,
      isCreateCompleted: false,
      error: null,
    };
  }),

  on(ProductsActions.CreateProductFail, (state, error): ProductsState => {
    return {
      ...state,
      error,
      isCreating: false,
      isCreateCompleted: false,
    };
  }),

  on(ProductsActions.CreateProductSuccess, (state, data): ProductsState => {
    let products = [...state.products];

    const productIndex = findIndex(products, (product) => product.id === data.id);
    const rating = { rating: { rate: 5, count: 1 } };
    const returnedTarget = Object.assign(rating, data);

    /* If product  was found, update it. */
    if (productIndex >= 0) {
      products[productIndex] = returnedTarget;
    } else {
      /* else, insert it to the beginning of the array. */
      products = [returnedTarget, ...products];
    }

    return {
      ...state,
      products,
      selectedProduct: data,
      error: null,
      isCreating: false,
      isCreateCompleted: true,
    };
  }),

  //#endregion CREATE_PRODUCT

  //#region UPDATE_PRODUCT

  on(ProductsActions.UpdateProduct, (state): ProductsState => {
    return {
      ...state,
      isUpdating: true,
      isUpdateCompleted: false,
      error: null,
    };
  }),

  on(ProductsActions.UpdateProductFail, (state, error): ProductsState => {
    return {
      ...state,
      error,
      isUpdating: false,
      isUpdateCompleted: false,
    };
  }),

  on(ProductsActions.UpdateProductSuccess, (state, data): ProductsState => {
    let products = [...state.products];
    const productIndex = findIndex(products, (product) => product.id === data.id);
    const product = products.find((product) => product.id === data.id);

    const rating = { rating: { rate: product.rating.rate, count: product.rating.count } };
    const returnedTarget = Object.assign(rating, data);

    /* If product  was found, update it. */
    if (productIndex >= 0) {
      products[productIndex] = returnedTarget;
    } else {
      /* else, insert it to the beginning of the array. */
      products = [data, ...products];
    }

    return {
      ...state,
      products,
      selectedProduct: data,
      error: null,
      isUpdating: false,
      isUpdateCompleted: true,
    };
  }),

  //#endregion UPDATE_PRODUCT

  //#region DELETE_PRODUCT
  on(ProductsActions.DeleteProduct, (state): ProductsState => {
    return {
      ...state,
      isDeleting: true,
      isDeleteCompleted: false,
      error: null,
    };
  }),

  on(ProductsActions.DeleteProductFail, (state, error): ProductsState => {
    return {
      ...state,
      error,
      isDeleting: false,
      isDeleteCompleted: false,
    };
  }),

  on(ProductsActions.DeleteProductSuccess, (state, data): ProductsState => {
    const products = [...state.products];

    /* Remove the deleted product from the array. */
    remove(products, (product) => product.id === data.id);

    return {
      ...state,
      products,
      selectedProduct: data,
      error: null,
      isDeleting: false,
      isDeleteCompleted: true,
    };
  })

  //#endregion DELETE_PRODUCT
);

/**
 * The reducer function that is called in each action dispatch against the state.
 * @param state The current state.
 * @param action The action that will affect the state.
 */
export function productsReducer(state: ProductsState = initialState, action: Action): ProductsState {
  return reducer(state, action);
}
