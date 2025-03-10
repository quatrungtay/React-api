import { useState } from "react";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useContext } from 'react'
import { MovieContext } from '../context/MovieProvider'//

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1024, min: 600 },
    items: 4, 
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1, 
  },
};


//viết nhanh gõ rafce
const MovieList = ({ title, data }) => {
  const {handleTrailer} = useContext(MovieContext)
  
  return (
    <div className='text-white p-10 mb-10'>
      <h2 className='uppercase text-3xl font-bold'>{title}</h2>
      <Carousel responsive={responsive} className='flex items-center py-4 gap-6'>
        {data && data.length > 0 && data.map((item) => (
          <div key={item.id} className='w-[200px] h-[300px] relative group'  onClick={() => handleTrailer(item.id)}>
            <div className='w-full h-full cursor-pointer group-hover:scale-105 transition-transform duration-500 ease-in-out'>
              <div className='absolute top-0 left-0 w-full h-full bg-black/40'></div>
              <img src={`${import.meta.env.VITE_IMG_URL}${item.poster_path}`} alt={item.title} className='w-full h-full object-cover' />
              <div className='absolute bottom-6 left-2'>
                <p className='uppercase text-md'>{item.title || item.origin_title}</p>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
      
    </div>
  )
}

export default MovieList