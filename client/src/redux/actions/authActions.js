import axios from 'axios';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE 
} from './types';
//import { stringify } from 'querystring';

const ROOT_URL = 'http://localhost:3001/api';

export function signinUser({ email, password }, callback) { 
  return function(dispatch) {    
    // Submit email/password to the server
    axios.post(ROOT_URL + "/users/login", { email, password })
      .then(response => {   
        localStorage.setItem('token', response.data.tokens[0].token);  
        dispatch({ type: AUTH_USER, payload: response.data });       
       if(callback){
        callback();
       }
      })
      .catch((err) => {        
        if(err){
          dispatch(authError('there are some errors'));
        }
        
      });
  }
}

export function signupUser({ email, password }, callback) {
  return function(dispatch) {
    axios.post(ROOT_URL + "/users", { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER, payload: response.data });
        localStorage.setItem('token', response.data.token);
        if(callback){
          callback();
        }        
      })
      .catch(response => dispatch(authError(response.data.error)));
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

// export function signoutUser() {
//   localStorage.removeItem('token');

//   return { type: UNAUTH_USER };
// }

// export const signoutUser = (callback) => dispatch => {
  
//   try {
   
//     const response = await axios.delete(ROOT_URL + '/users/me/token', { headers: { 'x-auth': localStorage.getItem('token') }});
//     debugger
//     if(response){
//       localStorage.removeItem('token');
//       dispatch({ type: UNAUTH_USER });
//       callback();
//     } 
//   } catch (e) {
//     dispatch({ type: AUTH_ERROR, payload: 'signout error' });
//   }
// };
// export function getUser(token, callback) {
//   axios({
//     url:ROOT_URL + '/users/me',
//     method:'get',    
//     headers:{'x-auth':token}
//   })
//   .then((user) => {
//     debugger;     
//     if(callback){
//       callback(user);
//     }        
//   })
// }


export function signoutUser(callback) {
  return function(dispatch) {
    axios({
      url:ROOT_URL + '/users/me/token',
      method:'delete',    
      headers:{'x-auth':localStorage.getItem('token')}
    })
    .then(() => {
      debugger
      localStorage.removeItem('token');
      dispatch({ type: UNAUTH_USER });
      if(callback){
        callback();
      }        
    })     
  }
}

export function getSigninUser(){
  return function(dispatch) {   
      axios({
        url:ROOT_URL + '/users/me',
        method:'get',    
        headers:{'x-auth':localStorage.getItem('token')}
      })
      .then((user) => {
        dispatch({type: 'AUTH_USER', payload: user.data});        
      });   
  }
}
export function fetchMessage() {
  return function(dispatch) {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        });
      });
  }
}
