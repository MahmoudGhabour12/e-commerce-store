/**
 * Represents the Categories state.
 */
export class CategoriesState {
  /**
   * The list of Categories.
   */
  public categories: [];

  /**
   * An error that may resulting during processing some actions.
   */
  public error: any;

  /**
   * Determines if there is a running search process.
   */
  public isSearching: boolean;

  /**
   * Determines if the last search process has been ended successfully.
   */
  public isSearchCompleted: boolean;

  /**
   * The current selected category.
   */
  public selectedCategory: any;
}
