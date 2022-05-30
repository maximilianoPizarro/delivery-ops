import Constants from 'expo-constants';

// load extra config from the app.json file
const extra = Constants.manifest?.extra ?? {};

export default {
  // use 10.0.2.2 for Android to connect to host machine
  apiUrl: 'https://delivery-ops.herokuapp.com/',
  // use fixtures instead of real API requests
  useFixtures: false,
  // debug mode
  debugMode: __DEV__,
  extra,
};
