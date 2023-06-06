import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// export const getToken = () => localStorage.getItem('authToken')
//   ? JSON.parse(localStorage.getItem('authToken'))
//   : null;

// export const getAuthorizationHeader = () => `Bearer ${getToken()}`;

export default function ListPokemonts() {
  const [pokemons, setPokemons] = useState([]);

  const fetchPokemons = async () => {
    try {
      const getAuthToken = localStorage.getItem('authToken')
      const config = {
        headers: {
          Authorization: `Bearer ${getAuthToken}` // Sertakan token autentikasi dalam header permintaan
        }
      };
      const response = await axios.get('http://localhost:4000/pokemons', config);
      console.log('response', response.data);
      const pokemonList = response.data.data;
      setPokemons(pokemonList);
    } catch (error) {
      console.log(error);
    }
  };

  const addPokemon = async (item) => {
    try {
      const getLocalStorageToken = localStorage.getItem('authToken');
      // let user = JSON.parse(sessionStorage.getItem('data'));

      console.log(getLocalStorageToken, 'auth Token ')
      const config = {
        headers: {
          Authorization: `Bearer ${getLocalStorageToken}`
        }
    };
    
      const bodyParameters = {
        id_pokemons: item.id,
      };
    
  
      const existingDataDb = await axios.get('http://localhost:4000/pokemons/collection', {
        headers: {
          Authorization: `Bearer ${getLocalStorageToken}`
        },  
        params: {
          id_pokemons: item.id,
         },
      });
  
      if (existingDataDb.data.data.find(data => data.pokemons_id === item.id)) {
        toast.error("Pokemon already exists",{
          autoClose: 200
        })
        return;      
      }

      const response = await axios.post('http://localhost:4000/pokemons/collection', bodyParameters, config);
      toast.success("Pokemon Added",{
        autoClose: 1000
      })
      console.log('Data berhasil ditambahkan ke database:', response.data);
    } catch (error) {
      console.log('Gagal menambahkan data ke database:', error.message);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <div className="">
    <ToastContainer />
      <div className="grid mb-8 grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {pokemons.map((item, index) => (
          <div key={index} className="group relative">
            <div className="aspect-h-1 aspect-w-1 w-full my-8 overflow-hidden rounded-lg drop-shadow-lg xl:aspect-h-8 xl:aspect-w-7">
              <img
                src={item.avatar_url}
                alt="img"
                className="object-contain h-48 w-96 lg:h-48 lg:w-96"
              />
            </div>
            <h3 className="mt-4 ml-2 text-lg text-base-100 font-bold">{item.name_pokemon}</h3>
            <div className="mt-5 relative">
              <a href={`/detail/${item.id}`} className="ml-2 text-sm text-thirdColor hover:link-hover">
                See Details
              </a>
              <button
                onClick={() => addPokemon(item)}
                className="btn absolute btn-sm top-0 right-5 bg-thirdColor border-0 text-neutral-900 hover:bg-fourthColor"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
