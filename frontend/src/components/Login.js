import React from 'react';

import { useFormAndValidation } from '../hooks/useFormAndValidation';

const Login = ({ onLogin }) => {
  const { values, handleChange, errors, isValid, setIsValid } = useFormAndValidation();

  const submitButton = React.useRef();

  React.useEffect(() => {
    setIsValid(false);
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    onLogin(values, submitButton, 'Подождите...', submitButton.current.textContent);
  };

  return (
    <main className="auth">
      <form className={`form-auth`} name="formLogin" onSubmit={submitHandler} action="/" noValidate>
        <h1 className="form-auth__title">Вход</h1>

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
            Войти
          </button>
          <span className="form-auth__under-text"></span>
        </div>
      </form>
    </main>
  );
};

export default Login;
