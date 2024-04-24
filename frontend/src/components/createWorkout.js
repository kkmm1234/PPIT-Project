import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateWorkout() {
    const [title, setTitle] = useState('');
    const [weight, setWeight] = useState('');
    const [reps, setReps] = useState('');
    const [sets, setSets] = useState('');
    const [setTime, setSetTime] = useState('');
    const [restTime, setRestTime] = useState('');

    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Create a workout object with the form input values
        const workout = {
            title: title,
            weight: weight,
            reps: reps,
            sets: sets,
            setTime: setTime,
            restTime: restTime,
        };

        // Send a POST request to the server with the data
        axios.post('/workouts/new', workout)
            .then(response => {
                // Check if the response status is successful and clear form inputs
                if (response.status === 200) {
                    // Navigate to the 'HomePage' after successful submission
                    navigate('/');
                }
            })
            .catch(error => {
                // Handle errors if needed
                console.error('Error submitting data:', error);
            });
    };

    return (
        <div>
            <h2>Create a Workout!</h2>
            <form onSubmit={handleSubmit}>            
                <div className="group">
                    <label>Add Title: </label>
                    <input
                        type="text"
                        className="control"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                    />
                </div>
                <div className="group">
                    <label>Weight: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={weight}
                        onChange={(e) => { setWeight(e.target.value) }}
                    />
                </div>
                <div className="group">
                    <label>Reps: </label>
                    <input
                        type="text"
                        className="control"
                        value={reps}
                        onChange={(e) => { setReps(e.target.value) }}
                    />
                </div>
                <div className="group">
                    <label>Sets: </label>
                    <input
                        type="text"
                        className="control"
                        value={sets}
                        onChange={(e) => { setSets(e.target.value) }}
                    />
                </div>
                <div className="group">
                    <label>Amount of time per Set: </label>
                    <input
                        type="text"
                        className="control"
                        value={setTime}
                        onChange={(e) => { setSetTime(e.target.value) }}
                    />
                </div>
                <div className="group">
                    <label>Amount of time per Rest: </label>
                    <input
                        type="text"
                        className="control"
                        value={restTime}
                        onChange={(e) => { setRestTime(e.target.value) }}
                    />
                </div>
                <div>
                    <input type="submit" value="Add Workout" />
                </div>
            </form>
        </div>
    );
}

export default CreateWorkout;
