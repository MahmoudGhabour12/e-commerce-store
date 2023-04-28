import { createFeatureSelector } from '@ngrx/store';

import { AppStatusState } from '../states';

/**
 * The app status state feature selector.
 */
export const selectAppStatusState = createFeatureSelector<AppStatusState>('status');
