const getWeather = document.getElementById('getWeather');

async function afficherMeteo(city) {

  /* Prise des positions géographique en fonction de la ville choisie */

    const reponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=93d4b6f3efe84db8917fabfc6503b9f8`);
    const weatherData = await reponse.json();

    console.log(weatherData);

  /* Prise des données géographique */

    const reponse2 = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${weatherData[0].lat}&lon=${weatherData[0].lon}&lang=fr&units=metric&appid=93d4b6f3efe84db8917fabfc6503b9f8`);
    const weatherData2 = await reponse2.json();

    console.log(weatherData2);

  /* Prise information de la date */

    let dateGlobale = new Date();

    let annee = dateGlobale.getFullYear();
    let mois = dateGlobale.getMonth();
    let jour = dateGlobale.getDate();
    let jour_semaine = dateGlobale.getDay();

    let MOIS = [ "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre" ];
    let JOUR_SEMAINE = [ "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi" ];

    mois = MOIS[mois];
    jour_semaine = JOUR_SEMAINE[jour_semaine];

  /* Fin information de la date */

    const showWeather = document.querySelector(`#getWeatherData`);
    const HTMLString = `
    <div class="showWeather">
      <div class="datePosition">
        <h2>${jour_semaine}</h2>
        <h3>${jour} ${mois} ${annee}</h3>
        <h3><i class="fa-solid fa-location-dot"></i> ${weatherData[0].name}, ${weatherData[0].country}</h3>
      </div>
        <img src="https://openweathermap.org/img/wn/${weatherData2.weather[0].icon}@2x.png"/>
        <h1 class="spaceBetween">${weatherData2.main.temp}°C</h1>
        <h2 class="spaceBetween">${weatherData2.weather[0].description}</h2>
        <!-- <h2>Vent : ${weatherData2.wind.speed} m/s</h2> -->
    </div>
    `;
    showWeather.innerHTML = HTMLString;

  /* Changement du css en fonction des datas */

  const element = document.querySelector('.showWeather');

  const iconData = "50d"/*weatherData2.weather[0].icon*/;

  element.style.backgroundImage = `url("./img/${iconData}_card_background.jpg")`;

  /* Fin changement du css en fonction des datas */

}

/* Evenement quand le button est cliqué */

getWeather.addEventListener("click", () => {

    const cityName = document.getElementById('city').value;

    if (cityName == "") {
      window.alert("Veuillez mettre une ville !");
    } else {
      afficherMeteo(cityName);
    }
});

/* Fin Evenement quand le button est cliqué */

/* Evenement quand l'utilisateur appuie sur ça touche entrer */

document.getElementById("city").addEventListener("keyup", function(event) {

  if (event.key === "Enter") {

    const cityName = document.getElementById('city').value;
    
    if (cityName == "") {
      window.alert("Veuillez mettre une ville !")
    } else {
      afficherMeteo(cityName);
    }
  }
});

/* Fin evenement quand l'utilisateur appuie sur ça touche entrer */