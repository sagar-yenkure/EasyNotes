
import './App.css';
import {
  Route,
  Routes
}
  from "react-router-dom";
  
import NoteState from './context/notes/NoteState';
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Landing from './pages/Landing';


function App() {
 
  return (
    <>
      <NoteState>
        {/* <Navbar /> */}

        <Routes>
          <Route exact path='/' element={<Landing/>}></Route>
          <Route exact path='/Home' element={<Home/>}></Route>
          <Route exact path='/Login' element={<Login />}></Route>
          <Route exact path='/Signup' element={<Signup />}></Route>
        </Routes>

      </NoteState>
    </>
  )
}

export default App;
