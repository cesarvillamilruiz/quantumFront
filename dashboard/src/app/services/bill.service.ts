import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { FacturaDTO } from './../Interfaces/FacturaDTO';
import { Factura } from './../Interfaces/Factura';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  private UrlLocal : string = "https://localhost:44322/Factura/";
  private UrlAzure : string = "https://pruebaquantum2021.azurewebsites.net/Factura/";
  private Url = this.UrlAzure;

  constructor(private http: HttpClient) { }

  GetAllBills(): Observable<Factura[]> {
    return this.http.get<Factura[]>(`${this.Url}Get_Bills`);
  }

  AddBill(Factura: FacturaDTO): Observable<any> {
    return this.http.post<any>(`${this.Url}Add_Bill`, Factura);
  }

}
