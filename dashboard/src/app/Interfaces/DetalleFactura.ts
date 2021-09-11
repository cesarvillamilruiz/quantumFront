import { ProductoDTO } from './ProductoDTO';
export interface DetalleFactura{
  id: number;
  producto: ProductoDTO;
  productoId: number;
  cantidad: number;
  valorUnitarioSinIva: number;
  valorUnitarioConIva: number;
  valorTotalProducto: number;
  facturaId: number;
}
