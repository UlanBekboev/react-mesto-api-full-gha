function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
}

export const BASE_URL = "http://localhost:3001";

export function register({ email, password }) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Accept": 'application/json',
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

export function authorize({ email, password }) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Accept": 'application/json',
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
  .then(checkResponse)
  .then((data) => {
    localStorage.setItem('jwt', data.token);
    return data;
})
  
}

export function checkToken(jwt) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      'Authorization': `Bearer ${jwt}`,
    },
  }).then(checkResponse);
}