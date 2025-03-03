class Rate {
  constructor(code, name, symbol, namePlural, rate) {
    this.code = code;
    this.name = name;
    this.symbol = symbol;
    this.namePlural = namePlural;
    this.rate = rate;
  }
}

let countryInfo = {
  EUR: {
    code: "EUR",
    name: "Euro",
    symbol: "€",
    namePlural: "Euros",
    image: "/assets/euro_flag.png",
  },
  USD: {
    code: "USD",
    name: "US Dollar",
    symbol: "$",
    namePlural: "US dollars",
    image: "/assets/us_flag.png",
  },
  JPY: {
    code: "JPY",
    name: "Japanese Yen",
    symbol: "¥",
    namePlural: "Japanese yen",
    image: "/assets/japan_flag.png",
  },
  GBP: {
    code: "GBP",
    name: "British Pound Sterling",
    symbol: "£",
    namePlural: "British pounds sterling",
    image: "/assets/british_flag.png",
  },
  PLN: {
    code: "PLN",
    name: "Polish Zloty",
    symbol: "zł",
    namePlural: "Polish zlotys",
    image: "/assets/poland_flag.png",
  },
  CHF: {
    code: "CHF",
    name: "Swiss Franc",
    symbol: "CHF",
    namePlural: "Swiss francs",
    image: "/assets/switzerland_flag.png",
  },
  TRY: {
    code: "TRY",
    name: "Turkish Lira",
    symbol: "TL",
    namePlural: "Turkish Lira",
    image: "/assets/turkey_flag.png",
  },
  AUD: {
    code: "AUD",
    name: "Australian Dollar",
    symbol: "AU$",
    namePlural: "Australian dollars",
    image: "/assets/australia_flag.png",
  },
  CAD: {
    code: "CAD",
    name: "Canadian Dollar",
    symbol: "CA$",
    namePlural: "Canadian dollars",
    image: "/assets/canada_flag.png",
  },
  MXN: {
    code: "MXN",
    name: "Mexican Peso",
    symbol: "MX$",
    namePlural: "Mexican pesos",
    image: "/assets/mexico_flag.png",
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
  const lastCheckedDay = localStorage.getItem("lastCheckedDay");

  if (
    !lastCheckedDay ||
    (new Date().getHours() > 17 &&
      localStorage.getItem("lastCheckedHour") < 17) ||
    !localStorage.getItem("currency_data")
  ) {
    localStorage.setItem("lastCheckedDay", new Date().getDay());
    localStorage.setItem("lastCheckedHour", new Date().getHours());

    let currentRates = await getExchangeRates("latest");

    for (const rate in countryInfo) {
      switch (countryInfo[rate].code) {
        case "EUR":
          rates[countryInfo[rate].code] = new Rate(
            countryInfo[rate].code,
            countryInfo[rate].name,
            countryInfo[rate].symbol,
            countryInfo[rate].name_plural,
            currentRates[countryInfo[rate].code]
          );
          break;
        case "USD":
          rates[countryInfo[rate].code] = new Rate(
            countryInfo[rate].code,
            countryInfo[rate].name,
            countryInfo[rate].symbol,
            countryInfo[rate].name_plural,
            currentRates[countryInfo[rate].code]
          );
          break;
        case "JPY":
          rates[countryInfo[rate].code] = new Rate(
            countryInfo[rate].code,
            countryInfo[rate].name,
            countryInfo[rate].symbol,
            countryInfo[rate].name_plural,
            currentRates[countryInfo[rate].code]
          );
          break;
        case "GBP":
          rates[countryInfo[rate].code] = new Rate(
            countryInfo[rate].code,
            countryInfo[rate].name,
            countryInfo[rate].symbol,
            countryInfo[rate].name_plural,
            currentRates[countryInfo[rate].code]
          );
          break;
        case "AUD":
          rates[countryInfo[rate].code] = new Rate(
            countryInfo[rate].code,
            countryInfo[rate].name,
            countryInfo[rate].symbol,
            countryInfo[rate].name_plural,
            currentRates[countryInfo[rate].code]
          );
          break;
        case "CAD":
          rates[countryInfo[rate].code] = new Rate(
            countryInfo[rate].code,
            countryInfo[rate].name,
            countryInfo[rate].symbol,
            countryInfo[rate].name_plural,
            currentRates[countryInfo[rate].code]
          );
          break;
        case "MXN":
          rates[countryInfo[rate].code] = new Rate(
            countryInfo[rate].code,
            countryInfo[rate].name,
            countryInfo[rate].symbol,
            countryInfo[rate].name_plural,
            currentRates[countryInfo[rate].code]
          );
          break;
        case "TRY":
          rates[countryInfo[rate].code] = new Rate(
            countryInfo[rate].code,
            countryInfo[rate].name,
            countryInfo[rate].symbol,
            countryInfo[rate].name_plural,
            currentRates[countryInfo[rate].code]
          );
          break;
        case "PLN":
          rates[countryInfo[rate].code] = new Rate(
            countryInfo[rate].code,
            countryInfo[rate].name,
            countryInfo[rate].symbol,
            countryInfo[rate].name_plural,
            currentRates[countryInfo[rate].code]
          );
          break;
        case "CHF":
          rates[countryInfo[rate].code] = new Rate(
            countryInfo[rate].code,
            countryInfo[rate].name,
            countryInfo[rate].symbol,
            countryInfo[rate].name_plural,
            currentRates[countryInfo[rate].code]
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

const selectListOptions = document.querySelectorAll("option");
selectListOptions.forEach((option) => {
  const value = option.value;
  if (!value) return;
  const text = option.innerText;
  const symbol = countryInfo[value].symbol;
  option.innerText = text + " - " + symbol;
});

function handleSelect(e) {
  const country = countryInfo[e.target.value];

  if (e.target.parentElement.classList.contains("left-col")) {
    const leftColImg = document.querySelector(".left-col img");
    if (!country) {
      leftColImg.src = "";
      leftColImg.alt = "";
    } else {
      leftColImg.src = country.image;
      leftColImg.alt = `${country.name} Flag`;
    }
  } else {
    const rightColImg = document.querySelector(".right-col img");
    if (!country) {
      rightColImg.src = "";
      rightColImg.alt = "";
    } else {
      rightColImg.src = country.image;
      rightColImg.alt = `${country.name} Flag`;
    }
  }
}

const imageElems = document.querySelectorAll("img");
const selectLists = document.querySelectorAll("select");
selectLists.forEach((select) => {
  select.addEventListener("change", handleSelect);
});
