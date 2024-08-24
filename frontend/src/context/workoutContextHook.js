import { workoutContext } from "./workoutContext";
import { useContext } from "react";

export const useWorkout = () => {
 const context = useContext(workoutContext);

 return context;
}