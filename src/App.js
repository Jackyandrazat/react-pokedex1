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


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/listpokemons" element={<ListPokemonsPage/>} />
          <Route path="/mypokemons" element={<MyPokemonsPage/>} />
          <Route path="/videopage" element={<VideoPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/detail/:name" element={<DetailPage/>} />
        </Routes>
      </Router>
    </>

  );
}

export default App;
