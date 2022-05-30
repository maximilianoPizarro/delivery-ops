import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ProductoCategoria from './producto-categoria';
import ProductoCategoriaDetail from './producto-categoria-detail';
import ProductoCategoriaUpdate from './producto-categoria-update';
import ProductoCategoriaDeleteDialog from './producto-categoria-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProductoCategoriaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProductoCategoriaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProductoCategoriaDetail} />
      <ErrorBoundaryRoute path={match.url} component={ProductoCategoria} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ProductoCategoriaDeleteDialog} />
  </>
);

export default Routes;
