import React from 'react';

export default function PopupWithForm({ isOpen, name, title, onClose, onSubmit, children }) {
  isOpen
    ? document.addEventListener('keydown', closeByEsc)
    : document.removeEventListener('keydown', closeByEsc);

  const formRef = React.useRef(); //начальное значение?

  function handleClose() {
    onClose();
  }

  function closeByOverlay(e) {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }

  function closeByEsc(e) {
    if (e.key === 'Escape') {
      handleClose();
    }
  }

  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? 'popup_active' : ''}`}
      onClick={closeByOverlay}
    >
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          title="Закрыть"
          onClick={handleClose}
        ></button>
        <form
          ref={formRef}
          className={`popup__form form form_type_${name}`}
          name="formEdit"
          onSubmit={onSubmit}
          action="/"
          noValidate
        >
          <h2 className="form__title">{title}</h2>
          {children}
        </form>
      </div>
    </div>
  );
}
