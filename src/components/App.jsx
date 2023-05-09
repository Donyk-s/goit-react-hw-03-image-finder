import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import css from './App.module.css';
import { BallTriangle } from 'react-loader-spinner';
import { getImages } from '../service/api';
import { ImgModal } from './Modal/ImgModal';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    showModal: false,
    selectedImage: null,
    total: 0,
    error: null,
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

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleFormSubmit = query => {
    this.setState({ query, page: 1, images: [], isLoading: true });
  };

  handleImageClick = (largeImageURL, tags) => {
    this.setState({
      showModal: true,
      selectedImage: { largeImageURL: largeImageURL, tags: tags },
    });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { images, isLoading, showLoadMore } = this.state;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {isLoading && (
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
          />
        )}
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {showLoadMore && (
          <Button onClick={this.handleLoadMore} text="Load more" />
        )}
        {this.state.showModal && (
          <ImgModal
            isOpen={this.state.showModal}
            closeModal={this.closeModal}
            largeImageURL={this.state.selectedImage.largeImageURL}
            tags={this.state.selectedImage.tags}
          />
        )}
      </div>
    );
  }
}
