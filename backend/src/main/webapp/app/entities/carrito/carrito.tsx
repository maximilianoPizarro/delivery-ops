import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ICarrito } from 'app/shared/model/carrito.model';
import { getEntities } from './carrito.reducer';

export const Carrito = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const carritoList = useAppSelector(state => state.carrito.entities);
  const loading = useAppSelector(state => state.carrito.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="carrito-heading" data-cy="CarritoHeading">
        <Translate contentKey="deliveryopsApp.carrito.home.title">Carritos</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="deliveryopsApp.carrito.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/carrito/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="deliveryopsApp.carrito.home.createLabel">Create new Carrito</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {carritoList && carritoList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="deliveryopsApp.carrito.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="deliveryopsApp.carrito.fecha">Fecha</Translate>
                </th>
                <th>
                  <Translate contentKey="deliveryopsApp.carrito.status">Status</Translate>
                </th>
                <th>
                  <Translate contentKey="deliveryopsApp.carrito.precioTotal">Precio Total</Translate>
                </th>
                <th>
                  <Translate contentKey="deliveryopsApp.carrito.metodoDePago">Metodo De Pago</Translate>
                </th>
                <th>
                  <Translate contentKey="deliveryopsApp.carrito.referencia">Referencia</Translate>
                </th>
                <th>
                  <Translate contentKey="deliveryopsApp.carrito.cliente">Cliente</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {carritoList.map((carrito, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/carrito/${carrito.id}`} color="link" size="sm">
                      {carrito.id}
                    </Button>
                  </td>
                  <td>{carrito.fecha ? <TextFormat type="date" value={carrito.fecha} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>
                    <Translate contentKey={`deliveryopsApp.OrdenStatus.${carrito.status}`} />
                  </td>
                  <td>{carrito.precioTotal}</td>
                  <td>
                    <Translate contentKey={`deliveryopsApp.MetodoDePago.${carrito.metodoDePago}`} />
                  </td>
                  <td>{carrito.referencia}</td>
                  <td>{carrito.cliente ? <Link to={`/cliente/${carrito.cliente.id}`}>{carrito.cliente.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/carrito/${carrito.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/carrito/${carrito.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/carrito/${carrito.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="deliveryopsApp.carrito.home.notFound">No Carritos found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Carrito;
