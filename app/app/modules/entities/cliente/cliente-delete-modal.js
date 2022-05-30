import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import ClienteActions from './cliente.reducer';

import styles from './cliente-styles';

function ClienteDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteCliente(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Cliente');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete Cliente {entity.id}?</Text>
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
    cliente: state.clientes.cliente,
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

export default connect(mapStateToProps, mapDispatchToProps)(ClienteDeleteModal);
