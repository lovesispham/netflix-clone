import PropTypes from "prop-types"
import React, {useState, useEffect} from 'react'
import tmdbApi,{playvideo} from '../api/tmdbApi'
import ModalForm from "./ModalForm";
import PlayVideo from "./PlayVideo";
import {dateToYearOnly} from '../untils/untils';
import useIsMounted from './useIsMounted'

const baseImgUrl = `https://image.tmdb.org/t/p/w500/`;

function SimilarList(props) {

    const [movie, setMovie] = useState([])
    const [showMore,setshowMore] = useState(false)
    const numberofItem = showMore ? movie.length : 9

    const item = props.item
    const category = props.category
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
        const getSimilarList = async() => {
          const res = await tmdbApi.similar(category,item.id)
      if(isMountedRef.current){
      setMovie(res.results)
      }
        }
        getSimilarList()
        
    }, [item.id,category,isMountedRef])
    
    
    return (
        <div className="similar-listing">
            <h2 className="heading">More Like This</h2>
           {/* showing video*/}
      {isShowingVideo ? (
        <ModalForm show={isShowingVideo} setShowModal={setIsShowingVideo}>
          <div className="popup-container pu-video">
            <span className="popup-close" onClick={handleCloseVideo}>
              <i className="fa fa-close"></i>
            </span>
            <PlayVideo item={selectedVideo} category={category}  playvideo={playvideo.autoplay}/>
          </div>
        </ModalForm>
      ) : null}

            <div className="row">
                {
                    movie.slice(0,numberofItem).map((item,index)=> (
                        <div className="col-xs-4" key={index}>
                            <div className="item">
                            
                                <div className="photo">
                                   <img src={`${baseImgUrl}${item.poster_path || item.backdrop_path}`} alt={item.title}/>
                                   <div className="circle-icon" onClick={()=> handlePlayVideo(item)}>
                <span className="fa fa-play"></span>
                  </div>
                                </div>
                                <div className="info">
                                <div className="top-info">
                                    <span className="text-match">
                                    <i className="fa fa-star"></i> {item.vote_average}/10
                                    </span>
                                    <span className="date"><i className="fa fa-calendar"></i>
                                    {/* movie:release_date || tv show: first_air_date  */}
                                    {dateToYearOnly(item.release_date || item.first_air_date)}
                                    
                                    </span>
                                    
                                    </div>
                                    <div className="desc">
                                       {item.overview}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <span className="btn-clickmore" onClick={()=>setshowMore(!showMore)}> 
            <span className="circle-btn"> 
            <i className={`fa ${showMore ? 'fa-angle-down' : 'fa-angle-up'}`}></i>
             </span> 
            </span>
        </div>
    )
}

SimilarList.propTypes = {
  category: PropTypes.string.isRequired,
  item: PropTypes.shape({
    backdrop_path: PropTypes.string,
    first_air_date: PropTypes.string,
    id: PropTypes.number,
    overview: PropTypes.string,
    poster_path: PropTypes.string,
    release_date: PropTypes.string,
    title: PropTypes.string,
    vote_average: PropTypes.number
  })
}

export default SimilarList
