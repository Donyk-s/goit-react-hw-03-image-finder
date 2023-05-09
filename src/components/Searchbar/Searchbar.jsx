import { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import {
  StyledButtonLlabel,
  StyledSearchBar,
  StyledSearchForm,
  StyledSearchInput,
  Styledbutton,
} from './Searchbar.styled';
import { BsSearch } from 'react-icons/bs';

export class Searchbar extends Component {
  state = {
    imgName: '',
  };
  handleSearchImgNameChange = event => {
    this.setState({ imgName: event.currentTarget.value.toLowerCase() });
  };
  handleSubmit = event => {
    event.preventDefault();
    if (this.state.imgName.trim() === '') {
      toast.error('Enter the name for the search');
      return;
    }
    this.props.onSubmit(this.state.imgName);
    this.setState({ imgName: '' });
    this.props.resetPage();
  };
  render() {
    return (
      <StyledSearchBar>
        <Toaster />
        <StyledSearchForm onSubmit={this.handleSubmit}>
          <Styledbutton type="submit">
            <BsSearch />
            <StyledButtonLlabel>Search</StyledButtonLlabel>
          </Styledbutton>

          <StyledSearchInput
            type="text"
            value={this.state.imgName}
            onChange={this.handleSearchImgNameChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </StyledSearchForm>
      </StyledSearchBar>
    );
  }
}
