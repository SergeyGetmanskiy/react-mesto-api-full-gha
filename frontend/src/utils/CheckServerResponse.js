export default function checkServerResponse(res) {
  if(res.ok) {
    return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }