import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import DetailPokemons from '../components/DetailPokemons'

function DetailPage() {
  return (
    <div className='bg-secondaryColor'>
      <Navbar />
      <DetailPokemons />
      <Footer />

    </div>
  )
}

export default DetailPage;