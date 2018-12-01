import React from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import { TabBar } from 'react-native-tab-view';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { habilitaInclusaoContato } from '../actions/AppActions';
import { deslogar } from '../actions/AutenticacaoActions';

const addContato = require('../imgs/adicionar-contato.png');

const TabBarMenu = props => (
  <View
    style={{
      backgroundColor: '#115E54',
    }}
  >
    <View
      style={{
        marginBottom: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <View
        style={{
          height: 50,
          justifyContent: 'center',
          backgroundColor: '#115E54',
        }}
      >
        <Text style={{ color: '#FFF', fontSize: 20, marginLeft: 20 }}>
          Uaitizap
        </Text>
      </View>
      <View
        style={{
          height: 50,
          justifyContent: 'center',
          backgroundColor: '#115E54',
          flexDirection: 'row',
          alignItems: 'center',
          marginRight: 20,
        }}
      >
        <View>
          <TouchableHighlight
            onPress={() => {
              Actions.adicionarContato();
              props.habilitaInclusaoContato();
            }}
            underlayColor="#114D44"
          >
            <Image source={addContato} />
          </TouchableHighlight>
        </View>
        <View>
          <TouchableHighlight
            onPress={() => {
              props.deslogar();
              Actions.formLogin();
            }}
            underlayColor="#114D44"
          >
            <Text style={{ color: '#FFF', fontSize: 20, marginLeft: 20 }}>
              Sair
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
    <TabBar {...props} style={{ backgroundColor: '#115E54' }} />
  </View>
);

export default connect(
  null,
  { habilitaInclusaoContato, deslogar }
)(TabBarMenu);
