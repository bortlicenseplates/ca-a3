export const post = async (url: string, body: {[key: string]: any}) => {
  const raw = await fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(body)
  });
  return await raw.json();
};

export const put = (url: string, body: {[key: string]: any}) => fetch(url, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body)
});