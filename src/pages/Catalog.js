import React from "react";
import MovieGrid from '../components/MovieGrid'
import GenresList from "../components/GenresList";
import { category as cate } from "../api/tmdbApi";

function Catalog({match}) {
   
    const {url} = match
    const sliceUrl = url.split("/")
    const category = sliceUrl[1]

    
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
