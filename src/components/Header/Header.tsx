import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/constants";

export const Header = () => {
  return (
    <nav className="fixed top-0 w-full z-10  flex justify-between items-center  bg-white p-4 drop-shadow-lg h-20">
        <a href="/"><h1 className="tracking-wider font-mono space-x-4 text-4xl font-bold text-stone-500">CineTTics</h1></a>
        <ul className="flex justify-end space-x-9">
            <li className="font-semibold tracking-wider font-mono space-x-4 text-l text-black-500 hover:text-red-700">
                <Link to={ROUTES.HOME}>Home</Link>
            </li>
            <li className="font-semibold tracking-wider font-mono space-x-4 text-l text-black-500 hover:text-red-700">
                <Link to={ROUTES.POPULAR}>Popular</Link>
            </li>
            <li className="font-semibold tracking-wider font-mono space-x-4 text-l text-black-500 hover:text-red-700">
                <Link to={ROUTES.TOPRATED}>Top Rated</Link>
            </li>
            <li className="font-semibold tracking-wider font-mono space-x-4 text-l text-black-500 hover:text-red-700">
                <Link to={ROUTES.NOWPLAYING}>Now Playing</Link>
            </li>
            <li className="font-semibold tracking-wider font-mono space-x-4 text-l text-black-500 hover:text-red-700">
                <Link to={ROUTES.MYFAVORITES}>My Favorites</Link>
            </li>
        </ul>
    </nav>
  );
};

export default Header;