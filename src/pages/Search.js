import React from "react";
import {useParams} from 'react-router'
import SearchList from '../components/SearchList'

function Search(props) {
   const { keyword } = useParams();
  return (
    
      <div className="section-movie-grid">
      <div className="top-heading">
      <h2 className="heading">
          
          Search results for : {keyword}
      </h2>
        
        
      </div>
       
        <SearchList keyword={keyword}/>
        
      
      </div>
    
  );
}

export default Search;
