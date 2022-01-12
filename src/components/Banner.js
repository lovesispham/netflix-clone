import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import tmdbApi,{playvideo} from "../api/tmdbApi";
import { truncate } from "../untils/untils";
import ModalForm from "./ModalForm";
import ModalDetail from "./ModalDetail";
import PlayVideo from "./PlayVideo";
import useIsMounted from './useIsMounted'

const baseImgUrl = `https://image.tmdb.org/t/p/original/`;

function Banner(props) {
  const category = props.category;
  const [movie, setMovie] = useState([]);
  const genre_ids = movie?.genre_ids

  const matchTitle =
    movie?.original_title ||
    movie?.title ||
    movie?.name ||
    movie?.original_name;

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
  const isMountedRef = useIsMounted();


  useEffect(() => {
      const fetchData = async() => {
        const params = {};
        let res = null;

      
      if(category === 'movie'){
        res = await tmdbApi.getMoviesList(props.type, { params });
      }
      res = await tmdbApi.getTvList(props.type, { params });
      
      if(isMountedRef.current){
        setMovie(res.results[Math.floor(Math.random() * res.results.length - 1)]);
      }
      
      return res;
      }

      fetchData();
    
  }, [category, props.type,isMountedRef]);

  

  return movie ? (
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
          <span className="btn btn-play" onClick={() => handlePlayVideo(movie)}>
            <i className="fa fa-play"></i> Play
          </span>
          <span
            className="btn btn-info"
            onClick={() => handleOpenDetail(movie)}
          >
            <i className="fa fa-info"></i> More Info
          </span>
        </div>
      </div>

      {/* showing video*/}
      {isShowingVideo ? (
        <ModalForm show={isShowingVideo} setShowModal={setIsShowingVideo}>
          <div className="popup-container pu-video">
            <span className="popup-close" onClick={handleCloseVideo}>
              <i className="fa fa-close"></i>
            </span>
            <PlayVideo item={selectedVideo} category={category} playvideo={playvideo.autoplay} />
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
              gen={genre_ids}
            />
          </div>
        </ModalForm>
      ) : null}
    </div>
  ) : (
    <div
      className="section-banner"
      style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1621955964441-c173e01c135b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fG5ldGZsaXh8ZW58MHx8MHx8&auto=format&fit=crop&w=2000&q=60)`
      }}
    ></div>
  );
}

Banner.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  matchTitle: PropTypes.string,
  
  handlePlayVideo: PropTypes.func,
  handleCloseVideo: PropTypes.func,
  handleOpen: PropTypes.func,
  handleClose: PropTypes.func
};

export default Banner;
