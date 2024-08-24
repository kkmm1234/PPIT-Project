//context for page reload
import { createContext } from "react";
//create context
export const workoutContext = createContext();

//provider
export const ContextProvider = ({children}) => {
return (
    <workoutContext.Provider>
        {children}
    </workoutContext.Provider>
)
}