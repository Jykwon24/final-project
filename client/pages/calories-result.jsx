import React, { useContext } from 'react';
import { AppContext } from '../app';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export const CalorieResult = props => {

  const { calories } = useContext(AppContext);
  // console.log(calories);
  return (
    <Modal
        show={props.show}
        onHide={props.onHide}
        backdrop="static"
        aria-labelledby='contained-modal-title-vcenter'
        centered
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Your recommended daily calorie intake is:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {calories}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onBack}>
            Go to planner
          </Button>
        </Modal.Footer>
      </Modal>

  // <div className='modal' id='modal-view' tabIndex={-1} aria-labelledby='modal-calorie' aria-hidden='true'>
  //     <div className='modal-dialog modal-dialog-centered'>
  //       <div className='modal-content'>
  //         <div className='modal-header'>
  //           <h5 className='modal-title' id='modal-view'>Your recommended daily calorie intake is:</h5>
  //         </div>
  //         <div className='modal-body'>
  //           {calories}
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  );
};
