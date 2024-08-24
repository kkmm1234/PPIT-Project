import { useEffect} from "react"
import { useWorkout } from "../context/workoutContextHook"

//comonentes
import WorkoutIteam from '../components/workoutIteam'
import CreateWorkout from "./createWorkout"

const HomePage =() => {
    const {workouts, dispatch} = useWorkout()
    
    useEffect(() => {
        const Workouts = async () => {
            //fetch workouts from the server
            const res = await fetch('/workouts')
            const json = await res.json()

            if(res.ok){
                //dispatch from context sets json to glabal state
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }
        Workouts()
    }, [])

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