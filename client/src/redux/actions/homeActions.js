
import {GET_TEXT} from './types';

export function getText(text) {
  return { type: GET_TEXT, payload: text }
 
}

