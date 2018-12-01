import {
  MODIFICA_NOME,
  MODIFICA_EMAIL,
  MODIFICA_SENHA,
  CADASTRO_USUARIO_SUCESSO,
  CADASTRO_USUARIO_ERRO,
  LOGIN_USUARIO_ERRO,
  LOGIN_USUARIO_SUCESSO,
  LOADING,
  DESLOGADO_SUCESSO,
} from '../actions/Types';

const INITIAL_STATE = {
  nome: '',
  email: '',
  senha: '',
  // email: 'marcelo@teste.com',
  // senha: '111111',
  erroCadastro: '',
  erroLogin: '',
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MODIFICA_NOME:
      return { ...state, nome: action.payload };
    case MODIFICA_EMAIL:
      return { ...state, email: action.payload };
    case MODIFICA_SENHA:
      return { ...state, senha: action.payload };
    case CADASTRO_USUARIO_ERRO:
      return { ...state, erroCadastro: action.payload, loading: false };
    case CADASTRO_USUARIO_SUCESSO:
      return { ...state, nome: '', senha: '', loading: false };
    case LOGIN_USUARIO_SUCESSO:
      return { ...state, nome: '', senha: '', loading: false };
    case LOGIN_USUARIO_ERRO:
      return { ...state, erroLogin: action.payload, loading: false };
    case LOADING:
      return { ...state, loading: true };
    case DESLOGADO_SUCESSO:
      return { ...state, ...INITIAL_STATE };

    default:
      return state;
  }
};
