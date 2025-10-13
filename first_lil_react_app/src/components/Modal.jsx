function Modal({ open, onClose, children }) {
  if (!open) return null;

  const stop = (e) => e.stopPropagation();

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-dialog"
        role="dialog"
        aria-modal="true"
        onClick={stop}
      >
        {children}
      </div>
    </div>
  );
}
export default Modal;
