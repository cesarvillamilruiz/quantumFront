import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product } from './../Interfaces/Product';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private UrlLocal : string = "https://localhost:44322/Producto/";
  private UrlAzure : string = "https://pruebaquantum2021.azurewebsites.net/Producto/";
  private Url = this.UrlAzure;

  constructor(private http: HttpClient) { }

  AddProduct(product: Product): Observable<any> {
    return this.http.post<any>(`${this.Url}Add_Product`, product);
  }

  UpdateProduct(product: Product, id: number): Observable<any> {
    return this.http.put<any>(`${this.Url}Update_Product/${id}`, product);
  }

  getAllProducts() {
    return this.http.get<any>(`${this.Url}Get_Products`);
  }
}
