
import './App.css';
import {
  Route,
  Routes
}
  from "react-router-dom";
  
import NoteState from './context/notes/NoteState';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import Landing from './components/Landing';


function App() {
 
  return (
    <>
      <NoteState>
        <Navbar />

        <Routes>
          <Route exact path='/' element={<Landing/>}></Route>
          <Route exact path='/Home' element={<Home/>}></Route>
          <Route exact path='/About' element={<About />}></Route>
          <Route exact path='/Login' element={<Login />}></Route>
          <Route exact path='/Signup' element={<Signup />}></Route>
        </Routes>

      </NoteState>
    </>
  )
}

export default App;
