import { ACTION_LOADED, ADD_ACTION, ADD_ACTIONS_USER, GET_ACTION_BY_SYMBOL, GET_ACTION_DATA, GET_ALL_ACTIONS, GET_ALL_USERS, GET_USER, REMOVE_ACTION } from "../actions";

const initialState = {
    usersLoaded: [],
    user: [],
    actionsLoaded: [],
    userActions:[],
    actionBySymbol: "",
    actionData: "",
}

function rootReducer (state = initialState, action){
    switch(action.type){

        case GET_ALL_USERS: 
            return {
                ...state,
                usersLoaded: action.payload,
            }

        case GET_USER:
            return {
                ...state,
                user: action.payload,
            }

        case GET_ALL_ACTIONS:
            return {
                ...state,
                actionsLoaded: action.payload
            }
        
        case ADD_ACTION:
            return {
                ...state,
                user: action.payload,
            }

        case ACTION_LOADED:
            return {
                ...state,
                userActions: action.payload,
            }

        case REMOVE_ACTION:
            return {
                ...state,
                userActions: state.userActions.filter((a) => a.symbol !== action.payload),
            }

        case ADD_ACTIONS_USER: 
            return {
                ...state,
                userActions: state.userActions.concat(state.actionsLoaded.filter((a) => a.symbol === action.payload))
            }

        case GET_ACTION_BY_SYMBOL:
            return {
                ...state,
                actionBySymbol: state.actionsLoaded.filter((a) => a.symbol === action.payload),
            }

        case GET_ACTION_DATA:
            return {
                ...state,
                actionData: action.payload.values
            }

        default:
            return state;
    }
}

export default rootReducer;