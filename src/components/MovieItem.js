import React,{ useState, useEffect } from "react";
import Modal from "./Modal";

const baseImgUrl = `https://image.tmdb.org/t/p/w500/`;


function MovieItem(props) {
  const item = props.item;
  const category = props.category
  const {gender_ids} = props
  const matchTitle = item.original_title || item.title
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

  useEffect(() => {
    document.body.classList.toggle("no-scroll", isShowing);
  }, [isShowing]);

  return (
    <div className="item">
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
                src={`${baseImgUrl}${item.backdrop_path || item.poster_path}`}
                alt={item.title}
              />
                
            </div>
            <div className="info">
                <div className="icon-group">
                  <div className="circle-icon">
                    <span className="fa fa-play"></span>
                  </div>
                  <div className="circle-icon">
                    <span className="fa fa-thumbs-up"></span>
                  </div>
                  <div className="circle-icon">
                    <span className="fa fa-thumbs-down"></span>
                  </div>
                  <div className="circle-icon last" onClick={()=>handleOpen(item)}>
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
                  {item.genre_ids?.slice(0,3).map(id => (
                    <li key={id}>{gender_ids[id]}</li>
                  ))} 
                  
                </ul>
                
              </div>
    </div>
           
              
  );
}

export default MovieItem;
