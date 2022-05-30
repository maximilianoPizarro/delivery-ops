import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import ProductoOrdenActions from './producto-orden.reducer';
import ProductoActions from '../producto/producto.reducer';
import CarritoActions from '../carrito/carrito.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './producto-orden-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  cantidad: Yup.number().required().min(0),
  precioTotal: Yup.number().required().min(0),
  producto: Yup.mixed().required(),
  cart: Yup.mixed().required(),
});

function ProductoOrdenEditScreen(props) {
  const {
    getProductoOrden,
    updateProductoOrden,
    route,
    productoOrden,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
    getAllProductos,
    productoList,
    getAllCarritos,
    carritoList,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getProductoOrden(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getProductoOrden, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(productoOrden));
    }
  }, [productoOrden, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {
    getAllProductos();
    getAllCarritos();
  }, [getAllProductos, getAllCarritos]);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity || !navigation.canGoBack()
          ? navigation.replace('ProductoOrdenDetail', { entityId: productoOrden?.id })
          : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateProductoOrden(formValueToEntity(data));

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const cantidadRef = createRef();
  const precioTotalRef = createRef();
  const productoRef = createRef();
  const cartRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="productoOrdenEditScrollView"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.paddedScrollView}>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {formValue && (
          <Form initialValues={formValue} validationSchema={validationSchema} onSubmit={onSubmit} ref={formRef}>
            <FormField
              name="cantidad"
              ref={cantidadRef}
              label="Cantidad"
              placeholder="Enter Cantidad"
              testID="cantidadInput"
              inputType="number"
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
              name="producto"
              inputType="select-one"
              ref={productoRef}
              listItems={productoList}
              listItemLabelField="nombre"
              label="Producto"
              placeholder="Select Producto"
              testID="productoSelectInput"
            />
            <FormField
              name="cart"
              inputType="select-one"
              ref={cartRef}
              listItems={carritoList}
              listItemLabelField="id"
              label="Cart"
              placeholder="Select Cart"
              testID="carritoSelectInput"
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
    cantidad: value.cantidad ?? null,
    precioTotal: value.precioTotal ?? null,
    producto: value.producto && value.producto.id ? value.producto.id : null,
    cart: value.cart && value.cart.id ? value.cart.id : null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    cantidad: value.cantidad ?? null,
    precioTotal: value.precioTotal ?? null,
  };
  entity.producto = value.producto ? { id: value.producto } : null;
  entity.cart = value.cart ? { id: value.cart } : null;
  return entity;
};

const mapStateToProps = (state) => {
  return {
    productoList: state.productos.productoList ?? [],
    carritoList: state.carritos.carritoList ?? [],
    productoOrden: state.productoOrdens.productoOrden,
    fetching: state.productoOrdens.fetchingOne,
    updating: state.productoOrdens.updating,
    updateSuccess: state.productoOrdens.updateSuccess,
    errorUpdating: state.productoOrdens.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllProductos: (options) => dispatch(ProductoActions.productoAllRequest(options)),
    getAllCarritos: (options) => dispatch(CarritoActions.carritoAllRequest(options)),
    getProductoOrden: (id) => dispatch(ProductoOrdenActions.productoOrdenRequest(id)),
    getAllProductoOrdens: (options) => dispatch(ProductoOrdenActions.productoOrdenAllRequest(options)),
    updateProductoOrden: (productoOrden) => dispatch(ProductoOrdenActions.productoOrdenUpdateRequest(productoOrden)),
    reset: () => dispatch(ProductoOrdenActions.productoOrdenReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductoOrdenEditScreen);
