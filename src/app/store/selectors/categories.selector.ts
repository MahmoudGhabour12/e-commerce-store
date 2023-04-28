import { createSelector } from '@ngrx/store';
import { ConfigurationsState, CategoriesState } from 'store/states';
import { selectConfigurationsState } from './feature.selectors';

/**
 * Gets the categories state.
 */
const selectCategoriesState = createSelector(
  selectConfigurationsState,
  (state: ConfigurationsState) => state.categories
);

/**
 * Gets the list of loaded categories.
 */
export const getCategories = createSelector(selectCategoriesState, (state: CategoriesState) => state.categories);

/**
 * Gets the error that occurred in the state.
 */
export const getCategoriesError = createSelector(selectCategoriesState, (state: CategoriesState) => state.error);

/**
 * Determines if there is a running search process.
 */
export const getCategoriesSearching = createSelector(
  selectCategoriesState,
  (state: CategoriesState) => state.isSearching
);

/**
 * Determines if the last search process has been ended successfully.
 */
export const getCategoriesSearchCompleted = createSelector(
  selectCategoriesState,
  (state: CategoriesState) => state.isSearchCompleted
);

/**
 * Gets the selected category.
 */
export const getSelectedCategory = createSelector(
  selectCategoriesState,
  (state: CategoriesState) => state.selectedCategory
);
