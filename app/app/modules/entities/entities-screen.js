import React from 'react';
import { ScrollView, Text } from 'react-native';
import { Images } from '../../shared/themes';

// Styles
import RoundedButton from '../../shared/components/rounded-button/rounded-button';

import styles from './entities-screen.styles';

export default function EntitiesScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="entityScreenScrollList">
      <Text style={styles.centerText}></Text>
      <RoundedButton text="Producto" onPress={() => navigation.navigate('Producto')} testID="productoEntityScreenButton" />
      <RoundedButton
        text="Producto Categoria"
        onPress={() => navigation.navigate('ProductoCategoria')}
        testID="productoCategoriaEntityScreenButton"
      />
      <RoundedButton text="Cliente" onPress={() => navigation.navigate('Cliente')} testID="clienteEntityScreenButton" />
      <RoundedButton text="Carrito" onPress={() => navigation.navigate('Carrito')} testID="carritoEntityScreenButton" />
      <RoundedButton text="Producto Orden" onPress={() => navigation.navigate('ProductoOrden')} testID="productoOrdenEntityScreenButton" />
      {/* jhipster-react-native-entity-screen-needle */}
    </ScrollView>
  );
}
