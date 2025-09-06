const API_ENDPOINT = 'https://api.freecurrencyapi.com/v1/latest';

export default async (request, context) => {
  const options = {
    method: 'GET',
    headers: {
      apikey: process.env.API_KEY,
    },
  };
  try {
    const response = await fetch(API_ENDPOINT, options);
    const data = await response.json();
    return Response.json({ data });
  } catch (error) {
    console.log(error);
    return Response.json({ error: 'Failed fetching data' }, { status: 500 });
  }
};
