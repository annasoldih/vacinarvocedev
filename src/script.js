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

const myData = [];
async function getDataStates() {
  let requestOptions = { method: 'GET', redirect: 'follow' };
  let yesterday = getYesterday();
  const myDados = await fetch(`https://api.covid19api.com/live/country/brazil/status/confirmed/date/${yesterday}T13:13:30Z`, requestOptions)
  const myInfo = await myDados.json();
  myInfo.forEach(element => {
    myData[element.Province] = { state: element.Province, casos: element.Confirmed, mortes: element.Deaths, ativos: element.Active };
  });
  return myData;
}

const allCountries = [];
async function getDataCountries() {
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

const myGlobal = [];
async function getGlobal() {
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


const myIP = document.getElementById('myIP').innerText;
let myRegion = document.getElementById('myRegion').innerText;
const myCity = document.getElementById('myCity').innerText;
const myCountry = document.getElementById('myCountry').innerText;

myRegion = myRegion.replace(/á/g, "a");
myRegion = myRegion.replace(/ã/g, "a");
myRegion = myRegion.replace(/é/g, "e");
myRegion = myRegion.replace(/í/g, "i");
myRegion = myRegion.replace(/ô/g, "o");
myRegion = myRegion.replace(/ú/g, "u");

let quoteArray = [];
let index = 0;
let textPosition = 0;
let flag = true;

loadQuote = () => {
  quoteArray[index] = 'Vacinar-se você DEV';
}

typewriter = () => {
  if (flag) {
    loadQuote();
    quoteArray[index] += "";
    flag = false;
  }

  document.querySelector("#message").innerHTML = quoteArray[index].substring(0, textPosition) + '<span>\u25AE</span>';

  if (textPosition++ != quoteArray[index].length) {
    setTimeout("typewriter()", 100);
  }
  else {
    quoteArray[index] = ' ';
    setTimeout("typewriter()", 4000);
    textPosition = 0;
    flag = true;
  }

}
window.addEventListener('load', typewriter);


const showme = document.getElementById('showme');
const message = document.getElementById('message');
function showAll() {
  setTimeout(function () {
    showme.style.display = 'flex';
    showme.style.flexDirection = 'row';
    message.style.height = '10%';
    message.style.fontSize = '1.5em';
    message.style.paddingTop = '30px';
    message.style.marginBottom = '50px';
    message.style.alignItems = 'flex-start';
    message.style.position = 'absolute';
    message.style.alignSelf = 'center';
    document.body.style.backgroundImage = "url('yoda-right.jpg')";
  }, 4000);
}

const resp = document.getElementById('dadosApi');
async function fillData() {
  await getDataStates();
  await getDataCountries();
  await getGlobal();

  resp.innerText = loadGeneralData();
  selectedState.innerText = myRegion;
  selectedState.style.display = 'flex';
  selectedStateInfo.style.display = 'flex';
  selectedStateInfo.innerText = loadMyState(myRegion);
}

function getMe(clicked_id) {
  if (document.getElementById(clicked_id).classList.contains('in-br')) {
    selectedState.innerText = clicked_id;
    selectedState.style.display = 'flex';
    selectedStateInfo.style.display = 'flex';
    selectedStateInfo.innerText = getState(clicked_id);
  } else {
    selectedState.innerText = 'Você selecionou outro país: ' + clicked_id;
    selectedStateInfo.style.display = 'none';
  }
}

function getState(state) {
  return `Nesse Estado, o número de casos é de ${(myData[state].casos).toLocaleString()} e o número de fatalidades é de ${(myData[state].mortes).toLocaleString()}.`;
}

function loadGeneralData() {
  return `No Brasil, até a presente data, temos ${myGlobal['Global'].casos} casos confirmados da Covid-19, e somamos ${myGlobal['Global'].mortes} óbitos pela doença.`;
}

function loadMyState(state) {
  console.log(myIP);
  return `Vi aqui que seu IP é ${myIP}, e você está aqui: ${myCountry}, ${myRegion}, ${myCity}. Vou te mostrar os dados para sua região, ok?
  
  Na região (${myRegion}) o número de casos é de ${parseInt(myData[state].casos).toLocaleString()} e o número de fatalidades é de ${parseInt(myData[state].mortes).toLocaleString()}.
  `;
}

window.onload = () => {
  fillData();
  showAll();
}
