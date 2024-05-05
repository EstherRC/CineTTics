import { title } from "process";
import { IMAGE_SOURCE } from "../../constants/moviesMock";
import { IMovieCard } from "./types";
import { Pill } from "../Pill";
import React from 'react'
import genres from "../../constants/genres.json"
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/constants";


export const MovieCard:React.FC<IMovieCard> = ({
    title,
    genreId,
    movieId,
    voteAverage,
    posterPath,
}) => {
    const poster = IMAGE_SOURCE + posterPath;
    const navigate = useNavigate();
    const getGenre = (genreId: number) => {
        const key= Object.values(genres.genres).find(genre =>genre.id === genreId);
        if(key){
            return key.name;
        }
        return "Not classified"
    }

    const navigateMovies = (id: number, movieName: string) => {
        navigate(`${ROUTES.SHOW}${id}`, {state: {movieName}}); // /show/82
    }
  return (
    <div className="relative max-h-96 max-w-60 rounded-lg overflow-hidden shadow-lg shadow-black" onClick={() => navigateMovies(movieId, title)}>
        
        <div className="transition-all duration-700 hover:scale-110 hover:brightness-50">
            <img src={poster} alt="poster" className="w-full"/>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            
            <Pill genre={getGenre(genreId)}></Pill>
            
            <p className="font-mono text-white pt-3">{title}</p>
            <div className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" className="w-4 h-4 text-white">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
                <p className="font-mono text-white">{voteAverage}</p>
            </div>
                        
        </div>
    </div>
  )
}

export default MovieCard;