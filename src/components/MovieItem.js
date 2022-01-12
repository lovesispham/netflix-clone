import PropTypes from "prop-types"
import React,{ useState } from "react";
import {playvideo} from '../api/tmdbApi'

import ModalForm from "./ModalForm";
import ModalDetail from "./ModalDetail";
import PlayVideo from "./PlayVideo";
import useGenreConvert from './useGenreConvert'
import blank from "../assets/blank.jpg";

import {useDispatch, useSelector} from 'react-redux';
import {addFav, removeFav} from '../redux/movie/movieSlice'
const baseImgUrl = `https://image.tmdb.org/t/p/w500/`;

function MovieItem(props) {
  const dispatch = useDispatch();
  

  const {item,category} = props
  const matchTitle = item.original_title || item.title
  const backdropImage = item.backdrop_path
  const genre_ids = item.genre_ids
  const genresConvert = useGenreConvert(genre_ids)

  // tim fav item Dua tren state lay tren redux
  const favMovie = useSelector((state) => state.movies.moviesFav);
  const isFavorite = favMovie.map((item) => item.id).includes(item.id);
  
  //   Modal Detail
  const [selected, setSelected] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenDetail = movie => {
    setSelected(movie);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelected([]);
  };

  // Modal Video

  const [selectedVideo, setSelectedVideo] = useState([]);
  const [isShowingVideo, setIsShowingVideo] = useState(false);

  const handlePlayVideo = movie => {
    setSelectedVideo(movie);
    setIsShowingVideo(true);
  };
  const handleCloseVideo = () => {
    setIsShowingVideo(false);
    setSelectedVideo([]);
  };
  // add Favourites
  const handleAddFav = movie => {
    const action = addFav(movie)
    dispatch(action)
  }
  const handleRemoveFav = movie => {
    const action = removeFav(movie)
    dispatch(action)
  }

 

  return (
    <div className="item">
     {/* showing video*/}
     {isShowingVideo ? (
        <ModalForm show={isShowingVideo} setShowModal={setIsShowingVideo}>
          <div className="popup-container pu-video">
            <span className="popup-close" onClick={handleCloseVideo}>
              <i className="fa fa-close"></i>
            </span>
            <PlayVideo item={selectedVideo} category={category} playvideo={playvideo.autoplay}/>
          </div>
        </ModalForm>
      ) : null}

      {/* showing modal detail */}

      {openModal ? (
        <ModalForm show={openModal} setShowModal={setOpenModal}>
          <div className="popup-container pu-review">
            <span className="popup-close" onClick={handleClose}>
              <i className="fa fa-close"></i>
            </span>
            <ModalDetail
              movie={selected}
              category={category}
              title={matchTitle}
              playvideo={playvideo.mute}
              gen = {genre_ids}
            />
          </div>
        </ModalForm>
      ) : null}
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
              {
                    isFavorite ? (
                      <div className="circle-icon" onClick={()=>handleRemoveFav(item)}>
                    <span className='fa fa-heart c_red'></span>
                  </div>
                    ) : (
                      <div className="circle-icon" onClick={()=>handleAddFav(item)}>
                    <span className='fa fa-heart-o'></span>
                  </div>
                    )
                  }
            </div>
            <div className="info">
                
                <div className="icon-group">
                  <div className="circle-icon" onClick={()=> handlePlayVideo(item)}>
                    <span className="fa fa-play"></span>
                  </div>
                  {
                    isFavorite ? (
                      <div className="circle-icon" onClick={()=>handleRemoveFav(item)}>
                    <span className='fa fa-check'></span>
                  </div>
                    ) : (
                      <div className="circle-icon" onClick={()=>handleAddFav(item)}>
                    <span className='fa fa-plus'></span>
                  </div>
                    )
                  }
                 
                  
                  <div className="circle-icon last" onClick={()=>handleOpenDetail(item)}>
                    <span className="fa fa-angle-down"></span>
                  </div>
                </div>
                <div className="top-info">
                  <span className="text-match">
                   <i className="fa fa-star"></i> {item.vote_average}/10
                  </span>
                  <span className="date"><i className="fa fa-calendar"></i>
                  {new Intl.DateTimeFormat('en-GB')
                    .format(new Date(item.release_date? item.release_date : null))}
                  
                  </span>
                
                </div>
                <ul className="genres-list">
                  
                {
                    genresConvert && genresConvert.map((gen,index) => (
                <li key={index}>{gen}</li>
              ))
                  }
                </ul>
                
              </div>
    </div>
           
              
  );
}

MovieItem.propTypes = {
  handlePlayVideo:PropTypes.func,
  handleCloseVideo:PropTypes.func,
  handleOpen:PropTypes.func,
  handleClose:PropTypes.func,
  category: PropTypes.string.isRequired,
  item: PropTypes.shape({
    backdrop_path: PropTypes.string,
    original_title: PropTypes.string,
    poster_path: PropTypes.string,
    release_date: PropTypes.string,
    title: PropTypes.string,
    vote_average: PropTypes.number,
    
  })
}

export default MovieItem;
