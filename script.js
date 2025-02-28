const options = {
  method: "GET",
  headers: {
    apikey: "fca_live_TuB09qj5pp4FP2CEOarcFKOJ2tC4MI8LE2PyUWux",
  },
};

async function getExchangeRates(endpoint) {
  // the api data is updated daily, no need to check more than once a day
  // maybe later instead of checking for 24hrs to pass, use day of week
  const now = Date.now();
  const lastCheck = localStorage.getItem("lastCheckedTime");
  if (!lastCheck || now - lastCheck > 86400000) {
    console.log("hello");
    localStorage.setItem("lastCheckedTime", Date.now());
  }

  const BASE_URL = `https://api.freecurrencyapi.com/v1/${endpoint}`;
  const response = await fetch(BASE_URL, options);
  const result = await response.text();
  const data = await JSON.parse(result);
  return data.data;
}

const rates = [];

async function setData() {
  let currentRates = await getExchangeRates("currencies");
  for (const rate in currentRates) {
    rates.push(currentRates[rate]);
  }
}
console.log(rates);

setData();
