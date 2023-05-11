import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';
const modalRoot = document.querySelector('#modal-root');

export class ImgModal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleCloseECC);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleCloseECC);
  }

  handleCloseECC = e => {
    const { closeModal } = this.props;

    if (e.key === 'Escape') {
      closeModal();
    }
  };

  handleCloseBackdrop = e => {
    const { closeModal } = this.props;

    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  render() {
    const { largeImageURL, tags } = this.props;

    return createPortal(
      <div className={css.Overlay} onClick={this.handleCloseBackdrop}>
        <div className={css.Modal} onClick={this.handleCloseBackdrop}>
          <img src={largeImageURL} alt={tags} width="1000" />
        </div>
      </div>,
      modalRoot
    );
  }
}

ImgModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
