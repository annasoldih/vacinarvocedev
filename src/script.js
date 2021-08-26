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
  setTimeout(function () {
    // showme.innerText = 'teste';
  }, 4000);
}
window.addEventListener('load', typewriter);


const showme = document.getElementById('showme');
const message = document.getElementById('message');
function showAll() {
  setTimeout(function () {
    showme.style.display = 'block';
    message.style.height = '10%';
    message.style.fontSize = '1.5em';
    message.style.paddingTop = '50px';
    message.style.alignItems = 'flex-start';
    message.style.position = 'absolute';
    message.style.alignSelf = 'center';
    document.body.style.backgroundImage = "url('yoda-right.jpg')";
  }, 10);
}


const resp = document.getElementById('dadosApi');
const myData = [];

let mortesBR = 0;
let casosBR = 0;
async function getDataVaccine() {
  let requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  const myDados = await fetch("https://api.covid19api.com/live/country/brazil/status/confirmed/date/2021-08-24T13:13:30Z", requestOptions)
  const myInfo = await myDados.json();
  myInfo.forEach(element => {
    myData[element.Province] = { state: element.Province, casos: element.Confirmed, mortes: element.Deaths };
    mortesBR += element.Deaths;
    casosBR += element.Confirmed;
  });
  console.log(myData);
  mortesBR = parseInt(mortesBR).toLocaleString();
  casosBR = parseInt(casosBR).toLocaleString();

  resp.innerText = `No Brasil, até a presente data, temos ${casosBR} casos confirmados da Covid-19, e somamos ${mortesBR} óbitos pela doença.`
}

function getMe(clicked_id) {
  if (document.getElementById(clicked_id).classList.contains('in-br')) {
    selectedState.innerText = clicked_id;
    selectedState.style.display = 'flex';
    selectedStateInfo.style.display = 'flex';
    selectedStateInfo.style.display = 'flex';
    selectedStateInfo.innerText = getState(clicked_id);
  } else {
    selectedState.innerText = 'Você selecionou outro país: ' + clicked_id;
    selectedStateInfo.style.display = 'none';
  }
}

function getState(state) {
  return `Nesse Estado, o número de casos é de ${parseInt(myData[state].casos).toLocaleString()} e o número de fatalidades é de ${parseInt(myData[state].mortes).toLocaleString()}`;
}

window.onload = () => {
  showAll();
  getDataVaccine();
}
