import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUserContext } from "../context/userContextHook";

export default function UpdateWorkout() {
    let { id } = useParams(); // ID parameter from the URL

    // State variables to manage form input values
    const [title, setTitle] = useState('');
    const [weight, setWeight] = useState('');
    const [reps, setReps] = useState('');
    const [sets, setSets] = useState('');
    const [setTime, setSetTime] = useState('');
    const [restTime, setRestTime] = useState('');
    const { user } = useUserContext();

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the specific travel item based on the ID
        axios.get('/workouts/' + id , {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }
        )
            .then((response) => {
                //Set state with the retrieved data
                setTitle(response.data.title);
                setWeight(response.data.weight);
                setReps(response.data.reps);
                setSets(response.data.sets);
                setSetTime(response.data.setTime);
                setRestTime(response.data.restTime);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id, user]); //dependency array

    const handleSubmit = (e) => {
        e.preventDefault();

        //create a travel object with updated form input values
        const workout = {
            title: title,
            weight: weight,
            reps: reps,
            sets: sets,
            setTime: setTime,
            restTime: restTime,
        };

        //send a patch request to update
        axios.patch('/workouts/update/' + id, workout)
            .then((res) => {
                //navigate to the homepage
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
            {/* form to edit a workout */}
            <h2>Edit your workout!</h2>
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
                        className="fcontrol"
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
                    <label>SetTime: </label>
                    <input
                        type="text"
                        className="control"
                        value={setTime}
                        onChange={(e) => { setSetTime(e.target.value) }}
                    />
                </div>
                <div className="group">
                    <label>RestTime </label>
                    <input
                        type="text"
                        className="control"
                        value={restTime}
                        onChange={(e) => { setRestTime(e.target.value) }}
                    />
                </div>
                <div>
                    <button className="btn" type="submit">Edit Workout</button>
                </div>
            </form>
        </div>
    );
}
