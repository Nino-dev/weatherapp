// Set to real viewheight without browser navigation
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

// Array with city images for the background
const cityImage = document.querySelector('.city-image');
const cityImages = [
  { cityName: "amsterdam", img: "images/amsterdam.svg"},
  { cityName: "london", img: "images/london.svg"},
  { cityName: "new york", img: "images/newyork.svg"},
  { cityName: "paris", img: "images/paris.svg"},
  { cityName: "rome", img: "images/rome.svg"},
  { cityName: "cairo", img: "images/cairo.svg"},
  { cityName: "disney", img: "images/disney.svg"},
  { cityName: "dubai", img: "images/dubai.svg"},
  { cityName: "sydney", img: "images/sydney.svg"},
];

// Get HTML elements
const city = document.querySelector('.location');
const day = document.querySelector('.day');
const temperature = document.querySelector('.temperature');
const circumstance = document.querySelector('.circumstance');
const feelsLike = document.querySelector('.feels-like');
const inputValue = document.querySelector('.inputValue');
const button = document.querySelector('.button')

// Get data on click
button.addEventListener('click', returnData);

// Array with days for displaying the date
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Getting data and assigning it to HTML elements
function returnData(){
  fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid=bd9525c0f216f54f22acc53bf2f3e171&lang')
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

      // Loop through array, check if input is the same as object property
      // to display the right background image
      for(let i = 0; i < cityImages.length; i++) {
          if (cityImages[i].cityName == inputValue.value.toLowerCase()) {
              cityImage.innerHTML = '<img src="'+cityImages[i].img+'" alt=""/>';
              break;
          }
          else {
            cityImage.innerHTML = '<img src="images/default.svg" alt=""/>';
          }
      }
    });
}
