import { useEffect} from "react"
import { useWorkout } from "../context/workoutContextHook"
import axios from "axios";

//comonentes
import WorkoutIteam from '../components/workoutIteam'
import CreateWorkout from "./createWorkout"

const HomePage =() => {
    const {workouts, dispatch} = useWorkout()
    
    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                //fetch workouts from the server
                const res = await axios.get('/workouts');

                //check if the request was successful
                if (res.status === 200) {
                    //dispatch the workouts to the global state
                    dispatch({ type: 'SET_WORKOUTS', payload: res.data });
                }
            } catch (error) {
                console.error('Failed to fetch workouts:', error);
            }
        };

        fetchWorkouts();
    }, [dispatch]);

    return(
        <div className="home">
            <div className="workout-details">
                {workouts && workouts.map((workout) => (
                   <WorkoutIteam key ={workout._id} workout={workout}/>
                ))}
            </div>
            <div className="workout-create">
                <CreateWorkout/>
            </div>
        </div>
    )
}

export default HomePage