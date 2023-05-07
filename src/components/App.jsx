import React, { Component } from 'react';
import { Searchbar } from './searchbar/Searchbar';
import { ImageGallery } from './imageGallery/ImageGallery';
import Button from './button/Button';
import css from './App.module.css';
import { BallTriangle } from 'react-loader-spinner';
import { getImages } from '../service/Api';
import { Modal } from './modal/Modal';

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

  // handleImageClick = (largeImageURL, tags) => {
  //   this.setState({
  //     showModal: true,
  //     selectedImage: { largeImageURL: largeImageURL, tags: tags },
  //   });
  // };
  clickLoad = () => {
    this.setState(prevSt => ({
      page: prevSt.page + 1, // збільшуємо номер сторінки на +1
    }));
  };

  handleImageClick = (largeImageURL, tags) => {
    this.setState({
      showModal: true,
      selectedImage: { largeImageURL: largeImageURL, tags: tags },
    });
  };
  // Функція, яка викликається при натисканні на картинку.
  openModal = () => {
    const { selectedImage } = this.state;
    this.setState({
      showModal: true,
      largeImageURL: selectedImage.largeImageURL,
      alt: selectedImage.tags,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      largeImageURL: '',
      alt: '',
    });
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
          <Modal closeModal={this.closeModal}>
            <img src={this.state.largeImageURL} alt={this.state.alt} />
          </Modal>
        )}
      </div>
    );
  }
}
