import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RandomQuote from './components/RandomQuote';
import BestQuotes from './components/BestQuotes';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
            <Route path={'/'} element={<Landing />} />
            <Route path={'/login'} element={<Login />} />
            <Route path={'/register'} element={<Register />} />
            <Route path={'/random'} element={<RandomQuote />} />
            <Route path={'/best'} element={<BestQuotes />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
