import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import css from './App.module.css';
// import { BallTriangle } from 'react-loader-spinner';
import { getImages } from '../service/api';
import { ImgModal } from './Modal/ImgModal';
import { ToastContainer, toast } from 'react-toastify';
import { Loader } from './Loader/Loader';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    showModal: false,
    largeImage: '',
    total: 0,
    error: null,
    tags: '',
    showLoadMore: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      try {
        const images = await getImages(query, page);
        const newTotal = images.total;
        const newImages = images.hits;

        this.setState(prevState => ({
          images: page === 1 ? newImages : [...prevState.images, ...newImages],
          total: newTotal,
          showLoadMore: newTotal > page * 12,
          isLoading: false,
        }));
      } catch (error) {
        console.log(error);
        this.setState({ error, isLoading: false });
      }
    }
  }

  handleFormSubmit = async query => {
    this.setState({ query, page: 1, images: [], isLoading: true, error: null });
    try {
      const response = await getImages(query);
      const images = response.hits;
      if (images.length === 0) {
        toast.warn('Sorry, no images found for your search. Please try again!');
      }
      this.setState({ images });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };
  handleLoadMore = async () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      isLoading: true,
    }));
  };

  handleImageClick = (largeImage, tags) => {
    this.setState({ showModal: true, largeImage, tags });
  };

  closeModal = () => {
    this.setState({ showModal: false, largeImage: '', tags: '' });
  };

  render() {
    const { images, isLoading, showLoadMore, total } = this.state;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ToastContainer />
        {isLoading && <Loader />}
        {total === 0 && (
          <ToastContainer type="error" autoClose={false}>
            No results found. Please try a different search term.
          </ToastContainer>
        )}
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {images.length === 0 && !isLoading && (
          <ToastContainer type="error" autoClose={false}>
            No results found. Please try a different search term.
          </ToastContainer>
        )}

        {showLoadMore && (
          <Button onClick={this.handleLoadMore} text="Load more" />
        )}
        {this.state.showModal && (
          <ImgModal
            largeImageURL={this.state.largeImage}
            tags={this.state.tags}
            closeModal={this.closeModal}
          />
        )}
      </div>
    );
  }
}
