import PropTypes from "prop-types"
import React, { useRef, useState } from "react";
import genres from "../assets/data/genres";
import genrestv from "../assets/data/genrestv";
import { useHistory, useParams } from "react-router";
import useOutsideClick from './useOutsideClick'


function GenresList(props) {
  const category = props.category;
  
  const [genresNav, setGenresNav] = useState(false);

  const genresMenu = useRef(null);

  const {genreIdUrl}  = useParams();

  //active genre-item when click


  const history = useHistory();
  const handleClickGenre = id => {
    

    let genreUrl = null;
    if (category === "movie") {
      genreUrl = `/movie/${id}`;
      
    } else genreUrl = `/tv/${id}`;
    history.push(genreUrl);
  };
  useOutsideClick(genresMenu, ()=>{
    if(genresNav)
    setGenresNav(false)
  })
  return (
    
    <div className="genres-list" ref={genresMenu}>
      <span onClick={()=> setGenresNav(!genresNav)} className={`text ${genreIdUrl ? 'checked':''}`}>
        Genres
      </span>
      {
        genresNav && (
          <div className="drp-menu">
        {category === "movie"
          ? genres.map((genre, index) => (
              <span
                onClick={() => handleClickGenre(genre.id)}
                key={index}
                className={`genre-item ${parseInt(genreIdUrl) === genre.id ? 'active':''}`}
              >
                {genre.name}
                
              </span>
            ))
          : genrestv.map((genre, index) => (
              <span
                onClick={() => handleClickGenre(genre.id)}
                key={index}
                className={`genre-item ${parseInt(genreIdUrl) === genre.id ? 'active':''}`}
              >
                {genre.name}
              </span>
            ))}
      </div>
        )
      }
    </div>
  );
}

GenresList.propTypes = {
  category: PropTypes.string.isRequired

}
export default GenresList;
