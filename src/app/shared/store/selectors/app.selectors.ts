import { createSelector } from '@ngrx/store';

import { AppStatusState } from '../states';
import { selectAppStatusState } from './feature.selectors';

/* Selectors */

/**
 * Gets a value indicates whether the app has a loading status or not.
 */
export const getAppStatusLoading = createSelector(selectAppStatusState, (state: AppStatusState) => state.isLoading);
