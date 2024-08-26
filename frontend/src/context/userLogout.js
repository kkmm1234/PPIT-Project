import { useUserContext } from "./userContextHook";

export const UserLogout = () => {
    const {dispatch} = useUserContext();

    const logout = () => {
        dispatch({type: 'LOGOUT'});
        //remove form local storage
        localStorage.removeItem('user');

        //dispatch logout 
        dispatch({type: 'LOGOUT'});
    }

    return {logout};
}