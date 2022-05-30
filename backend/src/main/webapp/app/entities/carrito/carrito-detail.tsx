import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './carrito.reducer';

export const CarritoDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const carritoEntity = useAppSelector(state => state.carrito.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="carritoDetailsHeading">
          <Translate contentKey="deliveryopsApp.carrito.detail.title">Carrito</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{carritoEntity.id}</dd>
          <dt>
            <span id="fecha">
              <Translate contentKey="deliveryopsApp.carrito.fecha">Fecha</Translate>
            </span>
          </dt>
          <dd>{carritoEntity.fecha ? <TextFormat value={carritoEntity.fecha} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="deliveryopsApp.carrito.status">Status</Translate>
            </span>
          </dt>
          <dd>{carritoEntity.status}</dd>
          <dt>
            <span id="precioTotal">
              <Translate contentKey="deliveryopsApp.carrito.precioTotal">Precio Total</Translate>
            </span>
          </dt>
          <dd>{carritoEntity.precioTotal}</dd>
          <dt>
            <span id="metodoDePago">
              <Translate contentKey="deliveryopsApp.carrito.metodoDePago">Metodo De Pago</Translate>
            </span>
          </dt>
          <dd>{carritoEntity.metodoDePago}</dd>
          <dt>
            <span id="referencia">
              <Translate contentKey="deliveryopsApp.carrito.referencia">Referencia</Translate>
            </span>
          </dt>
          <dd>{carritoEntity.referencia}</dd>
          <dt>
            <Translate contentKey="deliveryopsApp.carrito.cliente">Cliente</Translate>
          </dt>
          <dd>{carritoEntity.cliente ? carritoEntity.cliente.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/carrito" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/carrito/${carritoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default CarritoDetail;
