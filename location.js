document.addEventListener("DOMContentLoaded", () => {
  const myGlobals = {
    alertBox : document.querySelector("#alertBox"),
    getWeatherButton : document.querySelector("#weatherBtn"),
    getLocationButton : document.querySelector("#locationBtn"),
    formActionCore : "https://fcc-weather-api.glitch.me/api/current?",
    formActionPostfix : "",
    formAction : "",
    latitude : "",
    longitude : "",
    form: document.querySelector("form"),
    weatherInfo: document.querySelector("#weatherInfo"),
    response: null
  };


  const setFormAction = () => {
    myGlobals.formActionPostfix = "lat=" + myGlobals.latitude + "&lon=" + myGlobals.longitude;
    myGlobals.formAction = myGlobals.formActionCore.concat(myGlobals.formActionPostfix);
    console.log(myGlobals.formAction);
  };
  const makeWeatherAPICall = (url) => {
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", url, true);
    httpRequest.send();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if(httpRequest.status === 200) {
          myGlobals.weatherInfo.innerHTML = "";
          myGlobals.response = httpRequest.responseText;
          console.log(myGlobals.response);

        }
        else {
          myGlobals.weatherInfo.innerHTML = "Ups! Something went wrong..";
        }
      } else {
        // Not ready yet
      	myGlobals.weatherInfo.innerHTML = "connecting to weather service...";
      }

    }
  };
  const getLocation = () => {
    if("geolocation" in navigator) {
      myGlobals.alertBox.innerHTML = "reading user location...";
      navigator.geolocation.getCurrentPosition(geo_success, geo_error);
    } else {
      myGlobals.alertBox.innerHTML = '<h3 style="color: red;">Geolocation is not supported.</h3>';
    }
  }
  const geo_success = (position) => {
    myGlobals.latitude = position.coords.latitude;
    myGlobals.longitude = position.coords.longitude;
    myGlobals.alertBox.innerHTML = "All set, you can check the weather now";
    myGlobals.getWeatherButton.removeAttribute("disabled");
    setFormAction();
  };
  const geo_error = (error) => {
    myGlobals.alertBox.innerHTML = '<p class="lead" style="color: red;">Error: ' + error.code + '<br>' + error.message + '</p>';
  }
  const showLocation = () => {
    console.log("showLocation() running");

    console.log("lat = " + myGlobals.latitude + ", lon = " + myGlobals.longitude);
  };
  myGlobals.getLocationButton.addEventListener("click", () => {
    getLocation();
  });
  myGlobals.getWeatherButton.addEventListener("click", () => {
    showLocation();
    makeWeatherAPICall(myGlobals.formAction);

  });

});