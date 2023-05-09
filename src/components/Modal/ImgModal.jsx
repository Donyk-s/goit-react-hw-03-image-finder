import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
Modal.setAppElement('#root');
export const ImgModal = ({ isOpen, closeModal, largeImageURL, tags }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      overlayClassName="Overlay"
      className="Modal"
    >
      <div>
        <div>
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>
    </Modal>
  );
};
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
//       shouldCloseOnOverlayClick={true}
//       style={customStyles}
//       contentLabel="Image Modal"
//       overlayClassName="Overlay"
//       className="Modal"
//     >
//       <div>
//         <div>
//           <img src={largeImageURL} alt={tags} />
//         </div>
//       </div>
//       <button onClick={closeModal}>Close</button>
//     </Modal>
//   );
// };
