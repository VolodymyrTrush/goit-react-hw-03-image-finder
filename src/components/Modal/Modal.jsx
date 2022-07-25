import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalContent } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root'); // получаем контейнер для модального окна

export class Modal extends Component { 
  
  componentDidMount() { 
    document.addEventListener('keydown', this.handleKeyDown); // подписываемся на событие нажатия клавиши
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown); // отписываемся от события нажатия клавиши
  }

  handleKeyDown = (e) => { // обработчик события нажатия клавиши
    if (e.key === 'Escape') { // если нажата клавиша Esc
      this.props.onClose(); // закрываем модальное окно
    }
  }

  handleOverlayClick = event => { // обработчик события клика по оверлэю
     if (event.currentTarget === event.target) { // если клик был по оверлэю
       this.props.onClose(); // закрываем модальное окно
     }
   };

   render() {
    return createPortal( // представляем модальное окно в контейнере
      <Overlay onClick={this.handleOverlayClick}>
        <ModalContent>{this.props.children}</ModalContent>
      </Overlay>,
      modalRoot // контейнер для модального окна
    );
  }
}


Modal.propTypes = {
  img: PropTypes.string,
  alt: PropTypes.string,
  onClick: PropTypes.func,
};
