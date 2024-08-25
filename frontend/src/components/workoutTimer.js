import { useEffect, useState } from "react";
import axios from "axios";

const WorkoutTimer = () => {
    const [workouts, setWorkouts] = useState([]);  //store all workouts
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);  //track the current exercise
    const [currentSet, setCurrentSet] = useState(1);  //track the current set
    const [timeLeft, setTimeLeft] = useState(0);  //countdown timer
    const [isResting, setIsResting] = useState(false);  //track whether in rest period
    const [workoutComplete, setWorkoutComplete] = useState(false);  //track if the workout is complete

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
                        setTime: workout.setTime * 60,  //convert setTime to seconds
                        restTime: workout.restTime * 60,  //convert restTime to seconds
                    }));
                    setWorkouts(workoutData);  // Set workouts state
                    setTimeLeft(workoutData[0].setTime);  //initialize the timer
                }
            } catch (error) {
                console.error('Failed to fetch workouts:', error);
            }
        };

        fetchWorkouts();
    }, []);

    useEffect(() => {
        if (workoutComplete || workouts.length === 0) return;

        const timer = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        if (timeLeft === 0) {
            clearInterval(timer);

            if (!isResting) {
                //switch to rest time
                setIsResting(true);
                setTimeLeft(workouts[currentExerciseIndex].restTime);
            } else {
                //finished resting
                setIsResting(false);

                if (currentSet < workouts[currentExerciseIndex].sets) {
                    //move to the next set
                    setCurrentSet(prevSet => prevSet + 1);
                    setTimeLeft(workouts[currentExerciseIndex].setTime);
                } else if (currentExerciseIndex < workouts.length - 1) {
                    //move to the next exercise
                    setCurrentExerciseIndex(prevIndex => prevIndex + 1);
                    setCurrentSet(1);  // Reset set count for new exercise
                    setTimeLeft(workouts[currentExerciseIndex + 1].setTime);
                } else {
                    //all exercises and sets are completed
                    setWorkoutComplete(true);  //mark workout as complete
                    console.log('Workout complete!');
                }
            }
        }

        return () => clearInterval(timer);
    }, [timeLeft, workouts, currentExerciseIndex, currentSet, isResting, workoutComplete]);

    return (
        <div>
            {workoutComplete ? (
                <div>
                    <h2>Workout Complete!</h2>
                </div>
            ) : (
                workouts.length > 0 ? (
                    <div>
                        <h3>{workouts[currentExerciseIndex].title}</h3>
                        <p>Set: {currentSet}/{workouts[currentExerciseIndex].sets}</p>
                        <p>{isResting ? 'Rest Time' : 'Set Time'}: {timeLeft} seconds</p>
                    </div>
                ) : (
                    <p>Loading workouts...</p>
                )
            )}
        </div>
    );
};

export default WorkoutTimer;
