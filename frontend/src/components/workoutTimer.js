import { useEffect, useState } from "react";
import axios from "axios";
import { useUserContext } from "../context/userContextHook";

const WorkoutTimer = () => {
    const [workouts, setWorkouts] = useState([]);  //store all workouts
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);  //track the current exercise
    const [currentSet, setCurrentSet] = useState(1);  //track the current set
    const [timeLeft, setTimeLeft] = useState(0);  //countdown timer
    const [isResting, setIsResting] = useState(false);  //track if in rest period
    const [workoutComplete, setWorkoutComplete] = useState(false);  //track if workout is complete
    const [exerciseComplete, setExerciseComplete] = useState(false);  //track if current exercise is complete
    const { user } = useUserContext();

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
                    const workoutData = res.data.map(workout => ({
                        title: workout.title,
                        weight: workout.weight,
                        reps: workout.reps,
                        sets: workout.sets,
                        setTime: workout.setTime * 60,  //convert setTime to seconds
                        restTime: workout.restTime * 60,  //convert restTime to seconds
                    }));
                    setWorkouts(workoutData);  //set workouts state
                    setTimeLeft(workoutData[0].setTime);  //initialize the timer with the first exercise's set time
                }
            } catch (error) {
                console.error('Failed to fetch workouts:', error);
            }
        };

        fetchWorkouts();
    }, [user]);

    useEffect(() => {
        if (workoutComplete || workouts.length === 0 || exerciseComplete) return;

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
                } else {
                    //mark exercise as complete, wait for user to start the next one
                    setExerciseComplete(true);
                }
            }
        }

        return () => clearInterval(timer);
    }, [timeLeft, workouts, currentExerciseIndex, currentSet, isResting, exerciseComplete, workoutComplete]);

    const handleNextExercise = () => {
        if (currentExerciseIndex < workouts.length - 1) {
            setCurrentExerciseIndex(prevIndex => prevIndex + 1);
            setCurrentSet(1);  //reset set count for new exercise
            setTimeLeft(workouts[currentExerciseIndex + 1].setTime);
            setExerciseComplete(false);
        } else {
            setWorkoutComplete(true);
            console.log('Workout complete!');
        }
    };

    return (
        <div>
            {workoutComplete ? (
                <div>
                    <h2>Workout Complete!</h2>
                </div>
            ) : (
                workouts.length > 0 ? (
                    <div>
                        <h2>{workouts[currentExerciseIndex].title}</h2>
                        <h3>Weight: {workouts[currentExerciseIndex].weight}kg</h3>
                        <h3>Reps: {workouts[currentExerciseIndex].reps}</h3>
                        <h3>Set: {currentSet}/{workouts[currentExerciseIndex].sets}</h3>
                        <h3>{isResting ? 'Rest Time' : 'Set Time'}: {timeLeft} seconds</h3>
                        {exerciseComplete && (
                            <button onClick={handleNextExercise}>Next Exercise</button>
                        )}
                    </div>
                ) : (
                    <p>Loading workouts...</p>
                )
            )}
        </div>
    );
};

export default WorkoutTimer;
