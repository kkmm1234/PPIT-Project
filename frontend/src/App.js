import {BrowserRouter, Routes, Route} from 'react-router-dom'

//components
import HomePage from './components/HomePage';
import UpdateWorkout from './components/updateWorkout';
import NavBar from './components/NavBar';
import WorkoutTimer from './components/workoutTimer';
import Login from './components/login';
import Register from './components/register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar/>
        <div className="pages">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path='/update/:id' element={<UpdateWorkout></UpdateWorkout>}></Route>
            <Route path='/workoutTimer' element={<WorkoutTimer></WorkoutTimer>}></Route>
            <Route path='/login' element={<Login></Login>}></Route>
            <Route path='/register' element={<Register></Register>}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
 