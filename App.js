import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import store from './src/store';
import {Provider} from 'react-redux';

import Navigation from './src/configs/Navigation';

const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
