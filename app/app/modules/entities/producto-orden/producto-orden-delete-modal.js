import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import ProductoOrdenActions from './producto-orden.reducer';

import styles from './producto-orden-styles';

function ProductoOrdenDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteProductoOrden(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('ProductoOrden');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete ProductoOrden {entity.id}?</Text>
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
    productoOrden: state.productoOrdens.productoOrden,
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductoOrdenDeleteModal);
