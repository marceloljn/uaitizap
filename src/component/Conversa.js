import React, { Component } from 'react';
import {
  View,
  TextInput,
  TouchableHighlight,
  Image,
  FlatList,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import { connect } from 'react-redux';
import {
  modificaMensagem,
  enviarMensagem,
  conversaUsuarioFetch,
} from '../actions/AppActions';
import _ from 'lodash';
import { getBottomSpace, ifIphoneX } from 'react-native-iphone-x-helper';

const imgMensagem = require('../imgs/enviar_mensagem.png');

class Conversa extends Component {
  componentWillMount = () => {
    this.props.conversaUsuarioFetch(this.props.contatoEmail);
    this.criaFonteDados(this.props.conversa);
  };

  componentWillReceiveProps = nextProps => {
    if (this.props.contatoEmail !== nextProps.contatoEmail) {
      this.props.conversaUsuarioFetch(nextProps.contatoEmail);
    }
    this.criaFonteDados(nextProps.conversa);
  };

  enviaMensagemHelper() {
    if (this.props.mensagem !== '') {
      const { mensagem, contatoNome, contatoEmail } = this.props;
      this.props.enviarMensagem(mensagem, contatoNome, contatoEmail);
    }
  }

  criaFonteDados(conversa) {
    this.dataSource = conversa;
  }

  renderRow(texto) {
    console.log(texto);
    if (texto.tipo === 'e') {
      return (
        <View
          style={{
            alignItems: 'flex-end',
            marginVertical: 5,
            marginLeft: 40,
            marginRight: 2,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: '#000',
              padding: 10,
              backgroundColor: '#DBF5B4',
              shadowOffset: { width: 0, height: 1 },
              shadowColor: 'black',
              shadowOpacity: 0.3,
              elevation: 0.3,
            }}
          >
            {texto.mensagem}
          </Text>
        </View>
      );
    }
    return (
      <View
        style={{
          alignItems: 'flex-start',
          marginVertical: 5,
          marginRight: 40,
          marginLeft: 2,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: '#000',
            padding: 10,
            backgroundColor: '#FFF',
            shadowOffset: { width: 0, height: 1 },
            shadowColor: 'black',
            shadowOpacity: 0.3,
            elevation: 0.3,
          }}
        >
          {texto.mensagem}
        </Text>
      </View>
    );
  }
  render() {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: '#eee4dc', padding: 10 }}
        behavior="padding"
        enabled
      >
        <View style={{ flex: 1, paddingBottom: 20 }}>
          <FlatList
            ref={ref => (this.flatList = ref)}
            onContentSizeChange={() =>
              this.flatList.scrollToEnd({ animated: false })
            }
            data={
              this.dataSource // onLayout={() => this.flatList.scrollToEnd({ animated: true })}
            }
            renderItem={({ item }) => this.renderRow(item)}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            height: 60,
            ...ifIphoneX(
              { marginBottom: getBottomSpace() },
              { marginBottom: 20 }
            ),
          }}
        >
          <TextInput
            value={this.props.mensagem}
            onChangeText={texto => this.props.modificaMensagem(texto)}
            style={{
              flex: 4,
              backgroundColor: '#fff',
              fontSize: 18,
              padding: 5,
            }}
          />

          <TouchableHighlight
            onPress={this.enviaMensagemHelper.bind(this)}
            underlayColor="#fff"
          >
            <Image source={imgMensagem} />
          </TouchableHighlight>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => {
  const conversa = _.map(state.ListaConversaReducer, (val, uid) => {
    return { ...val, uid };
  });

  return {
    conversa,
    mensagem: state.AppReducer.mensagem,
  };
};

export default connect(
  mapStateToProps,
  { modificaMensagem, enviarMensagem, conversaUsuarioFetch }
)(Conversa);
