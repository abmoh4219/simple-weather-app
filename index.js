// weather app

const weatherForm=document.querySelector(".weatherForm");
const cityInput=document.querySelector(".cityInput");
const card=document.querySelector(".card");
const apiKey="05664d301bbcf6af226f4b15d7487c9b";
weatherForm.addEventListener("submit",async event =>{

    event.preventDefault();
    const city=cityInput.value;

    if (city) {
    
        try {
            const weatherData=await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } 
        catch (error) {
            displayError(error);
        }

    } 
    else {
        displayError("Please enter a city");
    }
});




async function getWeatherData(city) {
    
    const apiUrl='https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+apiKey;
    const response= await fetch(apiUrl);
    
    if (!response.ok) {
        throw new Error("could not fetch weather data");
        
    }
    return await response.json();
    
}

function displayWeatherInfo(data){
    console.log(data);
    const{ name: city,
        main: {temp,humidity}, 
        weather: [{description,id}]}=data;
 
    card.textContent=""; 
    card.style.display="flex";

    const cityDisplay=document.createElement("h1");
    cityDisplay.textContent=city;
    cityDisplay.classList.add("cityDisplay");
    card.appendChild(cityDisplay);

    const tempDisplay=document.createElement("p");
    tempDisplay.textContent=(temp-273.15).toFixed(1)+"°C";
    tempDisplay.classList.add("tempDisplay");
    card.appendChild(tempDisplay);

    const humidityDisplay=document.createElement("p");
    humidityDisplay.textContent=humidity;
    humidityDisplay.classList.add("humidityDisplay");
    card.appendChild(humidityDisplay);

    const descDisplay=document.createElement("p");
    descDisplay.textContent=description;
    descDisplay.classList.add("descDisplay");
    card.appendChild(descDisplay);
    const weatherEmoji=document.createElement("p");
    weatherEmoji.textContent=getWeatherEmoji(id);
    weatherEmoji.classList.add("weatherEmoji");
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId){
    switch (true) {
        case(weatherId>=200 && weatherId<300):
            return "🌧️";
            
        case(weatherId>=300 && weatherId<400):
            return "🌧️";
        
        case(weatherId>=500 && weatherId<600):
            return "🌧️";
            
        case(weatherId>=600 && weatherId<700):
            return "❄️";
        
        case(weatherId>=700 && weatherId<800):
            return "🌫️";
        case(weatherId==800):
            return "☀️";
        case(weatherId>=801 && weatherId<810):
            return "☁️";
        default:
            return "❓";
    }
}

function displayError(message){
    const errorDisplay=document.createElement("p");
    errorDisplay.textContent=message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent="";
    card.style.display="flex";
    card.appendChild(errorDisplay);

  
}


/*   <h1 class="cityDisplay">Miami</h1> 
        <p class="tempDisplay">90°F</p>
        <p class="humidityDisplay">Humidity: 75%</p>
        <p class="descDisplay">Clear Skies</p>
        <p class="weatherEmoji">🌞</p>
        <p class="errorDisplay"> Please enter a city</p>
*/















