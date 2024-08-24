//context for global state management
import { createContext, useReducer } from "react";
//create context
export const workoutContext = createContext();


//reducer
export const workoutReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload
            }
        case 'CREATE_WORKOUT':
            return {
                workouts: [...state.workouts, action.payload]
            }
        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter(workout => workout._id !== action.payload)
            }
        default:
            return state   
    }
}

//provider
export const ContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(workoutReducer, {
        workouts: null
    });

return (
    <workoutContext.Provider value={{...state, dispatch}}>
        {children}
    </workoutContext.Provider>
)
}