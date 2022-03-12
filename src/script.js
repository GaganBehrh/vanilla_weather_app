
// function for calculation of time and date next to search box
function formatdate(timestamp){
    //calculate time and date
    let date=new Date(timestamp);
    let hours=date.getHours();
    if(hours<10){
        hours="0"+hours;
    }
    let minutes=date.getMinutes();
    if(minutes<10){
        minutes="0"+minutes;
    }
    let days=["Sun","Mon","Tue","Wed", "Thu","Fri","Sat"];
    let day=days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

//function for calculation for forecast day calculataion
function formatDay(timestamp){
    let date= new Date(timestamp*1000);
    let day=date.getDay();
    let days=["Sun","Mon","Tue","Wed", "Thu","Fri","Sat"];
    return days[day];
}
// function to disply forecast and html integrated
function displayforecast(response){
    let forecastresponse=response.data.daily;
    console.log(forecastresponse);
  let forecast=document.getElementById("forecast");
    
    //let days=["Sun","Mon"];
     let forecastHTML=`<div class="row">`;
    //let days=["Sun","Mon","Tue","Wed","Thu","Fri"];
forecastresponse.forEach(function(forecastresponse, index){
    if(index<6){
    forecastHTML+=
`<div class="col-2">
        <div id="day">${formatDay(forecastresponse.dt)}</div>
        <img src="http://openweathermap.org/img/wn/${
            forecastresponse.weather[0].icon}@2x.png" width="60px" alt>
        <div>
        <span id="max-temp">${Math.round(forecastresponse.temp.max)}<sup>o</sup>C</span>
        <span id="min-temp">${Math.round(forecastresponse.temp.min)}<sup>o</sup>C</span></div>
</div>`;    
}});

    forecastHTML+=`</div>`; 
     forecast.innerHTML=forecastHTML;
}

//function to get api from openweathermap api for the forecats with lat and long coming from cityapi
function getForecast(coord){
    console.log(coord);
    let apikey="6b80ac76c22967a49fc41e880624c2ce";
    let apiUrl=`https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&appid=${apikey}&units=metric`;
    console.log(apiUrl);
    axios.get(apiUrl).then(displayforecast);
}


function displayTemperature(response){
    console.log(response.data);
    celsiustemp=response.data.main.temp;
    console.log( celsiustemp);
    let temperature=document.getElementById("temperature");
  temperature.innerHTML=Math.round(response.data.main.temp);
    let city=document.getElementById("city");
    city.innerHTML=response.data.name;
    let description=document.getElementById("description");
    description.innerHTML=response.data.weather[0].description.toUpperCase();
      let humidity=document.getElementById("humidity");
    humidity.innerHTML=response.data.main.humidity+"%";
let wind=document.getElementById("wind");
    wind.innerHTML=Math.round(response.data.wind.speed)+"Km/h";
    let date=document.getElementById("date");
date.innerHTML=formatdate(response.data.dt*1000);
    let icon=document.getElementById("icon");
    icon.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);       
getForecast(response.data.coord);
}
// function to get the cityapi from openweathermap

function search(city){
let apikey="6b80ac76c22967a49fc41e880624c2ce";
let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
}

// function to get the value of entered city
function handleSubmit(event){
    event.preventDefault();
    let cityentered=document.getElementById("cityentered");
    search(cityentered.value);
}
/*
function showFahrenheitTemperature(event){
    event.preventDefault();
let temperature=document.getElementById("temperature");
    let fahrenheitTemperature=(celsiustemp*9)/5+32;
    temperature.innerHTML=Math.round(fahrenheitTemperature);
    
}*/
// function to add celsius temp
function showCelsiusTemperature(event){
    event.preventDefault();
let temperature=document.getElementById("temperature");
    temperature.innerHTML=Math.round(celsiustemp);  
}


// variable declaration and addevent listened function calling
let celsiustemp=null;
let form=document.getElementById("search");
form.addEventListener("submit",handleSubmit);

//let fahrenheit=document.getElementById("fahrenheit");
//fahrenheit.addEventListener("click", showFahrenheitTemperature);

//let celsius=document.getElementById("celsius");
//celsius.addEventListener("click",showCelsiusTemperature);