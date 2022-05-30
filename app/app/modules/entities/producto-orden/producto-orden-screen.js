import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import ProductoOrdenActions from './producto-orden.reducer';
import styles from './producto-orden-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function ProductoOrdenScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { productoOrden, productoOrdenList, getAllProductoOrdens, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('ProductoOrden entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchProductoOrdens();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [productoOrden, fetchProductoOrdens]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('ProductoOrdenDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>ID: {item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No ProductoOrdens Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchProductoOrdens = React.useCallback(() => {
    getAllProductoOrdens({ page: page - 1, sort, size });
  }, [getAllProductoOrdens, page, sort, size]);

  const handleLoadMore = () => {
    if (productoOrdenList.length) {
      return;
    }
    setPage(page + 1);
    fetchProductoOrdens();
  };
  return (
    <View style={styles.container} testID="productoOrdenScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={productoOrdenList}
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
    productoOrdenList: state.productoOrdens.productoOrdenList,
    productoOrden: state.productoOrdens.productoOrden,
    fetching: state.productoOrdens.fetchingAll,
    error: state.productoOrdens.errorAll,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllProductoOrdens: (options) => dispatch(ProductoOrdenActions.productoOrdenAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductoOrdenScreen);
