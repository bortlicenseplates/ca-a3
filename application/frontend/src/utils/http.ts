export const post = (url: string, body: {[key: string]: any}) => fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body)
});

export const put = (url: string, body: {[key: string]: any}) => fetch(url, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body)
});