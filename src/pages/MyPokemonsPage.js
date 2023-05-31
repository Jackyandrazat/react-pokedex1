import Footer from '../components/Footer';
import MyPokemons from '../components/MyPokemons';
import Navbar from '../components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function MyPokemonsPage() {
  return (
  <div className='bg-secondaryColor'>
    <Navbar />
    <MyPokemons />
    <ToastContainer />
    <Footer />
  </div>

  );
}

export default MyPokemonsPage;
