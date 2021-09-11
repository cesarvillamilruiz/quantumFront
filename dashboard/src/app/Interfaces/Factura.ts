import { DetalleFactura } from './DetalleFactura';

export interface Factura{
  id: number;
  nombre: string;
  apellido: string;
  identificacion: number;
  fechaVenta: Date;
  totalVenta: number;
  subtotal: number;
  direccion: string;
  telefono: number;
  fechaEntrega: Date;
  detalleFactura: DetalleFactura[];
}
