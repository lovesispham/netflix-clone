import React from 'react'
import MovieList from '../components/MovieList'
import TvList from '../components/TvList'
import Banner from '../components/Banner'
import { movieType, category, tvType } from '../api/tmdbApi';
function Home(props) {
    return (
        
        <div>
            <Banner category={category.movie} type={movieType.now_playing}/>
            <div className="movie-listing">
            <div className="section-movie">
            <h2 className="heading">Popular</h2>
            <MovieList category={category.movie}  type={movieType.popular} />
        </div>
           <div className="section-movie style2">
            <h2 className="heading">Upcoming</h2>
            <MovieList category={category.movie} category={category.movie} type={movieType.upcoming} />
        </div>
         
        <div className="section-movie style2">
            <h2 className="heading">Now Playing</h2>
            <MovieList category={category.movie}  type={movieType.now_playing} />
        </div>
      
        <div className="section-movie style2">
            <h2 className="heading">Top Rated</h2>
            <MovieList category={category.movie}  type={movieType.top_rated} />
        </div> 
        <div className="section-movie style2">
            <h2 className="heading">Popular TV</h2>
            <TvList category={category.tv}  type={tvType.popular} />
        </div> 
        <div className="section-movie style2">
            <h2 className="heading">Airing Today TV</h2>
            <TvList category={category.tv}  type={tvType.airing_today} />
        </div> 
        <div className="section-movie style2">
            <h2 className="heading">On TV</h2>
            <TvList category={category.tv}  type={tvType.on_the_air} />
        </div> 
        <div className="section-movie style2">
            <h2 className="heading">Top Rated TV</h2>
            <TvList category={category.tv}  type={tvType.top_rated} />
        </div> 
            </div>
        </div>
              
    )
}



export default Home

