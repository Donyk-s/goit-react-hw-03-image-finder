import React from 'react';

export const ImageGalleryItem = ({ hit }) => (
  <li key={hit.id}>
    <img
      src={hit.webformatURL}
      alt={hit.tags}
      data-source={hit.largeImageURL}
      className="ImageGalleryItem-image"
    />
  </li>
);
