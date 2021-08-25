let quoteArray = [];
let index = 0; 
let textPosition = 0; 
let flag = true;

loadQuote = () => {  
  quoteArray[index] = 'Vacinar-se você DEV';
}

typewriter = () => {
  if(flag){
    loadQuote();
    quoteArray[index] += ""; 
    flag = false;
  }

  document.querySelector("#message").innerHTML = quoteArray[index].substring(0, textPosition) + '<span>\u25AE</span>';

  if(textPosition++ != quoteArray[index].length){
    setTimeout("typewriter()", 100);
  }
  else{
    quoteArray[index] = ' ';
    setTimeout("typewriter()", 4000);
    textPosition = 0;
    flag = true;
 }
 setTimeout(function(){ 
  // showme.innerText = 'teste';
}, 4000);
}
window.addEventListener('load', typewriter);


const showme = document.getElementById('showme');
const message = document.getElementById('message');
function showAll() {
  setTimeout(function(){ 
    showme.style.display = 'block';
    message.style.height = '10%';
    message.style.fontSize = '1.5em';
    message.style.paddingTop = '50px';
    message.style.alignItems = 'flex-start';
    message.style.position = 'absolute';
    message.style.alignSelf = 'center';    
    document.body.style.backgroundImage = "url('yoda.jpg')";
  }, 3000);
}

window.onload = () => {
  showAll();
}
const myData = [];

const preencherDados = (dados) => {
  dados.reduce((acc, dado) => {
    acc.push({
      [`${dado.Province}`]: {
        casos: dado.Confirmed,
        mortes: dado.Deaths,
      }
    })
    return acc;
  }, [])
}

async function getDataVaccine() {
  let requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  const myDados = fetch("https://api.covid19api.com/live/country/brazil/status/confirmed/date/2021-08-24T13:13:30Z", requestOptions)
    .then(response => response.json())
    .then((object) => preencherDados(object))
    .then(result => console.log(result))
    .catch(error => console.log('error', error));


    // province: {
    //   mortes: Deaths,
    //   casos: Confirmed,
    // }
}
getDataVaccine();
