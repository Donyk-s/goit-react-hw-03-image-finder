import React, { Component } from 'react';

export class ImageGalleryItem extends Component {
  render() {
    return (
      <div className="image-gallery-item">
        <img src={this.props.hit.webformatURL} alt={this.props.hit.tags} />
      </div>
    );
  }
}
