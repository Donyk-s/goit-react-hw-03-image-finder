import { Component } from 'react'; // для класового компонента
import { createPortal } from 'react-dom'; // для рендеринга в іншому місці
import css from './Modal.module.css'; // стилізація

// Пошук модалки щоб динамічно додати до DOM-дерева сторінки
const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  // реєструє обробник події keydown на вікні браузера
  componentDidMount() {
    window.addEventListener('keydown', this.keyDown); // при натисканні клавіші Escape викликає функцію keyDown
  }

  keyDown = evt => {
    // перевірка коду клавіші
    if (evt.code === 'Escape') {
      this.props.closeModal(); // закриття модалки
    }
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyDown); // видаляє обробник події keydown з вікна браузера
  }

  // закриття модалки по кліку на бекдроп
  handleClose = evt => {
    // перевірка чи клік був по бекдропу
    if (evt.target === evt.currentTarget) {
      this.props.closeModal(); // закриття модалки
    }
  };

  render() {
    const { children } = this.props;

    return createPortal(
      <div className={css.Overlay} onClick={this.handleClose}>
        <div className={css.Modal}>{children}</div>
      </div>,
      modalRoot
    );
  }
}
