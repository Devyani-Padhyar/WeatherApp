let aboutSection = document.querySelector("#about");
let mainbox = document.querySelector(".mainbox");
let similarSection = document.querySelector(".similar");

let h1 = document.querySelector("h1");
let homepageLink = document.querySelector("#homepage-link");
let aboutLink = document.querySelector("#about-link");
let similarAppsLink = document.querySelector("#similar-apps");

let navbtns = document.querySelectorAll(".navbtns");

let outputdef = document.querySelector(".output-box-default");
let getbtn = document.querySelector("#get-weather-btn");
let input = document.querySelector(".city-input");
let outputBox = document.querySelector(".output-box")

let cityName = document.querySelector("#city-name");
let outputContent = document.querySelector(".output-content");
let temp = document.querySelector("#temperature");
let weatherIcon = document.querySelector("#weather-icon");
let weatherDashboard = document.querySelector(".weather-dashboard");
let detailcard = document.querySelectorAll(".detail");
let similarout = document.querySelector(".similar-apps");

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
    similarout.style.display = "none";
    aboutSection.style.display = "none";
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
    if (input.value === "") {
        input.style.border = "2px solid red";
        input.setAttribute("placeholder", "Please enter a city name");
        input.classList.add("red-place");
    } else {
        cityName.textContent = input.value;
        outputdef.style.display = "none";
        input.setAttribute("placeholder", "Enter a city name");
        outputContent.style.display = "flex";
        input.style.border = "2px solid green";
        mainbox.classList.add("day-theme");
        outputBox.style.marginBottom = "3rem";
        input.classList.remove("red-place");

        // trigger animations on multiple elements
        triggerAnimation(cityName, "cityName");
        triggerAnimation(temp, "temp");
        detailcard.forEach((card) => {
            triggerAnimation(card, "cityName");
        });
        triggerAnimation(weatherIcon, "sunicon");
        // triggerAnimation(weatherDashboard,"weather-dash");
    }
    input.value = "";
}

function triggerAnimation(element, animationClass) {
    if (!element) return;
    element.classList.remove(animationClass);
    void element.offsetWidth; // reflow trick
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
