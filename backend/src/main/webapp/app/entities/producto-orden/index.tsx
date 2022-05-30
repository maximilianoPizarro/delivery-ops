import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ProductoOrden from './producto-orden';
import ProductoOrdenDetail from './producto-orden-detail';
import ProductoOrdenUpdate from './producto-orden-update';
import ProductoOrdenDeleteDialog from './producto-orden-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProductoOrdenUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProductoOrdenUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProductoOrdenDetail} />
      <ErrorBoundaryRoute path={match.url} component={ProductoOrden} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ProductoOrdenDeleteDialog} />
  </>
);

export default Routes;
