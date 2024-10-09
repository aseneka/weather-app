const key ='4a3e3c2adafa3e4ca7433cbd12269546';
const Url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const search = document.querySelector('.search input');
const btn = document.querySelector('.search button');
const icon = document.querySelector('.icon');

async function checkWeather(city){
    try{
        const response = await fetch (Url + city +  `&appid=${key}`);
        if (!response.ok){
            throw new Error('City not found');
        }
        const data = await response.json();
        console.log(data);
        
    document.querySelector('.description').innerHTML = data.weather[0].description;
    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = data.main.temp.toFixed(1) + '°C';
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
    document.querySelector('.wind').innerHTML = data.wind.speed + ' Km/h';

    let condition = data.weather[0].main.toLowerCase();

    switch (condition){
        case 'clouds':
            icon.src = 'images/clouds.png';
            break;
        case 'clear':
            icon.src = 'images/clear-sky.png';
            break;
        case 'rain':
            icon.src = 'images/rain.png';
            break;
        case 'fog':
            icon.src = 'images/fog.png';
            break;
        case 'drizzle':
            icon.src = 'images/drizzle.png';
            break;
        case 'mist':
            icon.src = 'images/mist.png';
            break;
        default:
            icon.src = "images/thermometer.png";
    }

    document.querySelector('.weather').style.display = 'block';
    } catch(error){
        alert('Error fetching weather data:' + error.message);
    }

}


btn.addEventListener('click', () =>{
    checkWeather(search.value);
});

search.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkWeather(search.value);
    }
});

