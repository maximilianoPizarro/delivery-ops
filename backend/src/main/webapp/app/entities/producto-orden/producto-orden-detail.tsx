import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './producto-orden.reducer';

export const ProductoOrdenDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const productoOrdenEntity = useAppSelector(state => state.productoOrden.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="productoOrdenDetailsHeading">
          <Translate contentKey="deliveryopsApp.productoOrden.detail.title">ProductoOrden</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{productoOrdenEntity.id}</dd>
          <dt>
            <span id="cantidad">
              <Translate contentKey="deliveryopsApp.productoOrden.cantidad">Cantidad</Translate>
            </span>
          </dt>
          <dd>{productoOrdenEntity.cantidad}</dd>
          <dt>
            <span id="precioTotal">
              <Translate contentKey="deliveryopsApp.productoOrden.precioTotal">Precio Total</Translate>
            </span>
          </dt>
          <dd>{productoOrdenEntity.precioTotal}</dd>
          <dt>
            <Translate contentKey="deliveryopsApp.productoOrden.producto">Producto</Translate>
          </dt>
          <dd>{productoOrdenEntity.producto ? productoOrdenEntity.producto.nombre : ''}</dd>
          <dt>
            <Translate contentKey="deliveryopsApp.productoOrden.cart">Cart</Translate>
          </dt>
          <dd>{productoOrdenEntity.cart ? productoOrdenEntity.cart.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/producto-orden" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/producto-orden/${productoOrdenEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ProductoOrdenDetail;
