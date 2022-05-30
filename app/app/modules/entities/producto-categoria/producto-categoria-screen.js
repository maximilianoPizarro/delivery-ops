import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import ProductoCategoriaActions from './producto-categoria.reducer';
import styles from './producto-categoria-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function ProductoCategoriaScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { productoCategoria, productoCategoriaList, getAllProductoCategorias, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('ProductoCategoria entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchProductoCategorias();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [productoCategoria, fetchProductoCategorias]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('ProductoCategoriaDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>ID: {item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No ProductoCategorias Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchProductoCategorias = React.useCallback(() => {
    getAllProductoCategorias({ page: page - 1, sort, size });
  }, [getAllProductoCategorias, page, sort, size]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchProductoCategorias();
  };
  return (
    <View style={styles.container} testID="productoCategoriaScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={productoCategoriaList}
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
    productoCategoriaList: state.productoCategorias.productoCategoriaList,
    productoCategoria: state.productoCategorias.productoCategoria,
    fetching: state.productoCategorias.fetchingAll,
    error: state.productoCategorias.errorAll,
    links: state.productoCategorias.links,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllProductoCategorias: (options) => dispatch(ProductoCategoriaActions.productoCategoriaAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductoCategoriaScreen);
