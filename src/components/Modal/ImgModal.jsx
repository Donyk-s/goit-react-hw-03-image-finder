// import Modal from 'react-modal';

// const customStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//   },
// };
// Modal.setAppElement('#root');
// export const ImgModal = ({ isOpen, closeModal, largeImageURL, tags }) => {
//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={closeModal}
//       style={customStyles}
//       contentLabel="Example Modal"
//       overlayClassName="Overlay"
//       className="Modal"
//     >
//       <div>
//         <div>
//           <img src={largeImageURL} alt={tags} />
//         </div>
//       </div>
//     </Modal>
//   );
// };
// // import Modal from 'react-modal';

// // const customStyles = {
// //   content: {
// //     top: '50%',
// //     left: '50%',
// //     right: 'auto',
// //     bottom: 'auto',
// //     marginRight: '-50%',
// //     transform: 'translate(-50%, -50%)',
// //   },
// // };
// // Modal.setAppElement('#root');

// // export const ImgModal = ({ isOpen, closeModal, largeImageURL, tags }) => {
// //   return (
// //     <Modal
// //       isOpen={isOpen}
// //       onRequestClose={closeModal}
// //       shouldCloseOnOverlayClick={true}
// //       style={customStyles}
// //       contentLabel="Image Modal"
// //       overlayClassName="Overlay"
// //       className="Modal"
// //     >
// //       <div>
// //         <div>
// //           <img src={largeImageURL} alt={tags} />
// //         </div>
// //       </div>
// //       <button onClick={closeModal}>Close</button>
// //     </Modal>
// //   );
// // };
import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

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
      <div className="Overlay" onClick={this.handleCloseBackdrop}>
        <div className="Modal">
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
