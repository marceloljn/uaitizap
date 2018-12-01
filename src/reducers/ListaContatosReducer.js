import { LISTA_CONTATO_USUARIO } from '../actions/Types';

const INITIAL_STATE = {
  lista: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LISTA_CONTATO_USUARIO:
      return action.payload;
    default:
      return state;
  }
};
