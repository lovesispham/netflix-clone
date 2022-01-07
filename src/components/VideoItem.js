import PropTypes from "prop-types"
import React,{useState, useEffect} from "react";
import tmdbApi from "../api/tmdbApi";

//Video hien ra khi select item by id

function VideoItem(props){
    const [video, setVideo] = useState([]);
    const item = props.item;
    const category = props.category

    useEffect(() => {
      const setVideoActive = async () => {
        const res = await tmdbApi.getVideos(category,item.id);
        // console.log(videos.results)
  
        const videSrc =
          "https://www.youtube.com/embed/" +
          res.results[0].key 
          // "?autoplay=1&mute=1";
  
        setVideo(videSrc);
      };
      setVideoActive();
    }, [item.id, category]);
    // console.log(video);
    return (
          
              <iframe src={video} title="video" />
           
      
    );
    }

VideoItem.propTypes = {
  category: PropTypes.string.isRequired,
  item: PropTypes.shape({
    id: PropTypes.number
    
  })
}
export default VideoItem;
