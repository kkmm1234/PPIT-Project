import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function WorkoutItem({ workout }) {
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
                <Button variant='danger' onClick={(e) => {
                    e.preventDefault();
                    // Send a delete request to the API to delete the workout item
                    axios.delete('/workouts/delete/' + workout._id)
                        .then(response => {
                            console.log("wokout deleted")
                        })
                        .catch(error => {
                            // Handle error if needed
                            console.error('Error deleting workout:', error);
                        });
                }}>Delete</Button>
            </Card>
        </div>
    )
}

export default WorkoutItem;
