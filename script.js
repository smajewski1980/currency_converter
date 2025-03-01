class Rate {
  constructor(code, name, symbol, namePlural, rate) {
    this.code = code;
    this.name = name;
    this.symbol = symbol;
    this.namePlural = namePlural;
    this.rate = rate;
  }
}

let ratesInfo = {
  EUR: {
    code: "EUR",
    name: "Euro",
    symbol: "€",
    namePlural: "Euros",
  },
  USD: {
    code: "USD",
    name: "US Dollar",
    symbol: "$",
    namePlural: "US dollars",
  },
  JPY: {
    code: "JPY",
    name: "Japanese Yen",
    symbol: "¥",
    namePlural: "Japanese yen",
  },
  GBP: {
    code: "GBP",
    name: "British Pound Sterling",
    symbol: "£",
    namePlural: "British pounds sterling",
  },
  PLN: {
    code: "PLN",
    name: "Polish Zloty",
    symbol: "zł",
    namePlural: "Polish zlotys",
  },
  CHF: {
    code: "CHF",
    name: "Swiss Franc",
    symbol: "CHF",
    namePlural: "Swiss francs",
  },
  TRY: {
    code: "TRY",
    name: "Turkish Lira",
    symbol: "TL",
    namePlural: "Turkish Lira",
  },
  AUD: {
    code: "AUD",
    name: "Australian Dollar",
    symbol: "AU$",
    namePlural: "Australian dollars",
  },
  CAD: {
    code: "CAD",
    name: "Canadian Dollar",
    symbol: "CA$",
    namePlural: "Canadian dollars",
  },
  MXN: {
    code: "MXN",
    name: "Mexican Peso",
    symbol: "MX$",
    namePlural: "Mexican pesos",
  },
};

const options = {
  method: "GET",
  headers: {
    apikey: "fca_live_TuB09qj5pp4FP2CEOarcFKOJ2tC4MI8LE2PyUWux",
  },
};

async function getExchangeRates(endpoint) {
  const BASE_URL = "https://api.freecurrencyapi.com/v1/";
  const URL = `${BASE_URL}${endpoint}`;
  const response = await fetch(URL, options);
  const result = await response.text();
  const data = await JSON.parse(result);
  return data.data;
}

async function setData() {
  const rates = {};
  const now = Date.now();
  // const lastCheck = localStorage.getItem("lastCheckedTime");
  const lastCheckedDay = localStorage.getItem("lastCheckedDay");

  if (
    // !lastCheck ||
    // now - lastCheck > 86400000 ||
    // !localStorage.getItem("currency_data")
    !lastCheckedDay ||
    new Date().getHours() > 17 ||
    !localStorage.getItem("currency_data")
  ) {
    // the api data is updated daily, no need to check more than once a day
    // maybe later instead of checking for 24hrs to pass, use day of week
    // localStorage.setItem("lastCheckedTime", Date.now());
    localStorage.setItem("lastCheckedDay", new Date().getDay());

    let currentRates = await getExchangeRates("latest");

    for (const rate in ratesInfo) {
      switch (ratesInfo[rate].code) {
        case "EUR":
          rates[ratesInfo[rate].code] = new Rate(
            ratesInfo[rate].code,
            ratesInfo[rate].name,
            ratesInfo[rate].symbol,
            ratesInfo[rate].name_plural,
            currentRates[ratesInfo[rate].code]
          );
          break;
        case "USD":
          rates[ratesInfo[rate].code] = new Rate(
            ratesInfo[rate].code,
            ratesInfo[rate].name,
            ratesInfo[rate].symbol,
            ratesInfo[rate].name_plural,
            currentRates[ratesInfo[rate].code]
          );
          break;
        case "JPY":
          rates[ratesInfo[rate].code] = new Rate(
            ratesInfo[rate].code,
            ratesInfo[rate].name,
            ratesInfo[rate].symbol,
            ratesInfo[rate].name_plural,
            currentRates[ratesInfo[rate].code]
          );
          break;
        case "GBP":
          rates[ratesInfo[rate].code] = new Rate(
            ratesInfo[rate].code,
            ratesInfo[rate].name,
            ratesInfo[rate].symbol,
            ratesInfo[rate].name_plural,
            currentRates[ratesInfo[rate].code]
          );
          break;
        case "AUD":
          rates[ratesInfo[rate].code] = new Rate(
            ratesInfo[rate].code,
            ratesInfo[rate].name,
            ratesInfo[rate].symbol,
            ratesInfo[rate].name_plural,
            currentRates[ratesInfo[rate].code]
          );
          break;
        case "CAD":
          rates[ratesInfo[rate].code] = new Rate(
            ratesInfo[rate].code,
            ratesInfo[rate].name,
            ratesInfo[rate].symbol,
            ratesInfo[rate].name_plural,
            currentRates[ratesInfo[rate].code]
          );
          break;
        case "MXN":
          rates[ratesInfo[rate].code] = new Rate(
            ratesInfo[rate].code,
            ratesInfo[rate].name,
            ratesInfo[rate].symbol,
            ratesInfo[rate].name_plural,
            currentRates[ratesInfo[rate].code]
          );
          break;
        case "TRY":
          rates[ratesInfo[rate].code] = new Rate(
            ratesInfo[rate].code,
            ratesInfo[rate].name,
            ratesInfo[rate].symbol,
            ratesInfo[rate].name_plural,
            currentRates[ratesInfo[rate].code]
          );
          break;
        case "PLN":
          rates[ratesInfo[rate].code] = new Rate(
            ratesInfo[rate].code,
            ratesInfo[rate].name,
            ratesInfo[rate].symbol,
            ratesInfo[rate].name_plural,
            currentRates[ratesInfo[rate].code]
          );
          break;
        case "CHF":
          rates[ratesInfo[rate].code] = new Rate(
            ratesInfo[rate].code,
            ratesInfo[rate].name,
            ratesInfo[rate].symbol,
            ratesInfo[rate].name_plural,
            currentRates[ratesInfo[rate].code]
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

// temp div just to display something in the browser for now
const tempDiv = document.querySelector(".temp-output");
setTimeout(() => {
  const rateObjectsRaw = localStorage.getItem("currency_data");
  const rateObjects = JSON.parse(rateObjectsRaw);
  for (const rate in rateObjects) {
    tempDiv.innerHTML += `
      ${rateObjects[rate].code},
      ${rateObjects[rate].symbol},
      ${rateObjects[rate].name},
      ${rateObjects[rate].rate}</br>
    `;
  }
  console.log(rateObjects);
}, 500);

console.log(new Date().getDay());
console.log(new Date().getHours());
