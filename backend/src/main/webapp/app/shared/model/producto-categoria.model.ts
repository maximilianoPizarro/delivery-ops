import { IProducto } from 'app/shared/model/producto.model';

export interface IProductoCategoria {
  id?: number;
  nombre?: string;
  description?: string | null;
  productos?: IProducto[] | null;
}

export const defaultValue: Readonly<IProductoCategoria> = {};
