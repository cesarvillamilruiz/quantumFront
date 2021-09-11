import { Component, OnInit } from '@angular/core';

import { faShoppingCart, faAd, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';

declare interface RouteInfo{
  path:string;
  title:string;
}

export const ROUTES : RouteInfo[] = [
  {path:'product',title:'Productos'},
  {path:'shop',title:'Comprar'},
  {path:'billing',title:'Facturacion'}
];


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menuItems : any[];
  faShoppingCart = faShoppingCart;
  faAd = faAd;
  faMoneyBillWave = faMoneyBillWave;

  constructor() { }

  ngOnInit(): void {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

}
