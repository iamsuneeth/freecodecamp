import React from 'react';
import {Modal} from 'react-bootstrap';
import './messageBox.css';

const Message = (props) => (
    <div className={'modal-container message'}>
    <Modal.Dialog className={'content '+props.className}>

      <Modal.Body>
        {props.message}
      </Modal.Body>


    </Modal.Dialog>
  </div>
)

export default Message;