import {BrowserRouter, Routes, Route} from 'react-router-dom'

//components
import HomePage from './components/HomePage'
import UpdateWorkout from './components/updateWorkout';
import NavBar from './components/NavBar'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar/>
        <div className="pages">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path='/update/:id' element={<UpdateWorkout></UpdateWorkout>}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
 