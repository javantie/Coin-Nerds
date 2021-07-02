var top5ContainerEl = document.querySelector(".top-five-container")

var CryptoCompareAPIKey = "47c595746df319744dafc11abb6db295cfe1ca9e302bec40e6c5a038f1a494da";
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

    ///Crypto Cpmare API
    // fetch("https://min-api.cryptocompare.com/data/all/coinlist")
    // .then(function (response) {
    //   return response.json();
    // })
    // .then(function (data) {
    //  console.log(data);
    // });
 
var fetchCoinTwitterFollowers =function(coinId){
  var apiURL = `https://min-api.cryptocompare.com/data/social/coin/latest?coinId=${coinId}&apikey=${CryptoCompareAPIKey}`
  fetch(apiURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
     return data;
  });
}

var buildTopFiveSection = function (data) {
  console.log(data)
  for(var i=0; i<5; i++){
    var coinId = data.Data[i].CoinInfo.Id;
    var tickerName = data.Data[i].CoinInfo.Name;
    var toSymbol = data.Data[i].RAW.USD.TOSYMBOL;
    var price = data.Data[i].DISPLAY.USD.PRICE;
    var change24HourPct = data.Data[i].RAW.USD.CHANGEPCT24HOUR;
    var changeHourPct = data.Data[i].RAW.USD.CHANGEPCTHOUR;

    console.log(price, tickerName, toSymbol, change24HourPct, changeHourPct)

    var top5Div = document.createElement("div");
        top5Div.classList = "w-56 shadow rounded bg-gray-50 rounded-md shadow-lg"

    var pTickerName = document.createElement("p")
        pTickerName.classList= "ticker-name font-semibold text-blue-600 text-center bg-purple-100 rounded-t-md"
        pTickerName.textContent = tickerName  + "/"+toSymbol ;

        var cardTextDiv = document.createElement("div")
            cardTextDiv.classList = "py-2 pl-4 font-light"
        var pPrice = document.createElement("p").textContent = price;
        var p24HPctChange = document.createElement("p").textContent = change24HourPct;
        var p1HPctChange = document.createElement("p").textContent = changeHourPct;
        var numTwitterFollowers = document.createElement("p").textContent= "Place holder"
        var br = document.createElement("br")

        top5Div.append(pTickerName)
        
        cardTextDiv.append(pPrice)
        cardTextDiv.append(br)
        cardTextDiv.append(p24HPctChange)
        cardTextDiv.append(br)
        cardTextDiv.append(p1HPctChange)
        cardTextDiv.append(br)
        cardTextDiv.append(numTwitterFollowers)
        top5Div.append(cardTextDiv)
        top5ContainerEl.append(top5Div)
  }
  
}

var fetchCryptoCompareTopList= function() {
  var limit = 10;
  var tsym = "USD";
  var apiURL = `https://min-api.cryptocompare.com/data/top/totaltoptiervolfull?limit=${limit}&tsym=${tsym}&apikey=${CryptoCompareAPIKey}`

  fetch(apiURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      buildTopFiveSection(data);
    });
}

var loadPage = function(){
  fetchCryptoCompareTopList();
}


loadPage();
