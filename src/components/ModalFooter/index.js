import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import photo from '../../images/photo4.webp';

export default function ModalFooter () {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModalButton = useRef(null);

  useEffect(() => {
    const modalFooterBackdrop = document.querySelector('[data-backdrop]');

    const closeModal = () => {
      modalFooterBackdrop.classList.add('is-hidden');
      clearBackdropListeners();
      setIsModalOpen(false);
    };

    const closeModalbyCross = () => {
      closeModal();
    };

    const onKeyClick = (event) => {
      if (event.code === 'Escape') {
        closeModal();
      }
    };

    const closeModalbyBackdrop = (event) => {
      if (event.target === modalFooterBackdrop) {
        closeModal();
      }
    };

    const clearBackdropListeners = () => {
      window.removeEventListener('keydown', onKeyClick);
      window.removeEventListener('click', closeModalbyBackdrop);
      closeModalButton.current.removeEventListener('click', closeModalbyCross);
    };

    if (isModalOpen) {
      modalFooterBackdrop.classList.remove('is-hidden');
      window.addEventListener('keydown', onKeyClick);
      window.addEventListener('click', closeModalbyBackdrop);
      closeModalButton.current.addEventListener('click', closeModalbyCross);
    }

    return clearBackdropListeners;
  }, [isModalOpen]);

  const onClickHandler = (e) => {
    e.preventDefault();
    setIsModalOpen(true)}
    const screenWidth = window.innerWidth;
  return (
    <>
      <div className="footer-text">
        Developed by
        {screenWidth > 767 ? <a href="/" data-open-modal className="footer-text-right" onClick={onClickHandler} >
          Patelux
        </a> : <span>{` Patelux `}</span>}
      </div>
      <div className="backdrop-team is-hidden" data-backdrop>
        <div className="modal-team">
          <FontAwesomeIcon
            icon={faTimes}
            
            className="modal-close"
            data-close-modal
            onClick={() => setIsModalOpen(false)}
            ref={closeModalButton}
          />
          <div className="team-title title">this app developed with Beetroot support by</div>
            <div className="team-item">
              <img src={photo} alt="" className="person-image" />
              <div className="team-unit">
                <h3 className="person-name">Levenets Natalia</h3>
                <p className="person-position">FrontEnd Developer</p>
            </div>
          </div>
        </div>
      </div>    
    </>

  )
};

