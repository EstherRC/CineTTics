import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import {getDetails, getRecommendations} from '../../services'
import { IMovieDetail } from './types';
import { IMAGE_SOURCE } from "../../constants/moviesMock";
import { MovieCard } from '../../components/MovieCard';
import { IMovieResponse } from '../Home/types';

const Show = () => {
    const {id} = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [recommendations, setRecommendations] = useState<IMovieResponse[]>([]);

    const [isfavorite, setIsFavorite] = useState<boolean>();
    
    const [favorites, setFavorites] = useState<string>('');
    const [movie, setMovie] = useState<IMovieDetail>();

    const goBack = ()=> {
        navigate(-1);
    };

    const addFavorite = () => {
          const favs = favorites.length > 0 ? JSON.parse(favorites) : []; //["1233", "1233"] si tenemos un id agregamos el de esta pelicula, si no se agrega a 0
          const newFavorites = [...favs, id];
          setFavorites(JSON.stringify(newFavorites));
          setIsFavorite(true);
          localStorage.setItem('favorites', JSON.stringify(newFavorites) ) //El primero es la llave
    };
  
    const removeFavorite = () => {
        const favs = favorites.length > 0 ? JSON.parse(favorites) : [] ;
        let newFavorites = [...favs];
        newFavorites =  newFavorites.filter((e) => e != id);
        setFavorites(JSON.stringify(newFavorites));
        setIsFavorite(false);
        localStorage.setItem("favorites", JSON.stringify(newFavorites) )
    };

    const getMovieDetails = async() => {
        await getDetails(String(id))

        .then((data) => {
          if(data && data.data) {
            setMovie(data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      };

      const getRecommendation = async () => {
        const recommendationsData = await getRecommendations(String(id));
        setRecommendations(recommendationsData);
    };
    
    const icons = {
        adult: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 mr-1"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-4m-6 0v4m0-4L7 10m3-4l3 4m-3-4v4" /></svg>,
        runtime: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 mr-1"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6v6l4 2" /><circle cx="12" cy="12" r="10" /></svg>,
        releaseDate: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 mr-1"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8 7V3m8 4V3m-9 4h10a2 2 0 012 2v11a2 2 0 01-2 2H7a2 2 0 01-2-2V8a2 2 0 012-2h10V5H7v2z" /></svg>,
        voteAverage: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 mr-1"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>,
        popularity: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 mr-1"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 8h16M4 16h16" /></svg>
    };

    useEffect(()=>{
        getMovieDetails();
        getRecommendation();
        
        const favs = localStorage.getItem('favorites') ||'';
        setFavorites(favs);
        if(favs.includes(String(id))){
            setIsFavorite(true);
        }
        
    })
    return (
        <div className="bg-gray-100 p-5 flex flex-col">
            <div className="flex">
                <img src={IMAGE_SOURCE + movie?.poster_path} alt="poster" className="w-96 h-auto object-cover rounded-lg shadow-md"/>
                <div className="flex-grow ml-8 max-w-4xl m">
                    <h1 className="text-5xl font-mono font-bold p-5">{movie?.title}</h1>
                    <div className="flex justify-between text-gray-600 text-sm mt-2 text-xl">
                        <span className='flex'>
                            {icons.adult}
                            {movie?.adult ? 'Adult' : 'Family'}
                        </span>
                        <span className='flex'>
                            {icons.runtime}
                            {movie?.runtime} min
                        </span>
                        <span className='flex'>
                            {icons.releaseDate}
                            {movie?.release_date}
                        </span>
                        <span className='flex'>
                            {icons.voteAverage}
                            {movie?.vote_average} / 10
                        </span>
                        <span className='flex'>
                            {icons.popularity}
                            {movie?.popularity}
                        </span>
                    </div>
                    <p className="my-6 text-gray-700 font-mono text-lg">{movie?.overview}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {movie?.genres.map((genre) => (
                            <span key={genre.id} className="my-5 bg-blue-200 text-blue-800 px-3 py-2 rounded-full text-sm">{genre.name}</span>
                        ))}
                    </div>
                    <div className="flex space-x-4 mt-4">
                        <button onClick={goBack} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                            Go Back
                        </button>
                        {isfavorite ? (
                            <button onClick={removeFavorite} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                                Remove from favorites
                            </button>
                        ) : (
                            <button onClick={addFavorite} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                                Add to favorites
                            </button>
                        )}
                    </div>
                </div>
            </div>
    
            <h2 className='font-mono font-extrabold space-x-4 text-4xl mx-16 my-5 pt-6'>Recommendations</h2>
            <div className="overflow-x-auto whitespace-nowrap">
                {recommendations?.length > 0 && recommendations.map((recommendation) => (
                    <div key={recommendation.id} className="inline-block px-2">
                        <MovieCard
                            title={recommendation.title}
                            genreId={recommendation.genre_ids[0]} 
                            movieId={recommendation.id}
                            voteAverage={recommendation.vote_average}
                            posterPath={recommendation.poster_path}
                        />
                    </div>
                    ))}
            </div>
        </div>
    );
    
    
}

export default Show;