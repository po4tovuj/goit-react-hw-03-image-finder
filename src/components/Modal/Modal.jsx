import PropTypes from 'prop-types';

import { Component } from 'react';
import { Overlay, ModalStyled } from './Modal.styled';
import { createPortal } from 'react-dom';

export class Modal extends Component {
  static defaultPropTypes = {
    onClose: PropTypes.func,
    url: PropTypes.string,
  };
  static defaultProps = {
    url: '',

    onClose: () => ({}),
  };
  escFunction = event => {
    if (event.key === 'Escape') {
      this.props.onClose();
    }
  };
  componentDidMount() {
    document.addEventListener('keydown', this.escFunction, false);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction, false);
  }

  render() {
    const modalRoot = document.querySelector('#modal-root');
    const { onClose, url } = this.props;
    return createPortal(
      <Overlay onClick={onClose}>
        <ModalStyled>
          <img src={url} alt="broken " />
        </ModalStyled>
      </Overlay>,
      modalRoot
    );
  }
}
Modal.propTypes = {
  onClose: PropTypes.func,
  url: PropTypes.string,
};
