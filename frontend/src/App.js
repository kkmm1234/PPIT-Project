import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useUserContext } from './context/userContextHook';

//components
import HomePage from './components/HomePage';
import UpdateWorkout from './components/updateWorkout';
import NavBar from './components/NavBar';
import WorkoutTimer from './components/workoutTimer';
import Login from './components/login';
import Register from './components/register';

function App() {
  const {user} = useUserContext()
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar/>
        <div className="pages">
          <Routes>
            <Route path="/" element={ user? <HomePage /> : <Navigate to = "/login"/>} />
            <Route path='/update/:id' element={!user ?<UpdateWorkout/> : <Navigate to = "/"/>}></Route>
            <Route path='/workoutTimer' element={user ?<WorkoutTimer/> : <Navigate to = "/"/>}></Route>
            <Route path='/login' element={!user ?<Login/> : <Navigate to = "/"/>}></Route>
            <Route path='/register' element={ !user ?<Register/> : <Navigate to = "/"/>}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
 