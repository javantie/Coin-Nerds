var logoDisplayEl = document.getElementById("logo");
var currentPriceEl = document.getElementById("current-price");
var marketCapEl = document.getElementById("market-cap");
var priceChange24El = document.getElementById("price-chng-24");
var priceChange1El = document.getElementById("price-chng-1");
var volumeEl = document.getElementById("volume");
var dailyvolumeEl = document.getElementById("daily-volume");
var openPriceEl = document.getElementById("open-price");
var dayHighEl = document.getElementById("day-high");
var dayLowEl = document.getElementById("day-low");
var searchInput = document.getElementById("input-area");
var searchButtonEl = document.getElementById("search-btn");
var dataContainerEl = document.getElementById("data-container");
var newDataContainerEl = document.getElementById("new-data-container");
var dataDisplay = document.getElementById("data-display");
var API_Base =
  "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC&tsyms=USD";
var API_Key =
  "&api_key=47c595746df319744dafc11abb6db295cfe1ca9e302bec40e6c5a038f1a494da";

///------CRYPTO-COMPARE API DATA USED TO PRESENT DATA FOR CURRENT BITCOIN INFO.-----/////
fetch(API_Base + API_Key)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    currentPriceEl.textContent = "PRICE: " + data.DISPLAY.BTC.USD.PRICE;
    marketCapEl.textContent = "MARKET CAP: " + data.DISPLAY.BTC.USD.MKTCAP;
    priceChange24El.textContent =
      "PRICE CHANGE 24-HR: " + data.DISPLAY.BTC.USD.CHANGEPCT24HOUR + "%";
    priceChange1El.textContent =
      "PRICE CHANGE 1-HR " + data.DISPLAY.BTC.USD.CHANGEPCTHOUR + "%";
    volumeEl.textContent = "VOLUME: " + data.DISPLAY.BTC.USD.VOLUMEDAYTO;
    dailyvolumeEl.textContent =
      "DAILY VOLUME " + data.DISPLAY.BTC.USD.VOLUMEDAYTO;
    openPriceEl.textContent = "OPEN PRICE: " + data.DISPLAY.BTC.USD.OPENDAY;
    dayHighEl.textContent = "DAILY HIGH: " + data.DISPLAY.BTC.USD.HIGHDAY;
    dayLowEl.textContent = "DAILY LOW : " + data.DISPLAY.BTC.USD.LOWDAY;
    var img = document.createElement("img");
    img.setAttribute("src", API_Base + "/media/37746238/eth.png");
    logoDisplayEl.append(img);

////////-----------EVENT LSITENER FOR SEARCH BTN----------///////////
    searchButtonEl.addEventListener("click", function (event) {
      var tick = searchInput.value;
      event.preventDefault();
      if (tick === "") {
        return;
      } else {
        //getSearchData();
        console.log("Done Search");
      }
    });
  });

  /////////---------CODE FOR LOADING THE NEWS ON CRYPTO------///////
fetch("https://min-api.cryptocompare.com/data/v2/news/?lang=EN")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data.Data[5]);

    var newsTitleEl = document.getElementById("news-title");
    var newsImgEl = document.getElementById("news-img");
    var newsTxtEl = document.getElementById("news-txt");
    var category = document.getElementById("category");
    newsImgEl.setAttribute("src", data.Data[9].imageurl);
    newsImgEl.setAttribute("class", "rounded h-32 w-80");

    newsTitleEl.textContent = data.Data[9].title;
    newsTxtEl.textContent = data.Data[9].body;
    category.textContent = data.Data[9].categories;
  });


  fetch("https://api.coinpaprika.com/v1/coins/btc-bitcoin")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);

  })


//***********----------FUNCTION FOR GETTING DATA AFTER SEARCH-----------*************//

// var getSearchData = function () {
//   //dataContainerEl.innerHTML = "";
//   var tick = searchInput.value;
//   console.log(tick);

//   var API_Base =
//     "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" +
//     tick +
//     "&tsyms=USD";
//   fetch(API_Base + API_Key)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//         // currentPriceEl.textContent = "PRICE: " + data.DISPLAY[0].USD.PRICE;
//         // marketCapEl.textContent = "MARKET CAP: " + data.DISPLAY.tick.USD.MKTCAP;
//         // priceChange24El.textContent =
//         //   "PRICE CHANGE 24-HR: " + data.DISPLAY.tick.USD.CHANGEPCT24HOUR + "%";
//         // priceChange1El.textContent =
//         //   "PRICE CHANGE 1-HR " + data.DISPLAY.tick.USD.CHANGEPCTHOUR + "%";
//         // volumeEl.textContent = "VOLUME: " + data.DISPLAY.tick.USD.VOLUMEDAYTO;
//         // dailyvolumeEl.textContent =
//         //   "DAILY VOLUME " + data.DISPLAY.tick.USD.VOLUMEDAYTO;
//         // currentSupplyEl.textContent = "OPEN PRICE: " + data.DISPLAY.tick.USD.OPENDAY;
//         // dayHighEl.textContent = "DAILY HIGH: " + data.DISPLAY.tick.USD.HIGHDAY;
//         // dayLowEl.textContent = "DAILY LOW : " + data.DISPLAY.tick.USD.LOWDAY;
//         // var img = document.createElement("img");
//         // img.setAttribute("src", API_Base + "/media/37746238/eth.png");
//         // logoDisplayEl.append(img);
//         // console.log(img);
//     });
// };



//**************LIST OF API'S THAT CAN POSSIBLY BE USED*************//

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
