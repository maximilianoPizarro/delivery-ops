import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import CarritoActions from './carrito.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import CarritoDeleteModal from './carrito-delete-modal';
import styles from './carrito-styles';

function CarritoDetailScreen(props) {
  const { route, getCarrito, navigation, carrito, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = carrito?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('Carrito');
      } else {
        setDeleteModalVisible(false);
        getCarrito(routeEntityId);
      }
    }, [routeEntityId, getCarrito, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the Carrito.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="carritoDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{carrito.id}</Text>
      {/* Fecha Field */}
      <Text style={styles.label}>Fecha:</Text>
      <Text testID="fecha">{String(carrito.fecha)}</Text>
      {/* Status Field */}
      <Text style={styles.label}>Status:</Text>
      <Text testID="status">{carrito.status}</Text>
      {/* PrecioTotal Field */}
      <Text style={styles.label}>PrecioTotal:</Text>
      <Text testID="precioTotal">{carrito.precioTotal}</Text>
      {/* MetodoDePago Field */}
      <Text style={styles.label}>MetodoDePago:</Text>
      <Text testID="metodoDePago">{carrito.metodoDePago}</Text>
      {/* Referencia Field */}
      <Text style={styles.label}>Referencia:</Text>
      <Text testID="referencia">{carrito.referencia}</Text>
      <Text style={styles.label}>Cliente:</Text>
      <Text testID="cliente">{String(carrito.cliente ? carrito.cliente.id : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('CarritoEdit', { entityId })}
          accessibilityLabel={'Carrito Edit Button'}
          testID="carritoEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'Carrito Delete Button'}
          testID="carritoDeleteButton"
        />
        {deleteModalVisible && (
          <CarritoDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={carrito}
            testID="carritoDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    carrito: state.carritos.carrito,
    error: state.carritos.errorOne,
    fetching: state.carritos.fetchingOne,
    deleting: state.carritos.deleting,
    errorDeleting: state.carritos.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCarrito: (id) => dispatch(CarritoActions.carritoRequest(id)),
    getAllCarritos: (options) => dispatch(CarritoActions.carritoAllRequest(options)),
    deleteCarrito: (id) => dispatch(CarritoActions.carritoDeleteRequest(id)),
    resetCarritos: () => dispatch(CarritoActions.carritoReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CarritoDetailScreen);
