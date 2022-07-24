import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';

import { getImagesReq } from 'services/api';

export const App = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalImage, setisModalImage] = useState('');
  const [isAltModalImage, setisAltModalImage] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getImages = async () => {
      // console.log('getImages');
      setIsLoading(true);
      try {
        const data = await getImagesReq({ searchQuery, page });
        setImages(prev => [...prev, ...data.hits]);
        // setPage(page => page + 1);
        setTotal(data.totalHits);

        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      } catch (error) {
        setError({ error });
      } finally {
        setIsLoading(false);
      }
    };
    if (searchQuery) {
      getImages();
    }
  }, [page, searchQuery]);

  const onSubmit = query => {
    console.log('query', query);
    if (query === searchQuery) {
      return;
    }

    setSearchQuery(query);
    setPage(1);
    setImages([]);
    setError(null);
  };

  const onLoadClick = () => {
    setPage(page => page + 1);
  };

  const onOpenModal = id => {
    // console.log('id', id);
    const currentImage = images.find(item => item.id === id);
    setisModalImage(currentImage.largeImageURL);
    setisAltModalImage(currentImage.tags);
  };

  const onCloseModal = () => {
    // console.log('onClose');
    setisModalImage('');
    setisAltModalImage('');
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
    >
      <Searchbar onSubmit={onSubmit} />
      {error ? (
        <h2>Oops something went wrong...try again</h2>
      ) : (
        <ImageGallery data={images} onClickToOpenModal={onOpenModal} />
      )}
      {images.length && !isLoading && images.length < total ? (
        <Button onClick={onLoadClick} />
      ) : null}
      {isLoading && <Loader />}
      {isModalImage && (
        <Modal
          // image={isModalImage}
          // altImage={isAltModalImage}
          onClose={onCloseModal}
        >
          <img src={isModalImage} alt={isAltModalImage} />
        </Modal>
      )}
    </div>
  );
};
