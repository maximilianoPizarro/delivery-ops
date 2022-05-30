import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import ClienteActions from './cliente.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import ClienteDeleteModal from './cliente-delete-modal';
import styles from './cliente-styles';

function ClienteDetailScreen(props) {
  const { route, getCliente, navigation, cliente, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = cliente?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('Cliente');
      } else {
        setDeleteModalVisible(false);
        getCliente(routeEntityId);
      }
    }, [routeEntityId, getCliente, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the Cliente.</Text>
      </View>
    );
  }
  if (!entityId || fetching || !correctEntityLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="clienteDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{cliente.id}</Text>
      {/* Genero Field */}
      <Text style={styles.label}>Genero:</Text>
      <Text testID="genero">{cliente.genero}</Text>
      {/* Telefono Field */}
      <Text style={styles.label}>Telefono:</Text>
      <Text testID="telefono">{cliente.telefono}</Text>
      {/* Direccion1 Field */}
      <Text style={styles.label}>Direccion1:</Text>
      <Text testID="direccion1">{cliente.direccion1}</Text>
      {/* Direccion2 Field */}
      <Text style={styles.label}>Direccion2:</Text>
      <Text testID="direccion2">{cliente.direccion2}</Text>
      {/* Ciudad Field */}
      <Text style={styles.label}>Ciudad:</Text>
      <Text testID="ciudad">{cliente.ciudad}</Text>
      {/* Pais Field */}
      <Text style={styles.label}>Pais:</Text>
      <Text testID="pais">{cliente.pais}</Text>
      <Text style={styles.label}>User:</Text>
      <Text testID="user">{String(cliente.user ? cliente.user.login : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('ClienteEdit', { entityId })}
          accessibilityLabel={'Cliente Edit Button'}
          testID="clienteEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'Cliente Delete Button'}
          testID="clienteDeleteButton"
        />
        {deleteModalVisible && (
          <ClienteDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={cliente}
            testID="clienteDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    cliente: state.clientes.cliente,
    error: state.clientes.errorOne,
    fetching: state.clientes.fetchingOne,
    deleting: state.clientes.deleting,
    errorDeleting: state.clientes.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCliente: (id) => dispatch(ClienteActions.clienteRequest(id)),
    getAllClientes: (options) => dispatch(ClienteActions.clienteAllRequest(options)),
    deleteCliente: (id) => dispatch(ClienteActions.clienteDeleteRequest(id)),
    resetClientes: () => dispatch(ClienteActions.clienteReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClienteDetailScreen);
