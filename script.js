let rateObjects = {};

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
    code: 'EUR',
    name: 'Euro',
    symbol: '€',
    namePlural: 'Euros',
    image: './assets/euro_flag.png',
    sliderPos: '-70rem',
  },
  USD: {
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
    namePlural: 'US dollars',
    image: './assets/us_flag.png',
    sliderPos: '-10rem',
  },
  JPY: {
    code: 'JPY',
    name: 'Japanese Yen',
    symbol: '¥',
    namePlural: 'Japanese yen',
    image: './assets/japan_flag.png',
    sliderPos: '-60rem',
  },
  GBP: {
    code: 'GBP',
    name: 'British Pound Sterling',
    symbol: '£',
    namePlural: 'British pounds sterling',
    image: './assets/british_flag.png',
    sliderPos: '-90rem',
  },
  PLN: {
    code: 'PLN',
    name: 'Polish Zloty',
    symbol: 'zł',
    namePlural: 'Polish zlotys',
    image: './assets/poland_flag.png',
    sliderPos: '-40rem',
  },
  CHF: {
    code: 'CHF',
    name: 'Swiss Franc',
    symbol: 'CHF',
    namePlural: 'Swiss francs',
    image: './assets/switzerland_flag.png',
    sliderPos: '-30rem',
  },
  TRY: {
    code: 'TRY',
    name: 'Turkish Lira',
    symbol: 'TL',
    namePlural: 'Turkish Lira',
    image: './assets/turkey_flag.png',
    sliderPos: '-20rem',
  },
  AUD: {
    code: 'AUD',
    name: 'Australian Dollar',
    symbol: 'AU$',
    namePlural: 'Australian dollars',
    image: './assets/australia_flag.png',
    sliderPos: '-100rem',
  },
  CAD: {
    code: 'CAD',
    name: 'Canadian Dollar',
    symbol: 'CA$',
    namePlural: 'Canadian dollars',
    image: './assets/canada_flag.png',
    sliderPos: '-80rem',
  },
  MXN: {
    code: 'MXN',
    name: 'Mexican Peso',
    symbol: 'MX$',
    namePlural: 'Mexican pesos',
    image: './assets/mexico_flag.png',
    sliderPos: '-50rem',
  },
};

const options = {
  method: 'GET',
  headers: {
    apikey: 'fca_live_TuB09qj5pp4FP2CEOarcFKOJ2tC4MI8LE2PyUWux',
  },
};

async function getExchangeRates() {
  const BASE_URL = 'https://api.freecurrencyapi.com/v1/';
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
  const lastCheckedDay = localStorage.getItem('lastCheckedDay');

  // if rate data doesn't exist, or is from yesterday or before 5pm today
  // then we get or update the data and store in local storage
  if (
    (lastCheckedDay < new Date().getDay() &&
      localStorage.getItem('lastCheckedHour') < 17) ||
    (new Date().getHours() > 17 &&
      localStorage.getItem('lastCheckedHour') < 17) ||
    !localStorage.getItem('currency_data')
  ) {
    localStorage.setItem('lastCheckedDay', new Date().getDay());
    localStorage.setItem('lastCheckedHour', new Date().getHours());

    let currentRates = await getExchangeRates();

    for (const rate in countryInfo) {
      switch (countryInfo[rate].code) {
        case 'EUR':
          rates[countryInfo[rate].code] = new Rate(
            countryInfo[rate].code,
            countryInfo[rate].name,
            countryInfo[rate].symbol,
            countryInfo[rate].name_plural,
            currentRates[countryInfo[rate].code],
          );
          break;
        case 'USD':
          rates[countryInfo[rate].code] = new Rate(
            countryInfo[rate].code,
            countryInfo[rate].name,
            countryInfo[rate].symbol,
            countryInfo[rate].name_plural,
            currentRates[countryInfo[rate].code],
          );
          break;
        case 'JPY':
          rates[countryInfo[rate].code] = new Rate(
            countryInfo[rate].code,
            countryInfo[rate].name,
            countryInfo[rate].symbol,
            countryInfo[rate].name_plural,
            currentRates[countryInfo[rate].code],
          );
          break;
        case 'GBP':
          rates[countryInfo[rate].code] = new Rate(
            countryInfo[rate].code,
            countryInfo[rate].name,
            countryInfo[rate].symbol,
            countryInfo[rate].name_plural,
            currentRates[countryInfo[rate].code],
          );
          break;
        case 'AUD':
          rates[countryInfo[rate].code] = new Rate(
            countryInfo[rate].code,
            countryInfo[rate].name,
            countryInfo[rate].symbol,
            countryInfo[rate].name_plural,
            currentRates[countryInfo[rate].code],
          );
          break;
        case 'CAD':
          rates[countryInfo[rate].code] = new Rate(
            countryInfo[rate].code,
            countryInfo[rate].name,
            countryInfo[rate].symbol,
            countryInfo[rate].name_plural,
            currentRates[countryInfo[rate].code],
          );
          break;
        case 'MXN':
          rates[countryInfo[rate].code] = new Rate(
            countryInfo[rate].code,
            countryInfo[rate].name,
            countryInfo[rate].symbol,
            countryInfo[rate].name_plural,
            currentRates[countryInfo[rate].code],
          );
          break;
        case 'TRY':
          rates[countryInfo[rate].code] = new Rate(
            countryInfo[rate].code,
            countryInfo[rate].name,
            countryInfo[rate].symbol,
            countryInfo[rate].name_plural,
            currentRates[countryInfo[rate].code],
          );
          break;
        case 'PLN':
          rates[countryInfo[rate].code] = new Rate(
            countryInfo[rate].code,
            countryInfo[rate].name,
            countryInfo[rate].symbol,
            countryInfo[rate].name_plural,
            currentRates[countryInfo[rate].code],
          );
          break;
        case 'CHF':
          rates[countryInfo[rate].code] = new Rate(
            countryInfo[rate].code,
            countryInfo[rate].name,
            countryInfo[rate].symbol,
            countryInfo[rate].name_plural,
            currentRates[countryInfo[rate].code],
          );
          break;
        default:
          break;
      }
    }
    localStorage.setItem('currency_data', JSON.stringify(rates));

    populateRateObjects();
    return;
  }

  populateRateObjects();
}

