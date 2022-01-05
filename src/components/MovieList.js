import React, { useState, useEffect } from "react";

// import Swiper core and required modules
import { Navigation } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

import tmdbApi from "../api/tmdbApi";


import genres from "../assets/data/genres";

import MovieItem from "./MovieItem";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation"; // Navigation module


function MovieList(props) {
  const [movies, setMovies] = useState([]);
  const category = props.category
  var gender_ids = [];
  genres.map(el => (gender_ids[el.id] = el.name));
  
  


  

  // render movies item
  useEffect(() => {
    // if [] chay 1 lan, hok chay lai
    
    const fetchData = async () => {
      const params = {};
      const res = await tmdbApi.getMoviesList(props.type, { params });
      //  console.log(res)
      setMovies(res.results);
      return res;
    };
    fetchData();
  }, [props.type]);


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
              gender_ids={gender_ids}
              category={category}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      
    </div>
  );
}

export default MovieList;
