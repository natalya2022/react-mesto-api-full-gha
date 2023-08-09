export const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://api.places.nomoreparties.co' : 'http://localhost:3000';
//export const BASE_URL = 'https://api.places.nomoreparties.co';


function checkRequest(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ email, password })
  })
    .then(res => checkRequest(res));        
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({email, password})
  })
  .then(res => checkRequest(res));        
};

export const checkToken = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',     
    },
    credentials: 'include',
  })
  .then(res => checkRequest(res));        
};

export const logOut = () => {
  return fetch(`${BASE_URL}/users/signout`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',      
    },
    credentials: 'include',
  })
  .then(res => checkRequest(res));        
};