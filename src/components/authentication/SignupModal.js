// SignupModal.js
import React from 'react';
import { Modal } from 'react-bootstrap';
import Signup from './signup'; // Use default import

export const SignupModal = ({ show, onClose }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Signup onClose={onClose} />
      </Modal.Body>
    </Modal>
  );
};
