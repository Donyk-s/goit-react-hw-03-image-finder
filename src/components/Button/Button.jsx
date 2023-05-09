import React from 'react';
import css from './Button.module.css';

const LoadMoreButton = ({ onClick }) => (
  <button type="button" className={css.Button} onClick={onClick}>
    Load more
  </button>
);

export default LoadMoreButton;
