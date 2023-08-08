function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
}

//const BASE_URL = "https://api.discover.nomoreparties.co";
const BASE_URL = "http://localhost:3000";

export function register({ email, password }) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Accept": 'application/json',
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

export function authorize({ email, password }) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: 'include',
    headers: {
      "Accept": 'application/json',
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
  .then(checkResponse)
  .then((data) => {
    localStorage.setItem('userId', data._id)
    return data;
  })
};

export function checkToken() {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    credentials: 'include',
    headers: {
      "Accept": 'application/json',
      "Content-Type": "application/json",
    },
  }).then(checkResponse);
}