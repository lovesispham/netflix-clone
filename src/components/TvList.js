import PropTypes from "prop-types"
import React, { useState, useEffect, useCallback } from "react";

// import Swiper core and required modules
import { Navigation } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

import tmdbApi from "../api/tmdbApi";

import TvItem from "./TvItem";
import useIsMounted from './useIsMounted'

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation"; // Navigation module



 function TvList(props) {
    const [movies, setMovies] = useState([]);
    // render tv listing
    const isMountedRef = useIsMounted();
    

    useEffect(() => {
        // if [] chay 1 lan, hok chay lai
      

        const fetchData = async() => {
          const params = {};
          const res = await tmdbApi.getTvList(props.type, { params });
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
            <TvItem
              item={item}
              category={props.category}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      
    </div>
    )
}

TvList.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}
export default TvList