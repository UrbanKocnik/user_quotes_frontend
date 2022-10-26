import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RandomQuote from './components/RandomQuote';
import BestQuotes from './components/BestQuotes';
import RecentQuotes from './components/RecentQuotes';
import WelcomeGuest from './components/WelcomeGuest';

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
            <Route path={'/recent'} element={<RecentQuotes />} />
            <Route path={'/welcome'} element={<WelcomeGuest />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
