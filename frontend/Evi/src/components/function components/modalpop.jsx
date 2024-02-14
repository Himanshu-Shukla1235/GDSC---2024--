import React from 'react';
import '../function components/popup.css';
import CancelIcon from '@mui/icons-material/Cancel';
const Modal = ({ onClose, children }) => {
    React.useEffect(() => {
      // Add the 'modal-open' class to the body when the modal mounts
      document.body.classList.add('modal-open');
  
      // Remove the 'modal-open' class when the modal unmounts
      return () => {
        document.body.classList.remove('modal-open');
      };
    }, []);
  
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          {children}
         
          <CancelIcon className="modal-close" sx={{fontSize:35,color:'grey'}} onClick={onClose}> </CancelIcon> 
        </div>
      </div>
    );
  };
  export default Modal;