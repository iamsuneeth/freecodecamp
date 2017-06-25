import React from 'react';
import {Modal, Button, ButtonGroup} from 'react-bootstrap';
import './gameType.css';

const GameType = (props) => (
    <div className={'modal-container '}>
    <Modal.Dialog className={props.classes}>
      <Modal.Header>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <ButtonGroup>
            {Object.keys(props.values).map((elem, index) => (
                    <Button key={index} onClick={props.optionChange.bind(elem)} value={props.values[elem].value}>{props.values[elem].label}</Button>
            ))}
        </ButtonGroup>
      </Modal.Body>


    </Modal.Dialog>
  </div>
)

export default GameType;