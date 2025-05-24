const fromAmountElement = document.querySelector('.amount');
const convertedAmountElement = document.querySelector('.convertedAmount');
const fromCurrencyElement = document.querySelector('.fromCurrency');
const toCurrencyElement = document.querySelector('.toCurrency');
const resultElement = document.querySelector('.result');
const converterContainer = document.querySelector('.converter-container');

// Array to populate the select tags with these countries
const countries = [
{ code: "USD", name: "United States Dollar" },
{ code: "INR", name: "Indian Rupee" },
{ code: "EUR", name: " European Union" },
{ code: "EGP",	name: "EGYPTIAN POUND" },
{ code: "ESP",	name: "SPANISH PESETA" },	
{ code: "ETB",	name: "ETHOPHIAN BIRR" },	
{ code: "FIM",	name: "FINISH MARKKA" },	
{ code: "IDR",	name: "INDONESIAN RUPIAH" },	
{ code: "IEP",	name: "IRISH POUNDS" },	
{ code: "ILS",	name: "ISRAELI SHEKEL" },	
{ code: "INR",	name: "INDIAN RUPEE" },	
{ code: "IQD",	name: "IRAQI DINAR" },	
{ code: "IRR",	name: "IRANIAN RIAL" },	
{ code: "ISK",	name: "ICELAND KRONA" },	
{ code: "FRF",	name: "FRENCH FRANC" },	
{ code: "GBP",	name: "POUND STERLING UK" },	 
{ code: "GBP",	name: "POUND STERLING" },	 
{ code: "PHP",	name: "PHILLIPINES PESOS" },	
{ code: "MXN",	name: "MEXICAN PESO" }
];

//Showing countries from array to select tag
countries.forEach(country => {
    const option1 = document.createElement('option');
    const option2 = document.createElement('option');

    option1.value = option2.value = country.code;
    option1.textContent = option2.textContent = `${country.code} (${country.name})`;
    fromCurrencyElement.appendChild(option1);
    toCurrencyElement.appendChild(option2);

    // Setting Default values of select tag
    fromCurrencyElement.value = "USD";
    toCurrencyElement.value = "INR";
});

// Function to get exchange rate using API
const getExchangeRate = async () => {
    const amount = parseFloat(fromAmountElement.value);
    const fromCurrency = fromCurrencyElement.value;
    const toCurrency = toCurrencyElement.value;
    resultElement.textContent = "Fetching Exchange rates...";

try{
    // Fetch data from API
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const data = await response.json();

    const conversionRate = data.rates[toCurrency];
    const convertedAmount = (amount * conversionRate);

    convertedAmountElement.value = convertedAmount;
    resultElement.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
}
catch(error){
    converterContainer.innerHTML = `<h2>Error while fetching exchange rates!!!</h2>`;
}

    console.log(data);
}


// Fetching exchange rate when user inputs the amount
fromAmountElement.addEventListener('input', getExchangeRate);

// Fetching exchange rate when user change currency
fromCurrencyElement.addEventListener('change', getExchangeRate);
toCurrencyElement.addEventListener('change', getExchangeRate);

window.addEventListener('load', getExchangeRate);
