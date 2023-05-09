import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

class ImageGallery extends Component {
  render() {
    const { images, onImageClick } = this.props;

    return (
      <div className="ImageGallery">
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

export default ImageGallery;
