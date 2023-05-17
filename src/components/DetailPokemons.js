import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


function addPokemon(pokemons) {
    // Ambil data dari local storage (jika ada)
    const existingData = localStorage.getItem("myPokemon");
  
    // Jika data tidak ditemukan, buat array kosong
    const myPokemon = existingData ? JSON.parse(existingData) : [];
  
    const isDataExist = myPokemon.some((p) => p.name === pokemons.name);
  
    if (isDataExist) {
      alert("Pokemon sudah ada!");
    } else {
      // Tambahkan pokemon yang dipilih ke dalam array myPokemon
      myPokemon.push(pokemons);
      // Simpan data ke local storage
      localStorage.setItem("myPokemon", JSON.stringify(myPokemon));
      // Tampilkan pesan sukses
      alert("Pokemon berhasil ditambahkan ke koleksi kamu!");
    }
  }


function PokemonDetail() {
    const { name } = useParams();
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
            const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const pokemonData = pokemonResponse.data;

            // Mendapatkan ability dari pokemon
            const abilityUrls = pokemonData.abilities.map(ability => ability.ability.url);
            const abilityResponses = await Promise.all(abilityUrls.map(url => axios.get(url)));
            const abilities = abilityResponses.map(response => response.data);

            const pokemonImage = pokemonResponse.data.sprites.other.dream_world.front_default;
            const pokemonWeight = pokemonData.weight;
            const pokemonHeight = pokemonData.height;
            const pokemonMove = pokemonData.moves.map(move => move.move.name);

            
        // Mengupdate state pokemon
            setPokemon({
                name: pokemonData.name,
                abilities: abilities,
                image: pokemonImage,
                weight : pokemonWeight,
                height : pokemonHeight, 
                moves : pokemonMove
                // Tambahkan data lain yang Anda inginkan
            });
        } catch (error) {
            console.log(error);
        }

    }

    if (!pokemons) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="bg-white">
                <div className="container mx-auto pt-6">
                    {/* Image gallery */}
                    <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                        <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                            <img
                                src={pokemons.image}
                                alt={pokemons.image}
                                className="h-full w-full object-center" />
                        </div>
                        <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                                <img
                                    src={pokemons.image}
                                    alt={pokemons.image}
                                    className="h-full w-full object-cover object-center" />
                            </div>
                            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                                <img
                                    src={pokemons.image}
                                    alt={pokemons.image}
                                    className="h-full w-full object-cover object-center" />
                            </div>
                        </div>
                        <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                            <img
                                src={pokemons.image}
                                alt={pokemons.image}
                                className="h-full w-full object-center" />
                        </div>
                    </div>

                    {/* Product info */}
                    <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                            <h1 className="text-2xl font-bold tracking-tight text-base-100 sm:text-3xl">{pokemons.name}</h1>
                        </div>

                        {/* Options */}
                        <div className="mt-4 lg:row-span-3 lg:mt-0">

                            <form className="mt-10">
                                <button
                                    type="submit"
                                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-thirdColor px-8 py-3 text-base font-medium text-base-100 hover:bg-fourthColor hover:text-neutral-800 focus:outline-none focus:ring-2 focus:ring-primaryColor focus:ring-offset-2"
                                    onClick={() => addPokemon(pokemons)}
                                >
                                    Add to bag
                                </button>
                            </form>
                        </div>

                        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                            {/* Description and details */}
                            <div>
                                <h3 className="font-bold text-base-100">Description</h3>

                                <div className="text-base-100">
                                    <p className='mt-2'>Abilities</p>
                                    {pokemons.abilities.map(ability => (
                                        <li key={ability.name}>
                                            <strong>{ability.name}</strong>
                                            <p>{ability.effect_entries.find(entry => entry.language.name === 'en').effect}</p>
                                        </li>
                                    ))}
                                </div>
                            </div>

                            {/* <div className="mt-10">
                                <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                                <div className="mt-4">
                                    <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                        {product.highlights.map((highlight) => (
                                            <li key={highlight} className="text-gray-400">
                                                <span className="text-gray-600">{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div> */}

                            <div className="mt-10">
                                <h2 className="text-sm font-medium text-base-100">Details</h2>

                                <div className="mt-4 space-y-1">
                                    <p className="text-sm text-base-100">Weight : {pokemons.weight}</p>
                                    <p className="text-sm text-base-100">Height : {pokemons.height}</p>
                                    <p className="text-sm text-base-100">Move : {pokemons.moves}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PokemonDetail;
