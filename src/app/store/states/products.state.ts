import { Product } from 'models/product.model';

/**
 * Represents the Products state.
 */
export class ProductsState {
  /**
   * The list of Products.
   */
  public products: Product[];

  /**
   * An error that may resulting during processing some actions.
   */
  public error: any;

  /**
   * Determines if there is a running search process.
   */
  public isSearching: boolean;

  /**
   * Determines if the last search process has been ended successfully.
   */
  public isSearchCompleted: boolean;

  /**
   * The current selected Product.
   */
  public selectedProduct: Product;

  /**
   * Determines if there is a running find-product process.
   */
  public isFinding: boolean;

  /**
   * Determines if the last find-product process has been ended successfully.
   */
  public isFindCompleted: boolean;

  /**
   * Determines if there is a running create process.
   */
  public isCreating: boolean;

  /**
   * Determines if the last create process has been ended successfully.
   */
  public isCreateCompleted: boolean;

  /**
   * Determines if there is a running update process.
   */
  public isUpdating: boolean;

  /**
   * Determines if the last update process has been ended successfully.
   */
  public isUpdateCompleted: boolean;

  /**
   * Determines if there is a running delete process.
   */
  public isDeleting: boolean;

  /**
   * Determines if the last delete process has been ended successfully.
   */
  public isDeleteCompleted: boolean;
}
