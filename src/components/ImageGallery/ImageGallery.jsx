import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';
class ImageGallery extends Component {
  render() {
    const { images, onImageClick } = this.props;

    return (
      <div className={css.ImageGallery}>
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            hit={image}
            onImageClick={onImageClick}
          />
        ))}
      </div>
    );
  }
}
ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  onImageClick: PropTypes.func.isRequired,
};
export default ImageGallery;
