import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { getStatusBarHeight, ifIphoneX } from 'react-native-iphone-x-helper';
import Routes from './Routes';
import reducers from './reducers';
import fb from 'firebase';
import ReduxThunk from 'redux-thunk';

const config = {
  apiKey: 'AIzaSyDyLs5UZHguUP3jD0V7KbHNdhVacZ_pgyU',
  authDomain: 'uaitizapmljn.firebaseapp.com',
  databaseURL: 'https://uaitizapmljn.firebaseio.com',
  projectId: 'uaitizapmljn',
  storageBucket: 'uaitizapmljn.appspot.com',
  messagingSenderId: '164690149823',
};

export default class Uaitizap extends Component {
  componentWillMount = () => {
    console.disableYellowBox = true;
    fb.initializeApp(config);
  };

  render() {
    return (
      <View style={styles.container}>
        <Provider
          store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}
        >
          <Routes />
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...ifIphoneX(
      {
        paddingTop: getStatusBarHeight(),
      },
      {
        paddingTop: 20,
      }
    ),
  },
});
