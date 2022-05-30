import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IProducto } from 'app/shared/model/producto.model';
import { getEntities as getProductos } from 'app/entities/producto/producto.reducer';
import { ICarrito } from 'app/shared/model/carrito.model';
import { getEntities as getCarritos } from 'app/entities/carrito/carrito.reducer';
import { IProductoOrden } from 'app/shared/model/producto-orden.model';
import { getEntity, updateEntity, createEntity, reset } from './producto-orden.reducer';

export const ProductoOrdenUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const productos = useAppSelector(state => state.producto.entities);
  const carritos = useAppSelector(state => state.carrito.entities);
  const productoOrdenEntity = useAppSelector(state => state.productoOrden.entity);
  const loading = useAppSelector(state => state.productoOrden.loading);
  const updating = useAppSelector(state => state.productoOrden.updating);
  const updateSuccess = useAppSelector(state => state.productoOrden.updateSuccess);
  const handleClose = () => {
    props.history.push('/producto-orden');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getProductos({}));
    dispatch(getCarritos({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...productoOrdenEntity,
      ...values,
      producto: productos.find(it => it.id.toString() === values.producto.toString()),
      cart: carritos.find(it => it.id.toString() === values.cart.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...productoOrdenEntity,
          producto: productoOrdenEntity?.producto?.id,
          cart: productoOrdenEntity?.cart?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="deliveryopsApp.productoOrden.home.createOrEditLabel" data-cy="ProductoOrdenCreateUpdateHeading">
            <Translate contentKey="deliveryopsApp.productoOrden.home.createOrEditLabel">Create or edit a ProductoOrden</Translate>
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
                  id="producto-orden-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('deliveryopsApp.productoOrden.cantidad')}
                id="producto-orden-cantidad"
                name="cantidad"
                data-cy="cantidad"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  min: { value: 0, message: translate('entity.validation.min', { min: 0 }) },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('deliveryopsApp.productoOrden.precioTotal')}
                id="producto-orden-precioTotal"
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
                id="producto-orden-producto"
                name="producto"
                data-cy="producto"
                label={translate('deliveryopsApp.productoOrden.producto')}
                type="select"
                required
              >
                <option value="" key="0" />
                {productos
                  ? productos.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.nombre}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <ValidatedField
                id="producto-orden-cart"
                name="cart"
                data-cy="cart"
                label={translate('deliveryopsApp.productoOrden.cart')}
                type="select"
                required
              >
                <option value="" key="0" />
                {carritos
                  ? carritos.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/producto-orden" replace color="info">
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

export default ProductoOrdenUpdate;
