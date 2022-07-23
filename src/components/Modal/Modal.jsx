import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

export const Modal = ({ image, altImage, onClose }) => {
  const modalRoot = document.getElementById('modal-root');
  const body = document.querySelector('body');

  const handleOverlay = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleClose = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleClose);
    body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleClose);
      body.style.overflow = 'auto';
    };
  }, [onClose, body]);

  return createPortal(
    <div className={s.Overlay} onClick={handleOverlay}>
      <div className={s.Modal}>
        <img src={image} alt={altImage} />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  altImage: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
