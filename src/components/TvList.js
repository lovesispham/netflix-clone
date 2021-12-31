import React, { useState, useEffect } from "react";

// import Swiper core and required modules
import { Navigation } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

import tmdbApi from "../api/tmdbApi";

import TvItem from "./TvItem";
import genrestv from "../assets/data/genrestv";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation"; // Navigation module



 function TvList(props) {
    const [movies, setMovies] = useState([]);
    // render tv listing
    useEffect(() => {
        // if [] chay 1 lan, hok chay lai
        
        const fetchData = async () => {
          const params = {};
          const res = await tmdbApi.getTvList(props.type, { params });
          //  console.log(res)
          setMovies(res.results);
          return res;
        };
        fetchData();
      }, [props.type]);
    
      console.log("render", movies);
      
    //   genres
      var gender_ids = [];
        genrestv.map(el => (gender_ids[el.id] = el.name));

        


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
            <TvItem
              item={item}
              gender_ids={gender_ids}
              category={props.category}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      
    </div>
    )
}
export default TvList