import { useState } from "react";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Modal from 'react-modal';
import YouTube from 'react-youtube';

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

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const opts = {
  height: '390',
  width: '640',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};

//viết nhanh gõ rafce
const MovieList = ({ title, data }) => {
  const [modalIsOpen, setmodalIsOpen] = React.useState(false);
  const [trailerKey, setTrailerKey] = React.useState('');
  const handleTrailer = async (id) => {
    setTrailerKey('');
    try {
      const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        }
      };
      const response = await fetch(url, options);
      const data = await response.json();
  
      if (!data.results || data.results.length === 0) {
        console.log("Không tìm thấy trailer cho phim này!");
        return;
      }
  
      setTrailerKey(data.results[0].key);
      setmodalIsOpen(true);
    } catch (error) {
      console.error('Lỗi tải trailer:', error);
    }
  };
  
  return (
    <div className='text-white p-10 mb-10'>
      <h2 className='uppercase text-3xl font-bold'>{title}</h2>
      <Carousel responsive={responsive} className='flex items-center py-4 gap-6'>
        {data.length > 0 && data.map((item) => (
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
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={() => { setIsOpen(false) }}
        onRequestClose={()=> setmodalIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <YouTube videoId={trailerKey} opts={opts}/>;
      </Modal>
    </div>
  )
}

export default MovieList