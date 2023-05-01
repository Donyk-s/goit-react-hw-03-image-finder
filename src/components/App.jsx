import React, { Component } from 'react';
import { Searchbar } from './searchbar/Searchbar';

export class App extends Component {
  state = {
    search: '',
    id: '',
    webformatURL: '',
    largeImageURL: '',
    page: 1,
    per_page: 12,
  };

  handleSubmitSearch = searchData => {
    const { search } = searchData;
    this.setState({ search });
  };

  render() {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <Searchbar onSubmit={this.handleSubmitSearch} />
      </div>
    );
  }
}
