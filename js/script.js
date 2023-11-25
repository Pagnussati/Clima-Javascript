const countryApiUrl = 'https://flagsapi.com'
const apiKey = '058b137b23a9d2646fe9a64396522027'

const cityInput = document.querySelector('#city-input');
const searchBtn = document.querySelector('#search');

const cityElement = document.querySelector('#city');
const tempElement = document.querySelector('#temperature span');
const descElement = document.querySelector('#description');
const weatherIconElement = document.querySelector('#weather-icon');
const countryElement = document.querySelector('#country');
const humidityElement = document.querySelector('#umidity span');
const windElement = document.querySelector('#wind span');

const weatherContainer = document.querySelector('#weather-data')

const getWeatherData = async (city) => {
    const apiWeahterURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeahterURL);
    const data = await res.json();

    return data;
}

const showWeatherData = async (city) => {
    const data = await getWeatherData(city);

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElement.setAttribute('src', countryApiUrl + '/' + data.sys.country + '/flat/64.png');
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}Km/h`;

    weatherContainer.classList.remove('hide')
};

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const city = cityInput.value;

    showWeatherData(city);
});

cityInput.addEventListener('keyup', (e) => {
    if (e.code === 'Enter') {
        const city = e.target.value;

        showWeatherData(city);
    }
});