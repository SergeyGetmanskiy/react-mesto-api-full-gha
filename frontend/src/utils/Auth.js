import checkServerResponse from "./CheckServerResponse";

export const BASE_URL = 'https://api.sgetmansky.backend.nomoredomainsicu.ru';

function request(url, options) {
  return fetch(url, options).then(checkServerResponse)
};
  
export function register(email, password) {
  return request(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      "password": password,
      "email": email
     })
  })
};

export function login(email, password) {
  return request(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "password": password,
      "email": email
    })
  })
};

export function checkToken(token) {
  return request(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
};