import React from 'react';
import { ActivityIndicator, ScrollView, Text, Image, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import ProductoActions from './producto.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import ProductoDeleteModal from './producto-delete-modal';
import styles from './producto-styles';

function ProductoDetailScreen(props) {
  const { route, getProducto, navigation, producto, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = producto?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('Producto');
      } else {
        setDeleteModalVisible(false);
        getProducto(routeEntityId);
      }
    }, [routeEntityId, getProducto, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the Producto.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="productoDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{producto.id}</Text>
      {/* Nombre Field */}
      <Text style={styles.label}>Nombre:</Text>
      <Text testID="nombre">{producto.nombre}</Text>
      {/* Description Field */}
      <Text style={styles.label}>Description:</Text>
      <Text testID="description">{producto.description}</Text>
      {/* Precio Field */}
      <Text style={styles.label}>Precio:</Text>
      <Text testID="precio">{producto.precio}</Text>
      {/* Medida Field */}
      <Text style={styles.label}>Medida:</Text>
      <Text testID="medida">{producto.medida}</Text>
      {/* Image Field */}
      <Text style={styles.label}>Image:</Text>
      <Text testID="imageContentType">{producto.imageContentType}</Text>
      <Image testID="image" style={styles.imageBlob} source={{ uri: `data:${producto.imageContentType};base64,${producto.image}` }} />
      <Text style={styles.label}>Producto Categoria:</Text>
      <Text testID="productoCategoria">{String(producto.productoCategoria ? producto.productoCategoria.nombre : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('ProductoEdit', { entityId })}
          accessibilityLabel={'Producto Edit Button'}
          testID="productoEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'Producto Delete Button'}
          testID="productoDeleteButton"
        />
        {deleteModalVisible && (
          <ProductoDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={producto}
            testID="productoDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    producto: state.productos.producto,
    error: state.productos.errorOne,
    fetching: state.productos.fetchingOne,
    deleting: state.productos.deleting,
    errorDeleting: state.productos.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProducto: (id) => dispatch(ProductoActions.productoRequest(id)),
    getAllProductos: (options) => dispatch(ProductoActions.productoAllRequest(options)),
    deleteProducto: (id) => dispatch(ProductoActions.productoDeleteRequest(id)),
    resetProductos: () => dispatch(ProductoActions.productoReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductoDetailScreen);
