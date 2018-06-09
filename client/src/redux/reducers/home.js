import {  
    GET_TEXT
} from '../actions/types';

const initalState = {
    text: 'This is text'
};
export default function (state = initalState, action) {
    switch (action.type) {       
        case GET_TEXT:
        debugger
            return { ...state, text: action.payload };    
        default:
            return state;
    }   
}
