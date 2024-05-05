import React from 'react'
import { IPill } from './types'

export const Pill:React.FC<IPill> = ({genre}) => {
  const genreColors: Record<string, string> = {
    Action: 'bg-red-500',
    Drama: 'bg-blue-500',
    Comedy: 'bg-green-500',
  };

  const genreColor = genreColors[genre] || 'bg-gray-500';

  return (
    <span className="rounded bg-red-500 text-white p-1">
      {genre}
    </span>
  );
};


export default Pill;