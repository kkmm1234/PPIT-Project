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
                workouts: [action.payload, ...state.workouts]
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