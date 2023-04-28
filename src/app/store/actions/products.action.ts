import { createAction, props } from '@ngrx/store';
import { Product } from 'models/product.model';

/**
 * The products action types.
 */
export enum ProductsActionType {
  SEARCH_PRODUCTS = '[Products] Search Products',
  SEARCH_PRODUCTS_FAIL = '[Products] Search Products Fail',
  SEARCH_PRODUCTS_SUCCESS = '[Products] Search Products Success',

  FIND_PRODUCT = '[Products] Find Product',
  FIND_PRODUCT_FAIL = '[Products] Find Product Fail',
  FIND_PRODUCT_SUCCESS = '[Products] Find Product Success',

  CREATE_PRODUCT = '[Products] Create Product',
  CREATE_PRODUCT_FAIL = '[Products] Create Product Fail',
  CREATE_PRODUCT_SUCCESS = '[Products] Create Product Success',

  UPDATE_PRODUCT = '[Products] Update Product',
  UPDATE_PRODUCT_FAIL = '[Products] Update Product Fail',
  UPDATE_PRODUCT_SUCCESS = '[Products] Update Product Success',

  DELETE_PRODUCT = '[Products] Delete Product',
  DELETE_PRODUCT_FAIL = '[Products] Delete Product Fail',
  DELETE_PRODUCT_SUCCESS = '[Products] Delete Product Success',
}

/**
 * Represents a store products search action.
 */
export const SearchProducts = createAction(ProductsActionType.SEARCH_PRODUCTS);

/**
 * Represents a store products search fail action.
 */
export const SearchProductsFail = createAction(ProductsActionType.SEARCH_PRODUCTS_FAIL, props<any>());

/**
 * Represents a store products search success action.
 */
export const SearchProductsSuccess = createAction(
  ProductsActionType.SEARCH_PRODUCTS_SUCCESS,
  props<{ products: Product[] }>()
);

/**
 * Represents a store find products action.
 */
export const FindProduct = createAction(ProductsActionType.FIND_PRODUCT, props<{ id: number }>());

/**
 * Represents a store find products fail action.
 */
export const FindProductFail = createAction(ProductsActionType.FIND_PRODUCT_FAIL, props<any>());

/**
 * Represents a store find products success action.
 */
export const FindProductSuccess = createAction(ProductsActionType.FIND_PRODUCT_SUCCESS, props<Product>());

/**
 * Represents a store product create action.
 */
export const CreateProduct = createAction(ProductsActionType.CREATE_PRODUCT, props<any>());

/**
 * Represents a store product create fail action.
 */
export const CreateProductFail = createAction(ProductsActionType.CREATE_PRODUCT_FAIL, props<any>());

/**
 * Represents a store product create success action.
 */
export const CreateProductSuccess = createAction(ProductsActionType.CREATE_PRODUCT_SUCCESS, props<Product>());

/**
 * Represents a store product update action.
 */
export const UpdateProduct = createAction(ProductsActionType.UPDATE_PRODUCT, props<any>());

/**
 * Represents a store product update fail action.
 */
export const UpdateProductFail = createAction(ProductsActionType.UPDATE_PRODUCT_FAIL, props<any>());

/**
 * Represents a store product update success action.
 */
export const UpdateProductSuccess = createAction(ProductsActionType.UPDATE_PRODUCT_SUCCESS, props<Product>());

/**
 * Represents a store Delete products action.
 */
export const DeleteProduct = createAction(ProductsActionType.DELETE_PRODUCT, props<{ id: number }>());

/**
 * Represents a store Delete products fail action.
 */
export const DeleteProductFail = createAction(ProductsActionType.DELETE_PRODUCT_FAIL, props<any>());

/**
 * Represents a store Delete products success action.
 */
export const DeleteProductSuccess = createAction(ProductsActionType.DELETE_PRODUCT_SUCCESS, props<Product>());

/**
 * finances-module products action types.
 */
export const ProductsActions = {
  SearchProducts,
  SearchProductsFail,
  SearchProductsSuccess,
  FindProduct,
  FindProductFail,
  FindProductSuccess,
  CreateProduct,
  CreateProductFail,
  CreateProductSuccess,
  UpdateProduct,
  UpdateProductFail,
  UpdateProductSuccess,
  DeleteProduct,
  DeleteProductFail,
  DeleteProductSuccess,
};
