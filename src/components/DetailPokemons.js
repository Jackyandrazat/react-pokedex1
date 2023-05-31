import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// function addPokemon(pokemons) {
//     // Ambil data dari local storage (jika ada)
//     const existingData = localStorage.getItem("myPokemon");
  
//     // Jika data tidak ditemukan, buat array kosong
//     const myPokemon = existingData ? JSON.parse(existingData) : [];
  
//     const isDataExist = myPokemon.some((p) => p.name === pokemons.name);
  
//     if (isDataExist) {
//       alert("Pokemon sudah ada!");
//     } else {
//       // Tambahkan pokemon yang dipilih ke dalam array myPokemon
//       myPokemon.push(pokemons);
//       // Simpan data ke local storage
//       localStorage.setItem("myPokemon", JSON.stringify(myPokemon));
//       // Tampilkan pesan sukses
//       alert("Pokemon berhasil ditambahkan ke koleksi kamu!");
//     }
//   }


function PokemonDetail() {
    const { id } = useParams();
    console.log("id params: ",id);
    // console.log("name", name)
    //   console.log("id" , id)
    const [pokemons, setPokemon] = useState(null);

    useEffect(() => {
        getPokemonDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    

    const getPokemonDetail = async () => {
        try {
            // Mengambil data pokemon
            const pokemonResponse = await axios.get(`http://localhost:4000/pokemons/${id}`);
            const pokemonData = pokemonResponse.data.data;
            console.log("pokemons data :", pokemonData);

            // // Mendapatkan ability dari pokemon
            // const abilityUrls = pokemonData.abilities.map(ability => ability.ability.url);
            // const abilityResponses = await Promise.all(abilityUrls.map(url => axios.get(url)));
            // const abilities = abilityResponses.map(response => response.data);

            // const pokemonImage = pokemonResponse.data.sprites.other.dream_world.front_default;
            // const pokemonWeight = pokemonData.weight;
            // const pokemonHeight = pokemonData.height;
            // const pokemonMove = pokemonData.moves.map(move => move.move.name);

            
        // Mengupdate state pokemon
            setPokemon(pokemonData);
        } catch (error) {
            console.log(error);
        }

    }

    const addPokemon = async (e,item) => {
        e.preventDefault();
        try {
          const getLocalStorageIdUser = localStorage.getItem('idUserLogged');
          const data = {
            id_pokemons: item.id,
            id_user: getLocalStorageIdUser,
          };

          const existingDataDb = await axios.get('http://localhost:4000/pokemons/collection', {
        params: {
          id_pokemons: item.id,
          id_user: getLocalStorageIdUser,
         },
        });
    
        if (existingDataDb.data.data.find(data => data.pokemons_id === item.id)) {
            toast.error("Pokemon already exists",{
            autoClose: 200
            })
            return;      
        }
          
          const response = await axios.post('http://localhost:4000/pokemons/collection', data);
          toast.success("Pokemon Added",{
            autoClose: 1000
          })
          console.log('Data berhasil ditambahkan ke database:', response.data);
        } catch (error) {
          console.log('Gagal menambahkan data ke database:', error.message);
        }
      };

    if (!pokemons) {
        return <div>Loading...</div>;
    }

    return (
        <div className=''>
        <ToastContainer />
        {pokemons.map((item, index) => (
            <div key={index} className="bg-white">
                <div className="container mx-auto pt-6">
                    {/* Image gallery */}
                    <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-4xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                        <div className="aspect-h-2 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                            <img
                                src={item.avatar_url}
                                alt="img"
                                className="h-auto w-auto object-center" />
                        </div>
                        <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                            <img
                                src={item.avatar_url}
                                alt="img"
                                className="h-auto w-auto object-center" />
                        </div>
                    </div>

                    {/* Product info */}
                    <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                            <h1 className="text-2xl font-bold tracking-tight text-base-100 sm:text-3xl">{item.name_pokemon}</h1>
                        </div>

                        {/* Options */}
                        <div className="mt-4 lg:row-span-3 lg:mt-0">

                            <form className="mt-10">
                                <button
                                    type="submit"
                                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-thirdColor px-8 py-3 text-base font-medium text-base-100 hover:bg-fourthColor hover:text-neutral-800 focus:outline-none focus:ring-2 focus:ring-primaryColor focus:ring-offset-2"
                                    onClick={(e) => addPokemon(e, item)}
                                >
                                    Add to bag
                                </button>
                            </form>
                        </div>

                        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-8 lg:pr-8 lg:pt-6">
                            {/* Description and details */}
                            <div>
                                <h3 className="font-bold text-base-100">Description</h3>

                                <div className="text-base-100">
                                    <p className='mt-2'>Abilities</p>
                                    <h5>{item.ability_pokemon}</h5>
                                </div>
                            </div>

                            <div className="mt-10">
                                <h2 className="text-sm font-medium text-base-100">Details</h2>

                                <div className="mt-4 space-y-1">
                                    <p className="text-sm text-base-100">
                                    Type : {item.type_pokemon}</p>
                                    <p className="text-sm text-base-100">
                                    Deskripsi : {item.desckripsi_pokemon}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ))}
        </div>
    );
}

export default PokemonDetail;
