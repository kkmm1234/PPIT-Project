import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useWorkout } from '../context/workoutContextHook';
import { useUserContext } from '../context/userContextHook';

function WorkoutItem({ workout }) {
    const { dispatch } = useWorkout();
    const { user } = useUserContext();

    const deleteWorkout = async (e) => {
        e.preventDefault();

        try {
            //send a delete request
            const response = await axios.delete('/workouts/delete/' + workout._id, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            );

            if (response.status === 200) {
                //dispatch the delete workout to the global state
                dispatch({ type: 'DELETE_WORKOUT', payload: workout._id });
            }
        } catch (error) {
            //handle error if needed
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
                <button className='btn'><Link to={'/update/'+workout._id}>Update</Link></button>
            </Card>
        </div>
    )
}

export default WorkoutItem;
