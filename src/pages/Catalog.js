import React from "react";

import MovieGrid from '../components/MovieGrid'
import GenresList from "../components/GenresList";
import { category as cate } from "../api/tmdbApi";

function Catalog(props) {
     const splitUrl = () => {
         const newUrl = props.location.pathname.split('/').slice(1,-1)
         return newUrl[0]
     }
    
     const category = splitUrl()
    
  return (
    
      <div className="section-movie-grid">
      <div className="top-heading">
        <h2 className="heading">
            {
                category === cate.movie ? 'Movies' : 'TV Shows'
            }
        </h2>
        <GenresList category={category} />
      </div>
        
        <MovieGrid category={category} />
      </div>
    
  );
}

export default Catalog;
