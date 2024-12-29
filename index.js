let searchInput = document.getElementById("searchInput")
let searchButton = document.getElementById("searchButton")
let weatherIcon = document.getElementById("weatherIcon")
let temperature = document.getElementById("temperature")
let city = document.getElementById("city")
let humidityPercent = document.getElementById("humidityPercent")
let windSpeed = document.getElementById("windSpeed")
let error = document.getElementById("error");
let weather = document.getElementById("weather");


const apiKey = "ca90307d091d6f5988d5ec6b0cd1a931"

let options = {
    method: "GET"
}

async function fetchWeatherDetails () {
    let userSearchedCity = searchInput.value
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${userSearchedCity}&appid=${apiKey}`
    const response = await fetch(apiUrl)
    
    if (response.ok) {
        weather.style.display = "block"
        error.style.display = "none"

        const jsonData = await response.json()
        city.textContent = userSearchedCity
        temperature.textContent = Math.round(jsonData.main.temp) + "*C"
        humidityPercent.textContent = jsonData.main.humidity + "%"
        windSpeed.textContent = jsonData.wind.speed + " km"

        if (jsonData.weather[0].main === "Clouds") {
            weatherIcon.src = "img/clouds.png"
        } else if (jsonData.weather[0].main === "Clear") {
            weatherIcon.src = "img/clear.png"
        } else if (jsonData.weather[0].main === "Rain") {
            weatherIcon.src = "img/rain.png"
        } else if (jsonData.weather[0].main === "Drizzle") {
            weatherIcon.src = "img/drizzle.png"
        } else if (jsonData.weather[0].main === "Mist") {
            weatherIcon.src = "img/mist.png"
        } else if (jsonData.weather[0].main === "Snow") {
            weatherIcon.src = "img/snow.png"
        }

        searchInput.value = ""
        
    } else {
        error.style.display = "block"
        weather.style.display = "none"
        searchInput.value = ""
    }

}

searchButton.addEventListener("click", () => {
    fetchWeatherDetails()
})

