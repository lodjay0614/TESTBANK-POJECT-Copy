// Modal.js
import React from 'react';


const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modals-overlay">
      <div className="modals">
        <div className='flex justify-end'> 
             <a className="modals-close" onClick={onClose}>X</a>
        </div>
      
        <div className="modals-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
