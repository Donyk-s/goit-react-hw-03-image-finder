import { Searchbar } from './Searchbar/Searchbar';
import { Component } from 'react';
import { fetchImg } from 'service/api';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import toast, { Toaster } from 'react-hot-toast';
import { StyledLayout } from './Layout/Layout.styled';

const ERROR_MSG = 'Something went wrong, try again';

export class App extends Component {
  state = {
    image: '',
    page: 1,
    hits: null,
    error: null,
    total: null,
    loading: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { image, page } = this.state;
    if (prevState.image !== this.state.image) {
      try {
        this.setState({ loading: true, hits: null });
        const { hits, totalHits } = await fetchImg(image, page);
        this.setState({ hits: hits, total: totalHits });
      } catch (error) {
        this.setState({ error: ERROR_MSG });
      } finally {
        this.setState({ loading: false });
      }
    }
    if (prevState.page !== this.state.page && this.state.page > 1) {
      try {
        this.setState({ loading: true });
        const { hits } = await fetchImg(image, page);
        this.setState({ hits: [...this.state.hits, ...hits] });
      } catch (error) {
        this.setState({ error: ERROR_MSG });
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  handleFormSubmit = imgName => {
    console.log('Search term:', imgName);
    this.setState({ image: imgName });
  };
  loadMoreImg = () => {
    console.log('Current page:', this.state.page);
    this.setState({ page: this.state.page + 1 });
    if (
      this.state.hits !== null &&
      this.state.hits.length === this.state.total
    ) {
      toast("We're sorry, but you've reached the end of search results.");
    }
  };

  getHits = hits => {
    this.setState({ hits: hits });
  };
  resetPage = () => {
    this.setState({ page: 1 });
  };

  render() {
    const { error, hits, total } = this.state;
    return (
      <StyledLayout>
        <Searchbar
          onSubmit={this.handleFormSubmit}
          resetPage={this.resetPage}
        />
        {error && <div>{error}</div>}
        {hits !== null && <ImageGallery hits={hits} />}

        {hits !== null && hits.length <= total && (
          <Button loadImg={this.loadMoreImg} />
        )}
        <Toaster />
        {this.state.loading && <Loader />}
      </StyledLayout>
    );
  }
}
