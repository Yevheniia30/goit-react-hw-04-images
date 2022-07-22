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
    // if (this.props.image) {
    body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleClose);
      body.style.overflow = 'auto';
    };
  }, [onClose, body]);

  // const handleClose = e => {
  //   if (e.target === e.currentTarget) {
  //     onClose();
  //     return;
  //   }
  //   if (e.code === 'Escape') {
  //     onClose();
  //     // return;
  //   }
  // };

  return createPortal(
    <div className={s.Overlay} onClick={handleOverlay}>
      <div className={s.Modal}>
        <img src={image} alt={altImage} />
      </div>
    </div>,
    modalRoot
  );
};

// const modalRoot = document.getElementById('modal-root');
// const body = document.querySelector('body');

// export class ModalOld extends Component {
//   componentDidMount() {
//     document.addEventListener('keydown', this.handleClose);
//     // if (this.props.image) {
//     body.style.overflow = 'hidden';
//     // }
//     // if (!isOpen) body.style.overflow = 'auto';
//   }

//   componentWillUnmount() {
//     document.removeEventListener('keydown', this.handleClose);
//     body.style.overflow = 'auto';
//   }

//   handleClose = e => {
//     if (e.target === e.currentTarget) {
//       this.props.onClose();
//       return;
//     }
//     if (e.code === 'Escape') {
//       this.props.onClose();
//       // return;
//     }
//   };

//   render() {
//     return createPortal(
//       <div className={s.Overlay} onClick={this.handleClose}>
//         <div className={s.Modal}>
//           <img src={this.props.image} alt={this.props.altImage} />
//         </div>
//       </div>,
//       modalRoot
//     );
//   }
// }

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  altImage: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
