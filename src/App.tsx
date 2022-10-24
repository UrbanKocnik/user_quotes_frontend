import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
            <Route path={'/'} element={<Landing />} />
            <Route path={'/login'} element={<Login />} />
            <Route path={'/register'} element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
