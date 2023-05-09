import { ImgModal } from 'components/Modal/ImgModal';
import { Component } from 'react';
import { StyledGalleryImg, StyledGalleryItem } from './ImageGalleryItem.styled';

export default class ImageGalleryItem extends Component {
  state = {
    selectedImg: null,
  };
  setSelectedImg = () => {
    this.setState({ selectedImg: this.props.hit.webformatURL });
  };
  closeModal = () => {
    this.setState({ selectedImg: null });
  };
  render() {
    const {
      hit: { webformatURL, tags, largeImageURL },
    } = this.props;
    return (
      <StyledGalleryItem>
        <StyledGalleryImg
          src={webformatURL}
          alt={tags}
          onClick={this.setSelectedImg}
        />
        <ImgModal
          isOpen={this.state.selectedImg !== null}
          largeImageURL={largeImageURL}
          tags={tags}
          closeModal={this.closeModal}
        />
      </StyledGalleryItem>
    );
  }
}
