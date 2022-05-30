import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import CarritoActions from './carrito.reducer';
import ClienteActions from '../cliente/cliente.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './carrito-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  fecha: Yup.date().required(),
  status: Yup.string().required(),
  precioTotal: Yup.number().required().min(0),
  metodoDePago: Yup.string().required(),
  cliente: Yup.mixed().required(),
});

const OrdenStatus = [
  {
    label: 'COMPLETO',
    value: 'COMPLETO',
  },
  {
    label: 'PAGADO',
    value: 'PAGADO',
  },
  {
    label: 'PENDIENTE',
    value: 'PENDIENTE',
  },
  {
    label: 'CANCELADO',
    value: 'CANCELADO',
  },
  {
    label: 'RECHAZADO',
    value: 'RECHAZADO',
  },
];
const MetodoDePago = [
  {
    label: 'EFECTIVO (efectivo)',
    value: 'EFECTIVO (efectivo)',
  },
  {
    label: 'CUPON (cupon)',
    value: 'CUPON (cupon)',
  },
];

function CarritoEditScreen(props) {
  const {
    getCarrito,
    updateCarrito,
    route,
    carrito,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
    getAllClientes,
    clienteList,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getCarrito(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getCarrito, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(carrito));
    }
  }, [carrito, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {
    getAllClientes();
  }, [getAllClientes]);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity || !navigation.canGoBack() ? navigation.replace('CarritoDetail', { entityId: carrito?.id }) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateCarrito(formValueToEntity(data));

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const fechaRef = createRef();
  const statusRef = createRef();
  const precioTotalRef = createRef();
  const metodoDePagoRef = createRef();
  const referenciaRef = createRef();
  const clienteRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="carritoEditScrollView"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.paddedScrollView}>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {formValue && (
          <Form initialValues={formValue} validationSchema={validationSchema} onSubmit={onSubmit} ref={formRef}>
            <FormField name="fecha" ref={fechaRef} label="Fecha" placeholder="Enter Fecha" testID="fechaInput" inputType="datetime" />
            <FormField
              name="status"
              ref={statusRef}
              label="Status"
              placeholder="Enter Status"
              testID="statusInput"
              inputType="select-one"
              listItems={OrdenStatus}
              onSubmitEditing={() => precioTotalRef.current?.focus()}
            />
            <FormField
              name="precioTotal"
              ref={precioTotalRef}
              label="Precio Total"
              placeholder="Enter Precio Total"
              testID="precioTotalInput"
              inputType="number"
            />
            <FormField
              name="metodoDePago"
              ref={metodoDePagoRef}
              label="Metodo De Pago"
              placeholder="Enter Metodo De Pago"
              testID="metodoDePagoInput"
              inputType="select-one"
              listItems={MetodoDePago}
              onSubmitEditing={() => referenciaRef.current?.focus()}
            />
            <FormField
              name="referencia"
              ref={referenciaRef}
              label="Referencia"
              placeholder="Enter Referencia"
              testID="referenciaInput"
              inputType="text"
              autoCapitalize="none"
            />
            <FormField
              name="cliente"
              inputType="select-one"
              ref={clienteRef}
              listItems={clienteList}
              listItemLabelField="id"
              label="Cliente"
              placeholder="Select Cliente"
              testID="clienteSelectInput"
            />

            <FormButton title={'Save'} testID={'submitButton'} />
          </Form>
        )}
      </KeyboardAwareScrollView>
    </View>
  );
}

// convenience methods for customizing the mapping of the entity to/from the form value
const entityToFormValue = (value) => {
  if (!value) {
    return {};
  }
  return {
    id: value.id ?? null,
    fecha: value.fecha ?? null,
    status: value.status ?? null,
    precioTotal: value.precioTotal ?? null,
    metodoDePago: value.metodoDePago ?? null,
    referencia: value.referencia ?? null,
    cliente: value.cliente && value.cliente.id ? value.cliente.id : null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    fecha: value.fecha ?? null,
    status: value.status ?? null,
    precioTotal: value.precioTotal ?? null,
    metodoDePago: value.metodoDePago ?? null,
    referencia: value.referencia ?? null,
  };
  entity.cliente = value.cliente ? { id: value.cliente } : null;
  return entity;
};

const mapStateToProps = (state) => {
  return {
    clienteList: state.clientes.clienteList ?? [],
    carrito: state.carritos.carrito,
    fetching: state.carritos.fetchingOne,
    updating: state.carritos.updating,
    updateSuccess: state.carritos.updateSuccess,
    errorUpdating: state.carritos.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllClientes: (options) => dispatch(ClienteActions.clienteAllRequest(options)),
    getCarrito: (id) => dispatch(CarritoActions.carritoRequest(id)),
    getAllCarritos: (options) => dispatch(CarritoActions.carritoAllRequest(options)),
    updateCarrito: (carrito) => dispatch(CarritoActions.carritoUpdateRequest(carrito)),
    reset: () => dispatch(CarritoActions.carritoReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CarritoEditScreen);
