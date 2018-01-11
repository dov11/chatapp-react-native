import API from '../../lib/api';
import loadUser from './load';
import { Actions } from 'react-native-router-flux';
import {
  API_LOADING,
  API_READY,
  API_ERROR,
} from '../../middleware/api'

export const USER_SIGNED_IN = 'USER_SIGNED_IN';
export const USER_AUTH_ERROR = 'USER_AUTH_ERROR';
const api = new API();
const users = api.service('users');


export default (user) => {
  return (dispatch) =>{
    dispatch({ type: API_LOADING });
    console.log('here')
    api.authenticate(user)
      .then((result) => {
        dispatch({ type: API_READY });
        Actions.chatRoom();
        dispatch({
          type: USER_SIGNED_IN,
          payload: result.data
        });
      })
      .catch((error) => {
        console.log('error')
        dispatch({ type: API_ERROR, payload: error });
        Actions.signIn();
        dispatch({
          type: USER_AUTH_ERROR,
          payload: error
        })
      });
  }
}
