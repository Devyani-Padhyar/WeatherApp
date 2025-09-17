let aboutSection = document.querySelector("#about");
let mainbox = document.querySelector(".mainbox");
let similarSection = document.querySelector(".similar");

let h1 = document.querySelector("h1");
let homepageLink = document.querySelector("#homepage-link");
let aboutLink = document.querySelector("#about-link");
let similarAppsLink = document.querySelector("#similar-apps");

let navbtns = document.querySelectorAll(".navbtns");
let defh = document.querySelector(".default-h")
let outputdef = document.querySelector(".output-box-default");
let getbtn = document.querySelector("#get-weather-btn");
let input = document.querySelector(".city-input");
let outputBox = document.querySelector(".output-box")
let defpara = document.querySelectorAll(".defpara")

let cityName = document.querySelector("#city-name");
let outputContent = document.querySelector(".output-content");
let temp = document.querySelector("#temperature");
let weatherIcon = document.querySelector("#weather-icon");
let weatherDashboard = document.querySelector(".weather-dashboard");
let detailcard = document.querySelectorAll(".detail");
let similarout = document.querySelector(".similar-apps");
let city;

let feellike = document.querySelector("#feels-like")
let humidity = document.querySelector("#humidity")
let windspeed = document.querySelector("#wind")
let cloud = document.querySelector("#clouds")
let condition = document.querySelector("#condition")
let timezoneOffset;

aboutLink.addEventListener("click", () => {
    mainbox.style.display = "none";
    similarout.style.display = "none";
    similarSection.style.display = "none";
    aboutSection.style.display = "block";

    document.body.style.background = "#ffffffff";
    h1.classList.add("h1-abt");
    h1.classList.remove("h1-sim");
    navbtns.forEach((btn) => {
        console.log(btn);
        btn.classList.remove("nav-link-sim");
        btn.classList.add("nav-link-abt");
    })
});

homepageLink.addEventListener("click", () => {
    similarSection.style.display = "none";
    aboutSection.style.display = "none";
    similarout.style.display = "none";
    mainbox.style.display = "flex";

    document.body.style.background = "rgb(186, 235, 255)";
    h1.classList.remove("h1-abt");
    h1.classList.remove("h1-sim");
    navbtns.forEach((btn) => {
        btn.classList.remove("nav-link-abt");
        btn.classList.remove("nav-link-sim");
    })
})

function inputValidation() {
    let city = input.value.trim();
    if (input.value === "") {
        input.style.border = "2px solid red";
        input.setAttribute("placeholder", "Please enter a city name");
        input.classList.add("red-place");
    } else {
        defh.textContent = "Loading..."
        outputdef.style.display = "block"
        defpara.forEach((p) => {
            p.style.visibility = "hidden";
        })
        weatherDashboard.style.display = "none"

        setTimeout(() => {
            fetchWeather(city);
            input.setAttribute("placeholder", "Enter a city name");
            outputContent.style.display = "flex";
            input.style.border = "2px solid green";
            input.classList.remove("red-place");
        }, 500);
    }
    input.value = "";
}

function triggerAnimation(element, animationClass) {
    if (!element) return;
    element.classList.remove(animationClass);
    void element.offsetWidth;
    element.classList.add(animationClass);

    element.addEventListener("animationend", () => {
        element.classList.remove(animationClass);
    }, { once: true });
}

getbtn.addEventListener("click", () => {
    inputValidation();
})

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        getbtn.click();
    }
});

similarAppsLink.addEventListener("click", () => {
    aboutSection.style.display = "none";
    mainbox.style.display = "none";
    similarout.style.display = "flex";
    similarSection.style.display = "block";

    document.body.style.background = "#8cd7ffff";
    h1.classList.add("h1-sim");
    h1.classList.remove("h1-abt");
    navbtns.forEach((btn) => {
        console.log(btn);
        btn.classList.remove("nav-link-abt");
        btn.classList.add("nav-link-sim");
    })
})

function getLocalDateTime(timezoneOffset) {
    // Current UTC time in milliseconds
    let utc = Date.now() + new Date().getTimezoneOffset() * 60000;
    // Apply city’s timezone offset
    let cityTime = new Date(utc + timezoneOffset * 1000);

    let date = cityTime.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });

    let time = cityTime.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
    });

    let day = cityTime.toLocaleDateString("en-IN", { weekday: "short" });
    return { date, time, day };
}

function getCustomIcon(condition) {
    const icons = {
        Clear: "https://cdn-icons-png.flaticon.com/512/6974/6974833.png",
        Clouds: "https://cdn-icons-png.flaticon.com/512/414/414825.png",
        Rain: "https://cdn-icons-png.flaticon.com/512/1163/1163624.png",
        Drizzle: "https://cdn-icons-png.flaticon.com/512/1163/1163624.png",
        Thunderstorm: "https://cdn-icons-png.flaticon.com/512/1146/1146860.png",
        Snow: "https://cdn-icons-png.flaticon.com/512/642/642102.png",
        Mist: "https://cdn-icons-png.flaticon.com/512/1197/1197102.png",
        Haze: "https://cdn-icons-png.flaticon.com/512/1197/1197102.png",
        Fog: "https://cdn-icons-png.flaticon.com/512/1197/1197102.png",
    };
    return icons[condition] || "https://cdn-icons-png.flaticon.com/512/869/869869.png"; // default
}

function fetchWeather(city) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6631bae0a395aa22f6a940e7ad648a45&units=metric`
    let a = fetch(url)

    a.then((val) => {
        return val.json();
    }).then((val) => {
        weatherDashboard.style.display = "block";
        outputdef.style.display = "none";
        defh.textContent = "Welcome to Weather Go!"
        console.log(val);
        cityName.textContent = capitalize(city)
        triggerAnimation(cityName, "cityName");
        triggerAnimation(temp, "temp");
        detailcard.forEach((card) => {
            triggerAnimation(card, "cityName");
        });
        triggerAnimation(weatherIcon, "sunicon");

        temp.textContent = `${Math.floor(val.main.temp)}°C`;
        feellike.textContent = `${Math.floor(val.main.feels_like)}°C`;
        humidity.textContent = `${val.main.humidity}%`;
        windspeed.textContent = `${val.wind.speed} m/s`;
        cloud.textContent = `${val.clouds.all}%`;
        condition.textContent = val.weather[0].main;

        timezoneOffset = val.timezone;
        getLocalDateTime(timezoneOffset);
        let { date, time, day } = getLocalDateTime(timezoneOffset);
        document.querySelector("#day").textContent = day;
        document.querySelector("#date").textContent = date;
        document.querySelector("#time").textContent = time;

        let conditionweather = val.weather[0].main;
        weatherIcon.src = getCustomIcon(conditionweather);
        weatherIcon.alt = conditionweather;
    }).catch((err) => {
        defh.textContent = "Invalid city name..."
        outputdef.style.display = "block";
        weatherDashboard.style.display = "none";
        defpara.forEach((p) => {
            p.style.visibility = "visible";
        })
        console.log("error occured invalid city name...")
    })
}

function capitalize(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
