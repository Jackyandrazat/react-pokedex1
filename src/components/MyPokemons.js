/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


export default function MyPokemons() {
    
    const [myPokemon, setMyPokemons] = useState([]);


    const getMyPokemons = async () => {
        try {
        const getAuthToken = localStorage.getItem('authToken')
        const config = {
            headers: {
            Authorization: `Bearer ${getAuthToken}` // Sertakan token autentikasi dalam header permintaan
            }
        };
            const response = await axios.get(`http://localhost:4000/pokemons/collection/`, config);
            console.log('response', response.data);
            const mypokemonList = response.data.data;
            setMyPokemons(mypokemonList);
          } catch (error) {
            console.log(error);
          }
    };

    useEffect(() => {
        getMyPokemons();
    }, []);

    //fungsi delete local storage yg simple dan diambil berdasarkan id  dan memiliki kelemahan
    // karna parameters "id" yang di set sedangkan pada local storage itu menggunakan key mypokemons
    //sehingga dia perlu mencari key yang sesuai di mypokemons  
    // Fungsi filter digunakan untuk membuat array baru dengan semua elemen yang memenuhi kondisi yang diberikan. Dalam hal ini, kondisinya adalah bahwa id dari setiap pokemon yang diproses dalam loop (p.id) tidak sama dengan id pokemon yang ingin dihapus (pokemon.id).
    //Dengan menghapus pokemon dari array updatedMyPokemon, dan kemudian mengubah nilai state myPokemon menjadi array yang baru, kita dapat menghapus pokemon dari tampilan halaman.

    /* const deletePokemon = (id) => {
        const updatedPokemons = myPokemon.filter(pokemon => pokemon.id !== id);
        setMyPokemons(updatedPokemons);
        localStorage.setItem("myPokemon", JSON.stringify(updatedPokemons));
    } */

    /* Sementara pada kode yang dibawah yang gunakan, fungsi deletePokemon menerima parameter berupa objek pokemon, 
    sehingga tidak perlu mencari key di localStorage. Selain itu, kode tersebut juga membuat salinan 
    array sebelum melakukan operasi penghapusan, sehingga tidak mengubah state langsung dan lebih aman untuk digunakan. */

    const deletePokemon = async (id) => {
        try {
        console.log("test id :",id);
          const response = await axios.delete(`http://localhost:4000/pokemons/collection/${id}`);
          toast.success("Pokemon Delete Succes",{
            autoClose: 500
          })
          console.log('response', response.data);
          const updatedMyPokemons = myPokemon.filter(item => item.id !== id);;
          setMyPokemons(updatedMyPokemons);
        } catch (error) {
          console.log(error);
        }
      };

      if (myPokemon.length === 0) {
        return (
            <><div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                <div className="group relative">
                    <div className="aspect-h-1 aspect-w-1 w-full my-8 overflow-hidden border-2 border-thirdColor rounded-lg xl:aspect-h-8 xl:aspect-w-7">
                        <div className="object-contain h-60 w-96 lg:h-90 lg:w-90">
                        </div>
                    </div>
                    <h3 className="mt-4 text-lg text-gray-900 font-bold text-base-100 ml-11">Pokemon don't exist</h3>
                    <a href='/listpokemons' className='btn btn-sm top-0 right-5 ml-9 bg-thirdColor hover:bg-fourthColor hover:text-neutral-900 border-0'>Go Add Your Pokemon</a>
                </div>
            </div>
            </div></>
            
        );
      }
      

    return (
        <div className="">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
                <h1 className="text-base-100 py-5 font-bold text-5xl">My Pokemons</h1>

                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {myPokemon.map((item, index) => (
                        <a key={index} href={item.href} className="group relative">
                            <div className="aspect-h-1 aspect-w-1 w-full my-8 overflow-hidden rounded-lg xl:aspect-h-8 xl:aspect-w-7">
                                <img
                                    src={item.avatar_url}
                                    alt="img"
                                    className="object-contain h-48 w-96 lg:h-90 lg:w-90"
                                />
                            </div>
                            <h3 className="mt-4 text-lg text-gray-900 font-bold text-base-100">{item.name_pokemon}</h3>
                            <div className="relative">
                                <button onClick={() => deletePokemon(item.id)} className="btn absolute btn-sm top-0 right-5 bg-thirdColor hover:bg-fourthColor hover:text-neutral-900 border-0">Release</button>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>

    )
}
