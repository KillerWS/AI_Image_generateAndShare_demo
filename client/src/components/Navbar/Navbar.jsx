import React from 'react'
import {logo} from '../../assets'
import {Link } from 'react-router-dom'
const Navbar = () => {
  return (
        
      <header className="w-full flex
        justify-between items-center bg-white
        sm:px-8 px-4 py-4 border-b border-b-
        [#e6ebf4]">
        <Link to="/">
            <img src = {logo} alt="logo"
            className="w-28 object-contain"/>
        </Link>
        <div className='justify-self-end '>
        <Link to="/create-post"
         className="font-inter font-medium mr-8
         bg-[#6469ff] text-white px-4 py-2
         rounded-md">AI Image</Link>

         <Link to="/chat"
         className="font-inter font-medium mr-8
         bg-[#6469ff] text-white px-4 py-2
         rounded-md">ChatGPT3.0</Link>
         </div>
            </header>

            
    
  )
}

export default Navbar
