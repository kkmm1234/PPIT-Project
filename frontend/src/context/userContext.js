import {createContext, useReducer} from 'react';

export const UserContext = createContext();

export const userReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN':
            return {user: action.payload};
        case 'LOGOUT':
            return {user: null}
        default:
            return state
    }
}

export const UserProvider = ({children}) => {
  const [state, dispatch] = useReducer((useReducer) => {
    user: null
    });

    console.log('state:', state);

    return (
        <UserContext.Provider value={{...state, dispatch}}>
            {children}
        </UserContext.Provider>
    )
}