import { useSelector } from "react-redux";
import MovieItem from "../components/MovieItem";
import TvItem from "../components/TvItem";
import { category } from '../api/tmdbApi';

function MyList() {
  const movies = useSelector(state => state.movies.moviesFav);
  const tvs = useSelector(state => state.tvs.tvsFav);

  

 

  return (
    <div className="section-movie-grid">
      <div className="top-heading">
        <h2 className="heading">
            My Listing
            
        </h2>
        
        
      </div>
      <div className="movie-grid">
        {
          movies && movies.length > 0 ? (
            <div className="top-heading">
        <h2 className="heading">
            Movie
            
        </h2>
        <a href="/movie" className="viewmore">View more <span className="fa fa-chevron-right"></span> </a>
        
      </div>
          ) : null
        }
        <div className="grid-list">
        {
            movies  && movies.length > 0 ?(
                movies.map((item, index) => (
            <div className="slider-item" key={index}>
              <MovieItem item={item} category={category.movie}/>
            </div>
          ))
            ) : null
            
        }
          
        </div>
      </div>
      
      <div className="movie-grid">
      {
        tvs && tvs.length > 0 ? (
            <div className="top-heading">
        <h2 className="heading">
            TV Shows
            
        </h2>
        <a href="/tv" className="viewmore">View more <span className="fa fa-chevron-right"></span> </a>
        
      </div>
          ) : null
        }
        <div className="grid-list">
          {
              tvs && tvs.length > 0 ?(
                  tvs.map((item, index) => (
            <div className="slider-item" key={index}>
              <TvItem item={item} category={category.tv}/>
            </div>
          ))
              ): null
          }
        </div>
      </div>
    </div>
  );
}

export default MyList;
