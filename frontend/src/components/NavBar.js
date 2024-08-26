import {Link} from 'react-router-dom'
import { UserLogout } from '../context/userLogout'
import { useUserContext } from '../context/userContextHook'


const NavBar = () => {
    //basic nave bar with links to home, login, register and start workout
    const {logout} = UserLogout()

    const {user} = useUserContext()

    const handleClick = () => {
        logout()
    
    }
    return(
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Work it Out</h1>
                </Link>
                <h3><Link to={'/workoutTimer'}>Start workout</Link></h3>
                <nav>
                    {/* only if user is logged in show welcome message and logout button */}
                    {user && (
                            <div>
                                <p>Welcome {user.username}</p>
                                <button onClick={handleClick}>Logout</button>
                            </div>
                        )}
                    {!user && (
                        <div>
                            <div><Link to="/login">Login</Link></div>
                            <div><Link to="/register">Register</Link></div>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default NavBar