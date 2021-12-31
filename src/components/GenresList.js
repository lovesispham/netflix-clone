import React,{useRef} from 'react'
import genres from "../assets/data/genres";
import genrestv from "../assets/data/genrestv";
import { useHistory } from "react-router";



 function GenresList(props) {

    const category = props.category
    console.log(category)
    const genresMenu = useRef(null)
    const toggleGenresMenu = () => genresMenu.current.classList.toggle('active')

    const history = useHistory();
    const handleClickGenre = id => {
        let genreUrl=null
        if(category === 'movie'){
           genreUrl = `/movie/${id}`;
        } else
           genreUrl = `/tv/${id}`;
        
        history.push(genreUrl);
      };

    
    return (
        <div className="genres-list" ref={genresMenu}>
        <span onClick={toggleGenresMenu} className="text">
          Genres
        </span>
        <div className="drp-menu">
        {
          (category === 'movie' ? genres : genrestv)
          .map((genre, index) => (
          <span
            onClick={() => handleClickGenre(genre.id)}
            key={index}
            className="genre-item"
          >
            {genre.name}
          </span>
        ))}
        </div>
        
      </div>
    )
}
export default GenresList