import React from "react";
import {useParams} from 'react-router'
import SearchList from '../components/SearchList'

function Search(props) {
   const { keyword } = useParams();
   console.log(keyword)
  return (
    
      <div className="section-movie-grid">
      <div className="top-heading">
        {
          keyword && keyword.length > 0 ? (
            <h2 className="heading">
          
            Search results for : {keyword}
        </h2>
          ):(
            <h2 className="heading">
          
            Sorry, not found
        </h2>
          )
        }
        
        
      </div>
       
        <SearchList keyword={keyword}/>
        
      
      </div>
    
  );
}

export default Search;
