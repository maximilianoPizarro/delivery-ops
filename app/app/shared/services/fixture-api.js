export default {
  // Functions return fixtures

  // entity fixtures
  updateProducto: (producto) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-producto.json'),
    };
  },
  getAllProductos: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-productos.json'),
    };
  },
  getProducto: (productoId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-producto.json'),
    };
  },
  deleteProducto: (productoId) => {
    return {
      ok: true,
    };
  },
  updateProductoCategoria: (productoCategoria) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-producto-categoria.json'),
    };
  },
  getAllProductoCategorias: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-producto-categorias.json'),
    };
  },
  getProductoCategoria: (productoCategoriaId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-producto-categoria.json'),
    };
  },
  deleteProductoCategoria: (productoCategoriaId) => {
    return {
      ok: true,
    };
  },
  updateCliente: (cliente) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-cliente.json'),
    };
  },
  getAllClientes: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-clientes.json'),
    };
  },
  getCliente: (clienteId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-cliente.json'),
    };
  },
  deleteCliente: (clienteId) => {
    return {
      ok: true,
    };
  },
  updateCarrito: (carrito) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-carrito.json'),
    };
  },
  getAllCarritos: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-carritos.json'),
    };
  },
  getCarrito: (carritoId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-carrito.json'),
    };
  },
  deleteCarrito: (carritoId) => {
    return {
      ok: true,
    };
  },
  updateProductoOrden: (productoOrden) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-producto-orden.json'),
    };
  },
  getAllProductoOrdens: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-producto-ordens.json'),
    };
  },
  getProductoOrden: (productoOrdenId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-producto-orden.json'),
    };
  },
  deleteProductoOrden: (productoOrdenId) => {
    return {
      ok: true,
    };
  },
  // jhipster-react-native-api-fixture-needle

  // user fixtures
  updateUser: (user) => {
    return {
      ok: true,
      data: require('../fixtures/update-user.json'),
    };
  },
  getAllUsers: () => {
    return {
      ok: true,
      data: require('../fixtures/get-users.json'),
    };
  },
  getUser: (userId) => {
    return {
      ok: true,
      data: require('../fixtures/get-user.json'),
    };
  },
  deleteUser: (userId) => {
    return {
      ok: true,
    };
  },
  // auth fixtures
  setAuthToken: () => {},
  removeAuthToken: () => {},
  login: (authObj) => {
    if (authObj.username === 'user' && authObj.password === 'user') {
      return {
        ok: true,
        data: require('../fixtures/login.json'),
      };
    } else {
      return {
        ok: false,
        status: 400,
        data: 'Invalid credentials',
      };
    }
  },
  register: ({ user }) => {
    if (user === 'user') {
      return {
        ok: true,
      };
    } else {
      return {
        ok: false,
        data: {
          title: 'Invalid email',
        },
      };
    }
  },
  forgotPassword: ({ email }) => {
    if (email === 'valid@gmail.com') {
      return {
        ok: true,
      };
    } else {
      return {
        ok: false,
        data: 'Invalid email',
      };
    }
  },
  getAccount: () => {
    return {
      ok: true,
      status: 200,
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      data: require('../fixtures/get-account.json'),
    };
  },
  updateAccount: () => {
    return {
      ok: true,
    };
  },
  changePassword: ({ currentPassword }) => {
    if (currentPassword === 'valid-password') {
      return {
        ok: true,
      };
    } else {
      return {
        ok: false,
        data: 'Password error',
      };
    }
  },
};
