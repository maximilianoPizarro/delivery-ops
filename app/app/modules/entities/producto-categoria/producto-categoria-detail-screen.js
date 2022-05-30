import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import ProductoCategoriaActions from './producto-categoria.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import ProductoCategoriaDeleteModal from './producto-categoria-delete-modal';
import styles from './producto-categoria-styles';

function ProductoCategoriaDetailScreen(props) {
  const { route, getProductoCategoria, navigation, productoCategoria, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = productoCategoria?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('ProductoCategoria');
      } else {
        setDeleteModalVisible(false);
        getProductoCategoria(routeEntityId);
      }
    }, [routeEntityId, getProductoCategoria, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the ProductoCategoria.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="productoCategoriaDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{productoCategoria.id}</Text>
      {/* Nombre Field */}
      <Text style={styles.label}>Nombre:</Text>
      <Text testID="nombre">{productoCategoria.nombre}</Text>
      {/* Description Field */}
      <Text style={styles.label}>Description:</Text>
      <Text testID="description">{productoCategoria.description}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('ProductoCategoriaEdit', { entityId })}
          accessibilityLabel={'ProductoCategoria Edit Button'}
          testID="productoCategoriaEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'ProductoCategoria Delete Button'}
          testID="productoCategoriaDeleteButton"
        />
        {deleteModalVisible && (
          <ProductoCategoriaDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={productoCategoria}
            testID="productoCategoriaDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    productoCategoria: state.productoCategorias.productoCategoria,
    error: state.productoCategorias.errorOne,
    fetching: state.productoCategorias.fetchingOne,
    deleting: state.productoCategorias.deleting,
    errorDeleting: state.productoCategorias.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductoCategoria: (id) => dispatch(ProductoCategoriaActions.productoCategoriaRequest(id)),
    getAllProductoCategorias: (options) => dispatch(ProductoCategoriaActions.productoCategoriaAllRequest(options)),
    deleteProductoCategoria: (id) => dispatch(ProductoCategoriaActions.productoCategoriaDeleteRequest(id)),
    resetProductoCategorias: () => dispatch(ProductoCategoriaActions.productoCategoriaReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductoCategoriaDetailScreen);
