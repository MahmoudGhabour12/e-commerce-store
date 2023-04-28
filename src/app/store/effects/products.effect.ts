import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { ProductService } from 'services/product.service';
import { ProductsActions } from '../actions/products.action';
import { NotificationsService } from 'shared/services/notification.service';
import { TranslationService } from 'helpers/translation.service';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private productsService: ProductService,
    private notificationService: NotificationsService,
    private translationService: TranslationService
  ) {}

  /* ========================= SEARCH_PRODUCTS =================================== */
  search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.SearchProducts),
      switchMap(() =>
        this.productsService.getProducts().pipe(
          map((response) => ProductsActions.SearchProductsSuccess({ products: response })),
          catchError((error) => of(ProductsActions.SearchProductsFail(error)))
        )
      )
    )
  );

  /* ========================= FIND_PRODUCT =================================== */
  find$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.FindProduct),
      switchMap((data) =>
        this.productsService.findProductById(data.id).pipe(
          map((response) => ProductsActions.FindProductSuccess(response)),
          catchError((error) => of(ProductsActions.FindProductFail(error)))
        )
      )
    )
  );

  findFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductsActions.FindProductFail),
        tap(({ statusCode }) => {
          if (statusCode === 400) {
            this.notificationService.dispatchErrorMessage(this.translationService.translate('PRODUCT_NOT_FOUND'));
          }
        })
      ),
    { dispatch: false }
  );

  /* ========================= CREATE_PRODUCT =================================== */
  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.CreateProduct),
      switchMap((data) =>
        this.productsService.create(data).pipe(
          map((response) => ProductsActions.CreateProductSuccess(response)),
          catchError((error) => of(ProductsActions.CreateProductFail(error)))
        )
      )
    )
  );

  createProductSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductsActions.CreateProductSuccess),
        tap(() => {
          this.notificationService.dispatchSuccessMessage(this.translationService.translate('PRODUCT_ADDED'));
        })
      ),
    { dispatch: false }
  );

  createProductFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductsActions.CreateProductFail),
        tap(({ statusCode }) => {
          if (statusCode === 400) {
            this.notificationService.dispatchErrorMessage(this.translationService.translate('PRODUCT_NOT_ADDED'));
          }
        })
      ),
    { dispatch: false }
  );

  /* ========================= UPDATE_PRODUCT =================================== */
  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.UpdateProduct),
      switchMap((data) =>
        this.productsService.update(data).pipe(
          map((response) => ProductsActions.UpdateProductSuccess(response)),
          catchError((error) => of(ProductsActions.UpdateProductFail(error)))
        )
      )
    )
  );

  updateProductSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductsActions.UpdateProductSuccess),
        tap(() => {
          this.notificationService.dispatchSuccessMessage(this.translationService.translate('PRODUCT_UPDATED'));
        })
      ),
    { dispatch: false }
  );

  updateProductFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductsActions.UpdateProductFail),
        tap(({ statusCode }) => {
          if (statusCode === 400) {
            this.notificationService.dispatchErrorMessage(this.translationService.translate('PRODUCT_NOT_UPDATED'));
          }
        })
      ),
    { dispatch: false }
  );

  /* ========================= DELETE_PRODUCT =================================== */
  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.DeleteProduct),
      switchMap((data) =>
        this.productsService.delete(data.id).pipe(
          map((response) => ProductsActions.DeleteProductSuccess(response)),
          catchError((error) => of(ProductsActions.DeleteProductFail(error)))
        )
      )
    )
  );

  deleteFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductsActions.DeleteProductFail),
        tap(({ statusCode }) => {
          if (statusCode === 400) {
            this.notificationService.dispatchErrorMessage(this.translationService.translate('PRODUCT_NOT_FOUND'));
          }
        })
      ),
    { dispatch: false }
  );
}
