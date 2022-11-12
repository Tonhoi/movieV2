import React, { useState } from "react";
import { memo } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "600px",
    maxWidth: "calc(100% - 24px)",
    borderRadius: "4px",
  },
};

Modal.setAppElement("#root");
const Modals = ({ modalIsOpen, closeModal, handleDelete }) => {
  function afterOpenModal() {}

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 className={"text-[#000000de] text-[2rem] font-bold pb-[16px] "}>
          Are you sure?
        </h2>
        <span className="text-[#0000008a] leading-[1.5] font-normal py-2">
          By clicking OK, this list will be deleted .
        </span>
        <form>
          <div className="text-right py-[8px]">
            <span
              className="py-[6px] px-2 cursor-pointer hover:opacity-70"
              onClick={closeModal}
            >
              CANCEL
            </span>
            <span
              className="py-[6px] px-5 text-[#3f51b5] cursor-pointer ml-2 hover:opacity-70"
              onClick={handleDelete}
            >
              OK
            </span>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default memo(Modals);
