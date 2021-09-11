import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { faTrash} from '@fortawesome/free-solid-svg-icons';

import { DetalleFacturaDTO } from './../../Interfaces/DetalleFacturaDTO';
import { FacturaDTO } from './../../Interfaces/FacturaDTO';
import { ProductService } from './../../services/product.service';
import { BillService } from './../../services/bill.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ConstantPool } from '@angular/compiler';
import { ShowProduct } from './../../Interfaces/ShowProduct';



@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {


  isAddProduct = false;
  isContinueAddingProduct = false;
  products : any [] = [];
  productDetailList : DetalleFacturaDTO [] = [];
  IdProductoToAdd: number;
  closeResult = '';
  TotalVenta: number = 0;
  Subtotal: number = 0;
  totalBill: number;
  isPresent = false;

  currentProductToPrice = 0;

  productListToShow: any[] = [];
  public page = 1;
  public pageSize = 10;

  faTrash = faTrash;


  producto1Form = new FormGroup({
    ProductoId: new FormControl('', Validators.required),
    Cantidad: new FormControl('',Validators.required)
  });

  personalDataForm = new FormGroup({
    Nombre: new FormControl('', Validators.required),
    Apellido: new FormControl('',Validators.required),
    Identificacion: new FormControl('',Validators.required),
    Direccion: new FormControl('',Validators.required),
    Telefono: new FormControl('',Validators.required),
    FechaEntrega: new FormControl('',Validators.required)
  });

  constructor(private productService: ProductService,
              private billService: BillService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.GetProductToList();
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if(result != "Add"){
        this.clear();
      }

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

  updateProductQuantity(value){
    if(!isNaN(value) && Number(value) > 0){
      this.producto1Form.controls['Cantidad'].setValue(value);

      this.currentProductToPrice = this.IdProductoToAdd ? this.getProductById(this.IdProductoToAdd).valorVentaConIva * Number(value) : 0;
    }
    else{
      this.producto1Form.get('Cantidad').reset();
      this.currentProductToPrice = 0;
    }
  }

  getProductById(id){
    return this.products[0].find(item => item.id == id);
  }

  updateProductId(value){
    if(!isNaN(value) && Number(value) > 0){
      this.producto1Form.controls['ProductoId'].setValue(value);
      this.IdProductoToAdd = Number(value);

      this.currentProductToPrice = this.products[0].find(item => item.id == this.IdProductoToAdd) ? (this.products[0].find(item => item.id == this.IdProductoToAdd)).valorVentaConIva : 0;
    }
  }

  AddProduct(){
    this.isAddProduct = !this.isAddProduct;

    this.clear();
  }

  Add(){
    this.isContinueAddingProduct = !this.isContinueAddingProduct;
    this.clear();
  }

  clear(){
     this.producto1Form.controls['ProductoId'].setValue('');
     this.producto1Form.controls['Cantidad'].setValue('');

     this.personalDataForm.controls['Nombre'].setValue('');
     this.personalDataForm.controls['Apellido'].setValue('');
     this.personalDataForm.controls['Identificacion'].setValue('');
     this.personalDataForm.controls['Direccion'].setValue('');
     this.personalDataForm.controls['Telefono'].setValue('');
     this.personalDataForm.controls['FechaEntrega'].setValue('');

     this.currentProductToPrice = 0;
  }

  GetProductToList(){
    this.productService.getAllProducts().subscribe(ed => this.products.push(ed));
  }

  onSubmitAddBill() {
    let bill = {} as FacturaDTO;

    bill.Nombre = this.personalDataForm.value.Nombre;
    bill.Apellido = this.personalDataForm.value.Apellido;
    bill.Identificacion = this.personalDataForm.value.Identificacion;
    bill.TotalVenta = this.TotalVenta;
    bill.Subtotal = this.Subtotal;
    bill.Direccion = this.personalDataForm.value.Direccion;
    bill.Telefono = this.personalDataForm.value.Telefono;
    bill.FechaEntrega = this.personalDataForm.value.FechaEntrega;
    bill.DetalleFacturaDTO = this.productDetailList;

    this.clearList();

    this.billService.AddBill(bill).subscribe(re => console.log('***' + re))
    this.clearList();
    this.Subtotal = 0;
    this.TotalVenta = 0;
    this.isContinueAddingProduct = false;

    this.clear();
  }

  clearList(){
    this.productDetailList = [] as DetalleFacturaDTO[];
    this.productListToShow = [] as ShowProduct[];
    this.isAddProduct = false;
  }

  deleteByProductId(i){
    this.productDetailList.splice(i, 1);
    this.productListToShow.splice(i, 1);
    this.CalculateTotal();
    if(!this.productDetailList.length){
      this.isAddProduct = false;
      this.isContinueAddingProduct = false;
    }
  }

  onSubmitAddProductDetail(){
    let currentproduct = this.products[0].find(item => item.id == this.IdProductoToAdd);
    let index = this.products[0].indexOf(currentproduct);
    let detalleFacturaDTO = {} as DetalleFacturaDTO;

    this.isPresent = this.productDetailList.some(x => x.ProductoId == this.producto1Form.value.ProductoId);

    if(!this.isPresent){
      detalleFacturaDTO.ProductoId = this.producto1Form.value.ProductoId;
      detalleFacturaDTO.Cantidad = this.producto1Form.value.Cantidad;
      detalleFacturaDTO.ValorUnitarioConIva = Number(this.products[0][index].valorVentaConIva);
      detalleFacturaDTO.PorcentajeIvaaplicado = Number(this.products[0][index].porcentajeIvaaplicado);
      detalleFacturaDTO.ValorTotalProducto = Number(this.producto1Form.value.Cantidad) * Number(this.products[0][index].valorVentaConIva);

      this.productDetailList.push(detalleFacturaDTO);
    }
    else{
      let repeatedProduct = this.productDetailList.find(item => item.ProductoId == this.IdProductoToAdd);
      let indexRepeatedProduct = this.productDetailList.indexOf(repeatedProduct);
      this.productDetailList[indexRepeatedProduct].Cantidad = Number(this.productDetailList[indexRepeatedProduct].Cantidad) + Number(this.producto1Form.value.Cantidad);
      this.productDetailList[indexRepeatedProduct].ValorTotalProducto = Number(this.productDetailList[indexRepeatedProduct].Cantidad) * Number(this.products[0][index].valorVentaConIva);

    }

    this.isAddProduct = true;

    this.CalculateTotal();

    if(!this.isPresent){
        let productItemoShow = {} as ShowProduct;
        productItemoShow.ProductoId = currentproduct.id;
        productItemoShow.Nombre = currentproduct.nombre;
        productItemoShow.Cantidad = Number(this.producto1Form.value.Cantidad);
        productItemoShow.ValorTotalProducto = Number(currentproduct.valorVentaConIva) * Number(productItemoShow.Cantidad);
        this.productListToShow.push(productItemoShow);
      }
      else{
        let repeatedProduct = this.productListToShow.find(item => item.ProductoId == this.IdProductoToAdd);
        let indexRepeatedProduct = this.productListToShow.indexOf(repeatedProduct);
        this.productListToShow[indexRepeatedProduct].Cantidad = Number(this.productListToShow[indexRepeatedProduct].Cantidad) + Number(this.producto1Form.value.Cantidad);
        this.productListToShow[indexRepeatedProduct].ValorTotalProducto = Number(this.productListToShow[indexRepeatedProduct].Cantidad) * Number(this.products[0][index].valorVentaConIva);

      }

    this.clear();
  }

  CalculateTotal(){
    this.TotalVenta = 0;
    this.Subtotal = 0;

    for (let i = 0; i < this.productDetailList.length; i++) {

      this.TotalVenta += Number(this.productDetailList[i].ValorTotalProducto);
      let currentproduct = this.products[0].find(item => item.id == this.productDetailList[i].ProductoId);
      let index = this.products[0].indexOf(currentproduct);
      this.Subtotal += Number(this.productDetailList[i].ValorTotalProducto) - (this.products[0][index].porcentajeIvaaplicado * this.productDetailList[i].ValorTotalProducto);

    }
  }

}
