import {
  ADICIONA_CONTATO_EMAIL,
  ADICIONA_CONTATO_ERRO,
  ADICIONA_CONTATO_SUCESSO,
  LOADING_CADASTRO,
  MODIFICA_MENSAGEM,
  ENVIA_MENSAGEM,
} from '../actions/Types';

const INITIAL_STATE = {
  adiciona_contato_email: 'joana@teste.com',
  adiciona_contato_erro: '',
  adiciona_contato_sucesso: false,
  loading: false,
  mensagem: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADICIONA_CONTATO_EMAIL:
      return { ...state, adiciona_contato_email: action.payload };
    case ADICIONA_CONTATO_ERRO:
      return {
        ...state,
        adiciona_contato_erro: action.payload,
        loading: false,
      };
    case ADICIONA_CONTATO_SUCESSO:
      return {
        ...state,
        adiciona_contato_sucesso: action.payload,
        adiciona_contato_email: '',
        loading: false,
      };
    case LOADING_CADASTRO:
      return { ...state, loading: true };
    case MODIFICA_MENSAGEM:
      return { ...state, mensagem: action.payload };
    case ENVIA_MENSAGEM:
      return { ...state, mensagem: '' };
    default:
      return state;
  }
};
