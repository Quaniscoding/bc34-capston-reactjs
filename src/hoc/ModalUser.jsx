import React, { useState } from "react";
import { Modal } from "antd";

export default function ModalUser(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <a className="nav-link" onClick={showModal}>
        {props.lbButton}
      </a>
      <Modal open={isModalOpen} onCancel={handleCancel}>
        {props.Component}
      </Modal>
    </>
  );
}
