import fb from 'firebase';
import { Actions } from 'react-native-router-flux';
import b64 from 'base-64';
import { AsyncStorage } from 'react-native';
import {
  MODIFICA_NOME,
  MODIFICA_SENHA,
  CADASTRO_USUARIO_SUCESSO,
  LOGIN_USUARIO_SUCESSO,
  MODIFICA_EMAIL,
  CADASTRO_USUARIO_ERRO,
  LOGIN_USUARIO_ERRO,
  LOADING,
  DESLOGADO_SUCESSO,
} from './Types';

export const modificaNome = texto => ({
  type: MODIFICA_NOME,
  payload: texto,
});

export const modificaEmail = texto => ({
  type: MODIFICA_EMAIL,
  payload: texto,
});

export const modificaSenha = texto => ({
  type: MODIFICA_SENHA,
  payload: texto,
});

export const cadastraUsuario = (nome, email, senha) => dispatch => {
  dispatch({ type: LOADING });

  fb.auth()
    .createUserWithEmailAndPassword(email, senha)
    .then(user => {
      let emailb64 = b64.encode(email);
      fb.database()
        .ref(`/contatos/${emailb64}`)
        .push({ nome })
        .then(value => cadastroUsuarioSucesso(dispatch));
    })
    .catch(erro => cadastroUsuarioErro(erro, dispatch));
};

const cadastroUsuarioSucesso = dispatch => {
  dispatch({ type: CADASTRO_USUARIO_SUCESSO });
  Actions.boasVindas();
};

const cadastroUsuarioErro = (erro, dispatch) => {
  dispatch({ type: CADASTRO_USUARIO_ERRO, payload: erro.message });
};

export const autenticarUsuario = (email, senha) => dispatch => {
  dispatch({ type: LOADING });

  fb.auth()
    .signInWithEmailAndPassword(email, senha)
    .then(login => {
      loginUsuarioSucesso(login, dispatch);
      // console.log('tentando guardar login');
      // AsyncStorage.setItem('@logado:key', 'I like to save it.').then(
      //   retorno => {
      //     console.log('acho que guardou logado', retorno);
      //     AsyncStorage.getAllKeys().then(value => {
      //       console.log('Tá logado? ', value);
      //     });
      //     AsyncStorage.setItem(
      //       '@usuario:key',
      //       JSON.stringify({
      //         email,
      //         senha,
      //       })
      //     ).then(retorno1 => {
      //       console.log('acho que guardou usuario', retorno1);
      //     });
      //   }
      // );
    });
};

export const recuperaLogin = () => dispatch => {
  console.log('tentando buscar login ');
  try {
    console.log('tentando buscar login 1');
    AsyncStorage.getItem('logado').then(value => {
      console.log('Tá logado? ', value);
      // const usuario = AsyncStorage.getItem('usuario');
      // if (usuario !== null) {
      //   autenticarUsuario(usuario.email, usuario.senha);
      // }
    });
  } catch (error) {
    loginUsuarioErro(error, dispatch);
  }
};

const loginUsuarioSucesso = (login, dispatch) => {
  dispatch({ type: LOGIN_USUARIO_SUCESSO });

  Actions.principal();
};

const loginUsuarioErro = (erro, dispatch) => {
  // alert(erro.message);
  dispatch({ type: LOGIN_USUARIO_ERRO, payload: erro.message });
};

export const deslogar = () => {
  return dispatch => {
    fb.auth()
      .signOut()
      .then(() => {
        dispatch({ type: DESLOGADO_SUCESSO });
      });
  };
};
