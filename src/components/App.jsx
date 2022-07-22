// import axios from 'axios';
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

  //  componentDidUpdate(prevProps, prevState) {
  //   if (prevState.searchQuery !== this.state.searchQuery) {
  //     // console.log('new searrch', prevState, this.state);
  //     this.getImages();
  //   }
  // }

  // const getImages = async () => {
  //   setIsLoading(true);

  //   try {
  //     const data = await getImagesReq({ searchQuery, page });

  //     setImages([...images, ...data.hits]);
  //     setPage(page => page + 1);
  //     setTotal(data.totalHits);

  //     window.scrollTo({
  //       top: document.documentElement.scrollHeight,
  //       behavior: 'smooth',
  //     });
  //   } catch (error) {
  //     setError({ error });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const onSubmit = query => {
    console.log('query', query);
    if (query === searchQuery) {
      return;
    }
    // this.setState({
    //   searchQuery: query,
    //   page: 1,
    //   images: [],
    // });
    setSearchQuery(query);
    setPage(1);
    setImages([]);
    setError(null);
  };

  const onLoadClick = () => {
    // this.getImages();
    // getImages();
    setPage(page => page + 1);
  };

  const onOpenModal = e => {
    if (e.target.nodeName === 'IMG') {
      // this.setState({
      //   isModalImage: e.target.dataset.modal,
      // });
      setisModalImage(e.target.dataset.modal);
      setisAltModalImage(e.target.alt);
    }
  };

  const onCloseModal = () => {
    console.log('onClose');
    // this.setState({
    //   isModalImage: '',
    //   isAltModalImage: '',
    // });
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
          image={isModalImage}
          altImage={isAltModalImage}
          onClose={onCloseModal}
        />
      )}
    </div>
  );
};

// export class AppOld extends Component {
//   state = {
//     images: [],
//     isLoading: false,
//     searchQuery: '',
//     error: null,
//     page: 1,
//     isModalImage: '',
//     isAltModalImage: '',
//     total: 0,
//   };

//   // componentDidMount() {
//   // this.getImages();
//   // }

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.searchQuery !== this.state.searchQuery) {
//       // console.log('new searrch', prevState, this.state);
//       this.getImages();
//     }
//   }

//   getImages = async () => {
//     const { searchQuery, page } = this.state;
//     this.setState({
//       isLoading: true,
//     });
//     try {
//       const data = await getImagesReq({ searchQuery, page });

//       // console.log('response', data.hits);
//       this.setState(prevState => ({
//         images: [...prevState.images, ...data.hits],
//         page: prevState.page + 1,
//         total: data.totalHits,
//       }));

//       window.scrollTo({
//         top: document.documentElement.scrollHeight,
//         behavior: 'smooth',
//       });
//     } catch (error) {
//       this.setState({ error });
//     } finally {
//       this.setState({
//         isLoading: false,
//       });
//     }
//   };

//   onSubmit = query => {
//     console.log('query', query);
//     this.setState({
//       searchQuery: query,
//       page: 1,
//       images: [],
//     });
//   };

//   onLoadClick = () => {
//     this.getImages();
//   };

//   onOpenModal = e => {
//     if (e.target.nodeName === 'IMG') {
//       this.setState({
//         isModalImage: e.target.dataset.modal,
//       });
//     }
//   };

//   onCloseModal = () => {
//     this.setState({
//       isModalImage: '',
//       isAltModalImage: '',
//     });
//   };

//   render() {
//     // console.log('images', this.state.images);
//     const { images, isLoading, error, isModalImage, isAltModalImage, total } =
//       this.state;
//     const { onSubmit, onOpenModal, onLoadClick, onCloseModal } = this;
//     // console.log('searchquery', this.state.searchQuery);
//     return (
//       <div
//         style={{
//           display: 'grid',
//           gridTemplateColumns: '1fr',
//           gridGap: '16px',
//           paddingBottom: '24px',
//         }}
//       >
//         <Searchbar onSubmit={onSubmit} />
//         {error ? (
//           <h2>Oops something went wrong...try again</h2>
//         ) : (
//           <ImageGallery data={images} onClickToOpenModal={onOpenModal} />
//         )}
//         {images.length && !isLoading && images.length < total ? (
//           <Button onClick={onLoadClick} />
//         ) : null}
//         {isLoading && <Loader />}
//         {isModalImage && (
//           <Modal
//             image={isModalImage}
//             altImage={isAltModalImage}
//             onClose={onCloseModal}
//           />
//         )}
//       </div>
//     );
//   }
// }
