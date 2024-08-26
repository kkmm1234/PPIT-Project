import {createContext, useReducer, useEffect} from 'react';

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
  const [state, dispatch] = useReducer(userReducer, {
    user: null
    });
    //check if the user is already logged in when the app starts
    useEffect(() => {
        //check local storage for user data
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            //dispatch a login on global state
            dispatch({type: 'LOGIN', payload: user});
        }
    }, [])

    console.log('state:', state);

    return (
        <UserContext.Provider value={{...state, dispatch}}>
            {children}
        </UserContext.Provider>
    )
}