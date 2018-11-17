/** @format */

import {AppRegistry} from 'react-native';

import { StackNavigator } from 'react-navigation'
import ImageBrowser from './ImageBrowser'

import App from './App';
import {name as appName} from './app.json';

const Navigation = StackNavigator({
    App: { screen: App },
    ImageBrowser: { screen: ImageBrowser }
  });

AppRegistry.registerComponent(appName, () => Navigation);
