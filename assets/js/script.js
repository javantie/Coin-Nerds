var logoDisplayEl = document.getElementById("logo");
var currentPriceEl = document.getElementById("current-price");
var marketCapEl = document.getElementById("market-cap");
var priceChange24El = document.getElementById("price-chng-24")
var priceChange1El = document.getElementById("price-chng-1")
var volumeEl = document.getElementById("volume")
var dailyvolumeEl = document.getElementById("daily-volume")
var currentSupplyEl = document.getElementById("current-supply")
var dayHighEl = document.getElementById("day-high")
var dayLowEl = document.getElementById("day-low")


var searhInput = document.getElementById("input-area");
var searchButtonEl = document.getElementById("search-btn");
tick = "ETH";
var API_Base =
  "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" +
  tick +
  "&tsyms=USD";
var API_Key =
  "&api_key=47c595746df319744dafc11abb6db295cfe1ca9e302bec40e6c5a038f1a494da";

///Crypto Cpmare API
fetch(API_Base + API_Key)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    console.log(data.DISPLAY.ETH.USD.PRICE);


currentPriceEl.textContent = "PRICE: " + data.DISPLAY.ETH.USD.PRICE
marketCapEl.textContent = "MARKET CAP: " + data.DISPLAY.ETH.USD.MKTCAP
priceChange24El.textContent = "PRICE CHANGE 24-HR: " + data.DISPLAY.ETH.USD.CHANGEPCT24HOUR + "%"
priceChange1El.textContent = "PRICE CHANGE 1-HR "  + data.DISPLAY.ETH.USD.CHANGEPCTHOUR + "%";
volumeEl.textContent = "VOLUME: " + data.DISPLAY.ETH.USD.VOLUMEDAYTO;
dailyvolumeEl.textContent = "DAILY VOLUME " + data.DISPLAY.ETH.USD.VOLUMEDAYTO;
currentSupplyEl.textContent = "OPEN PRICE: " + data.DISPLAY.ETH.USD.OPENDAY;
dayHighEl.textContent =  "DAILY HIGH: " + data.DISPLAY.ETH.USD.HIGHDAY;
dayLowEl.textContent =  "DAILY LOW : " + data.DISPLAY.ETH.USD.LOWDAY;
var img = document.createElement("img");
img.setAttribute("src",  API_Base + "/media/37746238/eth.png")
logoDisplayEl.append(img);
console.log(img);
   








    //button for event
    // searchButtonEl.addEventListener("click", function (event) {
    //   event.preventDefault();
    //   tick = inputField.value;
    //   console.log(tick);
    //   if (tick === "") {
    //     alert("Please enter a valid Ticker Symbol");
    //   } else {
    //     getSearchData();
    //   }
    // });
  });





// //Coin Pakrika API #2
// fetch("https://api.coinlore.net/api/tickers/?start=100&limit=100")
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//    console.log(data);
//   });
// //Coin Pakrika API #2
//   fetch("https://api.coinlore.net/api/coin/markets/?id=90")
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//    console.log(data);
//   });

//   ///Redit API
//   fetch("https://dashboard.nbshare.io/api/v1/apps/reddit")
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//    console.log(data);
//   });
