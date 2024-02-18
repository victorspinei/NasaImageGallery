import { useEffect, useRef } from "react"
import "./Modal.css"

function Modal({ openModal, closeModal, children }) {
  const ref = useRef();

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  // thanks to u/JennyP21 the button works
  return (
    <dialog ref={ref} onCancel={closeModal} className="dialog">
      {children}
      <button onClick={(e) => { e.stopPropagation(); closeModal()}}>Close</button>
    </dialog>  
  )
}

export default Modal;
