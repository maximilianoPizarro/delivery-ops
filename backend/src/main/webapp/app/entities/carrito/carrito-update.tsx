import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ICliente } from 'app/shared/model/cliente.model';
import { getEntities as getClientes } from 'app/entities/cliente/cliente.reducer';
import { ICarrito } from 'app/shared/model/carrito.model';
import { OrdenStatus } from 'app/shared/model/enumerations/orden-status.model';
import { MetodoDePago } from 'app/shared/model/enumerations/metodo-de-pago.model';
import { getEntity, updateEntity, createEntity, reset } from './carrito.reducer';

export const CarritoUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const clientes = useAppSelector(state => state.cliente.entities);
  const carritoEntity = useAppSelector(state => state.carrito.entity);
  const loading = useAppSelector(state => state.carrito.loading);
  const updating = useAppSelector(state => state.carrito.updating);
  const updateSuccess = useAppSelector(state => state.carrito.updateSuccess);
  const ordenStatusValues = Object.keys(OrdenStatus);
  const metodoDePagoValues = Object.keys(MetodoDePago);
  const handleClose = () => {
    props.history.push('/carrito');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getClientes({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.fecha = convertDateTimeToServer(values.fecha);

    const entity = {
      ...carritoEntity,
      ...values,
      cliente: clientes.find(it => it.id.toString() === values.cliente.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          fecha: displayDefaultDateTime(),
        }
      : {
          status: 'COMPLETO',
          metodoDePago: 'EFECTIVO',
          ...carritoEntity,
          fecha: convertDateTimeFromServer(carritoEntity.fecha),
          cliente: carritoEntity?.cliente?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="deliveryopsApp.carrito.home.createOrEditLabel" data-cy="CarritoCreateUpdateHeading">
            <Translate contentKey="deliveryopsApp.carrito.home.createOrEditLabel">Create or edit a Carrito</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="carrito-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('deliveryopsApp.carrito.fecha')}
                id="carrito-fecha"
                name="fecha"
                data-cy="fecha"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('deliveryopsApp.carrito.status')}
                id="carrito-status"
                name="status"
                data-cy="status"
                type="select"
              >
                {ordenStatusValues.map(ordenStatus => (
                  <option value={ordenStatus} key={ordenStatus}>
                    {translate('deliveryopsApp.OrdenStatus.' + ordenStatus)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('deliveryopsApp.carrito.precioTotal')}
                id="carrito-precioTotal"
                name="precioTotal"
                data-cy="precioTotal"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  min: { value: 0, message: translate('entity.validation.min', { min: 0 }) },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('deliveryopsApp.carrito.metodoDePago')}
                id="carrito-metodoDePago"
                name="metodoDePago"
                data-cy="metodoDePago"
                type="select"
              >
                {metodoDePagoValues.map(metodoDePago => (
                  <option value={metodoDePago} key={metodoDePago}>
                    {translate('deliveryopsApp.MetodoDePago.' + metodoDePago)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('deliveryopsApp.carrito.referencia')}
                id="carrito-referencia"
                name="referencia"
                data-cy="referencia"
                type="text"
              />
              <ValidatedField
                id="carrito-cliente"
                name="cliente"
                data-cy="cliente"
                label={translate('deliveryopsApp.carrito.cliente')}
                type="select"
                required
              >
                <option value="" key="0" />
                {clientes
                  ? clientes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/carrito" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default CarritoUpdate;
