import React, { useState, useEffect } from "react";
import tmdbApi from "../api/tmdbApi";
import { truncate } from "../untils/untils";
import Modal from "./Modal";
import genres from "../assets/data/genres";
import genrestv from "../assets/data/genrestv";
import PlayVideo from "./PlayVideo";

const baseImgUrl = `https://image.tmdb.org/t/p/original/`;

function Banner(props) {
  const category = props.category;
  const [movie, setMovie] = useState([]);


  //   genres
  var gender_ids = [];
  if (category === "movie") {
    genres.map(el => (gender_ids[el.id] = el.name));
  } else genrestv.map(el => (gender_ids[el.id] = el.name));

  const matchTitle =
    movie?.original_title ||
    movie?.title ||
    movie?.name ||
    movie?.original_name;
    // Video frame
    const [selectedVideo, setSelectedVideo] = useState([])
    const [isShowingVideo, setIsShowingVideo] = useState(false)

    const handlePlayVideo = movie => {
    setSelectedVideo(movie)
    setIsShowingVideo(true)
  }
  const handleCloseVideo = () => {
      setIsShowingVideo(false)
      setSelectedVideo([])
  }
  //   Modal
  const [selected, setSelected] = useState([]);
  const [isShowing, setisShowing] = useState(false);
  

  
  

  const handleOpen = movie => {
    setSelected(movie);
    setisShowing(true);
  };

  const handleClose = () => {
    setisShowing(false);
    setSelected([]);
  };

 

  useEffect(() => {
    const fetchData = async () => {
      const params = {};
      let res = null;
      if (category === "movie") {
        res = await tmdbApi.getMoviesList(props.type, { params });
      } else res = await tmdbApi.getTvList(props.type, { params });

      setMovie(res.results[Math.floor(Math.random() * res.results.length - 1)]);
      return res;
    };
    fetchData();
  }, [category, props.type]);


  return (
    movie ? (
      <div
      className="section-banner"
      style={{
        backgroundImage: `url(${baseImgUrl}${
          movie?.backdrop_path ? movie?.backdrop_path : movie?.poster_path
        })`
      }}
    >
   
           
       
    
      <div className="banner-content">
        {/* original_title, title : movie ;original_name, name: tvseries  */}
        <h3 className="title">{matchTitle}</h3>
        <div className="desc">{truncate(movie?.overview, 150)}</div>
        <div className="btn-group">
          <span className="btn btn-play" onClick={()=>handlePlayVideo(movie)}>
            
            <i className="fa fa-play"></i> Play
          </span>
          <span className="btn btn-info" onClick={() => handleOpen(movie)}>
            
            <i className="fa fa-info"></i> More Info
          </span>
        </div>
      </div>
      
      <Modal 
        isShowing={isShowing} 
        close={handleClose} 
        movie={selected} 
        category={category} 
        gender_ids={gender_ids} 
        title ={matchTitle}
        
        />
        {
          isShowingVideo ? (
            <PlayVideo 
            close = {handleCloseVideo}
            show={isShowingVideo}
            item={selectedVideo}
            category={category}/>
          ): null
        }
         
    </div>
    ) : <div className="section-banner"
               style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1621955964441-c173e01c135b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fG5ldGZsaXh8ZW58MHx8MHx8&auto=format&fit=crop&w=2000&q=60)`
      }}
    ></div>
  );
}

export default Banner;
