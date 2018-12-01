import React, { Component } from 'react';
import { View, Text, FlatList, TouchableHighlight } from 'react-native';
import { conversasUsuarioFetch } from '../actions/AppActions';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';

class Conversas extends Component {
  componentWillMount() {
    this.props.conversasUsuarioFetch();
    this.createDataSource(this.props.conversas);
  }

  componentWillReceiveProps(nexpProps) {
    this.createDataSource(nexpProps.conversas);
  }

  createDataSource(conversas) {
    this.DataSource = conversas;
  }

  renderRow(conversa) {
    return (
      <TouchableHighlight
        onPress={() =>
          Actions.conversa({
            title: conversa.nome,
            contatoNome: conversa.nome,
            contatoEmail: conversa.email,
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
          <Text style={{ fontSize: 25 }}>{conversa.nome}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <FlatList
        data={this.DataSource}
        renderItem={({ item }) => this.renderRow(item)}
      />
    );
  }
}

const mapStateToProps = state => {
  const conversas = _.map(state.ListaConversasReducer, (val, uid) => {
    return { ...val, uid };
  });

  console.log(conversas);
  return {
    conversas,
  };
};

export default connect(
  mapStateToProps,
  { conversasUsuarioFetch }
)(Conversas);
