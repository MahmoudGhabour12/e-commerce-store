import { createFeatureSelector } from '@ngrx/store';

import { ConfigurationsState } from '../states/configurations.state';

/**
 * The configurations state feature selector.
 */
export const selectConfigurationsState = createFeatureSelector<ConfigurationsState>('eCommerce');
