import React from "react";
import ReactDOM from "react-dom";
import VideoItem from "./VideoItem";
import CreditList from "./CreditList";
import SimilarList from "./SimilarList";
import {truncate} from '../untils/untils'
function Modal(props) {
  const { isShowing, close, movie, gender_ids, title } = props;
  const category = props.category
  

  return isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div
            id={`modal_${movie.id}`}
            className={`modal-popup_style2 ${
              isShowing
                ? "open view-transition-fade-expand-enter-active"
                : "view-transition-fade-shrink-leave"
            } `}
          >
          
            <div className="popup-container pu-review">
              <span className="popup-close" onClick={close}>
                <i className="fa fa-close"></i>
              </span>
              <div className="pu-content">
                <VideoItem item={movie} category={category}/>
                <div className="content scroll_pu_content">
                  <h2 className="heading">{title}</h2>
                  <div className="description">
                    {truncate(movie?.overview, 150)}
                  </div>
                  
                  <CreditList 
                      item={movie} 
                      gender_ids={gender_ids} 
                      category={category} 
                    
                      
                      />
                  <SimilarList item={movie} category={category}/>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;
}
export default Modal;
