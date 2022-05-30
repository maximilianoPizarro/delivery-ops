import producto from 'app/entities/producto/producto.reducer';
import productoCategoria from 'app/entities/producto-categoria/producto-categoria.reducer';
import cliente from 'app/entities/cliente/cliente.reducer';
import carrito from 'app/entities/carrito/carrito.reducer';
import productoOrden from 'app/entities/producto-orden/producto-orden.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  producto,
  productoCategoria,
  cliente,
  carrito,
  productoOrden,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
