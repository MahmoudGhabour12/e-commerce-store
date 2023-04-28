import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Product } from 'models/product.model';
import * as fromStore from '../../store';

@Component({
  selector: 'app-user-products-list',
  templateUrl: './user-products-list.component.html',
  styleUrls: ['./user-products-list.component.scss'],
})
export class UserProductsListComponent implements OnInit, OnDestroy {
  sortOptions: { label: string; value: string }[];
  sortOrder: number;
  sortField: string;
  products: Product[];
  categoryProducts: Product[];
  categories: [];
  firstCategory: string;
  isLoading: boolean;

  /**
   * The set of subscriptions on this components,
   * these subscriptions must be unsubscribed before this component got destroyed.
   */
  subscriptions = new Subscription();

  constructor(private fromStore$: Store<fromStore.ConfigurationsState>) {}

  ngOnInit() {
    this.isLoading = true;

    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' },
    ];

    this.showProducts();
  }

  /**
   * Destroy component data
   */
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  /**
   * Function to detect changes when sort table.
   */
  onSortChange(event) {
    let value = event.value;
    setTimeout(() => {
      if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
      } else {
        this.sortOrder = 1;
        this.sortField = value;
      }
      this.isLoading = false;
    }, 300);

    this.isLoading = true;
  }

  /**
   * Display products depends on selected category.
   */
  showProducts() {
    this.subscriptions.add(
      this.fromStore$
        .pipe(
          select(fromStore.getCategories),
          tap((categories) => {
            if (categories) {
              this.categories = categories;
              this.fromStore$
                .pipe(
                  select(fromStore.getProducts),
                  tap((products) => {
                    if (products) {
                      this.categoryProducts = products;
                      let index = 0;
                      if (this.categories) {
                        this.products = this.getCategoryProducts(this.categories[index]);
                        this.isLoading = false;
                      }
                    }
                  })
                )
                .subscribe();
            }
          })
        )
        .subscribe()
    );

    this.fromStore$.dispatch(fromStore.SearchCategories({}));
    this.fromStore$.dispatch(fromStore.SearchProducts());
  }

  /**
   * Handles search parameters change.
   */
  search() {
    setTimeout(() => {
      this.isLoading = false;
    }, 100);

    this.isLoading = true;
  }

  /**
   * Get products of current category.
   */
  getCategoryProducts(category: string) {
    setTimeout(() => {
      this.products = this.categoryProducts.filter((product: Product) => {
        this.isLoading = false;
        return product.category === category;
      });
    }, 300);

    this.isLoading = true;
    return this.products;
  }
}
