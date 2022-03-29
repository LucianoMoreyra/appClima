//. capturar los elementos del DOM para luego modificarlos

let container = document.getElementById("container");
let searchForm = document.getElementById("search_submit");
let searchInput = document.getElementById("search_input");
let temperatureDegrees = document.getElementById("degreeNumber");
let weatherIcon = document.getElementById("weatherIcon");
let temperatureDescription = document.getElementById("description");
let timeZone =document.getElementById("timezone");
let date = document.getElementById("date");
let min = document.getElementById("min");
let max = document.getElementById("max");

// declaro funciones secundarias

const displayBackgroundImage = (obj)=>{
    //extraer la hora de el objeto que contiene los datos del tiempo
 //convertirlo a una hora que nosotros entendamos 
    let dateSpanish = new Date(obj.dt*1000).toLocaleString("es-Es" , {
        timeStyle: "short" ,
        dateStyle: "long"
    });
    console.log(dateSpanish)
    //manipular el dom para extraer esa hora 
    date.textContent = `Actualización ${dateSpanish}` 
    //extraer la hora 
    const dayHour = new Date(obj.dt*1000).getHours();
    console.log(dayHour)
    //logica
    if(dayHour >6 && dayHour<18){
        container.classList.remove("night");
        container.classList.add("day");
    }else{
        container.classList.remove("day");
        container.classList.add("night");
    }

}

const displayData = (obj)=>{
    console.log(obj);
    temperatureDegrees.textContent = Math.floor(obj.main.temp);
    const icon = obj.weather[0].icon;
    weatherIcon.innerHTML =  `<img src=  ${icon}.png></img>`
    min.textContent = Math.floor(obj.main.temp_min);
    max.textContent = Math.floor(obj.main.temp_max);
    temperatureDescription.textContent = obj.weather[0].description.charAt(0).toUpperCase()+
    obj.weather[0].description.slice(1);

}

//. declarar getWeatherDate 

const getWeatherDate = async (city)=> {
    //.hacer un request a la App y obtener un objeto con los datos 
    //fetch 
    const res = await fetch(`https://community-open-weather-map.p.rapidapi.com/weather?q=${city}&lang=sp&units=metric`, {
        
        "headers": {
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key": "cc07fe533bmsha8ff496d31ec6e3p1ce6fejsn7ddfc5546609"}})
            const data = await res.json();
            
    //.cambiar el fondo de pantalla segun sea dia o noche
    displayBackgroundImage(data);
    //.mostrar los datos en pantalla
    displayData(data);

}

searchForm.addEventListener("submit" , e=>{
    e.preventDefault();
   
    getWeatherDate(searchInput.value)
})

//. al cargar la pagina inmediatamente nos cargue una ciudad 

window.onload = ()=> {
    getWeatherDate();
}

