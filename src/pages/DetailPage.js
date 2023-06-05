import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import DetailPokemons from '../components/DetailPokemons'

function DetailPage() {
  return (
    <div className='bg-gradient-to-br from-gradient1 from-30% via-gradient5 via-60% to-gradient3 to-75%'>
      <Navbar />
      <DetailPokemons />
      <Footer />

    </div>
  )
}

export default DetailPage;