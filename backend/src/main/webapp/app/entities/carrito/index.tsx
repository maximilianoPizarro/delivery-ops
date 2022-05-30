import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Carrito from './carrito';
import CarritoDetail from './carrito-detail';
import CarritoUpdate from './carrito-update';
import CarritoDeleteDialog from './carrito-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CarritoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CarritoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CarritoDetail} />
      <ErrorBoundaryRoute path={match.url} component={Carrito} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CarritoDeleteDialog} />
  </>
);

export default Routes;
