import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import ProductoActions from './producto.reducer';

import styles from './producto-styles';

function ProductoDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteProducto(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Producto');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete Producto {entity.id}?</Text>
          </View>
          <View style={[styles.flexRow]}>
            <TouchableHighlight
              style={[styles.openButton, styles.cancelButton]}
              onPress={() => {
                setVisible(false);
              }}>
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.openButton, styles.submitButton]} onPress={deleteEntity} testID="deleteButton">
              <Text style={styles.textStyle}>Delete</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const mapStateToProps = (state) => {
  return {
    producto: state.productos.producto,
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductoDeleteModal);
