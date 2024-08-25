import { useEffect, useState } from "react";
import axios from "axios";

const WorkoutTimer = () => {
    const [workouts, setWorkouts] = useState([]);  // Store all workouts
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);  // Track the current exercise
    const [currentSet, setCurrentSet] = useState(1);  // Track the current set within an exercise
    const [timeLeft, setTimeLeft] = useState(0);  // Countdown timer
    const [isResting, setIsResting] = useState(false);  // Track whether in rest period
    const [workoutComplete, setWorkoutComplete] = useState(false);  // Track if the workout is complete
    const [exerciseComplete, setExerciseComplete] = useState(false);  // Track if the current exercise is complete

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                // Fetch workouts from the server
                const res = await axios.get('/workouts');

                // Check if the request was successful
                if (res.status === 200) {
                    const workoutData = res.data.map(workout => ({
                        title: workout.title,
                        weight: workout.weight,
                        reps: workout.reps,
                        sets: workout.sets,
                        setTime: workout.setTime * 60,  // Convert setTime to seconds
                        restTime: workout.restTime * 60,  // Convert restTime to seconds
                    }));
                    setWorkouts(workoutData);  // Set workouts state
                    setTimeLeft(workoutData[0].setTime);  // Initialize the timer with the first exercise's set time
                }
            } catch (error) {
                console.error('Failed to fetch workouts:', error);
            }
        };

        fetchWorkouts();
    }, []);

    useEffect(() => {
        if (workoutComplete || workouts.length === 0 || exerciseComplete) return;

        const timer = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        if (timeLeft === 0) {
            clearInterval(timer);

            if (!isResting) {
                // Switch to rest time
                setIsResting(true);
                setTimeLeft(workouts[currentExerciseIndex].restTime);
            } else {
                // Finished resting
                setIsResting(false);

                if (currentSet < workouts[currentExerciseIndex].sets) {
                    // Move to the next set
                    setCurrentSet(prevSet => prevSet + 1);
                    setTimeLeft(workouts[currentExerciseIndex].setTime);
                } else {
                    // Mark exercise as complete, wait for user to start the next one
                    setExerciseComplete(true);
                }
            }
        }

        return () => clearInterval(timer);
    }, [timeLeft, workouts, currentExerciseIndex, currentSet, isResting, exerciseComplete, workoutComplete]);

    const handleNextExercise = () => {
        if (currentExerciseIndex < workouts.length - 1) {
            setCurrentExerciseIndex(prevIndex => prevIndex + 1);
            setCurrentSet(1);  // Reset set count for new exercise
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
                        <h3>{workouts[currentExerciseIndex].title}</h3>
                        <p>Weight: {workouts[currentExerciseIndex].weight}kg</p>
                        <p>Reps: {workouts[currentExerciseIndex].reps}</p>
                        <p>Set: {currentSet}/{workouts[currentExerciseIndex].sets}</p>
                        <p>{isResting ? 'Rest Time' : 'Set Time'}: {timeLeft} seconds</p>
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
