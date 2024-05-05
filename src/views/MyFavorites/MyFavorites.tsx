import React, {useEffect} from "react";
import { IMovieDetail } from "./types";
import MovieCard from "../../components/MovieCard/MovieCard";
import {getDetails} from "../../services/movies/getDetails";

const MyFavorites = () => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [shows, setShows] = React.useState<IMovieDetail[]>([]);
    const favorites : string = localStorage.getItem('favorites') || "";

    const runGetFavorites = async () => {
        if(favorites.length){
            const favoritesArray = JSON.parse(favorites);
            const newShows = await Promise.all(favoritesArray.map(async (favorite: string) => {
                return getDetails(String(favorite)).then((res) => {
                    if(res && res.data){
                        return res.data;
                    }
            }).catch((err) => {
                console.log(err);
            });
        }));
        setShows(newShows);
        setLoading(false);
    }};

    useEffect(() => {
        runGetFavorites();
    }, []);

    return (
        <div className='p-3'>
            {!loading ? (
                <div >
                    <h2 className='font-mono font-extrabold space-x-4 text-4xl mx-16 my-3'>My Favorites</h2> 
         
                    {favorites && favorites.length > 0 ? (
                        <div className='bg-slate-50 mt-5 mx-5 grid grid-cols-5 gap-4 place-content-around'>
                            {shows && shows.map((show: IMovieDetail) => (
                                <div className="mt-5 inline-block px-2">
                                    <MovieCard
                                        key={show.id}
                                        title={show.title}
                                        genreId={show.genres[0].id}
                                        movieId={show.id}
                                        voteAverage={show.vote_average}
                                        posterPath={show.poster_path}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div>No hay favoritos</div>
                    )}
                    </div>
            
            ):(
                <div>Loading...</div>
            )}

    </div>

    );
};

export default MyFavorites;