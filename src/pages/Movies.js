import React from 'react'

import MovieList from '../components/MovieList'
import Banner from '../components/Banner'
import GenresList from "../components/GenresList";
import { movieType, category } from '../api/tmdbApi';

function Movies(props) {
    return (
        <div className="section-movie-slider">
            <div className="top-heading">
                <h2 className="heading">Movie</h2>
                <GenresList category={category.movie}/>
            </div>
            <Banner category={category.movie} type={movieType.now_playing} />

            <div className="movie-listing">
            <div className="section-movie">
            <h2 className="heading">Popular</h2>
            <MovieList category={category.movie}  type={movieType.popular} />
        </div>
           <div className="section-movie style2">
            <h2 className="heading">Upcoming</h2>
            <MovieList category={category.movie} type={movieType.upcoming} />
        </div>
         
        <div className="section-movie style2">
            <h2 className="heading">Now Playing</h2>
            <MovieList category={category.movie}  type={movieType.now_playing} />
        </div>
      
        <div className="section-movie style2">
            <h2 className="heading">Top Rated</h2>
            <MovieList category={category.movie}  type={movieType.top_rated} />
        </div> 
        </div>
        </div>
    )
}
export default Movies