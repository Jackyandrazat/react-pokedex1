/* eslint-disable no-global-assign */
import React, { useEffect,useState } from 'react'
import axios from 'axios';
  
  function addPokemon(pokemon) {
    // Ambil data dari local storage (jika ada)
    const existingData = localStorage.getItem("myPokemon");
  
    // Jika data tidak ditemukan, buat array kosong
    const myPokemon = existingData ? JSON.parse(existingData) : [];
  
    const isDataExist = myPokemon.some((p) => p.name === pokemon.name);
  
    if (isDataExist) {
      alert("Pokemon sudah ada!");
    } else {
      // Tambahkan pokemon yang dipilih ke dalam array myPokemon
      myPokemon.push(pokemon);
      // Simpan data ke local storage
      localStorage.setItem("myPokemon", JSON.stringify(myPokemon));
      // Tampilkan pesan sukses
      alert("Pokemon berhasil ditambahkan ke koleksi kamu!");
    }
  }
  
  

export default function ListPokemonts() {
  const [pokemons, setPokemons] = useState([]);


  const fetchPokemons = async () => {
    try {
      const response = await axios.get('http://localhost:4000/pokemons');
      console.log("response" , response.data);
      const pokemonList = response.data.data;
      setPokemons(pokemonList);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPokemons();
  }, []);


  return (
    <div className="">
      <div className="grid mb-8 grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {pokemons.map((item,index) => (
          <div key={index} className="group relative">
            <div className="aspect-h-1 aspect-w-1 w-full my-8 overflow-hidden rounded-lg drop-shadow-lg xl:aspect-h-8 xl:aspect-w-7">
              <img
                src={item.avatar_url}
                alt="img"
                className="object-contain h-48 w-96 lg:h-48 lg:w-96"
              />
            </div>
            <h3 className="mt-4 ml-2 text-lg text-base-100 font-bold">{item.name_pokemon }</h3>
            <div className="mt-5 relative">
              <a  href={`/detail/${item.id}`} className='ml-2 text-sm text-thirdColor hover:link-hover'>See Details</a>
              <button onClick={()=> addPokemon(item)} className="btn absolute btn-sm top-0 right-5 bg-thirdColor border-0 text-neutral-900 hover:bg-fourthColor"> + </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
