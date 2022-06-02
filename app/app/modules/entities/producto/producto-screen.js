import React from 'react';
import { FlatList, Text, TouchableOpacity, View, Image } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import ProductoActions from './producto.reducer';
import styles from './producto-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function ProductoScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { producto, productoList, getAllProductos, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('Producto entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchProductos();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [producto, fetchProductos]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('ProductoDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>{item.description}</Text>
          <Image testID="image" style={styles.imageBlob} source={{ uri: `data:${producto.imageContentType};base64,${item.image}` }} />
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No Productos Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchProductos = React.useCallback(() => {
    getAllProductos({ page: page - 1, sort, size });
  }, [getAllProductos, page, sort, size]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchProductos();
  };
  return (
    <View style={styles.container} testID="productoScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={productoList}
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
    productoList: state.productos.productoList,
    producto: state.productos.producto,
    fetching: state.productos.fetchingAll,
    error: state.productos.errorAll,
    links: state.productos.links,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllProductos: (options) => dispatch(ProductoActions.productoAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductoScreen);
