import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import ProductoCategoriaActions from './producto-categoria.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './producto-categoria-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  nombre: Yup.string().required(),
});

function ProductoCategoriaEditScreen(props) {
  const {
    getProductoCategoria,
    updateProductoCategoria,
    route,
    productoCategoria,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getProductoCategoria(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getProductoCategoria, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(productoCategoria));
    }
  }, [productoCategoria, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {}, []);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity || !navigation.canGoBack()
          ? navigation.replace('ProductoCategoriaDetail', { entityId: productoCategoria?.id })
          : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateProductoCategoria(formValueToEntity(data));

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

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="productoCategoriaEditScrollView"
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
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    nombre: value.nombre ?? null,
    description: value.description ?? null,
  };
  return entity;
};

const mapStateToProps = (state) => {
  return {
    productoCategoria: state.productoCategorias.productoCategoria,
    fetching: state.productoCategorias.fetchingOne,
    updating: state.productoCategorias.updating,
    updateSuccess: state.productoCategorias.updateSuccess,
    errorUpdating: state.productoCategorias.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductoCategoria: (id) => dispatch(ProductoCategoriaActions.productoCategoriaRequest(id)),
    getAllProductoCategorias: (options) => dispatch(ProductoCategoriaActions.productoCategoriaAllRequest(options)),
    updateProductoCategoria: (productoCategoria) => dispatch(ProductoCategoriaActions.productoCategoriaUpdateRequest(productoCategoria)),
    reset: () => dispatch(ProductoCategoriaActions.productoCategoriaReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductoCategoriaEditScreen);
