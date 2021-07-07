
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
var gifHolder = document.getElementById("gifholder")
var API_Base =
  "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC&tsyms=USD";
var API_Key =
  "&api_key=47c595746df319744dafc11abb6db295cfe1ca9e302bec40e6c5a038f1a494da";

///------CRYPTO-COMPARE API DATA USED TO PRESENT DATA FOR CURRENT BITCOIN INFO.-----/////
var searchIndividualTickerSymbol = function (tSymbol){

  var apiURL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${tSymbol}&tsyms=USD`
  tSymbol = tSymbol.toUpperCase();

fetch(apiURL+ API_Key)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    //console.log("then", data);
    var displayObj = data.DISPLAY
    // console.log(displayObj)
    // console.log(tSymbol)
    

    currentPriceEl.textContent = displayObj[tSymbol].USD.PRICE;
    marketCapEl.textContent = displayObj[tSymbol].USD.MKTCAP;
    priceChange24El.textContent = displayObj[tSymbol].USD.CHANGEPCT24HOUR + "%";
    priceChange1El.textContent = displayObj[tSymbol].USD.CHANGEPCTHOUR + "%";
    volumeEl.textContent =  displayObj[tSymbol].USD.VOLUMEDAYTO;
    dailyvolumeEl.textContent = displayObj[tSymbol].USD.VOLUMEDAYTO;
    openPriceEl.textContent = displayObj[tSymbol].USD.OPENDAY;
    dayHighEl.textContent = displayObj[tSymbol].USD.HIGHDAY;
    dayLowEl.textContent = displayObj[tSymbol].USD.LOWDAY;
    
    if(displayObj[tSymbol].USD.CHANGEPCT24HOUR> 0){
      priceChange24El.setAttribute("class", "bg-green-400")
    }else if( displayObj[tSymbol].USD.CHANGEPCT24HOUR < 0){
      priceChange24El.setAttribute("class", "bg-red-400")
    }else{
      return;
    }

    if(displayObj[tSymbol].USD.CHANGEPCTHOUR> 0){
      priceChange1El.setAttribute("class", "bg-green-400")
    }else if( data.DISPLAY.BTC.USD.CHANGEPCTHOUR < 0){
      priceChange1El.setAttribute("class", "bg-red-400")
    }else{
      return;
    }
    if(displayObj[tSymbol].USD.PRICE < data.DISPLAY.BTC.USD.OPENDAY ){
      currentPriceEl.setAttribute("class", "bg-red-400")
    }else if(displayObj[tSymbol].USD.PRICE > data.DISPLAY.BTC.USD.OPENDAY){
      currentPriceEl.setAttribute("class", "bg-green-400")
    }else{
      return;
    }
  });
}
var getgiphy = function(tick){
fetch("https:api.giphy.com/v1/gifs/search?q=" + tick + "&api_key=s5QeHwd3F0ZSScsfU69FCbZv9Untc0mC"
)
  .then(function (response) {
    return response.json();
  })
  .then(function (response) {
        var num = Math.floor(Math.random() * 10) + 1;
        console.log(response.data[5].images.fixed_height.url);
        var img = document.createElement("img");
        img.setAttribute("src", response.data[num].images.fixed_height.url);
        img.setAttribute("class", "h-32 w-60 rounded mr-4")
        gifHolder.append(img);

  });
}
getgiphy("crypto")

/////////---------CODE FOR LOADING THE NEWS ON CRYPTO------///////
fetch("https://min-api.cryptocompare.com/data/v2/news/?lang=EN")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    var num = Math.floor(Math.random() * 10) + 1;
    var newsTitleEl = document.getElementById("news-title");
    var newsImgEl = document.getElementById("news-img");
    var newsTxtEl = document.getElementById("news-txt");
    var category = document.getElementById("category");
    newsImgEl.setAttribute("src", data.Data[num].imageurl);
    newsImgEl.setAttribute("class", "rounded h-32 w-80");

    newsTitleEl.textContent = data.Data[num].title;
    newsTxtEl.textContent = data.Data[num].body;
    category.textContent = data.Data[num].categories;
  });


var top5ContainerEl = document.querySelector(".top-five-container")

var CryptoCompareAPIKey = "47c595746df319744dafc11abb6db295cfe1ca9e302bec40e6c5a038f1a494da";

 function fetchCoinTwitterFollowers(coinId){
  var apiURL = `https://min-api.cryptocompare.com/data/social/coin/latest?coinId=${coinId}&apikey=${CryptoCompareAPIKey}`
 
  fetch(apiURL)
  .then(function (response) {
    
    return response.json();
  })
  .then(function (data) {
   
     return data;
  });
}
/******************************************************************
 * Funtion : convertToUSDollars(number)
 * Description: 
 *  1. Use number passed in as a parameter and returns a value 
 *     formated as of US Dollars
 *****************************************************************/
