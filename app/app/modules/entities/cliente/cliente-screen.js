import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import ClienteActions from './cliente.reducer';
import styles from './cliente-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function ClienteScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { cliente, clienteList, getAllClientes, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('Cliente entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchClientes();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [cliente, fetchClientes]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('ClienteDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>ID: {item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No Clientes Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchClientes = React.useCallback(() => {
    getAllClientes({ page: page - 1, sort, size });
  }, [getAllClientes, page, sort, size]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchClientes();
  };
  return (
    <View style={styles.container} testID="clienteScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={clienteList}
        renderItem={renderRow}
        keyExtractor={keyExtractor}
        initialNumToRender={oneScreensWorth}
        onEndReached={handleLoadMore}
        ListEmptyComponent={renderEmpty}
      />
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
    clienteList: state.clientes.clienteList,
    cliente: state.clientes.cliente,
    fetching: state.clientes.fetchingAll,
    error: state.clientes.errorAll,
    links: state.clientes.links,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllClientes: (options) => dispatch(ClienteActions.clienteAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClienteScreen);
