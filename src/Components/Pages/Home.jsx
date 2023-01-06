import React from 'react'
import Navbar from '../HomePage/Navbar'
import Popular from '../HomePage/Popular'
import Veggies from '../HomePage/Veggies'

function Home() {
  return (
    <div>
        {/* <Navbar/> */}
        <Veggies/>
        <Popular/>
    </div>
  )
}

export default Home