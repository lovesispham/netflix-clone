import React from 'react'

import TvList from '../components/TvList'
import Banner from '../components/Banner'
import GenresList from "../components/GenresList";
import { category, tvType } from '../api/tmdbApi';

function TVSeries(props) {
    return (
        <div className="section-movie-slider">
            <div className="top-heading">
                <h2 className="heading">TV Shows</h2>
                <GenresList category={category.tv}/>
            </div>
            <Banner category={category.tv} type={tvType.popular}/>

            <div className="movie-listing">
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
export default TVSeries