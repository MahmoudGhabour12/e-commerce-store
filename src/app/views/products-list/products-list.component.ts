import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';

import { User } from 'models/user';
import { Product } from 'models/product-model';
import { ProductService } from 'services/product.service';
import { TranslationService } from 'helpers/translation.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.sass'],
  providers: [MessageService, ConfirmationService],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  loading = false;
  users: User[] = [];

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
    private productService: ProductService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private translationService: TranslationService
  ) {}

  ngOnInit() {
    this.loading = true;

    this.subscriptions.add(
      this.productService.getProducts().subscribe((products) => {
        this.dataSource = products;
        this.totalRecords = products.length;
        this.loading = false;
      })
    );

    this.subscriptions.add(
      this.productService.getCategories().subscribe((categories) => {
        this.categories = categories;
      })
    );
  }

  /**
   * Destroy component data
   */
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: this.translationService.translate('DELETE_CONFIRM_TITLE'),
      header: this.translationService.translate('DELETE_CONFIRM_HEADER'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter((val) => !this.selectedProducts.includes(val));
        this.selectedProducts = null;
        this.messageService.add({
          severity: this.translationService.translate('SUCCESS'),
          summary: this.translationService.translate('SUCCESSFUL'),
          detail: this.translationService.translate('DELETE_MESSAGE'),
          life: 3000,
        });
      },
    });
  }

  editProduct(product: Product) {
    this.product = { ...product };
    this.productDialog = true;
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: this.translationService.translate('DELETE_SELECTED_CONFIRM_TITLE', {
        productTitle: product.title,
      }),
      header: this.translationService.translate('DELETE_CONFIRM_HEADER'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter((val) => val.id !== product.id);
        this.product = {};
        this.messageService.add({
          severity: this.translationService.translate('SUCCESS'),
          summary: this.translationService.translate('SUCCESSFUL'),
          detail: this.translationService.translate('DELETE_MESSAGE'),
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.product.title?.trim()) {
      if (this.product.id) {
        this.products[this.findIndexById(this.product.id)] = this.product;
        this.messageService.add({
          severity: this.translationService.translate('SUCCESS'),
          summary: this.translationService.translate('SUCCESSFUL'),
          detail: this.translationService.translate('UPDATE_MESSAGE'),
          life: 3000,
        });
      } else {
        this.product.id = this.products.length + 1;
        this.product.image = 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg';
        this.product.rating = { rate: 5, count: 1 };
        this.products.push(this.product);
        this.messageService.add({
          severity: this.translationService.translate('SUCCESS'),
          summary: this.translationService.translate('SUCCESSFUL'),
          detail: this.translationService.translate('CREATE_MESSAGE'),
          life: 3000,
        });
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

  loadProducts(event: LazyLoadEvent) {
    this.loading = true;
    setTimeout(() => {
      if (this.dataSource) {
        this.products = this.dataSource.slice(event.first, event.first + event.rows);
        this.loading = false;
      }
    }, 1000);
  }
}
