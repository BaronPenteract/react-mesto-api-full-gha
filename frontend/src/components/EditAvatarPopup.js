import React from 'react';

import PopupWithForm from './PopupWithForm';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const submitButton = React.useRef();

  const { values, handleChange, errors, isValid, setValues, resetForm, setIsValid } =
    useFormAndValidation();

  React.useEffect(() => {
    setValues({});
    resetForm();
    setIsValid(false);
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar(values, submitButton, 'Сохранение...', submitButton.current.textContent);
  }

  return (
    <PopupWithForm
      name="avatar-form"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
        <fieldset className="form__input-container">
          <label className="form__label">
            <input
              id="avatar-url-input"
              className={`form__input ${errors.avatar ? 'form__input_type_error' : ''}`}
              type="url"
              name="avatar"
              value={values.avatar || ''}
              onChange={handleChange}
              placeholder="Ссылка на аватар"
              required
            />
            <span className={`form__error ${errors.avatar ? 'form__error_active' : ''}`}>
              {errors.avatar || ''}
            </span>
          </label>
        </fieldset>
        <button
          ref={submitButton}
          className={`form__btn form__btn_type_submit ${!isValid ? 'form__btn_disabled' : ''}`}
          disabled={!isValid}
          type="submit"
        >
          Сохранить
        </button>
      </>
    </PopupWithForm>
  );
}
