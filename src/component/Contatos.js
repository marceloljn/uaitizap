import React, { Component } from 'react';
import { View, Text, ListView, TouchableHighlight } from 'react-native';
import { contatosUsuarioFetch } from '../actions/AppActions';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';

class Contatos extends Component {
  componentWillMount() {
    this.props.contatosUsuarioFetch();
    this.criaFonteDados(this.props.contatos);
  }

  componentWillReceiveProps(nextProps) {
    this.criaFonteDados(nextProps.contatos);
  }

  criaFonteDados(contatos) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.fonteDeDados = ds.cloneWithRows(contatos);
  }

  renderRow(contato) {
    return (
      <TouchableHighlight
        onPress={() =>
          Actions.conversa({
            title: contato.nome,
            contatoNome: contato.nome,
            contatoEmail: contato.email,
          })
        }
        underlayColor="#fff"
      >
        <View
          style={{
            flex: 1,
            padding: 20,
            borderBottomWidth: 1,
            borderColor: '#CCC',
          }}
        >
          <Text style={{ fontSize: 25 }}>{contato.nome}</Text>
          <Text style={{ fontSize: 18 }}>{contato.email}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <ListView
        enableEmptySections
        dataSource={this.fonteDeDados}
        renderRow={this.renderRow}
      />
    );
  }
}

const mapStateToProps = state => {
  // const contatos = _.values(state.ListaContatosReducer);
  const contatos = _.map(state.ListaContatosReducer, (val, uid) => {
    return { ...val, uid };
  });
  return {
    contatos,
  };
};

export default connect(
  mapStateToProps,
  { contatosUsuarioFetch }
)(Contatos);
