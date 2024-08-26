import {Link} from 'react-router-dom'
import { UserLogout } from '../context/userLogout'

const NavBar = () => {
    const {logout} = UserLogout()

    const handleClick = () => {
        logout()
    }
    return(
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Work it Out</h1>
                </Link>
                <Link to={'/workoutTimer'}>Start workout</Link>
                <nav>
                    <div>
                        <button onClick={handleClick}>Logout</button>
                    </div>
                    <div>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default NavBar