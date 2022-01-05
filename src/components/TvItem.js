import PropTypes from "prop-types"
import React,{ useState, useRef } from "react";
import Modal from "./Modal";
import PlayVideo from "./PlayVideo";
import useOutsideClick from './useOutsideClick';

import blank from '../assets/blank.jpg';
const baseImgUrl = `https://image.tmdb.org/t/p/w500/`;


function TvItem(props) {
  const item = props.item;
  const category = props.category
  const {gender_ids} = props
  const matchTitle = item.name || item.original_name
  const backdropImage = item.backdrop_path
  const modalRef = useRef()

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
 
   const handleOpen = id => {
     setSelected(id);
     setisShowing(true);
   };
 
   const handleClose = () => {
     setisShowing(false);
     setSelected([]);
   };
   
   useOutsideClick(modalRef,()=>{
    if(isShowing) setisShowing(false)
  })


  return (
    <div className="item">
     {
          isShowingVideo ? (
    <PlayVideo 
            close = {handleCloseVideo}
            show={isShowingVideo}
            item={selectedVideo} 
            category={category}/>
          ):null
          }
    <Modal 
        isShowing={isShowing} 
        close={handleClose} 
        movie={selected} 
        category={category} 
        gender_ids={gender_ids} 
        title ={matchTitle}
        
        />
      <div className="photo">
              <img

                src={backdropImage? `${baseImgUrl}${item.backdrop_path || item.poster_path}`: blank}
                alt={item.title}
              />
                <div className="circle-icon" onClick={()=> handlePlayVideo(item)}>
                <span className="fa fa-play"></span>
                  </div>
            </div>
            <div className="info-mb">
              <h3 className="title">{matchTitle}</h3>
            </div>
            <div className="info">
                <div className="icon-group">
                  <div className="circle-icon" onClick={()=> handlePlayVideo(item)}>
                    <span className="fa fa-play"></span>
                  </div>
                 
                  <div className="circle-icon" onClick={()=>handleOpen(item)}>
                    <span className="fa fa-angle-down"></span>
                  </div>
                </div>
                <div className="top-info">
                  <span className="text-match">
                   <i className="fa fa-star"></i> {item.vote_average}/10
                  </span>
                  <span className="date"><i className="fa fa-calendar"></i>
                  {new Intl.DateTimeFormat('en-GB')
                  .format(new Date(item.first_air_date? item.first_air_date : null))}
                  
                  </span>
                
                </div>
                <ul className="genres-list">
                  {item.genre_ids?.slice(0,3).map(id => (
                    <li key={id}>{gender_ids[id]}</li>
                  ))} 
                  
                </ul>
                
              </div>
    </div>
           
              
  );
}

TvItem.propTypes = {
  handlePlayVideo:PropTypes.func,
  handleCloseVideo:PropTypes.func,
  handleOpen:PropTypes.func,
  handleClose:PropTypes.func,
  category: PropTypes.string.isRequired,
  item: PropTypes.shape({
    backdrop_path: PropTypes.string,
    first_air_date: PropTypes.string,
    name: PropTypes.string,
    original_name: PropTypes.string,
    poster_path: PropTypes.string,
    title: PropTypes.string,
    vote_average: PropTypes.number
  })
}

export default TvItem;
