import { ActionReducerMap } from '@ngrx/store';

import { ConfigurationsState } from '../states/configurations.state';
import { categoriesReducer } from './categories.reducer';
import { productsReducer } from './products.reducer';

/**
 * The Configurations-Module store reducers.
 */
export const reducers: ActionReducerMap<ConfigurationsState> = {
  categories: categoriesReducer,
  products: productsReducer,
};
