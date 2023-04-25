import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Product } from 'models/product-model';
import { ProductService } from 'services/product.service';

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

  loading: boolean;

  /**
   * The set of subscriptions on this components,
   * these subscriptions must be unsubscribed before this component got destroyed.
   */
  subscriptions = new Subscription();

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loading = true;

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

  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  showProducts() {
    this.subscriptions.add(
      this.productService.getCategories().subscribe((categories) => {
        this.categories = categories;
        this.productService.getProducts().subscribe((products) => {
          this.categoryProducts = products;
          let index = 0;
          if (this.categories) {
            this.products = this.getCategoryProducts(this.categories[index]);
            this.loading = false;
          }
        });
      })
    );
  }

  getCategoryProducts(category: string) {
    this.products = this.categoryProducts.filter((product: Product) => {
      return product.category === category;
    });

    return this.products;
  }
}
