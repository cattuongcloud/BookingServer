import {  
    GET_TEXT,
    GET_USER
} from '../actions/types';

const initalState = {
    text: 'This is user test',
    user: []
};
export default function (state = initalState, action) {
    switch (action.type) {       
        case GET_TEXT:        
            return { ...state, text: action.payload };
        case GET_USER:        
            return { ...state, user: action.payload };     
        default:
            return state;
    }   
}
