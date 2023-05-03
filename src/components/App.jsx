import React, { Component } from 'react';
import { Searchbar } from './searchbar/Searchbar';
import { ImageGallery } from '../components/imageGallery/ImageGallery';
import Button from '../components/button/Button';
import css from './App.module.css';
import { BallTriangle } from 'react-loader-spinner';
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

  handleSearch = searchQuery => {
    this.setState({ search: searchQuery, hits: [], page: 1 }, () => {
      console.log(this.state.search);
      this.fetchImages();
    });
  };

  handleLoadMore = () => {
    this.setState(
      prevState => ({ page: prevState.page + 1, loaded: false }),
      () => {
        this.fetchImages();
      }
    );
  };

  fetchImages = () => {
    const myApiKey = '34476830-b52e87f2018fae84058c602d8';
    const { search, page, per_page } = this.state;
    const url = `https://pixabay.com/api/?q=${search}&page=${page}&key=${myApiKey}&image_type=photo&orientation=horizontal&per_page=${per_page}
`;
    console.log('fetchImages url:', url);

    axios
      .get(url)
      .then(response => {
        const newHits = response.data.hits.map(hit => ({
          ...hit,
          id: hit.id + Math.random(),
        }));
        this.setState(prevState => ({
          hits: [...prevState.hits, ...newHits],
          loaded: true, // set loaded to true once images are fetched successfully
        }));
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) {
      this.fetchImages();
    }

    if (this.state.search !== prevState.search) {
      this.setState({ hits: [] });
    }
  }

  render() {
    const { hits, loaded } = this.state;
    const showLoadMore = hits.length > 0;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSearch} />
        {!loaded && (
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperClass={{}}
            wrapperStyle=""
            visible={true}
          />
        )}
        <ImageGallery hits={hits} />
        {showLoadMore && (
          <Button onClick={this.handleLoadMore} text="Load more" />
        )}
      </div>
    );
  }
}
