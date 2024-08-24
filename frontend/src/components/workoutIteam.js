import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useWorkout } from '../context/workoutContextHook';

function WorkoutItem({ workout }) {
    const { dispatch } = useWorkout();

    const deleteWorkout = async (e) => {
        e.preventDefault();

        try {
            // Send a delete request to the API to delete the workout item
            const response = await axios.delete('/workouts/delete/' + workout._id);

            if (response.status === 200) {
                // Dispatch the delete workout to the global state
                dispatch({ type: 'DELETE_WORKOUT', payload: workout._id });
            }
        } catch (error) {
            // Handle error if needed
            console.error('Error deleting workout:', error);
        }
    }
    return (
        <div className="workoutIteam">
            <Card>
                <Card.Body>
                    <h2>{workout.title}</h2>
                    <h4>WEIGHT(kg):{workout.weight}</h4>
                    <h4>REPS:{workout.reps}</h4>
                    <h4>SETS:{workout.sets}</h4>
                    <h4>SET TIME(Mins):{workout.setTime}</h4>
                    <h4>REST TIME(Mins):{workout.restTime}</h4>
                </Card.Body>
                <Button variant='danger' className='btn' onClick={deleteWorkout}>
                Delete</Button>
            </Card>
        </div>
    )
}

export default WorkoutItem;
