import React, {useState, useEffect} from 'react'
import { getNowPlaying } from '../../services';
import MovieCard from '../../components/MovieCard/MovieCard';
import { IMovieResponse } from './types';

export const NowPlaying: React.FC  = () => {
  const [movies, setMovies] = useState<IMovieResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorOnRequest, setErrorOnRequest] = useState<boolean>(false);

  const getNowPlayingMovies = async() => {
    await getNowPlaying()
    .then((data) => {
      if(data && data.data) {
        setMovies(data.data.results);
        setIsLoading(false);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    setIsLoading(true);
    getNowPlayingMovies();
}, []);

  return (
    <div className='p-3'>
    <h2 className='font-mono font-extrabold space-x-4 text-4xl mx-16 my-3'>Now Playing</h2> 
    <div className='bg-slate-50 mx-5 grid grid-cols-5 gap-4 place-content-around'>
           {isLoading && <div>Loading...</div>}
           {movies?.length > 0 &&
           movies.map((movie) => {
               return(
                <div className="mt-5 inline-block px-2">
                <MovieCard
                 title={movie.title}
                 genreId={movie.genre_ids[0]}
                 movieId={movie.id}
                 voteAverage={movie.vote_average}
                 posterPath={movie.poster_path}
             />
              </div>)
           })}
       </div>
  </div>
  );
}

export default NowPlaying;