import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IProductoCategoria } from 'app/shared/model/producto-categoria.model';
import { getEntities as getProductoCategorias } from 'app/entities/producto-categoria/producto-categoria.reducer';
import { IProducto } from 'app/shared/model/producto.model';
import { Medida } from 'app/shared/model/enumerations/medida.model';
import { getEntity, updateEntity, createEntity, reset } from './producto.reducer';

export const ProductoUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const productoCategorias = useAppSelector(state => state.productoCategoria.entities);
  const productoEntity = useAppSelector(state => state.producto.entity);
  const loading = useAppSelector(state => state.producto.loading);
  const updating = useAppSelector(state => state.producto.updating);
  const updateSuccess = useAppSelector(state => state.producto.updateSuccess);
  const medidaValues = Object.keys(Medida);
  const handleClose = () => {
    props.history.push('/producto' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getProductoCategorias({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...productoEntity,
      ...values,
      productoCategoria: productoCategorias.find(it => it.id.toString() === values.productoCategoria.toString()),
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
          medida: 'S',
          ...productoEntity,
          productoCategoria: productoEntity?.productoCategoria?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="deliveryopsApp.producto.home.createOrEditLabel" data-cy="ProductoCreateUpdateHeading">
            <Translate contentKey="deliveryopsApp.producto.home.createOrEditLabel">Create or edit a Producto</Translate>
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
                  id="producto-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('deliveryopsApp.producto.nombre')}
                id="producto-nombre"
                name="nombre"
                data-cy="nombre"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('deliveryopsApp.producto.description')}
                id="producto-description"
                name="description"
                data-cy="description"
                type="text"
              />
              <ValidatedField
                label={translate('deliveryopsApp.producto.precio')}
                id="producto-precio"
                name="precio"
                data-cy="precio"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  min: { value: 0, message: translate('entity.validation.min', { min: 0 }) },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('deliveryopsApp.producto.medida')}
                id="producto-medida"
                name="medida"
                data-cy="medida"
                type="select"
              >
                {medidaValues.map(medida => (
                  <option value={medida} key={medida}>
                    {translate('deliveryopsApp.Medida.' + medida)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedBlobField
                label={translate('deliveryopsApp.producto.image')}
                id="producto-image"
                name="image"
                data-cy="image"
                isImage
                accept="image/*"
              />
              <ValidatedField
                id="producto-productoCategoria"
                name="productoCategoria"
                data-cy="productoCategoria"
                label={translate('deliveryopsApp.producto.productoCategoria')}
                type="select"
                required
              >
                <option value="" key="0" />
                {productoCategorias
                  ? productoCategorias.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.nombre}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/producto" replace color="info">
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

export default ProductoUpdate;
