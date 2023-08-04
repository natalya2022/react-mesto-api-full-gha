import React, { useEffect, useState } from 'react';
//import InputUserData from './InputUserData';

const Login = ({ onUserLogin }) => {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  });
  const [emailDitry, setEmailDirty] = useState(false);
  const [passwordDitry, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState('Email не может быть пустым');
  const [passwordError, setPasswordError] = useState('Пароль не может быть пустым');
  const [formValid, setFormValid ] = useState(false);

  useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError])

  const handleChange = e => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
    if (name === 'email') {
      const emailRegexp =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!emailRegexp.test(String(e.target.value).toLowerCase())) {
        setEmailError('Некорректный email');
        if (!e.target.value) {
          setEmailError('Email не может быть пустым');
        }
      } else {
        setEmailError('');
      }
    } else if (name === 'password') {
      const passwordLength = String(e.target.value).length;
      if (passwordLength < 8) {
        setPasswordError('Минимальная длина пароля 8 символов');
        if (!e.target.value) {
          setPasswordError('Пароль не может быть пустым');
        }
      } else {
        setPasswordError('');
      }
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    // console.log(formValue.email, formValue.password);
    onUserLogin(formValue.email, formValue.password);
  };

  const blurHandler = e => {
    // eslint-disable-next-line default-case
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true);
        break;
      case 'password':
        setPasswordDirty(true);
        break;
    }
  };
  return (
    <div className="regauto">
      <h2 className="regauto__title">Вход</h2>
      <form className="regauto__form" name="form-login" onSubmit={handleSubmit} noValidate>
        {/* <InputUserData handleChange={handleChange} formValue={formValue} /> */}
        <input
          className="input-box"
          type="email"
          placeholder="Email"
          id="form-login-email"
          name="email"
          required
          onChange={handleChange}
          value={formValue.email || ''}
          onBlur={e => blurHandler(e)}
        />
        {emailDitry && emailError && <span className="form-name-error">{emailError}</span>}
        <input
          className="input-box"
          type="password"
          placeholder="Пароль"
          id="form-login-password"
          name="password"
          minLength={8}
          required
          onChange={handleChange}
          value={formValue.password || ''}
          onBlur={e => blurHandler(e)}
        />
        {passwordDitry && passwordError && <span className="form-job-error">{passwordError}</span>}
        <button className="regauto__button" type="submit" disabled={!formValid}>
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;
