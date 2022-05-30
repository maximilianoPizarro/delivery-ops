import { IUser } from 'app/shared/model/user.model';
import { ICarrito } from 'app/shared/model/carrito.model';
import { Genero } from 'app/shared/model/enumerations/genero.model';

export interface ICliente {
  id?: number;
  genero?: Genero;
  telefono?: string;
  direccion1?: string;
  direccion2?: string | null;
  ciudad?: string;
  pais?: string;
  user?: IUser;
  carts?: ICarrito[] | null;
}

export const defaultValue: Readonly<ICliente> = {};
