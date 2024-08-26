import {useState} from 'react'
import {useUserContext} from '../context/userContextHook'
import axios from 'axios'; 

export const useRegister = () => {
     //creating a state variable
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null); 
    const {dispatch} = useUserContext();

    const register = async (user, password) => {
        setIsLoading(true); //setting 'isLoading' to true
        setError(null); //clearing the 'error' state

        try {
            //making a POST request to the server
            const response = await axios.post('/register', {
                username: user,
                password: password
            }, {
                headers: {'Content-Type': 'application/json'}
            });

            const json = response.data;

            //successful response handling
            localStorage.setItem('user', JSON.stringify(json));

            //update the user context
            dispatch({ type: 'LOGIN', payload: json });

            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);

            //error handling
            if (error.response) {
                setError(error.response.data.error);
            } else {
                setError('Registration failed. Please try again.');
            }
        }
    }

    return {register, error, isLoading};
}
