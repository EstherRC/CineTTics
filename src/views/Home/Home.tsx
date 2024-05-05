import React, {useState, useEffect} from 'react'
import { getPopular, getNowPlaying, getTopRated } from '../../services';
import MovieCard from '../../components/MovieCard/MovieCard';
import { IMovieResponse } from './types';

export const Home: React.FC  = () => {
  const [popularMovies, setPopularMovies] = useState<IMovieResponse[]>([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<IMovieResponse[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<IMovieResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorOnRequest, setErrorOnRequest] = useState<boolean>(false);

  const getPopularMovies = async() => {
    await getPopular()
    .then((data) => {
      if(data && data.data) {
        setPopularMovies(data.data.results);
        setIsLoading(false);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  };
  const getTopRatedMovies = async() => {
    await getTopRated()
    .then((data) => {
      if(data && data.data) {
        setTopRatedMovies(data.data.results);
        setIsLoading(false);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const getNowPlayingMovies = async() => {
    await getNowPlaying()
    .then((data) => {
      if(data && data.data) {
        setNowPlayingMovies(data.data.results);
        setIsLoading(false);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    setIsLoading(true);
    getPopularMovies();
    getTopRatedMovies();
    getNowPlayingMovies();
}, []);

  return (
    <div className='bg-slate-50'>
           {isLoading && <div>Loading...</div>}
           <div className='flex justify-between'>
              <h2 className='font-mono font-extrabold space-x-4 text-3xl m-5'> Popular</h2>  
              <a href='/popular' className='space-x-4 text-l m-5 p-2.5 rounded-lg text-white bg-rose-600'>View All   &#x25BC;</a>
           </div>
           <div className="overflow-x-auto whitespace-nowrap">
            
            {popularMovies?.length > 0 &&
            popularMovies.map((popularMovies) => {
                return(
                  <div className="inline-block px-2">
                  <MovieCard
                  title={popularMovies.title}
                  genreId={popularMovies.genre_ids[0]}
                  movieId={popularMovies.id}
                  voteAverage={popularMovies.vote_average}
                  posterPath={popularMovies.poster_path}
              />
                </div>)
            })}
           </div>
           <div className='flex justify-between'>
              <h2 className='font-mono font-extrabold space-x-4 text-3xl m-5'> Top Rated</h2>  
              <a href='/toprated' className='space-x-4 text-l m-5 p-2.5 rounded-lg text-white bg-rose-600'>View All   &#x25BC;</a>
           </div>
           <div className="overflow-x-auto whitespace-nowrap">
           {topRatedMovies?.length > 0 &&
           topRatedMovies.map((topRatedMovies) => {
               return(
                <div className="inline-block px-2">
                <MovieCard
                 title={topRatedMovies.title}
                 genreId={topRatedMovies.genre_ids[0]}
                 movieId={topRatedMovies.id}
                 voteAverage={topRatedMovies.vote_average}
                 posterPath={topRatedMovies.poster_path}
             />
              </div>)
           })}
           </div>

           <div className='flex justify-between'>
              <h2 className='font-mono font-extrabold space-x-4 text-3xl m-5'>Now Playing</h2>  
              <a href='/nowplaying' className='space-x-4 text-l m-5 p-2.5 rounded-lg text-white bg-rose-600'>View All   &#x25BC;</a>
           </div>
           <div className="overflow-x-auto whitespace-nowrap">
           {nowPlayingMovies?.length > 0 &&
           nowPlayingMovies.map((nowPlayingMovies) => {
               return(
                <div className="inline-block px-2">
                <MovieCard
                 title={nowPlayingMovies.title}
                 genreId={nowPlayingMovies.genre_ids[0]}
                 movieId={nowPlayingMovies.id}
                 voteAverage={nowPlayingMovies.vote_average}
                 posterPath={nowPlayingMovies.poster_path}
             />
              </div>)
           })}
           </div>

       </div>
  );
}

export default Home;