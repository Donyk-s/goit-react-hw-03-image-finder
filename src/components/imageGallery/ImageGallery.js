import React, { Component } from 'react';
import { ImageGalleryItem } from '../imageGalleryItem/ImageGalleryItem';
import { v4 as uuidv4 } from 'uuid';

export class ImageGallery extends Component {
  render() {
    return (
      <div className="image-gallery">
        {this.props.images.map(hit => (
          <div key={uuidv4()} className="image-gallery-item">
            <ImageGalleryItem hit={hit} />
          </div>
        ))}
      </div>
    );
  }
}
