import axios from 'axios';
import {
  GET_USER, 
} from './types';
const ROOT_URL = 'http://localhost:3001/api';
export function getUsers(){
    return function(dispatch) {   
        axios({
          url:ROOT_URL + '/users',
          method:'get'             
        })
        .then((user) => {
          debugger
          dispatch({type: GET_USER, payload: user.data.users});        
        });   
    }
  }