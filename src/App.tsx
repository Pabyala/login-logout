import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login';
import Register from './Components/Register';
import Dashboard from './Components/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
