import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, skip, tap } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { ConfirmationService, MessageService } from 'primeng/api';

import * as fromStore from '../../store';

import { Product } from 'models/product.model';
import { TranslationService } from 'helpers/translation.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  loading: boolean;
  productDialog: boolean;
  displayDeleteDialog: boolean;
  products: Product[];
  dataSource: Product[];
  categories: [];
  product: Product;
  selectedProducts: Product[];
  submitted: boolean;
  totalRecords: number;

  /**
   * The set of subscriptions on this components,
   * these subscriptions must be unsubscribed before this component got destroyed.
   */
  subscriptions = new Subscription();

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private translationService: TranslationService,
    private fromStore$: Store<fromStore.ConfigurationsState>
  ) {}

  ngOnInit() {
    this.loading = true;

    /**
     * Get the System categories.
     */
    this.subscriptions.add(
      this.fromStore$
        .pipe(
          select(fromStore.getCategories),
          tap((categories) => {
            if (categories) {
              this.categories = categories;
            }
          })
        )
        .subscribe()
    );
    this.fromStore$.dispatch(fromStore.SearchCategories({}));

    /**
     * Get the System products.
     */
    this.subscriptions.add(
      this.fromStore$
        .pipe(
          select(fromStore.getProducts),
          tap((products) => {
            if (products) {
              this.products = products;

              this.totalRecords = products.length;
              this.loading = false;
            }
          })
        )
        .subscribe()
    );

    this.fromStore$.dispatch(fromStore.SearchProducts());

    /**
     * Display toaster after update product completed.
     */
    this.subscriptions.add(
      this.fromStore$
        .pipe(
          select(fromStore.getSelectedProductUpdateCompleted),
          skip(1),
          tap((updated) => {
            if (updated) {
              this.messageService.add({
                severity: 'success',
                summary: this.translationService.translate('SUCCESSFUL'),
                detail: this.translationService.translate('UPDATE_MESSAGE'),
                life: 3000,
              });
              this.productDialog = false;
            }
          })
        )
        .subscribe()
    );

    /**
     * Display toaster after create product completed.
     */
    this.subscriptions.add(
      this.fromStore$
        .pipe(
          select(fromStore.getSelectedProductCreateCompleted),
          skip(1),
          tap((create) => {
            if (create) {
              this.messageService.add({
                severity: 'success',
                summary: this.translationService.translate('SUCCESSFUL'),
                detail: this.translationService.translate('CREATE_MESSAGE'),
                life: 3000,
              });
              this.productDialog = false;
            }
          })
        )
        .subscribe()
    );

    /**
     * Display toaster after delete product completed.
     */
    this.subscriptions.add(
      this.fromStore$
        .pipe(
          select(fromStore.getSelectedProductDeleteCompleted),
          skip(1),
          tap((deleted) => {
            if (deleted) {
              this.messageService.add({
                severity: 'warn',
                summary: this.translationService.translate('SUCCESSFUL'),
                detail: this.translationService.translate('DELETE_MESSAGE'),
                life: 3000,
              });
            }
          })
        )
        .subscribe()
    );
  }

  /**
   * Destroy component data
   */
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  /**
   * Add new product.
   */
  addProduct() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }

  /**
   * Delete the current selected products.
   */
  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: this.translationService.translate('DELETE_CONFIRM_TITLE'),
      header: this.translationService.translate('DELETE_CONFIRM_HEADER'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter((val) => !this.selectedProducts.includes(val));
        this.selectedProducts = null;
        this.messageService.add({
          severity: 'warn',
          summary: this.translationService.translate('SUCCESSFUL'),
          detail: this.translationService.translate('DELETE_PRODUCTS_MESSAGE'),
          life: 4000,
        });
      },
    });
  }

  editProduct(product: Product) {
    this.product = { ...product };
    this.productDialog = true;
  }

  /**
   * Delete the selected product.
   */
  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: this.translationService.translate('DELETE_SELECTED_CONFIRM_TITLE', {
        productTitle: product.title,
      }),
      header: this.translationService.translate('DELETE_CONFIRM_HEADER'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.confirmDelete(product.id);
        this.product = {};
      },
    });
  }

  /**
   * Confirm the Delete action.
   */
  confirmDelete(id: number) {
    this.fromStore$.dispatch(
      fromStore.DeleteProduct({
        id,
      })
    );
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  /**
   * Function to add product or to edit the current product.
   */
  saveProduct() {
    this.submitted = true;

    if (this.product.title?.trim()) {
      if (this.product.id) {
        this.fromStore$.dispatch(
          fromStore.UpdateProduct({
            id: this.product.id,
            title: this.product.title,
            category: this.product.category,
            price: this.product.price,
            image: this.product.image,
          })
        );
      } else {
        let rating;
        this.product.id = this.products.length + 1;
        this.product.image = 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg';
        rating = this.product.rating = { rate: 5, count: 1 };

        this.fromStore$.dispatch(
          fromStore.CreateProduct({
            id: this.product.id,
            title: this.product.title,
            category: this.product.category,
            price: this.product.price,
            image: this.product.image,
            rating,
          })
        );
      }
      this.products = [...this.products];
      this.productDialog = false;

      this.product = {};
    }
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }
}
