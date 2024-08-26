import { useUserContext } from "./userContextHook";
import { useWorkout } from "./workoutContextHook";

export const UserLogout = () => {
    const {dispatch} = useUserContext();
    const {dispatch: dispatchWorkout} = useWorkout();

    const logout = () => {
        dispatch({type: 'LOGOUT'});
        //remove form local storage
        localStorage.removeItem('user');

        //dispatch logout 
        dispatch({type: 'LOGOUT'});
        //update global state when logging out
        dispatchWorkout({type: 'SET_WORKOUTS'});
    }

    return {logout};
}