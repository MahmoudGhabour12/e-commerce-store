/**
 * Represents the status of the app.
 */
export interface AppStatusState {
  /**
   * Indicates wither if there is an http-request running.
   */
  isLoading: boolean;

  /**
   * Gets or sets the count of requests running now and required app loader to be shown.
   */
  loadingCounter: number;
}
