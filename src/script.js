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
function displayTemperature(response){
    console.log(response.data);
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
}

function search(city){
let apikey="6b80ac76c22967a49fc41e880624c2ce";
let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event){
    event.preventDefault();
    let cityentered=document.getElementById("cityentered");
    search(cityentered.value);
}

function showFahrenheitTemperature(event){
    event.preventDefault();
let temperature=document.getElementById("temperature");
    let fahrenheitTemperature=(celsiustemp*9)/5+32;
    temperature.innerHTML=Math.round(fahrenheitTemperature);
    
}
function showCelsiusTemperature(event){
    event.preventDefault();
let temperature=document.getElementById("temperature");
    
    temperature.innerHTML=Math.round(celsiustemp);  
}
let celsiustemp=null;
let form=document.getElementById("search");
form.addEventListener("submit",handleSubmit);

let fahrenheit=document.getElementById("fahrenheit");
fahrenheit.addEventListener("click", showFahrenheitTemperature);

let celsius=document.getElementById("celsius");
celsius.addEventListener("click",showCelsiusTemperature);