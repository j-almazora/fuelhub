import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware } from "redux";

import combine from "./redux/combine";

import * as firebase from 'firebase';
import Firebase from './comps/Firebase';

import Main from "./comps/pages/Main";

const store = createStore(
  combine,
  applyMiddleware(
  thunkMiddleware
  ));

export default class App extends React.Component {
  
  render() {
    return (
      <Provider store={store}> 
        <Main /> 
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
