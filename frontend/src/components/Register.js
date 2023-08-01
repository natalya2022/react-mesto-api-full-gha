import React, { useState } from 'react';
import InputUserData from './InputUserData';
import { Link } from 'react-router-dom';


const Register = ({ onAddUser }) => {
  
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
    onAddUser(formValue.email, formValue.password);
    }
    
  return (
    <div className="regauto">
      <h2 className="regauto__title">Регистрация</h2>
      <form className="regauto__form" name="form-register" onSubmit={handleSubmit}>
        <InputUserData handleChange={handleChange} formValue={formValue} />        
        <button className="regauto__button" type="submit" >
          Зарегистрироваться
        </button>
        <p className="regauto__text">
          Уже зарегистрированы?&nbsp;
          <Link to="/signin" className="regauto__link">
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
