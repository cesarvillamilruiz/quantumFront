import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { faInfo } from '@fortawesome/free-solid-svg-icons';

import { Factura } from './../../Interfaces/Factura';
import { BillService } from './../../services/bill.service';
import { ListToShow } from './../../Interfaces/ListToShow';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  bills: Factura[] = [];
  listToShow: ListToShow[] = [];
  billDetail: Factura;
  index: number = 0;
  faInfo = faInfo;
  closeResult = '';

  public page = 1;
  public pageSize = 10;

  constructor(private billService: BillService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.GetProductToList();
  }

  GetProductToList(){
    this.billService.GetAllBills().subscribe(ed => {
      this.bills = ed;
    });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  test(){
    if(this.listToShow.length){
      return;
    }
    for(let i = 0; i < this.bills.length; i++){
      let billElement = {} as ListToShow;
      billElement.id = this.bills[i].id;
      billElement.nombre = this.bills[i].nombre;
      billElement.apellido = this.bills[i].apellido;
      billElement.identificacion = this.bills[i].identificacion;
      billElement.fechaVenta = this.bills[i].fechaVenta;
      billElement.totalVenta = this.bills[i].totalVenta;
      billElement.fechaEntrega = this.bills[i].fechaEntrega;
      this.listToShow.push(billElement);

    }
  }

  showbillDetail(i){
    this.index = i;
  }

}
