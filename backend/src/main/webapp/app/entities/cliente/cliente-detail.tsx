import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './cliente.reducer';

export const ClienteDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const clienteEntity = useAppSelector(state => state.cliente.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="clienteDetailsHeading">
          <Translate contentKey="deliveryopsApp.cliente.detail.title">Cliente</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{clienteEntity.id}</dd>
          <dt>
            <span id="genero">
              <Translate contentKey="deliveryopsApp.cliente.genero">Genero</Translate>
            </span>
          </dt>
          <dd>{clienteEntity.genero}</dd>
          <dt>
            <span id="telefono">
              <Translate contentKey="deliveryopsApp.cliente.telefono">Telefono</Translate>
            </span>
          </dt>
          <dd>{clienteEntity.telefono}</dd>
          <dt>
            <span id="direccion1">
              <Translate contentKey="deliveryopsApp.cliente.direccion1">Direccion 1</Translate>
            </span>
          </dt>
          <dd>{clienteEntity.direccion1}</dd>
          <dt>
            <span id="direccion2">
              <Translate contentKey="deliveryopsApp.cliente.direccion2">Direccion 2</Translate>
            </span>
          </dt>
          <dd>{clienteEntity.direccion2}</dd>
          <dt>
            <span id="ciudad">
              <Translate contentKey="deliveryopsApp.cliente.ciudad">Ciudad</Translate>
            </span>
          </dt>
          <dd>{clienteEntity.ciudad}</dd>
          <dt>
            <span id="pais">
              <Translate contentKey="deliveryopsApp.cliente.pais">Pais</Translate>
            </span>
          </dt>
          <dd>{clienteEntity.pais}</dd>
          <dt>
            <Translate contentKey="deliveryopsApp.cliente.user">User</Translate>
          </dt>
          <dd>{clienteEntity.user ? clienteEntity.user.login : ''}</dd>
        </dl>
        <Button tag={Link} to="/cliente" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/cliente/${clienteEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ClienteDetail;
