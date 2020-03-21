// Set to real viewheight without browser navigation
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
  vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

// Array with city images for the background
const cityImage = document.querySelector('.city-image');
const cities = ["amsterdam", "london", "new york", "paris", "rome", "cairo", "disney", "dubai", "sydney"];

// Get HTML elements
const city = document.querySelector('.location');
const day = document.querySelector('.day');
const temperature = document.querySelector('.temperature');
const circumstance = document.querySelector('.circumstance');
const feelsLike = document.querySelector('.feels-like');
const input = document.querySelector('.inputValue');
const button = document.querySelector('.button')

// Get data on click
button.addEventListener('click', returnData);

// Array with days for displaying the date
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Getting data and assigning it to HTML elements
function returnData(){
  fetch('https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&appid=bd9525c0f216f54f22acc53bf2f3e171&lang')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const cityData = data.name;
      const date = new Date();
      const dayData = days[date.getDay()];
      const tempData = Math.floor(data.main.temp-273.15);
      const circData = data.weather[0].description;
      const feelsLikeData = Math.floor(data.main.feels_like-273.15);

      city.innerHTML = cityData;
      day.innerHTML = dayData;
      temperature.innerHTML = tempData+'&#176;';
      circumstance.innerHTML = circData;
      feelsLike.innerHTML = 'feels like '+feelsLikeData+'&#176;';

      // Loop through array, check if input is the same as array item
      // to display the right background image
      const inputValue = input.value.toLowerCase();
      for(let i = 0; i < cities.length; i++) {
          if (cities[i] == inputValue) {
              cityImage.innerHTML = '<img src="images/'+inputValue+'.svg" alt=""/>';
              break;
          }
          else {
            cityImage.innerHTML = '<img src="images/default.svg" alt=""/>';
          }
      }
      console.log(data);
    }
  )
  .catch(() => {
    console.log(city.innerHTML = "Location not found");
  });
}
