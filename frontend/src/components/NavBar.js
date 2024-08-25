import {Link} from 'react-router-dom'

const NavBar = () => {
    return(
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Work it Out</h1>
                </Link>
                <Link to={'/workoutTimer'}>Start workout</Link>
            </div>
        </header>
    )
}

export default NavBar