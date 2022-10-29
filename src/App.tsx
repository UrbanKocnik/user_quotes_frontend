import './styles/styles'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Profile from './pages/Profile';
import ViewUser from './pages/ViewUser';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
            <Route path={'/'} element={<Landing />} />
            <Route path={'/login'} element={<Login />} />
            <Route path={'/register'} element={<Register />} />
            <Route path={'/profile'} element={<Profile />} />
            <Route path={'/user/:id/view'} element={<ViewUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
