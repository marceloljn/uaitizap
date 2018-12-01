import React, { Component } from 'react';
import {
  TextInput,
  TouchableHighlight,
  Text,
  View,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {
  modificaEmail,
  modificaSenha,
  autenticarUsuario,
  recuperaLogin,
} from '../actions/AutenticacaoActions';

const bg = require('../imgs/bg.png');

class FormLogin extends Component {
  componentWillMount() {
    // this.props.recuperaLogin();
  }

  renderBtnAcessar() {
    if (this.props.loading) {
      return <ActivityIndicator size="large" shouldRasterizeIOS />;
    }

    return (
      <TouchableHighlight
        style={{
          backgroundColor: '#115E54',
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        underlayColor="#114D44"
        onPress={() =>
          this.props.autenticarUsuario(this.props.email, this.props.senha)
        }
      >
        <Text style={{ color: '#FFF', fontSize: 20 }}>ACESSAR</Text>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <ImageBackground style={{ flex: 1, width: null }} source={bg}>
        <View style={{ flex: 1, padding: 10 }}>
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Text
              style={{
                fontSize: 25,
                backgroundColor: 'transparent',
                color: '#FFF',
                fontWeight: 'bold',
              }}
            >
              Uaitizap
            </Text>
          </View>
          <View style={{ flex: 2 }}>
            <TextInput
              style={{
                fontSize: 20,
                height: 45,
                borderBottomColor: '#115E54',
                borderBottomWidth: 1,
              }}
              placeholder="E-mail"
              placeholderTextColor="#FFF"
              autoCapitalize={'none'}
              value={this.props.email}
              onChangeText={texto => this.props.modificaEmail(texto)}
            />
            <TextInput
              style={{
                fontSize: 20,
                height: 45,
                borderBottomColor: '#115E54',
                borderBottomWidth: 1,
              }}
              placeholder="Senha"
              placeholderTextColor="#FFF"
              value={this.props.senha}
              secureTextEntry
              onChangeText={texto => this.props.modificaSenha(texto)}
            />
            <Text style={{ color: '#FF0000', fontSize: 18 }}>
              {this.props.erroLogin}
            </Text>
            <TouchableHighlight onPress={() => Actions.formCadastro()}>
              <Text style={{ fontSize: 20, paddingTop: 20, color: '#FFF' }}>
                Ainda não tem cadastro? Cadastre-se
              </Text>
            </TouchableHighlight>
          </View>
          <View style={{ flex: 2 }}>{this.renderBtnAcessar()}</View>
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  email: state.AutenticacaoReducer.email,
  senha: state.AutenticacaoReducer.senha,
  erroLogin: state.AutenticacaoReducer.erroLogin,
  loading: state.AutenticacaoReducer.loading,
});

export default connect(
  mapStateToProps,
  { modificaEmail, modificaSenha, autenticarUsuario, recuperaLogin }
)(FormLogin);
