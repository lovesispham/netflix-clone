import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import tmdbApi, { category } from "../api/tmdbApi";

import genres from "../assets/data/genres";
import genrestv from "../assets/data/genrestv";
import MovieItem from "./MovieItem";
import TvItem from "./TvItem";
import Spinner from "./Spinner";
import useLazyLoad from "./useLazyLoad";

function SearchList(props) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0)
  const { keyword } = useParams();
  //render movies item
  useEffect(() => {
    //if [] chay 1 lan, hok chay lai

    const fetchData = async () => {
      const params = {
        query: keyword
        // === api co url with_genres
        // tim id tren params url khi click
      };
      const res = await tmdbApi.search({ params });
      setMovies(res.results);
      setTotalPage(res.total_pages)
      return res;
    };
    fetchData();
    }, [keyword]);

  const handleLoadMore = async () => {
    const params = {
      query: keyword,
      page: page + 1
    };
    const res = await tmdbApi.search({ params });

    setTimeout(() => {
      setMovies([...movies, ...res.results]);
      
        setPage(page + 1);
      
    }, 500);
  };
  
    const [endPageRef, isIntersecting] = useLazyLoad(handleLoadMore);
  
 
  // render
  var gender_ids = [];
  movies.map((item, index) => {
    
    (item.media_type === "movie" 
      ? genres : genrestv).map(
      el => (gender_ids[el.id] = el.name)
    );
    return gender_ids
  });
  return (
    movies ? (
    <div className="movie-grid">
      {/* render movies */}
      <div className="grid-list">
        {movies.map((item, index) =>
          item.media_type === "movie" ? (
            <div className="slider-item" key={index}>
              <MovieItem
                item={item}
                gender_ids={gender_ids}
                category={category.movie}
              />
            </div>
          ) : (
            <div className="slider-item" key={index}>
              <TvItem
                item={item}
                gender_ids={gender_ids}
                category={category.tv}
              />
            </div>
          )
        )}
      </div>
      
       
          
       
     
            <div className={`loadmore_endpage ${isIntersecting ? "is loading" : null}`}
            ref={endPageRef}
      >
        {isIntersecting && (page <= totalPage) ? <Spinner /> : null}
      </div>
         
         
        

      
      
    </div>
    ):<p>page not found</p>
  );
}

export default SearchList;
