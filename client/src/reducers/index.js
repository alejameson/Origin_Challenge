import { GET_ALL_USERS, GET_USER } from "../actions";

const initialState = {
    usersLoaded: [],
    user: [],
}

function rootReducer (state = initialState, action){
    switch(action.type){

        case GET_ALL_USERS: 
            return {
                usersLoaded: action.payload,
            }

        case GET_USER:
            return {
                user: action.payload,
            }
        
        default:
            return state;
    }
}

export default rootReducer;