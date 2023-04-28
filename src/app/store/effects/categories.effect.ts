import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ProductService } from 'services/product.service';
import { CategoriesActions } from '../actions/categories.action';

@Injectable()
export class CategoriesEffects {
  constructor(private actions$: Actions, private productsService: ProductService) {}

  /* ========================= SEARCH_CATEGORIES =================================== */
  searchCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.SearchCategories),
      switchMap(() =>
        this.productsService.getCategories().pipe(
          map((response) => CategoriesActions.SearchCategoriesSuccess({ categories: response })),
          catchError((error) => of(CategoriesActions.SearchCategoriesFail(error)))
        )
      )
    )
  );
}
