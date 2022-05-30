import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import CarritoActions from './carrito.reducer';

import styles from './carrito-styles';

function CarritoDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteCarrito(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Carrito');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete Carrito {entity.id}?</Text>
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
    carrito: state.carritos.carrito,
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

export default connect(mapStateToProps, mapDispatchToProps)(CarritoDeleteModal);
