import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import TabBarMenu from './TabBarMenu';
import Conversas from './Conversas';
import Contatos from './Contatos';

export default class Principal extends React.Component {
  state = {
    index: 0,
    routes: [{ key: '1', title: 'Conversas' }, { key: '2', title: 'Contatos' }],
  };

  _handleIndexChange = index =>
    this.setState({
      index,
    });

  _renderTabBar = props => <TabBarMenu {...props} />;

  _renderScene = SceneMap({
    1: Conversas,
    2: Contatos,
  });

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={this._renderScene}
        renderTabBar={this._renderTabBar}
        onIndexChange={this._handleIndexChange}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    paddingTop: getStatusBarHeight(),
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
});
