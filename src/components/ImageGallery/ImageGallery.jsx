import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';
import { ImageGalleryItem } from './ImageGalleryItem';

export const ImageGallery = ({ data }) => {
  console.log('data', data);
  return (
    <ul className={s.ImageGallery}>
      {data.map(item => (
        <ImageGalleryItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {};
