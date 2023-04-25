import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product-model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private fakeStoreApi: string;
  private productApi: string;
  constructor(private httpClient: HttpClient) {
    this.fakeStoreApi = environment.fakeStoreApi;
    this.productApi = '/products';
  }

  getProducts() {
    return this.httpClient.get<Product[]>(`${this.fakeStoreApi}${this.productApi}`);
  }
  getOneProduct(uid: any) {
    return this.httpClient.get<Product>(`${this.fakeStoreApi}${this.productApi}/${uid}`);
  }
  getProductsByCategory(categories: any) {
    return this.httpClient.get<Product>(`${this.fakeStoreApi}${this.productApi}/${categories}`);
  }
  getOneProductByCategory(categories: any, category: any) {
    return this.httpClient.get<Product>(`${this.fakeStoreApi}${this.productApi}/${categories}/${category}`);
  }

  getCategories() {
    return this.httpClient.get<[]>(`${this.fakeStoreApi}${this.productApi}/categories`);
  }
}
