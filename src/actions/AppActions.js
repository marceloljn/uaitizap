import fb from 'firebase';
import b64 from 'base-64';
import {
  ADICIONA_CONTATO_EMAIL,
  ADICIONA_CONTATO_ERRO,
  ADICIONA_CONTATO_SUCESSO,
  LOADING_CADASTRO,
  LISTA_CONTATO_USUARIO,
  LISTA_CONVERSA_USUARIO,
  LISTA_CONVERSAS_USUARIO,
  MODIFICA_MENSAGEM,
  ENVIA_MENSAGEM,
} from './Types';
import _ from 'lodash';

export const modificaAdicionaContatoEmail = texto => ({
  type: ADICIONA_CONTATO_EMAIL,
  payload: texto,
});

export const adicionaContato = email => dispatch => {
  dispatch({ type: LOADING_CADASTRO });

  const emailb64 = b64.encode(email);
  fb.database()
    .ref(`/contatos/${emailb64}`)
    .once('value')
    .then(snapshot => {
      if (snapshot.val()) {
        // dados do contato que queremos adicionar
        const dadosUsuario = _.first(_.values(snapshot.val()));

        // dados do usuario atual
        const { currentUser } = fb.auth();
        const emailUsuarioB64 = b64.encode(currentUser.email);

        fb.database()
          .ref(`/usuario_contatos/${emailUsuarioB64}`)
          .push({ email, nome: dadosUsuario.nome })
          .then(() => adicionaContatoSucesso(dispatch))
          .catch(erro => adicionaContatoErro(erro.message, dispatch));
      } else {
        dispatch({
          type: ADICIONA_CONTATO_ERRO,
          payload: 'Contato não encontrado.',
        });
      }
    })
    .catch(erro => {
      adicionaContatoErro(erro.message, dispatch);
    });
};

const adicionaContatoErro = (erro, dispatch) =>
  dispatch({
    type: ADICIONA_CONTATO_ERRO,
    payload: erro,
  });

const adicionaContatoSucesso = dispatch =>
  dispatch({
    type: ADICIONA_CONTATO_SUCESSO,
    payload: true,
  });

export const habilitaInclusaoContato = () => ({
  type: ADICIONA_CONTATO_SUCESSO,
  payload: false,
});

export const contatosUsuarioFetch = () => {
  const { currentUser } = fb.auth();

  return dispatch => {
    const emailUsuarioB64 = b64.encode(currentUser.email);

    fb.database()
      .ref(`/usuario_contatos/${emailUsuarioB64}`)
      .on('value', snapshot => {
        console.log(snapshot.val());
        dispatch({ type: LISTA_CONTATO_USUARIO, payload: snapshot.val() });
      });
  };
};

export const modificaMensagem = texto => {
  return {
    type: MODIFICA_MENSAGEM,
    payload: texto,
  };
};

export const enviarMensagem = (mensagem, contatoNome, contatoEmail) => {
  const { currentUser } = fb.auth();

  return dispatch => {
    const usuarioEmailB64 = b64.encode(currentUser.email);
    const contatoEmailB64 = b64.encode(contatoEmail);

    fb.database()
      .ref(`/mensagens/${usuarioEmailB64}/${contatoEmailB64}`)
      .push({ mensagem, tipo: 'e' })
      .then(() => {
        fb.database()
          .ref(`/mensagens/${contatoEmailB64}/${usuarioEmailB64}`)
          .push({ mensagem, tipo: 'r' })
          .then(() => {
            dispatch({ type: ENVIA_MENSAGEM });
          });
      })
      .then(() => {
        fb.database()
          .ref(`/usuario_conversas/${usuarioEmailB64}/${contatoEmailB64}`)
          .set({ nome: contatoNome, email: contatoEmail })
          .then(() => {
            fb.database()
              .ref(`/contatos/${usuarioEmailB64}`)
              .once('value')
              .then(snapshot => {
                const dadosUsuario = _.first(_.values(snapshot.val()));
                fb.database()
                  .ref(
                    `/usuario_conversas/${contatoEmailB64}/${usuarioEmailB64}`
                  )
                  .set({
                    nome: dadosUsuario.nome,
                    email: currentUser.email,
                  })
                  .then(() => {});
              });
          });
      });
  };
};

export const conversaUsuarioFetch = contatoEmail => {
  const { currentUser } = fb.auth();

  return dispatch => {
    const usuarioEmailB64 = b64.encode(currentUser.email);
    const contatoEmailB64 = b64.encode(contatoEmail);

    fb.database()
      .ref(`/mensagens/${usuarioEmailB64}/${contatoEmailB64}`)
      .on('value', snapshot => {
        dispatch({
          type: LISTA_CONVERSA_USUARIO,
          payload: snapshot.val(),
        });
      });
  };
};

export const conversasUsuarioFetch = () => {
  const { currentUser } = fb.auth();

  return dispatch => {
    const emailUsuarioB64 = b64.encode(currentUser.email);

    fb.database()
      .ref(`/usuario_conversas/${emailUsuarioB64}`)
      .on('value', snapshot => {
        console.log(snapshot.val());
        dispatch({ type: LISTA_CONVERSAS_USUARIO, payload: snapshot.val() });
      });
  };
};
