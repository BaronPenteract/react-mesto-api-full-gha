import React from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid, setValues, resetForm, setIsValid } =
    useFormAndValidation();

  const submitButton = React.useRef();

  React.useEffect(() => {
    resetForm();
    setValues(currentUser);
    setIsValid(true);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser(values, submitButton, 'Сохранение...', submitButton.current.textContent);
  }

  return (
    <PopupWithForm
      name="edit-form"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
        <fieldset className="form__input-container">
          <label className="form__label">
            <input
              id="edit-name-input"
              className={`form__input ${errors.name ? 'form__input_type_error' : ''}`}
              type="text"
              name="name"
              placeholder="Имя"
              value={values.name || ''}
              onChange={handleChange}
              required
              minLength="2"
              maxLength="40"
            />
            <span className={`form__error ${errors.name ? 'form__error_active' : ''}`}>
              {errors.name || ''}
            </span>
          </label>
          <label className="form__label">
            <input
              id="edit-job-input"
              className={`form__input ${errors.about ? 'form__input_type_error' : ''}`}
              type="text"
              name="about"
              placeholder="О себе"
              value={values.about || ''}
              onChange={handleChange}
              required
              minLength="2"
              maxLength="200"
            />
            <span className={`form__error ${errors.about ? 'form__error_active' : ''}`}>
              {errors.about || ''}
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
