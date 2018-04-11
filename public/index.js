const makeRequest = function(url, callback) {
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
};

const requestComplete = function() {
  if(this.status !== 200) return;
  const jsonString = this.responseText;
  const countries = JSON.parse(jsonString);
  const firstCountry = countries[0];
  populateList(countries);
  countriesDropDown(countries);
  const savedCountry = JSON.parse(localStorage.getItem("savedCountry"));
  if(savedCountry !== null) {
    displayCountry(savedCountry);
  };
  selectCountry(countries);
  debugger;


}

const populateList = function(countries){
  const button = document.querySelector("#list-countries");
  button.addEventListener("click", function()
  {

    const ul = document.querySelector("#country-list");
    for(let country of countries) {
      let li = document.createElement("li");
      li.innerText = country.name;
      ul.appendChild(li);
    }
    });
  };

const countriesDropDown = function(countries) {
  const select = document.querySelector("#countryList");
  for(i = 0; i < countries.length; i++) {
    option = document.createElement("option");
    option.value = i;
    option.text = countries[i].name;
    select.add(option, null);
  }
}

const selectCountry = function(countries) {
  const select = document.querySelector("#countryList");
  select.addEventListener("change", function() {
    const country = countries[select.value];
    displayCountry(country);})
}

const displayCountry = function(country) {
  const select = document.querySelector("#countryList");
    const ulTagName = document.createElement("ul");
    ulTagName.innerText = country.name;
    const liTagPopulation = document.createElement("li");
    liTagPopulation.innerText = country.population;
    const liTagCapital = document.createElement("li");
    liTagCapital.innerText = country.capital;
    ulTagName.appendChild(liTagPopulation);
    ulTagName.appendChild(liTagCapital);
    const container = document.querySelector("#displayCountry");
    container.appendChild(ulTagName);
    stringToSave = JSON.stringify(country);
    // localStorage.setItem("savedCountry", stringToSave);
}

const app = function(){

  const url = "https://restcountries.eu/rest/v2/all";
  makeRequest(url, requestComplete);

}

window.addEventListener('load', app);
