import {DetalleFacturaDTO} from './DetalleFacturaDTO';

export interface FacturaDTO{
  Nombre: string;
  Apellido: string;
  Identificacion: number;
  TotalVenta: number;
  Subtotal: number;
  Direccion: string;
  Telefono: number;
  FechaEntrega: Date;
  DetalleFacturaDTO: DetalleFacturaDTO [];
}
