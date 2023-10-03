//btn variable
const btn = document.querySelector("button");
const btnReset = document.querySelector(".reset");

btn.addEventListener("click", () => {
    //if the browser supports the geolocation API
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);

    }else{

        alert('Geolocation is not supported by your Browser');
        btn.innerText = "Browser Does Not Support Geolocation"
    }
})

btnReset.addEventListener("click", () => {
    location.reload();
})



const onSuccess = (position) => {
    btn.innerText = "Detecting Your Location.....";
    let{latitude, longitude} = position.coords;
    let apiKey = '138a1657c35040a79d6d4d4b620b24cc'
    let url = 'https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=138a1657c35040a79d6d4d4b620b24cc';

    async function actualLocation(){
        let response = await fetch(url);
        //console.log(response);
        let data = await response.json();
        console.log(data);
        let dataLoc = data.results;
        let allDetails = dataLoc[0].components
        let {county, postcode, country} = allDetails;
        console.log(county, postcode, country);
        btn.innerText = `${county},${postcode},${country} `
    }
    actualLocation();
};

const onError = (error) => {
   if (error.code == 1) //If user Denied Location Request
   {
    btn.innerText = "You Denied The Location API request"
   } else if(error.code == 2) //If location is not available.
   {
    btn.innerText = "Location Not Available"
   }else{
    btn.innerText = "Something Went Wrong :-("
   }

   btn.setAttribute("disabled", "true");
};