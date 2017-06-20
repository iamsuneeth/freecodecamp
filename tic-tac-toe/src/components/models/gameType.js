import React from 'react';
import {Modal, Button, ButtonGroup} from 'react-bootstrap';

const GameType = (props) => (
    <div>
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>How do you want to play today!!!!!</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <ButtonGroup>
            {props.values.map((elem, index) => (
                    <Button key={index} onClick={props.optionChange.bind(elem)} value={elem}>{elem}</Button>
            ))}
        </ButtonGroup>
      </Modal.Body>


    </Modal.Dialog>
  </div>
)

export default GameType;