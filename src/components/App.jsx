import React, { Component } from 'react';
import { Searchbar } from './searchbar/Searchbar';
import { ImageGallery } from '..//components/imageGallery/ImageGallery';
import css from './App.module.css';
import axios from 'axios';

export class App extends Component {
  state = {
    search: [],
    id: '',
    webformatURL: '',
    largeImageURL: '',
    page: 1,
    per_page: 12,
    hits: [],
  };

  componentDidMount() {
    const myApiKey = '34476830-b52e87f2018fae84058c602d8';
    const url = `https://pixabay.com/api/?q=${this.state.search}&page=${this.state.page}&key=${myApiKey}&image_type=photo&orientation=horizontal&per_page=${this.state.per_page}`;

    axios
      .get(url)
      .then(response => {
        this.setState({ hits: response.data.hits });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    const myApiKey = '34476830-b52e87f2018fae84058c602d8';
    if (this.state.search !== prevState.search) {
      const { search, page, per_page } = this.state;
      const url = `https://pixabay.com/api/?q=${search}&page=${page}&key=${myApiKey}&image_type=photo&orientation=horizontal&per_page=${per_page}`;

      axios
        .get(url)
        .then(response => {
          console.log(response.data.hits);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  handleSubmitSearch = searchData => {
    const { search } = searchData;
    this.setState({ search });
    console.log(search);
  };

  render() {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSubmitSearch} />
        <ImageGallery hits={this.state.hits} />
      </div>
    );
  }
}
