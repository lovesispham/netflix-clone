import React, { useState, useEffect } from "react";
import tmdbApi from "../api/tmdbApi";

function CreditList(props) {
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [duration, setDuration] = useState([]);

  const item = props.item;
  const category = props.category;
  const gender_ids = props.gender_ids;
  //movie:release_date || tv show: first_air_date
  const mathDate = item.release_date || item.first_air_date || null
  
  

  useEffect(() => {
    const getCredits = async () => {
      const res = await tmdbApi.credits(category, item.id);
      setCast(res.cast);
      
      setCrew(res.crew);
      return res;
    };
    getCredits();
      const getDetail = async () => {
        const res = await tmdbApi.detail(category, item.id);

        setDuration(res.runtime);

        return res;
      };
      getDetail();
    
    
  }, [item.id,category]);


  function crewHandle(){
    // create new array {known_for_department, name}
    const map = new Map(crew.map(({department, name}) => [department, { department, name: [] }])); 
    for (let {department, name} of crew) map.get(department).name.push(...[name].flat());
    return [...map.values()]
  }
  
  var newCrewList = crewHandle()
  
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

        {item.genre_ids?.map((id, index) => (
          <span key={index}>{(index ? ", " : "") + gender_ids[id]}</span>
        ))}
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

export default CreditList;
