/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from './auth';
import { logout } from './Logout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Navbar() {
    const navigate = useNavigate();
    const isUserLoggedIn = isLoggedIn();

    const onPressLogin = () => {
        navigate('/login')
    };

    const onPressListPokemonsIsUserLoggedIn = (e) => {
        e.preventDefault();
        if (isUserLoggedIn) {
            navigate('/listpokemons')
        } else {
            toast.warn("Please Login to Acces Page!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 200
              });
        }
    }

    const onPressMyPokemonsIsUserLoggedIn = (e) => {
        e.preventDefault();
        if (isUserLoggedIn) {
            navigate('/mypokemons')
        } else {
            toast.warn("Please Login to Acces Page!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 200
              });
            
        }
    }

    const renderAuthBtn = () => {
        if (isUserLoggedIn) {
            return (
                <button onClick={handleLogout} className="btn mr-1 bg-thirdColor border-0 hover:bg-fourthColor hover:text-neutral-900">Logout</button>
            )
            
        } else {
            return (
                <button onClick={onPressLogin} className="btn mr-1 bg-thirdColor border-0 hover:bg-fourthColor hover:text-neutral-900">Login</button>
            )
        }
    }

    const handleLogout = () => {
        logout(); // Hapus token dari local storage
        navigate('/'); // Redirect ke halaman login
    };


    return (
        <div className="navbar bg-gradient-to-r from-gradient2  to-gradient1">
        <ToastContainer />
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-outline bg-primaryColor lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-fourthColor" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-primaryColor rounded-box w-52">
                    <li><Link to="/" className='hover:bg-fourthColor hover:text-neutral-900'>Home</Link></li>
                    <li><Link to="/listpokemons" className='hover:bg-fourthColor hover:text-neutral-900' onClick={onPressListPokemonsIsUserLoggedIn}>List Pokemons</Link></li>
                    <li><Link to="/mypokemons" className='hover:bg-fourthColor hover:text-neutral-900' onClick={onPressMyPokemonsIsUserLoggedIn} >My Pokemons</Link></li>
                        
                    </ul>
                </div>
                <a className="font-bold normal-case text-xl text-base-100 ml-5">PokeDex</a>
            </div>
            <div className="navbar-center text-base-100 hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to="/" className='hover:bg-fourthColor hover:text-neutral-900'>Home</Link></li>
                    <li><Link to="/listpokemons" className='hover:bg-fourthColor hover:text-neutral-900' onClick={onPressListPokemonsIsUserLoggedIn}>List Pokemons</Link></li>
                    <li><Link to="/mypokemons" className='hover:bg-fourthColor hover:text-neutral-900' onClick={onPressMyPokemonsIsUserLoggedIn} >My Pokemons</Link></li>
                </ul>
            </div>
            <div className="navbar-end mr-5">
                {renderAuthBtn()}
            </div>
        </div>
    )
}
