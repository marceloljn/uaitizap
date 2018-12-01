import React, { Component } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import {
  modificaAdicionaContatoEmail,
  adicionaContato,
} from '../actions/AppActions';

class AdicionatContato extends Component {
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
        onPress={() =>
          this.props.adicionaContato(this.props.adiciona_contato_email)
        }
      >
        <Text style={{ color: '#FFF', fontSize: 20 }}>ADICIONAR</Text>
      </TouchableHighlight>
    );
  }

  renderAdicionaContato() {
    if (!this.props.adiciona_contato_sucesso) {
      return (
        <View style={{ flex: 1, alignSelf: 'stretch', margin: 10 }}>
          <View
            style={{
              justifyContent: 'center',
              borderBottomColor: '#115E54',
              borderBottomWidth: 1,
              fontSize: 20,
            }}
          >
            <TextInput
              placeholder="E-mail"
              style={{ fontSize: 20, height: 45 }}
              onChangeText={texto =>
                this.props.modificaAdicionaContatoEmail(texto)
              }
              autoCapitalize={'none'}
              value={this.props.adiciona_contato_email}
            />
          </View>
          <Text style={{ color: '#FF0000', fontSize: 18, marginTop: 6 }}>
            {this.props.adiciona_contato_erro}
          </Text>
          <View style={{ marginTop: 30 }}>{this.renderBtnCadastrar()}</View>
        </View>
      );
    }
    return <Text style={{ fontSize: 20 }}>Contato Cadastrado com Sucesso</Text>;
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {this.renderAdicionaContato()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  adiciona_contato_email: state.AppReducer.adiciona_contato_email,
  adiciona_contato_erro: state.AppReducer.adiciona_contato_erro,
  adiciona_contato_sucesso: state.AppReducer.adiciona_contato_sucesso,
  loading: state.AppReducer.loading,
});

export default connect(
  mapStateToProps,
  { modificaAdicionaContatoEmail, adicionaContato }
)(AdicionatContato);
