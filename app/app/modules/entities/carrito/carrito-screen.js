import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import CarritoActions from './carrito.reducer';
import styles from './carrito-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function CarritoScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { carrito, carritoList, getAllCarritos, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('Carrito entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchCarritos();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [carrito, fetchCarritos]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('CarritoDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>ID: {item.id}</Text>
          <Text style={styles.label}>{item.description}</Text> 
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No Carritos Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchCarritos = React.useCallback(() => {
    getAllCarritos({ page: page - 1, sort, size });
  }, [getAllCarritos, page, sort, size]);

  const handleLoadMore = () => {
    if (carritoList.length) {
      return;
    }
    setPage(page + 1);
    fetchCarritos();
  };
  return (
    <View style={styles.container} testID="carritoScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={carritoList}
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
    carritoList: state.carritos.carritoList,
    carrito: state.carritos.carrito,
    fetching: state.carritos.fetchingAll,
    error: state.carritos.errorAll,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCarritos: (options) => dispatch(CarritoActions.carritoAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CarritoScreen);
