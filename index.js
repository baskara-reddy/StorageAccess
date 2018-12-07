/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import CameraScreen from './component/CameraScreen';

export default class rncameraroll extends Component {
  render() {
    return (
      <CameraScreen/>
    );
  }
}

AppRegistry.registerComponent('rncameraroll', () => rncameraroll);
