import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultComponent } from './default/default.component';
import { ProductComponent } from './../pages/product/product.component';
import { ShoppingCartComponent } from './../pages/shopping-cart/shopping-cart.component';
import { BillingComponent } from './../pages/billing/billing.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DefaultComponent,
    children: [
      {
        path: 'product',
        component: ProductComponent
      },
      {
        path: 'shop',
        component: ShoppingCartComponent
      },
      {
        path: 'billing',
        component: BillingComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefaultRoutingModule { }
