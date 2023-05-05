import React, { Component } from 'react';
import { Searchbar } from './searchbar/Searchbar';
import { ImageGallery } from '../components/imageGallery/ImageGallery';
import Button from '../components/button/Button';
import css from './App.module.css';
import { BallTriangle } from 'react-loader-spinner';
import axios from 'axios';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    perPage: 12,
    isLoading: false,
  };

  handleSearch = searchQuery => {
    this.setState({ searchQuery, images: [], page: 1, isLoading: true }, () => {
      this.fetchImages();
    });
  };

  handleLoadMore = () => {
    this.setState(
      prevState => ({ page: prevState.page + 1, isLoading: true }),
      () => {
        this.fetchImages();
      }
    );
  };

  fetchImages = async () => {
    const API_KEY = '34476830-b52e87f2018fae84058c602d8';
    const { searchQuery, page, perPage } = this.state;

    if (typeof searchQuery !== 'string' || !searchQuery.trim()) {
      // searchQuery is not a valid string, so return early
      return;
    }

    const url = `https://pixabay.com/api/?q=${searchQuery.trim()}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`;

    try {
      const response = await axios.get(url);
      const newImages = response.data.hits;
      this.setState(prevState => ({
        images: [...prevState.images, ...newImages],
        isLoading: false,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery } = this.state;
    if (searchQuery !== prevState.searchQuery) {
      this.setState({ images: [], page: 1 });
    }
    if (searchQuery !== prevProps.searchQuery) {
      this.fetchImages();
    }
  }

  render() {
    const { images, isLoading } = this.state;
    const showLoadMore = images.length > 0;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSearch} />
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
