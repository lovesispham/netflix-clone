import React,{useState, useEffect,useCallback} from "react";
import tmdbApi from "../api/tmdbApi";
import useIsMounted from './useIsMounted'

//Video hien ra khi select item by id

function PlayVideo(props){
    const [video, setVideo] = useState([]);
    const item = props.item;
    const category = props.category
    const playvideo = props.playvideo

    const isMountedRef = useIsMounted();

    const setVideoActive = useCallback(
      async() => {
        const res = await tmdbApi.getVideos(category,item.id);
        const result = res.results
        let videoKey = null
        let setPlay = ''
        if(result && result.length > 0 ){
          
          videoKey = result[0].key
          
        }
        
        if(playvideo === 'autoplay'){
          setPlay = "?rel=0&autoplay=1&mute=1"
        } 

        const videoSrc = "https://www.youtube.com/embed/" +
                          videoKey
                         + setPlay ;
          
        
        
        
       
                         
                         if(isMountedRef.current){
                            setVideo(videoSrc);
                         }
      },
      [item.id, category, playvideo, isMountedRef],
    )

    useEffect(() => {
      
      setVideoActive();
      
    }, [item.id, category, playvideo]);

    return (
      <div className="video-content" id={`modal_${item.id}`}>
            <iframe 
              frameBorder='0'
              allow='autoplay; encrypted-media'
              allowFullScreen
              src={video} 
              title="video" 
              className="video-full"
              />
      </div>
    )
}         

export default PlayVideo;
