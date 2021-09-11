import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdSortableHeader } from './../Directives/sortable.directive';
import { ProductComponent } from './product/product.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { BillingComponent } from './billing/billing.component';



@NgModule({
  declarations: [ NgbdSortableHeader, ProductComponent, ShoppingCartComponent, BillingComponent],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  exports: [
    ShoppingCartComponent,
    ProductComponent,
    BillingComponent
  ],
  bootstrap: [ShoppingCartComponent]
})
export class PagesModule { }
