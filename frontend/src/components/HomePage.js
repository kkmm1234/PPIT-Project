import { useEffect, useState } from "react"

//comonentes
import WorkoutIteam from '../components/workoutIteam'
import CreateWorkout from "./createWorkout"

const HomePage =() => {
    const[workouts, getWorkouts] = useState(null)
    useEffect(() => {
        const Workouts = async () => {
            const res = await fetch('/workouts')
            const json = await res.json()

            if(res.ok){
                getWorkouts(json)
            }
        }
        Workouts()
    }, [])

    return(
        <div className="HomePage">
            <div className="DisplayWorkouts">
                {workouts && workouts.map((workout) => (
                   <WorkoutIteam key ={workout._id} workout={workout}/>
                ))}
            </div>
            <CreateWorkout/>
        </div>
    )
}

export default HomePage