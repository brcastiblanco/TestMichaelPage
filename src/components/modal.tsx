import React from "react"

interface ModalProps {
  modalOpen: boolean
  setModalOpen: (value: boolean) => void
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ modalOpen, setModalOpen, children }) => {
  return (
    <div className={`modal ${modalOpen ? "modal-open" : ""}`}>
      <div className="modal-box relative">
        <label
          onClick={() => setModalOpen(false)}
          className="btn btn-sm btn-circle absolute right-3 top-3"
        >
          ✕
        </label>
        {children}
      </div>
    </div>
  )
};

export default Modal;
