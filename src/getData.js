import { myData, allCountries, myGlobal } from "./script.js";

function getYesterday() {
  let today = new Date();
  let yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  let dd = String(yesterday.getDate()).padStart(2, '0');
  let mm = String(yesterday.getMonth() + 1).padStart(2, '0');
  let yyyy = yesterday.getFullYear();
  yesterday = `${yyyy}-${mm}-${dd}`;
  return yesterday;
}

export async function getDataStates() {
  let requestOptions = { method: 'GET', redirect: 'follow' };
  let yesterday = getYesterday();
  const myDados = await fetch(`https://api.covid19api.com/live/country/brazil/status/confirmed/date/${yesterday}T13:13:30Z`, requestOptions)
  const myInfo = await myDados.json();
  myInfo.forEach(element => {
    myData[element.Province] = { state: element.Province, casos: element.Confirmed, mortes: element.Deaths, ativos: element.Active };
  });
  return myData;
}

export async function getDataCountries() {
  let requestOptions = { method: 'GET', redirect: 'follow' };
  const myDados = await fetch(`https://api.covid19api.com/summary`, requestOptions)
  const myInfo = await myDados.json();
  const myCountries = myInfo.Countries;
  myCountries.forEach(element => {
    allCountries[element.Country] = {
      cod: element.CountryCode,
      pais: element.Country,
      casos: parseInt(element.TotalConfirmed).toLocaleString(),
      mortes: parseInt(element.TotalDeaths).toLocaleString()
    };
  });
  return allCountries;
}

export async function getGlobal() {
  let requestOptions = { method: 'GET', redirect: 'follow' };
  const myDados = await fetch(`https://api.covid19api.com/summary`, requestOptions)
  const myInfo = await myDados.json();
  const myGloball = myInfo.Global;
  myGlobal['Global'] = {
      casos: parseInt(myGloball.TotalConfirmed).toLocaleString(),
      mortes: parseInt(myGloball.TotalDeaths).toLocaleString()
    };
  return myGloball;
}

