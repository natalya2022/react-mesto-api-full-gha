import React, { useEffect } from 'react';
import InputUserData from './InputUserData';
import { Link } from 'react-router-dom';
import { useFormValidation } from '../hooks/useFormValidation';


const Register = ({ onAddUser }) => {

  const { values, handleChange, resetForm, errors, isValid } = useFormValidation();
    
  useEffect(() => {   
    resetForm({}, {}, false);
  }, [resetForm]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values.email, values.password);    
    onAddUser(values.email, values.password);
    }
    
  return (
    <div className="regauto">
      <h2 className="regauto__title">Регистрация</h2>
      <form className="regauto__form" name="form-register" onSubmit={handleSubmit} noValidate>
        <InputUserData handleChange={handleChange} formValue={values} errors={errors} />        
        <button className={`regauto__button ${!isValid ? 'popup__save_disabled' : ''}`} type="submit" disabled={!isValid}>
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
