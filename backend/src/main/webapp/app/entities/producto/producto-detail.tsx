import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './producto.reducer';

export const ProductoDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const productoEntity = useAppSelector(state => state.producto.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="productoDetailsHeading">
          <Translate contentKey="deliveryopsApp.producto.detail.title">Producto</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{productoEntity.id}</dd>
          <dt>
            <span id="nombre">
              <Translate contentKey="deliveryopsApp.producto.nombre">Nombre</Translate>
            </span>
          </dt>
          <dd>{productoEntity.nombre}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="deliveryopsApp.producto.description">Description</Translate>
            </span>
          </dt>
          <dd>{productoEntity.description}</dd>
          <dt>
            <span id="precio">
              <Translate contentKey="deliveryopsApp.producto.precio">Precio</Translate>
            </span>
          </dt>
          <dd>{productoEntity.precio}</dd>
          <dt>
            <span id="medida">
              <Translate contentKey="deliveryopsApp.producto.medida">Medida</Translate>
            </span>
          </dt>
          <dd>{productoEntity.medida}</dd>
          <dt>
            <span id="image">
              <Translate contentKey="deliveryopsApp.producto.image">Image</Translate>
            </span>
          </dt>
          <dd>
            {productoEntity.image ? (
              <div>
                {productoEntity.imageContentType ? (
                  <a onClick={openFile(productoEntity.imageContentType, productoEntity.image)}>
                    <img src={`data:${productoEntity.imageContentType};base64,${productoEntity.image}`} style={{ maxHeight: '30px' }} />
                  </a>
                ) : null}
                <span>
                  {productoEntity.imageContentType}, {byteSize(productoEntity.image)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="deliveryopsApp.producto.productoCategoria">Producto Categoria</Translate>
          </dt>
          <dd>{productoEntity.productoCategoria ? productoEntity.productoCategoria.nombre : ''}</dd>
        </dl>
        <Button tag={Link} to="/producto" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/producto/${productoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ProductoDetail;
