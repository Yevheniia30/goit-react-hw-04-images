import axios from 'axios';
import { Component } from 'react';
import { Searchbar } from './Searchbar';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader';
import { ImageGallery } from './ImageGallery';

const key = '16825213-7fb8f93f8fb61dc742d5122ac';

export class App extends Component {
  state = {
    images: [],
    loading: false,
  };

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    try {
      const response =
        await axios.get(`https://pixabay.com/api/?q=cat&page=1&key=${key}&image_type=photo&orientation=horizontal&per_page=12

`);
      console.log('response', response.data.hits);
      this.setState({
        images: response.data.hits,
      });
    } catch (error) {
      console.log('error');
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    console.log('images', this.state.images);

    return (
      <div
        style={{
          // height: '100vh',
          // display: 'flex',
          // flexDirection: 'column',
          // justifyContent: 'center',
          // alignItems: 'center',
          // // fontSize: 40,
          // color: '#010101',

          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <Searchbar />
        {this.state.loading ? (
          <Loader />
        ) : (
          <ImageGallery data={this.state.images} />
        )}
        {/* <Modal /> */}
      </div>
    );
  }
}
