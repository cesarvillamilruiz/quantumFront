import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Product } from './../../Interfaces/Product';
import {ProductService} from './../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product = {} as Product
  isAddProduct = false;
  isUpdateProduct = false;
  products : any [] = [];
  IdProductoToUpdate: number;


  producto1Form = new FormGroup({
    Nombre: new FormControl('', Validators.required),
    ValorVentaConIva: new FormControl('',Validators.required),
    CantidadUnidadesInventario: new FormControl('',Validators.required),
    PorcentajeIvaaplicado: new FormControl('',Validators.required)
  });

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.GetProductToList();
  }

  onChange(productId) {
    let currentProduct = this.products[0].find(element => element.id == Number(productId));
    this.producto1Form.controls['Nombre'].setValue(currentProduct.nombre);
    this.producto1Form.controls['ValorVentaConIva'].setValue(currentProduct.valorVentaConIva);
    this.producto1Form.controls['CantidadUnidadesInventario'].setValue(currentProduct.cantidadUnidadesInventario);
    this.producto1Form.controls['PorcentajeIvaaplicado'].setValue(currentProduct.porcentajeIvaaplicado);
    this.IdProductoToUpdate = Number(productId);
  }

  AddProduct(){
    this.isAddProduct = !this.isAddProduct;
    this.isUpdateProduct = false;

    this.clear();
  }

  clear(){
     this.producto1Form.controls['Nombre'].setValue('');
     this.producto1Form.controls['ValorVentaConIva'].setValue('');
     this.producto1Form.controls['CantidadUnidadesInventario'].setValue('');
     this.producto1Form.controls['PorcentajeIvaaplicado'].setValue('');
  }

  GetProductToList(){
    this.productService.getAllProducts().subscribe(ed => this.products.push(ed));
  }

  UpdateProduct(){
    this.isUpdateProduct = !this.isUpdateProduct;
    this.isAddProduct = false;

    this.clear();
  }

  onSubmitAdd() {
    this.product.Nombre = this.producto1Form.value.Nombre
    this.product.ValorVentaConIva = this.producto1Form.value.ValorVentaConIva
    this.product.CantidadUnidadesInventario = this.producto1Form.value.CantidadUnidadesInventario
    this.product.PorcentajeIvaaplicado = this.producto1Form.value.PorcentajeIvaaplicado
    this.productService.AddProduct(this.product).subscribe(re => console.log('***' + re))
    this.clear();
  }

  onSubmitUpdate(){
    this.product.Nombre = this.producto1Form.value.Nombre
    this.product.ValorVentaConIva = this.producto1Form.value.ValorVentaConIva
    this.product.CantidadUnidadesInventario = this.producto1Form.value.CantidadUnidadesInventario
    this.product.PorcentajeIvaaplicado = this.producto1Form.value.PorcentajeIvaaplicado
    this.productService.UpdateProduct(this.product, this.IdProductoToUpdate).subscribe(re => console.log('***' + re));

    let productUpdated = this.products[0].find(item => item.id == this.IdProductoToUpdate);
    let index = this.products[0].indexOf(productUpdated);

    this.products[0][index].nombre = this.producto1Form.value.Nombre
    this.products[0][index].valorVentaConIva = this.producto1Form.value.ValorVentaConIva
    this.products[0][index].cantidadUnidadesInventario = this.producto1Form.value.CantidadUnidadesInventario
    this.products[0][index].porcentajeIvaaplicado = this.producto1Form.value.PorcentajeIvaaplicado

    this.clear();
  }

}
