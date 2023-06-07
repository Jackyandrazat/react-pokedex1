import React from 'react'
import ListPokemonts from '../components/ListPokemonts'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ListPokemonsPage() {
    return (
        <div className='bg-gradient-to-br from-gradient1 from-30% via-gradient5 via-60% to-gradient3 to-75%'>
            <Navbar />
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
                <h1 className="text-white py-5 font-bold text-5xl">List Pokemons</h1>
                <ListPokemonts />
            </div>
            <ToastContainer />
            <Footer />
        </div>
    )
}
