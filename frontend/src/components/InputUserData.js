 import React from 'react';

const InputUserData = ({ formValue, handleChange, errors }) => {  

  return (
    <>
      <input
        className="input-box"
        type="email"
        placeholder="Email"
        id="form-login-email"
        name="email"
        required
        onChange={handleChange}        
        value={formValue.email || ''}
      />
      <span className="form-place-error regauto__error_visible">{errors.email || ""}</span>
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
      />
      <span className="form-place-error regauto__error_visible">{errors.password || ""}</span>
    </>
  );
};

export default InputUserData;