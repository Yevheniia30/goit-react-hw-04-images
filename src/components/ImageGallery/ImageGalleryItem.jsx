import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';

export const ImageGalleryItem = ({ item }) => {
  console.log('item', item);
  return (
    // <div>
    <li className={s.ImageGalleryItem}>
      {' '}
      <img
        className={s.ImageGalleryItem_image}
        src={item?.webformatURL}
        alt={item?.tags}
      />
    </li>
    // </div>
  );
};

ImageGalleryItem.propTypes = {};
