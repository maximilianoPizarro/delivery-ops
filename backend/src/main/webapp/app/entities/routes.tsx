import React from 'react';
import { Switch } from 'react-router-dom';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Producto from './producto';
import ProductoCategoria from './producto-categoria';
import Cliente from './cliente';
import Carrito from './carrito';
import ProductoOrden from './producto-orden';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default ({ match }) => {
  return (
    <div>
      <Switch>
        {/* prettier-ignore */}
        <ErrorBoundaryRoute path={`${match.url}producto`} component={Producto} />
        <ErrorBoundaryRoute path={`${match.url}producto-categoria`} component={ProductoCategoria} />
        <ErrorBoundaryRoute path={`${match.url}cliente`} component={Cliente} />
        <ErrorBoundaryRoute path={`${match.url}carrito`} component={Carrito} />
        <ErrorBoundaryRoute path={`${match.url}producto-orden`} component={ProductoOrden} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </Switch>
    </div>
  );
};
