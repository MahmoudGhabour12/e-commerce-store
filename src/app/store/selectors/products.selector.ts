import { createSelector } from '@ngrx/store';
import { ConfigurationsState, ProductsState } from 'store/states';
import { selectConfigurationsState } from './feature.selectors';

/**
 * Gets the products state.
 */
const selectProductsState = createSelector(selectConfigurationsState, (state: ConfigurationsState) => state.products);

/**
 * Gets the list of loaded products.
 */
export const getProducts = createSelector(selectProductsState, (state: ProductsState) => state.products);

/**
 * Gets the error that occurred in the state.
 */
export const getProductsError = createSelector(selectProductsState, (state: ProductsState) => state.error);

/**
 * Determines if there is a running search process.
 */
export const getProductsSearching = createSelector(selectProductsState, (state: ProductsState) => state.isSearching);

/**
 * Determines if the last search process has been ended successfully.
 */
export const getProductsSearchCompleted = createSelector(
  selectProductsState,
  (state: ProductsState) => state.isSearchCompleted
);

/**
 * Gets the selected product.
 */
export const getSelectedProduct = createSelector(selectProductsState, (state: ProductsState) => state.selectedProduct);

/**
 * Determines if there is a running find product process.
 */
export const getProductFinding = createSelector(selectProductsState, (state: ProductsState) => state.isFinding);

/**
 * Determines if the last find product process has been ended successfully.
 */
export const getProductFindCompleted = createSelector(
  selectProductsState,
  (state: ProductsState) => state.isFindCompleted
);

/**
 * Determines if there is a running create process.
 */
export const getSelectedProductCreating = createSelector(
  selectProductsState,
  (state: ProductsState) => state.isCreating
);

/**
 * Determines if the last create process has been ended successfully.
 */
export const getSelectedProductCreateCompleted = createSelector(
  selectProductsState,
  (state: ProductsState) => state.isCreateCompleted
);

/**
 * Determines if there is a running update process.
 */
export const getSelectedProductUpdating = createSelector(
  selectProductsState,
  (state: ProductsState) => state.isUpdating
);

/**
 * Determines if the last update process has been ended successfully.
 */
export const getSelectedProductUpdateCompleted = createSelector(
  selectProductsState,
  (state: ProductsState) => state.isUpdateCompleted
);

/**
 * Determines if there is a running delete process.
 */
export const getSelectedProductDeleting = createSelector(
  selectProductsState,
  (state: ProductsState) => state.isDeleting
);

/**
 * Determines if the last delete process has been ended successfully.
 */
export const getSelectedProductDeleteCompleted = createSelector(
  selectProductsState,
  (state: ProductsState) => state.isDeleteCompleted
);
