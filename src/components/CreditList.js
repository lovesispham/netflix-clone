import PropTypes from "prop-types"
import React, { useState, useEffect, useCallback } from "react";
import tmdbApi from "../api/tmdbApi";
import useGenreConvert from './useGenreConvert'
import useIsMounted from './useIsMounted'

function CreditList(props) {
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [duration, setDuration] = useState([]);
  const { item, category, gen} = props
  const genresConvert = useGenreConvert(gen);
  //movie:release_date || tv show: first_air_date
  const mathDate = item.release_date || item.first_air_date || null
  
  const isMountedRef = useIsMounted();
  const getCredits = useCallback(
    async() => {
      const res = await tmdbApi.credits(category, item.id);
      if(isMountedRef.current){
        setCast(res.cast);
        setCrew(res.crew);
      }
    },
    [item.id,category,isMountedRef],
  )

    const getDetail = useCallback(
      async() => {
        const res = await tmdbApi.detail(category, item.id);
        if(isMountedRef.current){
        setDuration(res.runtime,isMountedRef);
        }
      },
      [item.id,category,isMountedRef],
    )

  useEffect(() => {
   
    getCredits();
      
      getDetail();
      
    
  }, [item.id,category ]);


  function crewHandle(){
    // create new array {known_for_department, name}
    const map = new Map(crew.map(({department, name}) => [department, { department, name: [] }])); 
    for (let {department, name} of crew) map.get(department).name.push(...[name].flat());
    return [...map.values()]
  }
  
  const newCrewList = crewHandle()
  
  // Duration: convert hour and minutes format h:m
  function convertDuration(result) {
    var hours = Math.floor(duration / 60);
    var minutes = duration % 60;
    var hours_text = 'h'
    var minutes_text = 'm'
    return (result = hours + hours_text + minutes + minutes_text);
  }
  
  return (
    <div className="cast-list">
      <div className="cast-item">
        <span className="text">Cast: </span>
        { //filter Acting
          cast
           
           .slice(0, 10)
           .map((item, index) => (
             <span key={index}>{(index ? ", " : "") + item.name}</span>
           ))
        } 
      </div>
      
      
              {
                newCrewList.map((item, index)=>(
                  <div className="cast-item" key={index}>
                  <span className="text">{item.department}: </span>
                  <span>{(index[index+1] ? " , " : " ") + item.name.slice(0,15)}</span>
                  </div>
                ))
              }
        

      

      <div className="cast-item genres-list">
        <span className="text">Genres: </span>
            {
              genresConvert && genresConvert.map((gen,index) => (
                <span key={index}>{(index ? ", " : "") + gen}</span>
              ))
            }
        
      </div>
      <div className="cast-item">
        <span className="text">Release Date: </span>

        {
          new Intl.DateTimeFormat("en-GB").format(new Date(mathDate))
        }
            
      </div>
      {category === "movie" ? (
        <div className="cast-item">
          <span className="text">Duration: </span>

          { duration ? convertDuration() : 'Not Available'}
        </div>
      ) : null}
    </div>
  );
}

CreditList.propTypes = {
  category: PropTypes.string.isRequired,
  item: PropTypes.shape({
    department: PropTypes.string,
    first_air_date: PropTypes.string,
    
    id: PropTypes.number,
   
    release_date: PropTypes.string
  })
}


export default CreditList;
