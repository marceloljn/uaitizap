import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import FormLogin from './component/FormLogin';
import FormCadastro from './component/FormCadastro';
import BoasVindas from './component/BoasVindas';
import Principal from './component/Principal';
import AdicionarContato from './component/AdicionarContato';
import Conversa from './component/Conversa';

export default props => (
  <Router
    navigationBarStyle={{ backgroundColor: '#115E54' }}
    titleStyle={{ color: '#FFF' }}
  >
    <Scene key="root">
      <Scene hideNavBar key="formLogin" component={FormLogin} />
      <Scene
        hideNavBar={false}
        key="formCadastro"
        component={FormCadastro}
        title="Cadastro"
      />
      <Scene hideNavBar key="boasVindas" component={BoasVindas} />
      <Scene hideNavBar key="principal" component={Principal} />
      <Scene
        hideNavBar={false}
        title="Adicionar Contatos"
        key="adicionarContato"
        component={AdicionarContato}
      />
      <Scene title="Conversa" key="conversa" component={Conversa} />
    </Scene>
  </Router>
);
