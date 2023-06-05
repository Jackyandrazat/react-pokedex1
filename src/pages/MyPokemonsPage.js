import Footer from '../components/Footer';
import MyPokemons from '../components/MyPokemons';
import Navbar from '../components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function MyPokemonsPage() {
  return (
  <div className='bg-gradient-to-br from-gradient1 from-30% via-gradient5 via-60% to-gradient3 to-75%'>
    <Navbar />
    <MyPokemons />
    <ToastContainer />
    <Footer />
  </div>

  );
}

export default MyPokemonsPage;
