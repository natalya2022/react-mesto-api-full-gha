import React from 'react';

const InputUserData = ({ formValue, handleChange }) => {  

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
      <input
        className="input-box"
        type="password"
        placeholder="Пароль"
        id="form-login-password"
        name="password"
        minLength={3}
        maxLength={20}
        required
        onChange={handleChange}
        value={formValue.password || ''}        
      />
    </>
  );
};

export default InputUserData;