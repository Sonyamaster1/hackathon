export function sendFormData(url, formData) {
  const { name, email } = formData;

  return fetch(`${url}`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name,
        email
    })
})
    .then((res) => {
      if(!res.ok) {
        return Promise.reject(res.status)
      }
    });
}