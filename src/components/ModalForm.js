import React,{useRef} from 'react'
import ReactDOM from "react-dom";

 function ModalForm({show,setShowModal, children}) {
    const wrapperRef = useRef(null)

    const closeModal = (e) =>{
        if(e.target === wrapperRef.current)
        setShowModal(false)
    }
    
    

    return show 
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="modal-overlay"></div>
          <div ref={wrapperRef} onClick={closeModal}
            className={`modal-popup_style2 ${
              show
                ? "open view-transition-fade-expand-enter-active"
                : "view-transition-fade-shrink-leave"
            } `}
          >
            
              {children}
        </div>
          </React.Fragment>,
        document.querySelector('.movieapp'),
      )
    : null     
    
}

export default ModalForm
