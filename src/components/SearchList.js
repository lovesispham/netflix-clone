import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import tmdbApi, { category } from "../api/tmdbApi";

import genres from "../assets/data/genres";
import genrestv from "../assets/data/genrestv";
import MovieItem from "./MovieItem";
import TvItem from "./TvItem";
import Spinner from "./Spinner";
import useLazyLoad from "./useLazyLoad";
import useIsMounted from './useIsMounted'



function SearchList(props) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0)
  const { keyword } = useParams();

  


  

  //render movies item

 
  const isMounted = useIsMounted()
  useEffect(() => {
   
    const fetchData = async() => {
      const params = {
        query: keyword
        // === api co url with_genres
        // tim id tren params url khi click
      };
      const res = await tmdbApi.search({ params });
      if (isMounted()) {
      setMovies(res.results);
      setTotalPage(res.total_pages)
    }
      }
      
        fetchData()


    
    
    }, [keyword, isMounted]);
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
  movies?.map((item, index) => {
    
    (item.media_type === "movie" 
      ? genres : genrestv).map(
      el => (gender_ids[el.id] = el.name)
    );
    return gender_ids
  });
  return (
    movies && movies.length > 0 ? (
    <div className="movie-grid">
      
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
      
       
          
       
{   
            <div className={`loadmore_endpage ${isIntersecting ? "is loading" : null}`}
            ref={endPageRef}
      >
        {isIntersecting && (page <= totalPage) ? <Spinner /> : null}
      </div>
         
          }
        

      
      
    </div>
    ):<h2 className="heading">OOPs! Sorry, not found. Please search movies and tv shows again.</h2>
  );
}

export default SearchList;
