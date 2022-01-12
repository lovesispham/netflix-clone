import PropTypes from "prop-types"
import React, { useState, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router";
import tmdbApi from "../api/tmdbApi";
import MovieItem from "./MovieItem";
import TvItem from "./TvItem";
import Spinner from "./Spinner";
import useLazyLoad from "./useLazyLoad";
import useIsMounted from './useIsMounted'


function MovieGrid(props) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0)
  const history = useHistory();
  const { genreIdUrl } = useParams();
  const isMountedRef = useIsMounted();

  const category = props.category;

  
  //render movies item
  useEffect(() => {
    //if [] chay 1 lan, hok chay lai
        const fetchData = async() => {
            const params = {
      with_genres: genreIdUrl
      
    };
    const res = await tmdbApi.getByGenre(category, { params });
    if(isMountedRef.current){
      setMovies(res.results);
        setTotalPage(res.total_pages)
    }
        }
   
     
        fetchData();
        
  
      
    
    
  }, [category, genreIdUrl, history, isMountedRef]);

  // console.log("render", movies);
  
  const handleLoadMore = async () => {
    const params = {
      with_genres: genreIdUrl,
      page: page + 1
    };
    const res = await tmdbApi.getByGenre(props.category, { params });

    setTimeout(() => {
      setMovies([...movies, ...res.results]);
      setPage(page + 1 );
    }, 500);
  };
  
  const [endPageRef, isIntersecting] = useLazyLoad(handleLoadMore);

 
  return (
    <div className="movie-grid">
      {/* render movies */}
      <div className="grid-list">
        {category === "movie"
          ? (movies.map((item, index) => (
              <div className="slider-item" key={index}>
                <MovieItem
                  item={item}
                  category={category}
                />
              </div>
            )))
          : (movies.map((item, index) => (
              <div className="slider-item" key={index}>
                <TvItem
                  item={item}
                  category={category}
                />
              </div>
            )))}
       
      </div>
      
        <div className={`loadmore_endpage ${isIntersecting ? "intersected" : null}`}
        ref={endPageRef}
      >
        {isIntersecting && (page <= totalPage) ? <Spinner /> : null}
      
         
              
      </div>
           
      
    </div>
  );
}

MovieGrid.propTypes = {
  category: PropTypes.string.isRequired
}

export default MovieGrid;
