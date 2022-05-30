import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import ClienteActions from './cliente.reducer';
import UserActions from '../../../shared/reducers/user.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './cliente-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  genero: Yup.string().required(),
  telefono: Yup.string().required(),
  direccion1: Yup.string().required(),
  ciudad: Yup.string().required(),
  pais: Yup.string().required(),
  user: Yup.mixed().required(),
});

const Genero = [
  {
    label: 'MASCULINO',
    value: 'MASCULINO',
  },
  {
    label: 'FEMENINO',
    value: 'FEMENINO',
  },
  {
    label: 'OTRO',
    value: 'OTRO',
  },
];

function ClienteEditScreen(props) {
  const {
    getCliente,
    updateCliente,
    route,
    cliente,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
    getAllUsers,
    userList,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getCliente(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getCliente, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(cliente));
    }
  }, [cliente, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity || !navigation.canGoBack() ? navigation.replace('ClienteDetail', { entityId: cliente?.id }) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateCliente(formValueToEntity(data));

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const generoRef = createRef();
  const telefonoRef = createRef();
  const direccion1Ref = createRef();
  const direccion2Ref = createRef();
  const ciudadRef = createRef();
  const paisRef = createRef();
  const userRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="clienteEditScrollView"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.paddedScrollView}>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {formValue && (
          <Form initialValues={formValue} validationSchema={validationSchema} onSubmit={onSubmit} ref={formRef}>
            <FormField
              name="genero"
              ref={generoRef}
              label="Genero"
              placeholder="Enter Genero"
              testID="generoInput"
              inputType="select-one"
              listItems={Genero}
              onSubmitEditing={() => telefonoRef.current?.focus()}
            />
            <FormField
              name="telefono"
              ref={telefonoRef}
              label="Telefono"
              placeholder="Enter Telefono"
              testID="telefonoInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => direccion1Ref.current?.focus()}
            />
            <FormField
              name="direccion1"
              ref={direccion1Ref}
              label="Direccion 1"
              placeholder="Enter Direccion 1"
              testID="direccion1Input"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => direccion2Ref.current?.focus()}
            />
            <FormField
              name="direccion2"
              ref={direccion2Ref}
              label="Direccion 2"
              placeholder="Enter Direccion 2"
              testID="direccion2Input"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => ciudadRef.current?.focus()}
            />
            <FormField
              name="ciudad"
              ref={ciudadRef}
              label="Ciudad"
              placeholder="Enter Ciudad"
              testID="ciudadInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => paisRef.current?.focus()}
            />
            <FormField
              name="pais"
              ref={paisRef}
              label="Pais"
              placeholder="Enter Pais"
              testID="paisInput"
              inputType="text"
              autoCapitalize="none"
            />
            <FormField
              name="user"
              inputType="select-one"
              ref={userRef}
              listItems={userList}
              listItemLabelField="login"
              label="User"
              placeholder="Select User"
              testID="userSelectInput"
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
    genero: value.genero ?? null,
    telefono: value.telefono ?? null,
    direccion1: value.direccion1 ?? null,
    direccion2: value.direccion2 ?? null,
    ciudad: value.ciudad ?? null,
    pais: value.pais ?? null,
    user: value.user && value.user.id ? value.user.id : null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    genero: value.genero ?? null,
    telefono: value.telefono ?? null,
    direccion1: value.direccion1 ?? null,
    direccion2: value.direccion2 ?? null,
    ciudad: value.ciudad ?? null,
    pais: value.pais ?? null,
  };
  entity.user = value.user ? { id: value.user } : null;
  return entity;
};

const mapStateToProps = (state) => {
  return {
    userList: state.users.userList ?? [],
    cliente: state.clientes.cliente,
    fetching: state.clientes.fetchingOne,
    updating: state.clientes.updating,
    updateSuccess: state.clientes.updateSuccess,
    errorUpdating: state.clientes.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsers: (options) => dispatch(UserActions.userAllRequest(options)),
    getCliente: (id) => dispatch(ClienteActions.clienteRequest(id)),
    getAllClientes: (options) => dispatch(ClienteActions.clienteAllRequest(options)),
    updateCliente: (cliente) => dispatch(ClienteActions.clienteUpdateRequest(cliente)),
    reset: () => dispatch(ClienteActions.clienteReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClienteEditScreen);
