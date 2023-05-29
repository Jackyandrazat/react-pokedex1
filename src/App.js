import './App.css';
import {
  BrowserRouter as Router, 
  Route,
  Routes,
} from  "react-router-dom";

import Home from "./pages/Home"
import MyPokemonsPage from './pages/MyPokemonsPage';
import VideoPage from './pages/VideoPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ListPokemonsPage from './pages/ListPokemonsPage';
import DetailPage from './pages/DetailPage';
import { isLoggedIn } from '../src/components/auth';
import { Navigate } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/listpokemons" element={isLoggedIn() ? <ListPokemonsPage /> : <Navigate to="/" />} />
          <Route path="/mypokemons" element={isLoggedIn() ? <MyPokemonsPage /> : <Navigate to="/" />} />
          <Route path="/videopage" element={<VideoPage/>} />
          <Route path="/login" element={isLoggedIn() ? <Navigate to="/" /> : <LoginPage />} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/detail/:id" element={<DetailPage/>} />
        </Routes>
      </Router>
    </>

  );
}

export default App;
