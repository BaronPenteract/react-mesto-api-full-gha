import React from 'react';

import PopupWithForm from './PopupWithForm';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const submitButton = React.useRef();

  const { values, handleChange, errors, isValid, setValues, resetForm, setIsValid } =
    useFormAndValidation();

  React.useEffect(() => {
    setValues({});
    resetForm();
    setIsValid(false);
  }, [isOpen]);

  function handleAddPlaceSubmit(e) {
    e.preventDefault();

    onAddPlace(values, submitButton, 'Создание...', submitButton.current.textContent);
  }

  return (
    <PopupWithForm
      name="add-form"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleAddPlaceSubmit}
    >
      <>
        <fieldset className="form__input-container">
          <label className="form__label">
            <input
              id="add-name-input"
              className={`form__input ${errors.name ? 'form__input_type_error' : ''}`}
              type="text"
              name="name"
              value={values.name || ''}
              onChange={handleChange}
              placeholder="Название"
              required
              minLength="2"
              maxLength="30"
            />
            <span className={`form__error ${errors.name ? 'form__error_active' : ''}`}>
              {errors.name || ''}
            </span>
          </label>
          <label className="form__label">
            <input
              id="add-url-input"
              className={`form__input ${errors.link ? 'form__input_type_error' : ''}`}
              type="url"
              name="link"
              value={values.link || ''}
              onChange={handleChange}
              placeholder="Ссылка на картинку"
              required
            />
            <span className={`form__error ${errors.link ? 'form__error_active' : ''}`}>
              {errors.link || ''}
            </span>
          </label>
        </fieldset>
        <button
          ref={submitButton}
          className={`form__btn form__btn_type_submit ${!isValid ? 'form__btn_disabled' : ''}`}
          disabled={!isValid}
          type="submit"
        >
          Создать
        </button>
      </>
    </PopupWithForm>
  );
}
