import * as React from 'react';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import { DrawerButton } from './drawer/drawer-button';
import { navigate, goBackOrIfParamsOrDefault } from './nav-ref';

// import screens
import EntitiesScreen from '../modules/entities/entities-screen';
import ProductoScreen from '../modules/entities/producto/producto-screen';
import ProductoDetailScreen from '../modules/entities/producto/producto-detail-screen';
import ProductoEditScreen from '../modules/entities/producto/producto-edit-screen';
import ProductoCategoriaScreen from '../modules/entities/producto-categoria/producto-categoria-screen';
import ProductoCategoriaDetailScreen from '../modules/entities/producto-categoria/producto-categoria-detail-screen';
import ProductoCategoriaEditScreen from '../modules/entities/producto-categoria/producto-categoria-edit-screen';
import ClienteScreen from '../modules/entities/cliente/cliente-screen';
import ClienteDetailScreen from '../modules/entities/cliente/cliente-detail-screen';
import ClienteEditScreen from '../modules/entities/cliente/cliente-edit-screen';
import CarritoScreen from '../modules/entities/carrito/carrito-screen';
import CarritoDetailScreen from '../modules/entities/carrito/carrito-detail-screen';
import CarritoEditScreen from '../modules/entities/carrito/carrito-edit-screen';
import ProductoOrdenScreen from '../modules/entities/producto-orden/producto-orden-screen';
import ProductoOrdenDetailScreen from '../modules/entities/producto-orden/producto-orden-detail-screen';
import ProductoOrdenEditScreen from '../modules/entities/producto-orden/producto-orden-edit-screen';
// jhipster-react-native-navigation-import-needle

export const entityScreens = [
  {
    name: 'Entities',
    route: '',
    component: EntitiesScreen,
    options: {
      headerLeft: DrawerButton,
    },
  },
  {
    name: 'Producto',
    route: 'producto',
    component: ProductoScreen,
    options: {
      title: 'Productos',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('ProductoEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'ProductoDetail',
    route: 'producto/detail',
    component: ProductoDetailScreen,
    options: { title: 'View Producto', headerLeft: () => <HeaderBackButton onPress={() => navigate('Producto')} /> },
  },
  {
    name: 'ProductoEdit',
    route: 'producto/edit',
    component: ProductoEditScreen,
    options: {
      title: 'Edit Producto',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('ProductoDetail', 'Producto')} />,
    },
  },
  {
    name: 'ProductoCategoria',
    route: 'producto-categoria',
    component: ProductoCategoriaScreen,
    options: {
      title: 'ProductoCategorias',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('ProductoCategoriaEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'ProductoCategoriaDetail',
    route: 'producto-categoria/detail',
    component: ProductoCategoriaDetailScreen,
    options: { title: 'View ProductoCategoria', headerLeft: () => <HeaderBackButton onPress={() => navigate('ProductoCategoria')} /> },
  },
  {
    name: 'ProductoCategoriaEdit',
    route: 'producto-categoria/edit',
    component: ProductoCategoriaEditScreen,
    options: {
      title: 'Edit ProductoCategoria',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('ProductoCategoriaDetail', 'ProductoCategoria')} />,
    },
  },
  {
    name: 'Cliente',
    route: 'cliente',
    component: ClienteScreen,
    options: {
      title: 'Clientes',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('ClienteEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'ClienteDetail',
    route: 'cliente/detail',
    component: ClienteDetailScreen,
    options: { title: 'View Cliente', headerLeft: () => <HeaderBackButton onPress={() => navigate('Cliente')} /> },
  },
  {
    name: 'ClienteEdit',
    route: 'cliente/edit',
    component: ClienteEditScreen,
    options: {
      title: 'Edit Cliente',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('ClienteDetail', 'Cliente')} />,
    },
  },
  {
    name: 'Carrito',
    route: 'carrito',
    component: CarritoScreen,
    options: {
      title: 'Carritos',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('CarritoEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'CarritoDetail',
    route: 'carrito/detail',
    component: CarritoDetailScreen,
    options: { title: 'View Carrito', headerLeft: () => <HeaderBackButton onPress={() => navigate('Carrito')} /> },
  },
  {
    name: 'CarritoEdit',
    route: 'carrito/edit',
    component: CarritoEditScreen,
    options: {
      title: 'Edit Carrito',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('CarritoDetail', 'Carrito')} />,
    },
  },
  {
    name: 'ProductoOrden',
    route: 'producto-orden',
    component: ProductoOrdenScreen,
    options: {
      title: 'ProductoOrdens',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('ProductoOrdenEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'ProductoOrdenDetail',
    route: 'producto-orden/detail',
    component: ProductoOrdenDetailScreen,
    options: { title: 'View ProductoOrden', headerLeft: () => <HeaderBackButton onPress={() => navigate('ProductoOrden')} /> },
  },
  {
    name: 'ProductoOrdenEdit',
    route: 'producto-orden/edit',
    component: ProductoOrdenEditScreen,
    options: {
      title: 'Edit ProductoOrden',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('ProductoOrdenDetail', 'ProductoOrden')} />,
    },
  },
  // jhipster-react-native-navigation-declaration-needle
];

export const getEntityRoutes = () => {
  const routes = {};
  entityScreens.forEach((screen) => {
    routes[screen.name] = screen.route;
  });
  return routes;
};

const EntityStack = createStackNavigator();

export default function EntityStackScreen() {
  return (
    <EntityStack.Navigator>
      {entityScreens.map((screen, index) => {
        return <EntityStack.Screen name={screen.name} component={screen.component} key={index} options={screen.options} />;
      })}
    </EntityStack.Navigator>
  );
}
