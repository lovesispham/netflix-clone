import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";

import tmdbApi from "../api/tmdbApi";

import genres from "../assets/data/genres";
import genrestv from "../assets/data/genrestv";
import MovieItem from "./MovieItem";
import TvItem from "./TvItem";
import Spinner from "./Spinner";
import useLazyLoad from "./useLazyLoad";

function MovieGrid(props) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const history = useHistory();
  const { genreIdUrl } = useParams();
  

  const category = props.category;

  var gender_ids = [];
  if (category === "movie") {
    genres.map(el => (gender_ids[el.id] = el.name));
  } else genrestv.map(el => (gender_ids[el.id] = el.name));

  //render movies item
  useEffect(() => {
    //if [] chay 1 lan, hok chay lai

    const fetchData = async () => {
      const params = {
        with_genres: genreIdUrl
        // === api co url with_genres
        // tim id tren params url khi click
      };
      const res = await tmdbApi.getByGenre(props.category, { params });
      setMovies(res.results);
      
      return res;
    };
    fetchData();
    return movies;
  }, [props.category, genreIdUrl, history]);

  // console.log("render", movies);
  
  const handleLoadMore = async () => {
    const params = {
      with_genres: genreIdUrl,
      page: page + 1
    };
    const res = await tmdbApi.getByGenre(props.category, { params });

    setTimeout(() => {
      setMovies([...movies, ...res.results]);
      setPage(page + 1);
    }, 500);
  };
  
  const [endPageRef, isIntersecting] = useLazyLoad(handleLoadMore);

 
  return (
    <div className="movie-grid">
      {/* render movies */}
      <div className="grid-list">
        {category === "movie"
          ? movies.map((item, index) => (
              <div className="slider-item" key={index}>
                <MovieItem
                  item={item}
                  gender_ids={gender_ids}
                  category={category}
                />
              </div>
            ))
          : movies.map((item, index) => (
              <div className="slider-item" key={index}>
                <TvItem
                  item={item}
                  gender_ids={gender_ids}
                  category={category}
                />
              </div>
            ))}
       
      </div>
      
      (<div
        className={`loadmore_endpage ${isIntersecting ? "intersected" : null}`}
        ref={endPageRef}
      >
        {isIntersecting ? <Spinner /> : null}
      </div>)
      
    </div>
  );
}

export default MovieGrid;
