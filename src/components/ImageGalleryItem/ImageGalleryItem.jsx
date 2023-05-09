// import React from 'react';

// export const ImageGalleryItem = ({ hit }) => (
//   <li key={hit.id}>
//     <img
//       src={hit.webformatURL}
//       alt={hit.tags}
//       data-source={hit.largeImageURL}
//       className="ImageGalleryItem-image"
//     />
//   </li>
// );
import React, { Component } from 'react';

class ImageGalleryItem extends Component {
  render() {
    const { hit, onImageClick } = this.props;

    return (
      <li key={hit.id} className="ImageGalleryItem">
        <img
          src={hit.webformatURL}
          alt={hit.tags}
          data-source={hit.largeImageURL}
          className="ImageGalleryItem-image"
          onClick={() => onImageClick(hit.largeImageURL, hit.tags)}
        />
      </li>
    );
  }
}

export default ImageGalleryItem;