var convertToUSDollars = function(number){
  var options = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }
  return number.toLocaleString("en-US", options);
}
/******************************************************************
 * Funtion : convertToPrecent(number)
 * Description: 
 *  1. Use number passed in as a parameter and returns a value 
 *     formated as a precentage of 2 places.   
 *****************************************************************/

var convertToPrecent = function(number){
  return(parseFloat(number).toFixed(2)+"%");
}

/***************************************************************************************************
 *  Function : buildTopFiveSection(data)
 *  Description: 
 *        1. Receives data from endpoint: /min-api.cryptocompare.com/data/top/totaltoptiervolfull
 *        2. Loop through the array 5 times to retrieve relevant data to build out the top 5 section
 *        3. Display section on the page
 **********************************************************************************************/
var  buildTopFiveSection = function(data) {

  for(var i=0; i<5; i++){
    var coinId = data.Data[i].CoinInfo.Id;
    var tickerName = data.Data[i].CoinInfo.Name;
    var toSymbol = data.Data[i].RAW.USD.TOSYMBOL;
    var price = data.Data[i].RAW.USD.PRICE;
    var change24HourPct = data.Data[i].RAW.USD.CHANGEPCT24HOUR;
    var changeHourPct = data.Data[i].RAW.USD.CHANGEPCTHOUR;

    //var twitterFeedData = fetchCoinTwitterFollowers(coinId);

    var cryptoCard = 
        `
          <div class="crypto-card w-56 shadow rounded bg-gray-50 rounded-md shadow-lg">
            <p class="ticker-name font-semibold text-blue-600 text-center bg-purple-100 rounded-t-md">
                ${tickerName}/${toSymbol}
            </p>
            <div class= "card-txt py-2 pl-4 font-light">
              <p><span class = "label">Price:</span> ${convertToUSDollars(price)}</p>
              <p><span class = "label">24-HR Price Change:</span> ${convertToPrecent(change24HourPct)}</p>
              <p><span class = "label">1-HR Price Change:</span> ${convertToPrecent(changeHourPct)}</p>
              <p><span class = "label">Twitter followers:</span> 414355</p>
              <p><span class = "label">Sentiment:</span> Sentiment</p>
            </div>
         </div>
        `
        top5ContainerEl.innerHTML += cryptoCard
  }
  
}

/************************************************************************
 * Function: fetchCryptoCompareTopList()
 * Description: 
 *      1. Fetch the top 10 Crypo Currency at the time the data is
 *         requested.
 *      2. Calls buildTopFiveSection passing the data retrieved from 
 *         the api call
 ***********************************************************************/

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


/************************************************************************
 * Function : loadPage()
 * Description: Initial function called to initally load the page
 ************************************************************************/
var loadPage = function(){
  fetchCryptoCompareTopList();
  searchIndividualTickerSymbol("BTC")
}



//Function called on page load
loadPage();

////////-----------EVENT LSITENER FOR SEARCH BTN----------///////////
searchButtonEl.addEventListener("click", function (event) {
  var tick = searchInput.value;
  event.preventDefault();
  if (tick === "") {
    return;
  } else {
    searchIndividualTickerSymbol(tick)
    getgiphy(tick)
    gifHolder.innerHTML=""
  }
});

