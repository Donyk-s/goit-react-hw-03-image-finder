import React from 'react';
import { ImageGalleryItem } from '../imageGalleryItem/ImageGalleryItem';

export class ImageGallery extends React.Component {
  render() {
    return (
      <div className="image-gallery">
        {this.props.hits.map(hit => (
          <ImageGalleryItem key={hit.id} hit={hit} />
        ))}
      </div>
    );
  }
}
