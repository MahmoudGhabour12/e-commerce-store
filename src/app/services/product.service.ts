import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

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

  create(data: any): Observable<any> {
    return this.httpClient.post<Product>(`${this.fakeStoreApi}${this.productApi}`, data);
  }
  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.fakeStoreApi}${this.productApi}`);
  }
  findProductById(id: any): Observable<any> {
    return this.httpClient.get<Product>(`${this.fakeStoreApi}${this.productApi}/${id}`);
  }
  getProductsByCategory(categories: any): Observable<any> {
    return this.httpClient.get<Product>(`${this.fakeStoreApi}${this.productApi}/${categories}`);
  }
  getProductsByCategoryId(categories: any, category: any): Observable<any> {
    return this.httpClient.get<Product>(`${this.fakeStoreApi}${this.productApi}/${categories}/${category}`);
  }

  getCategories(): Observable<[]> {
    return this.httpClient.get<[]>(`${this.fakeStoreApi}${this.productApi}/categories`);
  }

  /**
   * Updates an existing product data using the provided data.
   * @param data The updated product data.
   */
  update(data: any): Observable<any> {
    return this.httpClient.put<Product>(`${this.fakeStoreApi}${this.productApi}/${data.id}`, data);
  }

  /**
   * Deletes the product by given id.
   * @param id The id of the product.
   */
  public delete(id: number): Observable<any> {
    return this.httpClient.delete<Product>(`${this.fakeStoreApi}${this.productApi}/${id}`);
  }
}
