import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IProductoOrden } from 'app/shared/model/producto-orden.model';
import { getEntities } from './producto-orden.reducer';

export const ProductoOrden = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const productoOrdenList = useAppSelector(state => state.productoOrden.entities);
  const loading = useAppSelector(state => state.productoOrden.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="producto-orden-heading" data-cy="ProductoOrdenHeading">
        <Translate contentKey="deliveryopsApp.productoOrden.home.title">Producto Ordens</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="deliveryopsApp.productoOrden.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/producto-orden/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="deliveryopsApp.productoOrden.home.createLabel">Create new Producto Orden</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {productoOrdenList && productoOrdenList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="deliveryopsApp.productoOrden.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="deliveryopsApp.productoOrden.cantidad">Cantidad</Translate>
                </th>
                <th>
                  <Translate contentKey="deliveryopsApp.productoOrden.precioTotal">Precio Total</Translate>
                </th>
                <th>
                  <Translate contentKey="deliveryopsApp.productoOrden.producto">Producto</Translate>
                </th>
                <th>
                  <Translate contentKey="deliveryopsApp.productoOrden.cart">Cart</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {productoOrdenList.map((productoOrden, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/producto-orden/${productoOrden.id}`} color="link" size="sm">
                      {productoOrden.id}
                    </Button>
                  </td>
                  <td>{productoOrden.cantidad}</td>
                  <td>{productoOrden.precioTotal}</td>
                  <td>
                    {productoOrden.producto ? (
                      <Link to={`/producto/${productoOrden.producto.id}`}>{productoOrden.producto.nombre}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{productoOrden.cart ? <Link to={`/carrito/${productoOrden.cart.id}`}>{productoOrden.cart.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/producto-orden/${productoOrden.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/producto-orden/${productoOrden.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/producto-orden/${productoOrden.id}/delete`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="deliveryopsApp.productoOrden.home.notFound">No Producto Ordens found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ProductoOrden;
