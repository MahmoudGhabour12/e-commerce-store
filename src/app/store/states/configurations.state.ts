import { CategoriesState } from './categories.state';
import { ProductsState } from './products.state';

/**
 * Represents the Configurations-Module state.
 */
export interface ConfigurationsState {
  /**
   * Represents the categories state.
   */
  categories: CategoriesState;

  /**
   * Represents the products state.
   */
  products: ProductsState;
}
