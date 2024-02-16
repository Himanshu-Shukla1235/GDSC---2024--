import React, { useState } from 'react';
// import './Modal.css'; // Import your modal styling

// Modal.jsx
import Modal from "../function components/modalpop"


import '../function components/popup.css';

  





const PopupPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
  
    return (
      <div>
        <h1>Popup Page</h1>
        <button onClick={openModal}>Open Modal</button>
  
        {isModalOpen && <Modal onClose={closeModal} />}
      </div>
    );
  };
  
  export default PopupPage;
