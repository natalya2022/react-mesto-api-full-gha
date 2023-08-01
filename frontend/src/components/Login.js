import React, { useState } from 'react';
import InputUserData from './InputUserData';

const Login = ({ onUserLogin }) => {

  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });    
  };

  const handleSubmit = (e) => {
    e.preventDefault();    
    onUserLogin(formValue.email, formValue.password);
    }
    
  return (
    <div className="regauto">
      <h2 className="regauto__title">Вход</h2>
      <form className="regauto__form" name="form-login" onSubmit={handleSubmit}>
      <InputUserData handleChange={handleChange} formValue={formValue} />
        <button className="regauto__button" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;
