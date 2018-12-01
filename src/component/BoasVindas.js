import React from 'react';
import { Actions } from 'react-native-router-flux';
import {
  Text,
  View,
  TouchableHighlight,
  Image,
  ImageBackground,
} from 'react-native';

const bg = require('../imgs/bg.png');
const logo = require('../imgs/logo.png');

export default props => (
  <ImageBackground style={{ flex: 1, width: null }} source={bg}>
    <View style={{ flex: 1, padding: 15 }}>
      <View
        style={{
          flex: 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#FFF', fontSize: 20, padding: 25 }}>
          Seja Bem-Vindo
        </Text>
        <Image source={logo} />
      </View>
      <View style={{ flex: 1 }}>
        <TouchableHighlight
          style={{
            backgroundColor: '#115E54',
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => Actions.formLogin()}
        >
          <Text style={{ color: '#FFF', fontSize: 20 }}>FAZER LOGIN</Text>
        </TouchableHighlight>
      </View>
    </View>
  </ImageBackground>
);
