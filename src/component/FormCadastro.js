import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import {
  modificaNome,
  modificaEmail,
  modificaSenha,
  cadastraUsuario,
} from '../actions/AutenticacaoActions';

const bg = require('../imgs/bg.png');

class FormCadastro extends Component {
  renderBtnCadastrar() {
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
        onPress={() => this.cadastraUsuario()}
      >
        <Text style={{ color: '#FFF', fontSize: 20 }}>CADASTRAR</Text>
      </TouchableHighlight>
    );
  }

  cadastraUsuario() {
    this.props.cadastraUsuario(
      this.props.nome,
      this.props.email,
      this.props.senha
    );
  }

  render() {
    return (
      <ImageBackground style={{ flex: 1, width: null }} source={bg}>
        <View style={{ flex: 1, padding: 10, alignSelf: 'stretch' }}>
          <View style={{ flex: 4, justifyContent: 'center' }}>
            <TextInput
              style={{
                fontSize: 20,
                height: 45,
                borderBottomColor: '#115E54',
                borderBottomWidth: 1,
              }}
              placeholder="Nome"
              placeholderTextColor="#FFF"
              onChangeText={texto => this.props.modificaNome(texto)}
            />
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
              {this.props.erroCadastro}
            </Text>
          </View>
          <View style={{ flex: 2 }}>{this.renderBtnCadastrar()}</View>
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  nome: state.AutenticacaoReducer.nome,
  email: state.AutenticacaoReducer.email,
  senha: state.AutenticacaoReducer.senha,
  erroCadastro: state.AutenticacaoReducer.erroCadastro,
  loading: state.AutenticacaoReducer.loading,
});

export default connect(
  mapStateToProps,
  { modificaEmail, modificaNome, modificaSenha, cadastraUsuario }
)(FormCadastro);
