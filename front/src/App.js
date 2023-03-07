import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Demo from './component/Dashboard';
import Login from './component/Login';
import Signup from './component/Signup';

function App() {
  var token = localStorage.getItem("token");
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login></Login>}></Route>
          <Route path='/signup' element={<Signup></Signup>}></Route>
          <Route path='*' element={<Login/>}></Route>

          {
           <Route path='/dashboard' element={token ? <Demo /> : <Login/>} />

          }
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
