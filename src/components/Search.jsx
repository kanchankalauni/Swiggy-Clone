import React from 'react'

function Search() {
  return (
    <div className='w-full md:w-[800px] mx-auto'>
        <input className='border-2 px-10 py-3 focus:outline-none' type="text" placeholder='search for restaurant and food'/>
    </div>
  )
}

export default Search