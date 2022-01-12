import PropTypes from "prop-types"
import React from "react";
import PlayVideo from "./PlayVideo";
import CreditList from "./CreditList";
import SimilarList from "./SimilarList";
import {truncate} from '../untils/untils'
function ModalDetail(props) {
  const { movie, title, gen, category, playvideo } = props;
 
  
  return (
    <div className="pu-content" id={`modal_${movie.id}`}>
                
                <PlayVideo item={movie} category={category} playvideo={playvideo}/>
                <div className="content scroll_pu_content">
                  <h2 className="heading">{title}</h2>
                  <div className="description">
                    {truncate(movie?.overview, 150)}
                    
                  </div>
                  
                  <CreditList 
                      item={movie} 
                      gen={gen} 
                      category={category} 

                      
                      />
                  <SimilarList item={movie} category={category}/>
                </div>
              </div>
  )
}

ModalDetail.propTypes = {
  category: PropTypes.string.isRequired,
  
  title: PropTypes.string
}
export default ModalDetail;
