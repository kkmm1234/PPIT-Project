import { useState } from "react";
import axios from "axios";
import { useWorkout } from "../context/workoutContextHook";
import { useUserContext } from "../context/userContextHook";

function CreateWorkout() {
    const { dispatch } = useWorkout();
    const [title, setTitle] = useState('');
    const [weight, setWeight] = useState('');
    const [reps, setReps] = useState('');
    const [sets, setSets] = useState('');
    const [setTime, setSetTime] = useState('');
    const [restTime, setRestTime] = useState('');
    const { user } = useUserContext();
    const [error, setError] = useState('');



    //function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            console.log('User not logged in');
            return;
        }

        //create a workout object with the form input values
        const workout = {
            title: title,
            weight: weight,
            reps: reps,
            sets: sets,
            setTime: setTime,
            restTime: restTime,
        };

        try
        {
            console.log('Creating workout:', workout);
            //send a POST request to the server with the data
            const response = await axios.post('/workouts/new/', workout,
                {
                    headers: {
                        Content_Type: 'application/json',
                        Authorization: `Bearer ${user.token}`
                    }
                }
            );
        

            if (response.status ===200)
                {
                    //dispatch the new workout to the global state
                    dispatch({type: 'CREATE_WORKOUT', payload: response.data})
                    setTitle('')
                    setWeight('')
                    setReps('')
                    setSets('')
                    setSetTime('')
                    setRestTime('')
                }
        }
        catch(error)
        {
            //handle error if needed
            console.log(error)
            setError('Failed to create workout. Please try again.')
        }
    };

    return (
            <form className="create" onSubmit={handleSubmit}>  
                <h2>Create a Workout!</h2>          
                <label>Add Title: </label>
                <input
                    type="text"
                    className="control"
                    value={title}
                    onChange={(e) => { setTitle(e.target.value) }}
                />

                <label>Weight: </label>
                <input
                    type="text"
                    className="form-control"
                    value={weight}
                    onChange={(e) => { setWeight(e.target.value) }}
                />

                <label>Reps: </label>
                <input
                    type="text"
                    className="control"
                    value={reps}
                    onChange={(e) => { setReps(e.target.value) }}
                />

                <label>Sets: </label>
                <input
                    type="text"
                    className="control"
                    value={sets}
                    onChange={(e) => { setSets(e.target.value) }}
                />

                <label>Amount of time per Set: </label>
                <input
                    type="text"
                    className="control"
                    value={setTime}
                    onChange={(e) => { setSetTime(e.target.value) }}
                />

                <label>Amount of time per Rest: </label>
                <input
                    type="text"
                    className="control"
                    value={restTime}
                    onChange={(e) => { setRestTime(e.target.value) }}
                />

                <button type="submit" className="btn">Create Workout</button>
                {error && <p>{error}</p>}
            </form>
    );
}

export default CreateWorkout;
