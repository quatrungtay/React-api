import { createContext } from "react";
import Modal from 'react-modal';
import YouTube from 'react-youtube';
import PropTypes from "prop-types";
import React from "react";


const opts = {
    height: '390',
    width: '640',
    playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
    },
};
const MovieContext = createContext();

const MovieProvider = ({ children }) => {
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
        <MovieContext.Provider value={{ handleTrailer }}>
            {children}
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={() => { setIsOpen(false) }}
                onRequestClose={() => setmodalIsOpen(false)}
                style={{
                    overlay: {
                        position: 'fixed',
                        zIndex: 9999,
                    },
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                    },
                }}
                contentLabel="Example Modal"
            >
                <YouTube videoId={trailerKey} opts={opts} />;
            </Modal>
        </MovieContext.Provider>
    );
}

MovieProvider.propTypes = {
    children: PropTypes.node,
};

export { MovieProvider, MovieContext };