import { createAction } from '@ngrx/store';

/**
 * The store app action types.
 */
enum AppActionTypes {
  APP_START_LOAD = '[Core] App Started Loading',
  APP_END_LOAD = '[Core] App Stopped Loading',
}

/**
 * Represents a store app-start-load action against for an http-request.
 */
export const AppStatusStartLoad = createAction(AppActionTypes.APP_START_LOAD);

/**
 * Represents a store app-end-load action against for an http-request.
 */
export const AppStatusEndLoad = createAction(AppActionTypes.APP_END_LOAD);

/**
 * Core-module App actions.
 */
export const AppActions = { AppStatusStartLoad, AppStatusEndLoad };
