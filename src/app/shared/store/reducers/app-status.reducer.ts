import { Action, createReducer, on } from '@ngrx/store';

import { AppStatusState } from '../states';
import { AppActions } from '../actions';

/**
 * The initial state from which the state starts.
 */
const initialState: AppStatusState = {
  isLoading: false,
  loadingCounter: 0,
};

const reducer = createReducer(
  initialState,

  on(AppActions.AppStatusStartLoad, (state) => {
    const loadingCounter = state.loadingCounter + 1;

    return {
      ...state,
      loadingCounter,
      isLoading: true,
    };
  }),

  on(AppActions.AppStatusEndLoad, (state) => {
    /* check if the loader should be hidden. */
    const loadingCounter = state.loadingCounter - 1;
    const isLoading = loadingCounter !== 0;

    return {
      ...state,
      loadingCounter,
      isLoading,
    };
  })
);

/**
 * The reducer function that is called in each action dispatch against the state.
 * @param state The current state.
 * @param action The action that will affect the state.
 */
export function appStatusReducer(state: AppStatusState = initialState, action: Action): AppStatusState {
  return reducer(state, action);
}
