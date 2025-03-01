const options = {
  method: "GET",
  headers: {
    apikey: "fca_live_TuB09qj5pp4FP2CEOarcFKOJ2tC4MI8LE2PyUWux",
  },
};

async function getExchangeRates() {
  const BASE_URL = `https://api.freecurrencyapi.com/v1/${"currencies"}`;
  const response = await fetch(BASE_URL, options);
  const result = await response.text();
  const data = await JSON.parse(result);
  return data.data;
}

async function setData() {
  const rates = {};
  const now = Date.now();
  const lastCheck = localStorage.getItem("lastCheckedTime");

  if (!lastCheck || now - lastCheck > 86400000) {
    // the api data is updated daily, no need to check more than once a day
    // maybe later instead of checking for 24hrs to pass, use day of week
    localStorage.setItem("lastCheckedTime", Date.now());
    let currentRates = await getExchangeRates();

    for (const rate in currentRates) {
      switch (currentRates[rate].code) {
        case "EUR":
          rates[currentRates[rate].code] = new Rate(
            currentRates[rate].code,
            currentRates[rate].name,
            currentRates[rate].symbol,
            currentRates[rate].name_plural
          );
          break;
        case "USD":
          rates[currentRates[rate].code] = new Rate(
            currentRates[rate].code,
            currentRates[rate].name,
            currentRates[rate].symbol,
            currentRates[rate].name_plural
          );
          break;
        case "JPY":
          rates[currentRates[rate].code] = new Rate(
            currentRates[rate].code,
            currentRates[rate].name,
            currentRates[rate].symbol,
            currentRates[rate].name_plural
          );
          break;
        case "GBP":
          rates[currentRates[rate].code] = new Rate(
            currentRates[rate].code,
            currentRates[rate].name,
            currentRates[rate].symbol,
            currentRates[rate].name_plural
          );
          break;
        case "AUD":
          rates[currentRates[rate].code] = new Rate(
            currentRates[rate].code,
            currentRates[rate].name,
            currentRates[rate].symbol,
            currentRates[rate].name_plural
          );
          break;
        case "CAD":
          rates[currentRates[rate].code] = new Rate(
            currentRates[rate].code,
            currentRates[rate].name,
            currentRates[rate].symbol,
            currentRates[rate].name_plural
          );
          break;
        case "MXN":
          rates[currentRates[rate].code] = new Rate(
            currentRates[rate].code,
            currentRates[rate].name,
            currentRates[rate].symbol,
            currentRates[rate].name_plural
          );
          break;
        case "TRY":
          rates[currentRates[rate].code] = new Rate(
            currentRates[rate].code,
            currentRates[rate].name,
            currentRates[rate].symbol,
            currentRates[rate].name_plural
          );
          break;
        case "PLN":
          rates[currentRates[rate].code] = new Rate(
            currentRates[rate].code,
            currentRates[rate].name,
            currentRates[rate].symbol,
            currentRates[rate].name_plural
          );
          break;
        case "CHF":
          rates[currentRates[rate].code] = new Rate(
            currentRates[rate].code,
            currentRates[rate].name,
            currentRates[rate].symbol,
            currentRates[rate].name_plural
          );
          break;
        default:
          break;
      }
    }
    localStorage.setItem("currency_data", JSON.stringify(rates));
  }
}

setData();

const rateObjectsRaw = localStorage.getItem("currency_data");
const rateObjects = JSON.parse(rateObjectsRaw);
console.log(rateObjects);

class Rate {
  constructor(code, name, symbol, namePlural) {
    this.code = code;
    this.name = name;
    this.symbol = symbol;
    this.namePlural = namePlural;
  }
}
