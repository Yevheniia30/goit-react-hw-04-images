import axios from 'axios';
import { Component } from 'react';
import { Searchbar } from './Searchbar';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';

const key = '16825213-7fb8f93f8fb61dc742d5122ac';

export class App extends Component {
  state = {
    images: [],
    loading: false,
    searchQuery: '',
    error: '',
    page: 1,
  };

  getImages = async () => {
    const { searchQuery, page } = this.state;
    try {
      this.setState({
        loading: true,
      });
      const response =
        await axios.get(`https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=12

`);
      console.log('response', response.data.hits);
      this.setState({
        images: response.data.hits,
      });
    } catch (error) {
      this.setState({
        error: 'Oops something went wrong...try again;',
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      console.log('new searrch', prevState.searchQuery, this.state.searchQuery);
      this.setState({
        page: 1,
      });
      this.getImages();
    }
  }

  onSubmit = query => {
    console.log('query', query);
    this.setState({
      searchQuery: query,
    });
  };

  onLoadClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    this.getImages();
  };

  render() {
    console.log('images', this.state.images);
    const { images, loading, error } = this.state;
    console.log('searchquery', this.state.searchQuery);
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <Searchbar onSubmit={this.onSubmit} />
        {loading ? <Loader /> : error ? error : <ImageGallery data={images} />}
        {images.length ? <Button onClick={this.onLoadClick} /> : null}
        {/* <Modal /> */}
      </div>
    );
  }
}