setData();

// get data from local storage and convert back to JSON
async function populateRateObjects() {
  const rateObjectsRaw = localStorage.getItem('currency_data');
  rateObjects = await JSON.parse(rateObjectsRaw);
  console.log(rateObjects);
}

// adds the symbols to the name in the select list options
const selectListOptions = document.querySelectorAll('option');
selectListOptions.forEach((option) => {
  const value = option.value;
  if (!value) return;
  const text = option.innerText;
  const symbol = countryInfo[value].symbol;
  option.innerText = text + ' - ' + symbol;
});

// adds the flag for the appropriate selection
function handleFlagSelect(e) {
  const country = countryInfo[e.target.value];
  const baseSlider = document.querySelector('.base-slider');
  const convSlider = document.querySelector('.conv-slider');
  function handleFlags(country, slider) {
    if (!country) {
      slider.style.setProperty('--left-dist', '0rem');
    } else {
      slider.style.setProperty('--left-dist', `${country.sliderPos}`);
    }
  }

  if (e.target.id === 'select-base') {
    handleFlags(country, baseSlider);
  } else {
    handleFlags(country, convSlider);
  }
}

const selectLists = document.querySelectorAll('select');

selectLists.forEach((select) => {
  select.addEventListener('change', handleFlagSelect);
});

const amountToConvInput = document.querySelector('#select-amt');

amountToConvInput.addEventListener('input', (e) => {
  if (e.target.value.length) {
    let val = e.target.value;
    let newVal = val.split(',');
    let newerVal = newVal.join('');

    e.target.value = parseInt(newerVal).toLocaleString();
  }
});

function handleConversion() {
  const baseCurr = selectLists[0].value;
  const convToCurr = selectLists[1].value;
  if (!baseCurr || !convToCurr) {
    alert('Please have both currencies selected before you hit convert.');
    return;
  }
  const convertedAmountElem = document.querySelector('.converted');

  if (!amountToConvInput.value) {
    alert(
      "Please don't try to convert zero, you may blow a hole open in the universe.",
    );
    return;
  }

  let tempAmt = amountToConvInput.value.replaceAll(',', '');
  let amount = parseInt(tempAmt);
  const convToRate = rateObjects[convToCurr].rate;
  const convToSymb = rateObjects[convToCurr].symbol;
  let result;

  if (baseCurr === 'USD') {
    result = Math.round(amount * convToRate).toLocaleString();
  } else {
    // formula - (convert_to / new_base_curr) * amount = result
    const newBase = rateObjects[baseCurr].rate;
    result = Math.round((convToRate / newBase) * amount).toLocaleString();
    console.log(result);
  }
  convertedAmountElem.innerHTML = `<span class="currencySymb2">${convToSymb}</span>&nbsp;${result}`;
}

const convertBtn = document.querySelector('button');
convertBtn.addEventListener('click', handleConversion);
