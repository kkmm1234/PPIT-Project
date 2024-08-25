import { useState } from 'react';

const Login = () => {
    const [user, setUser] = useState('');
    const [password , setPassword] = useState('');

    const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(user, password);
    
    }

    return (
        <form className = 'login' onSubmit = {handleSubmit} >
            <h3>Login</h3>

            <label>Username:</label>
            <input type = 'Username' placeholder = 'Enter Username' value = {user} onChange = {(e) => setUser(e.target.value)}></input>

            <label>Password:</label>
            <input type = 'Password' placeholder = 'Enter Password' value = {password} onChange = {(e) => setPassword(e.target.value)}></input>
            <button type = 'submit'>Login</button>
        </form>
    )
}

export default Login;