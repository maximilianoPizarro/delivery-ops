import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import ProductoCategoriaActions from './producto-categoria.reducer';

import styles from './producto-categoria-styles';

function ProductoCategoriaDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteProductoCategoria(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('ProductoCategoria');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete ProductoCategoria {entity.id}?</Text>
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
    productoCategoria: state.productoCategorias.productoCategoria,
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductoCategoriaDeleteModal);
