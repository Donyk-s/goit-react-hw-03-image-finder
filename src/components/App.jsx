import React, { Component } from 'react';
import { Searchbar } from './searchbar/Searchbar';
import { ImageGallery } from '../components/imageGallery/ImageGallery';
import Button from '../components/button/Button';
import css from './App.module.css';
import axios from 'axios';

export class App extends Component {
  state = {
    search: '',
    id: '',
    webformatURL: '',
    largeImageURL: '',
    page: 1,
    per_page: 12,
    hits: [],
    loaded: false,
  };

  componentDidMount() {
    this.fetchImages();
    this.setState({ loaded: true });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.search !== prevState.search) {
      this.setState({ page: 1, hits: [] }, () => {
        this.fetchImages();
      });
    }
  }

  fetchImages = () => {
    const myApiKey = '34476830-b52e87f2018fae84058c602d8';
    const { search, page, per_page } = this.state;
    const url = `https://pixabay.com/api/?q=${search}&page=${page}&key=${myApiKey}&image_type=photo&orientation=horizontal&per_page=${per_page}`;

    axios
      .get(url)
      .then(response => {
        this.setState(prevState => ({
          hits: [...prevState.hits, ...response.data.hits],
        }));
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleSubmitSearch = searchData => {
    const { search } = searchData;
    this.setState({ search });
  };

  handleLoadMore = () => {
    this.setState(
      prevState => ({
        page: prevState.page + 1,
      }),
      () => {
        this.fetchImages();
      }
    );
  };

  render() {
    const { hits, loaded } = this.state;
    const showLoadMore = hits.length > 0;

    if (!loaded) {
      return <div>Loading...</div>;
    }

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSubmitSearch} />
        <ImageGallery hits={hits} />
        {showLoadMore && (
          <Button onClick={this.handleLoadMore} text="Load more" />
        )}
      </div>
    );
  }
}
