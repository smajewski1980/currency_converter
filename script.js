// this makes an object for each country
class Rate {
  constructor(code, name, symbol, namePlural, rate) {
    this.code = code;
    this.name = name;
    this.symbol = symbol;
    this.namePlural = namePlural;
    this.rate = rate;
  }
}

// the info minus the rates, referenced to construct rate objects
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

async function getExchangeRates() {
  const BASE_URL = "https://api.freecurrencyapi.com/v1/";
  const URL = `${BASE_URL}latest`;
  const response = await fetch(URL, options);
  const result = await response.text();
  const data = await JSON.parse(result);
  return data.data;
}

// fetch and store latest rates info
async function setData() {
  const rates = {};
  const now = Date.now();
  const lastCheckedDay = localStorage.getItem("lastCheckedDay");

  // if rate data doesn't exist, or is from yesterday or before 5pm today
  // then we get or update the data and store in local storage
  if (
    (lastCheckedDay < new Date().getDay() &&
      localStorage.getItem("lastCheckedHour") < 17) ||
    (new Date().getHours() > 17 &&
      localStorage.getItem("lastCheckedHour") < 17) ||
    !localStorage.getItem("currency_data")
  ) {
    localStorage.setItem("lastCheckedDay", new Date().getDay());
    localStorage.setItem("lastCheckedHour", new Date().getHours());

    let currentRates = await getExchangeRates();

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

// get data from local storage and convert back to JSON
const rateObjectsRaw = localStorage.getItem("currency_data");
const rateObjects = JSON.parse(rateObjectsRaw);
console.log(rateObjects);

// adds the symbols to the name in the select list options
const selectListOptions = document.querySelectorAll("option");
selectListOptions.forEach((option) => {
  const value = option.value;
  if (!value) return;
  const text = option.innerText;
  const symbol = countryInfo[value].symbol;
  option.innerText = text + " - " + symbol;
});

// adds the flag for the appropriate selection
function handleFlagSelect(e) {
  const imageElems = document.querySelectorAll("img");
  const leftColImg = imageElems[0];
  const rightColImg = imageElems[1];
  const country = countryInfo[e.target.value];
  function handleFlags(elem, country) {
    if (!country) {
      elem.src = "";
      elem.alt = "";
    } else {
      elem.src = country.image;
      elem.alt = `${country.name} Flag`;
    }
  }

  if (e.target.parentElement.classList.contains("left-col")) {
    handleFlags(leftColImg, country);
  } else {
    handleFlags(rightColImg, country);
  }
}

const selectLists = document.querySelectorAll("select");
selectLists.forEach((select) => {
  select.addEventListener("change", handleFlagSelect);
});

function handleConversion() {
  const baseCurr = selectLists[0].value;
  const amountToConvInput = document.querySelector("#select-amt");
  const convToCurr = selectLists[1].value;
  const convertedAmountElem = document.querySelector(".converted");

  let amount = amountToConvInput.value;
  const convToRate = rateObjects[convToCurr].rate;
  let result;
  if (baseCurr === "USD") {
    result = Math.round(amount * convToRate).toLocaleString();
  } else {
    // formula - (convert_to / new_base_curr) * amount = result
    const newBase = rateObjects[baseCurr].rate;
    result = Math.round((convToRate / newBase) * amount);
  }
  convertedAmountElem.innerText = `$${result.toLocaleString()}`;
}

const convertBtn = document.querySelector("button");
convertBtn.addEventListener("click", handleConversion);
