import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function ConfirmPopup({ isOpen, onClose, confirmSubmitAction }) {
  const submitButton = React.useRef();

  const submit = (e) => {
    e.preventDefault();

    confirmSubmitAction(submitButton, 'Удаление...', 'Да');
  };

  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={submit}
    >
      <>
        <button ref={submitButton} className="form__btn form__btn_type_submit" type="submit">
          Да
        </button>
      </>
    </PopupWithForm>
  );
}
