import dayjs from 'dayjs';
import { IProductoOrden } from 'app/shared/model/producto-orden.model';
import { ICliente } from 'app/shared/model/cliente.model';
import { OrdenStatus } from 'app/shared/model/enumerations/orden-status.model';
import { MetodoDePago } from 'app/shared/model/enumerations/metodo-de-pago.model';

export interface ICarrito {
  id?: number;
  fecha?: string;
  status?: OrdenStatus;
  precioTotal?: number;
  metodoDePago?: MetodoDePago;
  referencia?: string | null;
  ordens?: IProductoOrden[] | null;
  cliente?: ICliente;
}

export const defaultValue: Readonly<ICarrito> = {};
