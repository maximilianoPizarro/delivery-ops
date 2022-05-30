import { IProductoCategoria } from 'app/shared/model/producto-categoria.model';
import { Medida } from 'app/shared/model/enumerations/medida.model';

export interface IProducto {
  id?: number;
  nombre?: string;
  description?: string | null;
  precio?: number;
  medida?: Medida;
  imageContentType?: string | null;
  image?: string | null;
  productoCategoria?: IProductoCategoria;
}

export const defaultValue: Readonly<IProducto> = {};
