import React, { Component } from 'react';
import { Searchbar } from './searchbar/Searchbar';
import { ImageGallery } from './imageGallery/ImageGallery';
import Button from './button/Button';
import css from './App.module.css';
import { BallTriangle } from 'react-loader-spinner';
import { getImages } from '../service/Api';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    showModal: false,
    largeImage: '',
    tags: '',
    total: 0,
    error: null,
    showLoadMore: false,
  };

  getImagesRequest = async (query, page) => {
    console.log('getImagesRequest called with query:', query, 'page:', page);

    const images = await getImages(query, page);
    const newTotal = images.total;
    this.setState(prevState => ({
      images: [...prevState.images, ...images.hits],
      total: newTotal,
      showLoadMore: newTotal < 12 ? false : true,
    }));
  };

  handleLoadMore = () => {
    console.log('handleLoadMore called');
    const { query, page, images, total } = this.state;
    const newPage = page + 1;

    this.setState({ page: newPage, isLoading: true }, async () => {
      await this.getImagesRequest(query, newPage);

      const newImages = [...images, ...this.state.images];
      const hasMoreImages = newImages.length < total;

      this.setState({
        images: newImages,
        showLoadMore: hasMoreImages,
        isLoading: false,
      });
    });
  };

  handleFormSubmit = query => {
    this.setState({ query: query, page: 1, images: [], isLoading: true });
    this.getImagesRequest(query, 1).then(() =>
      this.setState({
        showLoadMore: this.state.total >= 12 ? true : false,
        isLoading: false,
      })
    );
  };

  render() {
    const { images, isLoading, showLoadMore } = this.state;
    console.log(this.state.showLoadMore);
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
        <ImageGallery images={images} />
        {showLoadMore && (
          <Button onClick={this.handleLoadMore} text="Load more" />
        )}
      </div>
    );
  }
}
