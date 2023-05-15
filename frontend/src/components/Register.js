import React from 'react';
import { Link } from 'react-router-dom';

import { useFormAndValidation } from '../hooks/useFormAndValidation';

const Register = ({ onRegister }) => {
  const { values, handleChange, errors, isValid, setIsValid } = useFormAndValidation();

  const submitButton = React.useRef();

  React.useEffect(() => {
    setIsValid(false);
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    onRegister(values, submitButton, 'Регистрация...', submitButton.current.textContent);
  };

  return (
    <main className="auth">
      <form
        className={`form-auth`}
        name="formRegister"
        onSubmit={submitHandler}
        action="/"
        noValidate
      >
        <h1 className="form-auth__title">Регистрация</h1>

        <fieldset className="form-auth__input-container">
          <label className="form-auth__label">
            <input
              className={`form-auth__input`}
              type="email"
              name="email"
              onChange={handleChange}
              value={values.email || ''}
              placeholder="Email"
              required
            />
            <span className={`form-auth__error ${errors.email ? 'form-auth__error_active' : ''}`}>
              {errors.email || ''}
            </span>
          </label>
          <label className="form-auth__label">
            <input
              className={`form-auth__input`}
              type="password"
              name="password"
              onChange={handleChange}
              value={values.password || ''}
              placeholder="Пароль"
              minLength={8}
              required
            />
            <span
              className={`form-auth__error ${errors.password ? 'form-auth__error_active' : ''}`}
            >
              {errors.password || ''}
            </span>
          </label>
        </fieldset>
        <div className="form-auth__footer">
          <button
            ref={submitButton}
            className={`form-auth__btn form-auth__btn_type_submit `}
            disabled={!isValid}
            type="submit"
          >
            Зарегистрироваться
          </button>
          <span className="form-auth__under-text">
            Уже зарегистрированы?{' '}
            <Link to="/sign-up" className="form-auth__link link">
              Войти
            </Link>
          </span>
        </div>
      </form>
    </main>
  );
};

export default Register;
