import React, { useState, useEffect } from 'react';

export default function MyPokemons() {
    const [myPokemon, setMyPokemons] = useState([]);


    const getMyPokemons = () => {
        const savedData = JSON.parse(localStorage.getItem("myPokemon"));
        if (savedData) {
            setMyPokemons(savedData);
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

    const deletePokemon = (pokemon) => {
        const confirmation = window.confirm("Apakah Anda yakin ingin melepaskan Pokemon ini dari My Pokemon?");

        if (confirmation) {
            // membuat salinan array
            const updatedMyPokemon = [...myPokemon];

            // mencari index data yang akan dihapus
            const index = updatedMyPokemon.findIndex((p) => p.id === pokemon.id);

            //  kodnisi menghapus data dari array jika ditemukan
            if (index !== -1) {
                updatedMyPokemon.splice(index, 1);
                //splice() adalah sebuah method built-in pada JavaScript array yang digunakan untuk menambah, menghapus, dan/atau mengganti elemen pada sebuah array. Method ini menerima dua parameter: index dan howMany, dimana index adalah posisi dari elemen yang ingin diubah dan howMany adalah jumlah elemen yang ingin diubah.
                //mengubah array updatedMyPokemon dengan menghapus satu elemen dari array tersebut pada indeks yang ditentukan dengan nilai index
                //elemen yang dihapus adalah elemen yang memiliki indeks yang sama dengan indeks dari pokemon yang ingin dihapus dari array.

                // menyimpan array yang diperbarui ke local storage
                localStorage.setItem("myPokemon", JSON.stringify(updatedMyPokemon));

                // memperbarui state dengan array yang diperbarui
                setMyPokemons(updatedMyPokemon);
                alert("Pokemon berhasil dilepas dari My Pokemon!");
            }
        }
    };

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
                                <button onClick={() => deletePokemon(item)} className="btn absolute btn-sm top-0 right-5 bg-thirdColor hover:bg-fourthColor hover:text-neutral-900 border-0">Release</button>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>

    )
}
