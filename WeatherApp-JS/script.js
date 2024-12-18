const locationInput = document.querySelector(".location");
const searchBtn = document.getElementById("search");
const weatherImg = document.getElementById("weatherImg");
const temperature = document.getElementById("temp");
const weatherDesc = document.getElementById("weatherDesc");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");

const notFoundSection = document.querySelector(".city-not-found");
const weatherBody = document.querySelector(".weather-body");

// Create a loader element dynamically
const loader = document.createElement("div");
loader.className = "loader";
loader.style.textAlign = "center";
loader.style.fontSize = "2rem";
loader.textContent = "Loading...";

function showLoader() {
    weatherBody.style.display = 'none';
    notFoundSection.style.display = 'none';
    document.body.appendChild(loader);
}


function hideLoader(success) {
    document.body.removeChild(loader);
    if (success) {
        weatherBody.style.display = 'flex'; // Show weather details
    }
}


async function checkWeatherByCityName(city){
    const apiKey = "6b8c1a777d9e9854758739c3b9003195";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    let fetchSuccess = false;

    try{
        showLoader();

        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        
        const weatherDetails = await response.json();
        fetchSuccess = true; // Fetch was successful
        
        weatherBody.style.display = 'flex';
        notFoundSection.style.display = 'none'; 

        console.log(Math.round(weatherDetails.main.temp - 273.15));
        temperature.innerHTML = `${Math.round(weatherDetails.main.temp - 273.15)}°C`;
        weatherDesc.innerHTML = weatherDetails.weather[0].description;
        humidity.innerHTML = `${weatherDetails.main.humidity}%`;
        windSpeed.innerHTML = `${weatherDetails.wind.speed}Km/H`;

        // Update weather image
        const condition = weatherDetails.weather[0].main;
        const weatherIcons = {
            Clouds: "/assets/cloud.png",
            Clear: "/assets/clear.png",
            Mist: "/assets/mist.png",
            Rain: "/assets/rain.png",
            Snow: "/assets/snow.png",
        };
        weatherImg.src = weatherIcons[condition] || "/assets/clear.png";

    } catch (error){
        fetchSuccess = false; 
        notFoundSection.style.display = 'flex';
        weatherBody.style.display = 'none';
        console.error("Error fetching weather data:", error);
    } finally {
        hideLoader(fetchSuccess);
    }
};

searchBtn.addEventListener('click',()=>{
    if (!locationInput.value.trim()){
        alert("Please enter a location");
    }else{
    checkWeatherByCityName(locationInput.value);
    }
});