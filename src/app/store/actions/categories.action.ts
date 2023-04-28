import { createAction, props } from '@ngrx/store';

/**
 * The categories action types.
 */
export enum CategoriesActionType {
  SEARCH_CATEGORIES = '[Categories] Search categories',
  SEARCH_CATEGORIES_FAIL = '[Categories] Search categories Fail',
  SEARCH_CATEGORIES_SUCCESS = '[Categories] Search categories Success',
}

/**
 * Represents a store categories search action.
 */
export const SearchCategories = createAction(CategoriesActionType.SEARCH_CATEGORIES, props<any>());

/**
 * Represents a store categories search fail action.
 */
export const SearchCategoriesFail = createAction(CategoriesActionType.SEARCH_CATEGORIES_FAIL, props<any>());

/**
 * Represents a store categories search success action.
 */
export const SearchCategoriesSuccess = createAction(
  CategoriesActionType.SEARCH_CATEGORIES_SUCCESS,
  props<{ categories: [] }>()
);

/**
 * finances-module categories action types.
 */
export const CategoriesActions = {
  SearchCategories,
  SearchCategoriesFail,
  SearchCategoriesSuccess,
};
