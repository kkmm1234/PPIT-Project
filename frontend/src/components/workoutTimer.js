import { useEffect, useState } from "react";
import axios from "axios";

const WorkoutTimer = () => {
    const [workouts, setWorkouts] = useState([]);  //store all workouts
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0); //track the current exercise
    const [currentSet, setCurrentSet] = useState(1); //track the current set
    const [timeLeft, setTimeLeft] = useState(0); //countdown timer
    const [isResting, setIsResting] = useState(false); //track whether in rest period

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                //fetch workouts from the server
                const res = await axios.get('/workouts');

                //check if the request was successful
                if (res.status === 200) {
                    const workoutData = res.data.map(workout => ({
                        title: workout.title,
                        sets: workout.sets,
                        setTime: workout.setTime * 60, //convert minutes to seconds
                        restTime: workout.restTime * 60,
                    }));
                    setWorkouts(workoutData);  //set workouts state
                    setTimeLeft(workoutData[0].setTime);  //initialize the timer with the first exercises set time
                }
            } catch (error) {
                console.error('Failed to fetch workouts:', error);
            }
        };

        fetchWorkouts();
    }, []);

    useEffect(() => {
        //only start timer if there are workouts
        if (workouts.length === 0) return;

        //timer to countdown each second
        const timer = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        //when the timer reaches 0
        if (timeLeft === 0) {
            clearInterval(timer);

            if (!isResting) {
                //transition to resting
                setIsResting(true);
                setTimeLeft(workouts[currentExerciseIndex].restTime);
            } else {
                //check if need to move to the next set or exercise
                setIsResting(false);

                if (currentSet < workouts[currentExerciseIndex].sets) {
                    //move to the next set 
                    setCurrentSet(prevSet => prevSet + 1);
                    setTimeLeft(workouts[currentExerciseIndex].setTime);
                } else if (currentExerciseIndex < workouts.length - 1) {
                    //move to the next exercise
                    setCurrentExerciseIndex(prevIndex => prevIndex + 1);
                    setCurrentSet(1); //reset to the first set of the next exercise
                    setTimeLeft(workouts[currentExerciseIndex + 1].setTime);
                } else {
                    //all exercises are complete
                    console.log('Workout complete!');
                }
            }
        }

        return () => clearInterval(timer); //clean up the interval
    }, [timeLeft, workouts, currentExerciseIndex, currentSet, isResting]);

    return (
        <div>
            {workouts.length > 0 ? (
                <div>
                    <h3>{workouts[currentExerciseIndex].title}</h3>
                    <p>Set: {currentSet}/{workouts[currentExerciseIndex].sets}</p>
                    <p>{isResting ? 'Rest Time' : 'Set Time'}: {timeLeft} seconds</p>
                </div>
            ) : (
                <p>Loading workouts...</p>
            )}
        </div>
    );
};

export default WorkoutTimer;
