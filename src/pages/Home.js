import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import HeroVideo from '../components/HeroVideo';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  return (
  <div className='bg-gradient-to-br from-gradient1 from-30% via-gradient5 via-60% to-gradient3 to-75%'>
    <Navbar />
    <Hero />
    <HeroVideo />
    <ToastContainer />
    <Footer />
  </div>

  );
}

export default Home;
