import React, { useEffect } from 'react';
import InputUserData from './InputUserData';
import { useFormValidation } from '../hooks/useFormValidation';

const Login = ({ onUserLogin, isSending }) => {

  const { values, handleChange, resetForm, errors, isValid } = useFormValidation();
  
  useEffect(() => {   
    resetForm({}, {}, false);
  }, [resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();       
    onUserLogin(values.email, values.password);
    }
    
  return (
    <div className="regauto">
      <h2 className="regauto__title">Вход</h2>
      <form className="regauto__form" name="form-login" onSubmit={handleSubmit} noValidate>
      <InputUserData handleChange={handleChange} formValue={values} errors={errors} />
        <button className={`regauto__button ${(!isValid || isSending) ? 'popup__save_disabled' : ''}`} type="submit" disabled={!isValid || isSending} >
        {isSending ? 'Авторизация...' : 'Войти'}
        </button>
      </form>
    </div>
  );
};

export default Login;
