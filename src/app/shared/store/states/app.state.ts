import { AppStatusState } from './app-status.state';

/**
 * Represents the app state.
 */
export interface AppState {
  /**
   * The state that contains information about app status.
   */
  status: AppStatusState;
}
