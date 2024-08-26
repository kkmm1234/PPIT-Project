import { useState } from 'react';
import { useLogin } from '../context/useLogin';

const Login = () => {
    const [user, setUser] = useState('');
    const [password , setPassword] = useState('');
    const {login, error, isLoading} = useLogin();

    const handleSubmit = async (e) => {
    e.preventDefault();
    //using userLogin hook
    await login(user, password);
    
    }

    return (
        <form className = 'login' onSubmit = {handleSubmit} >
            <h3>Login</h3>

            <label>Username:</label>
            <input type = 'Username' placeholder = 'Enter Username' value = {user} onChange = {(e) => setUser(e.target.value)}></input>

            <label>Password:</label>
            <input type = 'Password' placeholder = 'Enter Password' value = {password} onChange = {(e) => setPassword(e.target.value)}></input>
            <button type = 'submit' disabled={isLoading}>Login</button>
            {error && <p>{error}</p>}
        </form>
    )
}

export default Login;