import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import ProductoOrdenActions from './producto-orden.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import ProductoOrdenDeleteModal from './producto-orden-delete-modal';
import styles from './producto-orden-styles';

function ProductoOrdenDetailScreen(props) {
  const { route, getProductoOrden, navigation, productoOrden, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = productoOrden?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('ProductoOrden');
      } else {
        setDeleteModalVisible(false);
        getProductoOrden(routeEntityId);
      }
    }, [routeEntityId, getProductoOrden, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the ProductoOrden.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="productoOrdenDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{productoOrden.id}</Text>
      {/* Cantidad Field */}
      <Text style={styles.label}>Cantidad:</Text>
      <Text testID="cantidad">{productoOrden.cantidad}</Text>
      {/* PrecioTotal Field */}
      <Text style={styles.label}>PrecioTotal:</Text>
      <Text testID="precioTotal">{productoOrden.precioTotal}</Text>
      <Text style={styles.label}>Producto:</Text>
      <Text testID="producto">{String(productoOrden.producto ? productoOrden.producto.nombre : '')}</Text>
      <Text style={styles.label}>Cart:</Text>
      <Text testID="cart">{String(productoOrden.cart ? productoOrden.cart.id : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('ProductoOrdenEdit', { entityId })}
          accessibilityLabel={'ProductoOrden Edit Button'}
          testID="productoOrdenEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'ProductoOrden Delete Button'}
          testID="productoOrdenDeleteButton"
        />
        {deleteModalVisible && (
          <ProductoOrdenDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={productoOrden}
            testID="productoOrdenDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    productoOrden: state.productoOrdens.productoOrden,
    error: state.productoOrdens.errorOne,
    fetching: state.productoOrdens.fetchingOne,
    deleting: state.productoOrdens.deleting,
    errorDeleting: state.productoOrdens.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductoOrden: (id) => dispatch(ProductoOrdenActions.productoOrdenRequest(id)),
    getAllProductoOrdens: (options) => dispatch(ProductoOrdenActions.productoOrdenAllRequest(options)),
    deleteProductoOrden: (id) => dispatch(ProductoOrdenActions.productoOrdenDeleteRequest(id)),
    resetProductoOrdens: () => dispatch(ProductoOrdenActions.productoOrdenReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductoOrdenDetailScreen);
