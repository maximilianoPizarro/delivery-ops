# delivery-ops

npm install -g generator-jhipster



cd backend
jhipster jdl ../model.jdl


cd app

npm i generator-jhipster-react-native

npm i -g expo-cli

jhipster --blueprints react-native jdl ../model.jdl

expo upgrade 43.0.0

The `offline` flag is deprecated. Remove from webpack.config.js