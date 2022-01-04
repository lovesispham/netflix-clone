import React,{useState, useEffect} from "react";
import ReactDOM from "react-dom";
import tmdbApi from "../api/tmdbApi";

//Video hien ra khi select item by id

function PlayVideo(props){
    const [video, setVideo] = useState([]);
    const {show, close} = props
    const item = props.item;
    const category = props.category
    useEffect(() => {
      const setVideoActive = async () => {
        const res = await tmdbApi.getVideos(category,item.id);
        // console.log(videos.results)
  
        const videSrc =
          "https://www.youtube.com/embed/" +
          res.results[0].key + 
          "?rel=0&autoplay=1&mute=1";
  
        setVideo(videSrc);
        return res;
      };
      setVideoActive();
    }, [item.id, category]);
    // console.log(video);

    return show 
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="modal-overlay"></div>
          <div
            id={`modal_${item.id}`}
            className={`modal-popup_style2 ${
              show
                ? "open view-transition-fade-expand-enter-active"
                : "view-transition-fade-shrink-leave"
            } `}
          >
          
          <div className="popup-container pu-video">
          <span className="popup-close" onClick={close}>
                <i className="fa fa-close"></i>
              </span>
      <div className="video-content">
      <iframe 
              frameBorder='0'
              allow='autoplay; encrypted-media'
              allowFullScreen
              src={video} 
              title="video" 
              className="video-full"
              />
      </div>
      </div>
          </div>
         </React.Fragment>,
        document.querySelector('.movieapp'),
      )
    : null;
}         
export default PlayVideo;
