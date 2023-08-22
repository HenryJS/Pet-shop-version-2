// LoginModal.js
import React from 'react';
import { Modal } from 'react-bootstrap';
import Login from './login'; // Use default import

export const LoginModal = ({ show, onClose }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Login onClose={onClose} />
      </Modal.Body>
    </Modal>
  );
};
