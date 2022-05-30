import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import ProductoActions from './producto.reducer';
import ProductoCategoriaActions from '../producto-categoria/producto-categoria.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './producto-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  nombre: Yup.string().required(),
  precio: Yup.number().required().min(0),
  medida: Yup.string().required(),
  productoCategoria: Yup.mixed().required(),
});

const Medida = [
  {
    label: 'S',
    value: 'S',
  },
  {
    label: 'M',
    value: 'M',
  },
  {
    label: 'L',
    value: 'L',
  },
  {
    label: 'XL',
    value: 'XL',
  },
  {
    label: 'XXL',
    value: 'XXL',
  },
];

function ProductoEditScreen(props) {
  const {
    getProducto,
    updateProducto,
    route,
    producto,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
    getAllProductoCategorias,
    productoCategoriaList,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getProducto(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getProducto, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(producto));
    }
  }, [producto, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {
    getAllProductoCategorias();
  }, [getAllProductoCategorias]);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity || !navigation.canGoBack() ? navigation.replace('ProductoDetail', { entityId: producto?.id }) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateProducto(formValueToEntity(data));

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const nombreRef = createRef();
  const descriptionRef = createRef();
  const precioRef = createRef();
  const medidaRef = createRef();
  const imageRef = createRef();
  const imageContentTypeRef = createRef();
  const productoCategoriaRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="productoEditScrollView"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.paddedScrollView}>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {formValue && (
          <Form initialValues={formValue} validationSchema={validationSchema} onSubmit={onSubmit} ref={formRef}>
            <FormField
              name="nombre"
              ref={nombreRef}
              label="Nombre"
              placeholder="Enter Nombre"
              testID="nombreInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => descriptionRef.current?.focus()}
            />
            <FormField
              name="description"
              ref={descriptionRef}
              label="Description"
              placeholder="Enter Description"
              testID="descriptionInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => precioRef.current?.focus()}
            />
            <FormField name="precio" ref={precioRef} label="Precio" placeholder="Enter Precio" testID="precioInput" inputType="number" />
            <FormField
              name="medida"
              ref={medidaRef}
              label="Medida"
              placeholder="Enter Medida"
              testID="medidaInput"
              inputType="select-one"
              listItems={Medida}
              onSubmitEditing={() => imageRef.current?.focus()}
            />
            <FormField
              name="image"
              ref={imageRef}
              label="Image"
              placeholder="Enter Image"
              testID="imageInput"
              onSubmitEditing={() => imageContentTypeRef.current?.focus()}
            />
            <FormField
              name="imageContentType"
              ref={imageContentTypeRef}
              label="Image Content Type"
              placeholder="Enter Image Content Type"
              testID="imageContentTypeInput"
              inputType="text"
              autoCapitalize="none"
            />
            <FormField
              name="productoCategoria"
              inputType="select-one"
              ref={productoCategoriaRef}
              listItems={productoCategoriaList}
              listItemLabelField="nombre"
              label="Producto Categoria"
              placeholder="Select Producto Categoria"
              testID="productoCategoriaSelectInput"
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
    nombre: value.nombre ?? null,
    description: value.description ?? null,
    precio: value.precio ?? null,
    medida: value.medida ?? null,
    image: value.image ?? null,
    imageContentType: value.imageContentType ?? null,
    productoCategoria: value.productoCategoria && value.productoCategoria.id ? value.productoCategoria.id : null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    nombre: value.nombre ?? null,
    description: value.description ?? null,
    precio: value.precio ?? null,
    medida: value.medida ?? null,
    image: value.image ?? null,
    imageContentType: value.imageContentType ?? null,
  };
  entity.productoCategoria = value.productoCategoria ? { id: value.productoCategoria } : null;
  return entity;
};

const mapStateToProps = (state) => {
  return {
    productoCategoriaList: state.productoCategorias.productoCategoriaList ?? [],
    producto: state.productos.producto,
    fetching: state.productos.fetchingOne,
    updating: state.productos.updating,
    updateSuccess: state.productos.updateSuccess,
    errorUpdating: state.productos.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllProductoCategorias: (options) => dispatch(ProductoCategoriaActions.productoCategoriaAllRequest(options)),
    getProducto: (id) => dispatch(ProductoActions.productoRequest(id)),
    getAllProductos: (options) => dispatch(ProductoActions.productoAllRequest(options)),
    updateProducto: (producto) => dispatch(ProductoActions.productoUpdateRequest(producto)),
    reset: () => dispatch(ProductoActions.productoReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductoEditScreen);
