import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "react-router";

import tmdbApi, { category } from "../api/tmdbApi";

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

  const isMountedRef = useIsMounted();
  
  //render movies item



  
  useEffect(() => {
    const fetchData = async() => {
      const params = {
        query: keyword
      }
      const res = await tmdbApi.search({params})
      if (isMountedRef.current) { // Ignore if we started fetching something else
        
      
        setMovies(res.results);
        setTotalPage(res.total_pages);
      }
    }

    fetchData()
  }, [keyword])
  

   const handleLoadMore = async () => {
   const params = {
       query: keyword,
       page: page + 1
     };
     const res = await tmdbApi.search({ params });
     setTimeout(() => {
       setMovies([...movies, ...res.results]);
      
        setPage(page + 1);
      
     }, 600);
    
   };
  
     const [endPageRef, isIntersecting] = useLazyLoad(handleLoadMore);
  
 
  // render
  return (
    movies && movies.length > 0 ? (
    <div className="movie-grid">
      
      <div className="grid-list">
        {movies.map((item, index) =>
          item.media_type === "movie" ? (
            <div className="slider-item" key={index}>
              <MovieItem
                item={item}
                category={category.movie}
              />
            </div>
          ) : (
            <div className="slider-item" key={index}>
              <TvItem
                item={item}
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