import PropTypes from "prop-types"
import React, { useState, useEffect } from "react";

// import Swiper core and required modules
import { Navigation } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

import tmdbApi from "../api/tmdbApi";
import MovieItem from "./MovieItem";
import useIsMounted from './useIsMounted'

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation"; // Navigation module


function MovieList(props) {
  const [movies, setMovies] = useState([]);
  
  const category = props.category
  const isMountedRef = useIsMounted();
 
  


  

    // render movies item
    useEffect(() => {
      // if [] chay 1 lan, hok chay lai
    

      const fetchData = async() => {
        const params = {};
        const res = await tmdbApi.getMoviesList(props.type, { params });
            if(isMountedRef.current){
              setMovies(res.results);
            }
      }
      
      
        fetchData();
      
    
    }, [props.type, isMountedRef]);


  return (
    <div className="movie-slider">
      <Swiper
        modules={[Navigation]}
        slidesPerView={"auto"}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }}
      >
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>

        {movies.map((item, index) => (
          <SwiperSlide className="slider-item" key={index}>
            <MovieItem
              item={item}
              category={category}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      
    </div>
  );
}

MovieList.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}

export default MovieList;
