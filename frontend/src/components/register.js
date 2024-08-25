import { useState } from 'react';

const register = () => {
    const [user, setUser] = useState('');
    const [password , setPassword] = useState('');

    const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(user, password);
    
    }

    return (
        <form className = 'register' onSubmit = {handleSubmit} >
            <h3>Register</h3>

            <label>Username:</label>
            <input type = 'text' placeholder = 'Enter Username' value = {user} onChange = {(e) => setUser(e.target.value)}></input>

            <label>Password:</label>
            <input type = 'text' placeholder = 'Enter Password' value = {user} onChange = {(e) => setPassword(e.target.value)}></input>
            <button type = 'submit'>Register</button>
        </form>
    )
}

export default register;