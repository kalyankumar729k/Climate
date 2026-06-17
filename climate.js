const btn=document.getElementById("btn");
const weather=document.getElementById("cont");
const err_msg=document.getElementById("err_m");
err_msg.style.color="red";
btn.addEventListener("click",()=>{
const city=document.getElementById("city").value.trim();
if(!city){ 
err_msg.style.color="red"
err_msg.innerText="Please Enter City name";
console.log("Please Enter City name")
document.getElementById("cont").style.display="none";
document.getElementById("forecast").innerHTML="";
}else{
console.log(city);
document.getElementById("city").value="";
getweather(city);
}
});
async function getweather(city){
  try{
const res=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=77b75c3776184c1095d73218260105&q=${city}&days=5`);
const data=await res.json();
console.log(data);
if(data.error){
err_msg.innerText=data.error.message;
document.getElementById("cont").innerHTML=""; 
document.getElementById("cont").style.display="none";
document.getElementById("forecast").innerHTML=""; 
}else{ 
document.getElementById("err_m").innerText="";
display(data)
}}catch(error){
err_msg.innerText="An error occurred while fetching the weather data.";
}}
function display(data){
weather.style.display="block";
weather.innerHTML=`<h2>${data.location.name},${data.location.country}</h2>
<h2>${data.current.temp_c}°C</h2>
<img src="https:${data.current.condition.icon}" alt="weather icon">
<h3>${data.current.condition.text}</h3>`;
display_forecast(data);
}
function display_forecast(data){
const f_c=document.getElementById("forecast")
let cards="";
data.forecast.forecastday.forEach((day, index)=>{
let label="";
if(index===0){
label="Today";
}
else if(index===1){
label="Tomorrow";
}else{
const dateObj=new Date(day.date);
label=dateObj.toLocaleDateString("en-GB",{weekday:"short"});
}
cards+=`<div class="card">on ${label}
<p>${day.day.mintemp_c}°C - ${day.day.maxtemp_c}°C</p>
<img src="https:${day.day.condition.icon}" alt="weather icon">
<h3>${day.day.condition.text}</h3>
</div>
`;
});
f_c.innerHTML=cards;
}
const curloc=document.getElementById("curloc");
curloc.addEventListener("click",()=>{
if(navigator.geolocation){
navigator.geolocation.getCurrentPosition(success,error);
}else{
alert("Geo Location not Supported")
}
});
function success(position){
const lat=position.coords.latitude;
const lon=position.coords.longitude;
getweather(`${lat},${lon}`);
}
function error(){
  err_msg.innerText="Unable to retrieve your location";
}