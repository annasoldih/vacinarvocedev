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
const paises = document.getElementById('listapaises');

const allCountries = [];
async function getDataCountries() {
  let requestOptions = { method: 'GET', redirect: 'follow' };
  const myDados = await fetch(`https://api.covid19api.com/summary`, requestOptions)
  const myInfo = await myDados.json();
  const myCountries = myInfo.Countries;
  await myCountries.forEach(element => {
    const pais = document.createElement('option');
    allCountries[element.Country] = {
      cod: element.CountryCode,
      pais: element.Country,
      casos: parseInt(element.TotalConfirmed).toLocaleString(),
      mortes: parseInt(element.TotalDeaths).toLocaleString()
    };
    pais.value = element.Country;
    pais.innerText = element.Country;
    pais.name = 'paises';
    pais.className = 'optionPais';
    paises.appendChild(pais);
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

const infoPais = document.getElementById('infoPais');
function getCountry() {
  let element = paises.value;
  infoPais.innerText = `${paises.value}: Nesse pa??s, o total de casos confirmados ?? de ${allCountries[element].casos} e o total de mortes ?? de ${allCountries[element].mortes}.`;
}
paises.addEventListener('change', getCountry);


const myIP = document.getElementById('myIP').innerText;
let myRegion = document.getElementById('myRegion').innerText;
const myCity = document.getElementById('myCity').innerText;
const myCountry = document.getElementById('myCountry').innerText;

myRegion = myRegion.replace(/??/g, "a");
myRegion = myRegion.replace(/??/g, "a");
myRegion = myRegion.replace(/??/g, "e");
myRegion = myRegion.replace(/??/g, "i");
myRegion = myRegion.replace(/??/g, "o");
myRegion = myRegion.replace(/??/g, "u");

let quoteArray = [];
let index = 0;
let textPosition = 0;
let flag = true;

loadQuote = () => {
  quoteArray[index] = 'Vacinar-se voc?? DEV';
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
    selectedState.innerText = 'Voc?? selecionou outro pa??s: ' + clicked_id;
    selectedStateInfo.style.display = 'none';
  }
}

function getState(state) {
  return `Nesse Estado, o n??mero de casos ?? de ${(myData[state].casos).toLocaleString()} e o n??mero de fatalidades ?? de ${(myData[state].mortes).toLocaleString()}.`;
}

function loadGeneralData() {
  return `No Brasil, at?? a presente data, temos ${myGlobal['Global'].casos} casos confirmados da Covid-19, e somamos ${myGlobal['Global'].mortes} ??bitos pela doen??a.`;
}

function loadMyState(state) {
  console.log(myIP);
  return `Vi aqui que seu IP ?? ${myIP}, e voc?? est?? aqui: ${myCountry}, ${myRegion}, ${myCity}. Vou te mostrar os dados para sua regi??o, ok?
  
  Na regi??o (${myRegion}) o n??mero de casos ?? de ${parseInt(myData[state].casos).toLocaleString()} e o n??mero de fatalidades ?? de ${parseInt(myData[state].mortes).toLocaleString()}.
  `;
}

window.onload = () => {
  fillData();
  showAll();
}
