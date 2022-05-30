import { IProducto } from 'app/shared/model/producto.model';
import { ICarrito } from 'app/shared/model/carrito.model';

export interface IProductoOrden {
  id?: number;
  cantidad?: number;
  precioTotal?: number;
  producto?: IProducto;
  cart?: ICarrito;
}

export const defaultValue: Readonly<IProductoOrden> = {};
