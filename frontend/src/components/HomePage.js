import { useEffect} from "react"
import { useWorkout } from "../context/workoutContextHook"
import { useUserContext } from "../context/userContextHook";
import axios from "axios";

//comonentes
import WorkoutIteam from '../components/workoutIteam'
import CreateWorkout from "./createWorkout"

const HomePage =() => {
    const {workouts, dispatch} = useWorkout()
    const {user} = useUserContext()
    
    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                //fetch workouts from the server
                const res = await axios.get('/workouts', {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                });

                //check if the request was successful
                if (res.status === 200) {
                    //dispatch the workouts to the global state
                    dispatch({ type: 'SET_WORKOUTS', payload: res.data });
                }
            } catch (error) {
                console.error('Failed to fetch workouts:', error);
            }
        };
        //check if the user is logged in
        if(user)
        {
            //set request only if the user is logged in
            fetchWorkouts();
        }
    }, [dispatch, user]);

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