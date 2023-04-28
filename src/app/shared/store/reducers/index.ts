import { ActionReducerMap } from '@ngrx/store';

import { AppState } from '../states';
import { appStatusReducer } from './app-status.reducer';

/**
 * The Core-Module store reducers.
 */
export const reducers: ActionReducerMap<AppState> = {
  status: appStatusReducer,
};
