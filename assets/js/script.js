var top5ContainerEl = document.querySelector(".top-five-container");
var btnTwitterFeedEl = document.querySelector(".btc-twitter-feed-section");
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
var gifHolder = document.getElementById("gifholder");
var clearBtnEl = document.getElementById("history-clear");
var SearchHistoryEl = document.getElementById("search-history");
var API_Base =
  "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC&tsyms=USD";
var API_Key =
  "&api_key=47c595746df319744dafc11abb6db295cfe1ca9e302bec40e6c5a038f1a494da";

///------CRYPTO-COMPARE API DATA USED TO PRESENT DATA FOR CURRENT BITCOIN INFO.-----/////
var searchIndividualTickerSymbol = function (tSymbol) {
  var apiURL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${tSymbol}&tsyms=USD`;
  tSymbol = tSymbol.toUpperCase();

  fetch(apiURL + API_Key)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //console.log("then", data);
      var displayObj = data.DISPLAY;
      // console.log(displayObj)
      // console.log(tSymbol)

      currentPriceEl.textContent = displayObj[tSymbol].USD.PRICE;
      marketCapEl.textContent = displayObj[tSymbol].USD.MKTCAP;
      priceChange24El.textContent =
        displayObj[tSymbol].USD.CHANGEPCT24HOUR + "%";
      priceChange1El.textContent = displayObj[tSymbol].USD.CHANGEPCTHOUR + "%";
      volumeEl.textContent = displayObj[tSymbol].USD.VOLUMEDAYTO;
      dailyvolumeEl.textContent = displayObj[tSymbol].USD.VOLUMEDAYTO;
      openPriceEl.textContent = displayObj[tSymbol].USD.OPENDAY;
      dayHighEl.textContent = displayObj[tSymbol].USD.HIGHDAY;
      dayLowEl.textContent = displayObj[tSymbol].USD.LOWDAY;

      if (displayObj[tSymbol].USD.CHANGEPCT24HOUR > 0) {
        priceChange24El.setAttribute("class", "bg-green-400");
      } else if (displayObj[tSymbol].USD.CHANGEPCT24HOUR < 0) {
        priceChange24El.setAttribute("class", "bg-red-400");
      } else {
        return;
      }

      if (displayObj[tSymbol].USD.CHANGEPCTHOUR > 0) {
        priceChange1El.setAttribute("class", "bg-green-400");
      } else if (data.DISPLAY.BTC.USD.CHANGEPCTHOUR < 0) {
        priceChange1El.setAttribute("class", "bg-red-400");
      } else {
        return;
      }
      if (displayObj[tSymbol].USD.PRICE < displayObj[tSymbol].USD.OPENDAY) {
        currentPriceEl.setAttribute("class", "bg-red-400");
      } else if (
        displayObj[tSymbol].USD.PRICE > displayObj[tSymbol].USD.OPENDAY
      ) {
        currentPriceEl.setAttribute("class", "bg-green-400");
      } else {
        return;
      }

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
};
var getgiphy = function (tick) {
  fetch(
    "https:api.giphy.com/v1/gifs/search?q=" +
      tick +
      "&api_key=s5QeHwd3F0ZSScsfU69FCbZv9Untc0mC"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      var num = Math.floor(Math.random() * 10) + 1;
      console.log(response.data[5].images.fixed_height.url);
      var img = document.createElement("img");
      img.setAttribute("src", response.data[num].images.fixed_height.url);
      img.setAttribute("class", "h-32 w-60 rounded mr-4");
      gifHolder.append(img);
    });
};
getgiphy("crypto");

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

/********************************************************************************************************************
 *  Function: buildBtcTwitterFeedSection(data)
 *  Desscription :
 *        1. Receives data from endpoint: https://api.coinpaprika.com/v1/coins/btc-bitcoin/twitter"
 *        2. Loop through the array 3 times to retrieve relevant data to build out the Bitcoin Twitter Feed Section
 *        3. Display section on the page
 *********************************************************************************************************************/
var buildBtcTwitterFeedSection = function (data) {
  for (var i = 0; i < 3; i++) {
    var username = data[i].user_name;
    var status = data[i].status;
    var retweetCount = data[i].retweet_count;
    var likeCount = data[i].like_count;

    var twitterCard = `
          <div class="twitter-card m-4 px-4 w-auto shadow pl-4 py-2 rounded bg-gray-50">
            <p class="username font-medium text-blue-600">${username}</p>
            <p class="status">${status}</p>
            <p class="retweet-count font-medium pt-2 text-blue-600"> Retweets: ${retweetCount}</p>
            <p class="like-count font-medium text-blue-600">Likes: ${likeCount}</p>
          </div>
      `;

    btnTwitterFeedEl.innerHTML += twitterCard;
  }
};

/************************************************************************
 * Function: fetchTwitterFeedNewsData()
 * Description:
 *      1. Fetch the twitter feed for the bitcoin ticker
 *      2. Calls buildBtcTwitterFeedSection passing the data retrieved from
 *         the api call
 ***********************************************************************/

var fetchTwitterFeedNewsData = function () {
  var coinPaprikaURL =
    "https://api.coinpaprika.com/v1/coins/btc-bitcoin/twitter";

  fetch(coinPaprikaURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      buildBtcTwitterFeedSection(data);
    });
};

/************************************************************************
 * Function: fetchSocialMediaData(coinId)
 * Description:
 *      1. Fetch and Return the social media infomation for a CryptoCompareCoin ID
 *      2. Calls buildBtcTwitterFeedSection passing the data retrieved from
 *         the api call
 ***********************************************************************/

function fetchSocialMediaData(coinId) {
  var apiURL = `https://min-api.cryptocompare.com/data/social/coin/latest?coinId=${coinId}${API_Key}`;

  return fetch(apiURL).then(function (response) {
    return response.json();
  });
}
/******************************************************************
 * Funtion : convertToUSDollars(number)
 * Description:
 *  1. Use number passed in as a parameter and returns a value
 *     formated as of US Dollars
 *****************************************************************/
var convertToUSDollars = function (number) {
  var options = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  };
  return number.toLocaleString("en-US", options);
};
/******************************************************************
 * Funtion : convertToPrecent(number)
 * Description:
 *  1. Use number passed in as a parameter and returns a value
 *     formated as a precentage of 2 places.
 *****************************************************************/

var convertToPrecent = function (number) {
  return parseFloat(number).toFixed(2) + "%";
};

/******************************************************************
 * Funtion : formatNumbers (num)
 * Description:
 *  1. Use number passed in as a parameter and returns a value
 *     formated with the proper comma placement.
 *****************************************************************/

var formatNumbers = function (num) {
  if (!num) {
    num = 0;
  }
  var internationalNumberFormat = new Intl.NumberFormat("en-US");
  return internationalNumberFormat.format(num);
};

/***************************************************************************************************
 *  Function : buildTopSection(data)
 *  Description:
 *        1. This function is defined as async in order to wait for an api call prior creating the next card
 *        2. Receives data from endpoint: /min-api.cryptocompare.com/data/top/totaltoptiervolfull
 *        2. Loop through the array 5 times to retrieve relevant data to build out the top 5 section
 *        3. Display section on the page
 **********************************************************************************************/
var buildTopSection = async function (data) {
  var dataArray = data.Data;

  for (const [index, item] of dataArray.entries()) {
    var coinId = dataArray[index].CoinInfo.Id;
    var tickerName = dataArray[index].CoinInfo.Name;
    var toSymbol = dataArray[index].RAW.USD.TOSYMBOL;
    var price = dataArray[index].RAW.USD.PRICE;
    var change24HourPct = dataArray[index].RAW.USD.CHANGEPCT24HOUR;
    var changeHourPct = dataArray[index].RAW.USD.CHANGEPCTHOUR;
    var marketCap = dataArray[index].DISPLAY.USD.MKTCAP;

    //function will wait for this next statement before proceeding
    var twitterFeedData = await fetchSocialMediaData(coinId);
    var twitterFollowers = twitterFeedData.Data.Twitter.followers;

    var cryptoCard = `
          <div class="crypto-card w-56 shadow rounded bg-gray-50 rounded-md shadow-lg">
            <p class="ticker-name font-semibold text-blue-600 text-center bg-purple-100 rounded-t-md">
                ${tickerName}/${toSymbol}
            </p>
            <div class= "card-txt py-2 pl-4 font-light">
              <p><span class = "label">Price:</span> ${convertToUSDollars(
                price
              )}</p>
              <p><span class = "label">Market Cap:</span> ${marketCap}</p>
              <p><span class = "label">24-HR Price Change:</span> ${convertToPrecent(
                change24HourPct
              )}</p>
              <p><span class = "label">1-HR Price Change:</span> ${convertToPrecent(
                changeHourPct
              )}</p>
              <p><span class = "label">Twitter followers:</span> ${formatNumbers(
                twitterFollowers
              )}</p>
            </div>
         </div>
        `;
    top5ContainerEl.innerHTML += cryptoCard;
    if (index >= 5) break;
  }
};

/************************************************************************
 * Function: fetchCryptoCompareTopList()
 * Description:
 *      1. Fetch the top 10 Crypo Currency at the time the data is
 *         requested.
 *      2. Calls buildTopFiveSection passing the data retrieved from
 *         the api call
 ***********************************************************************/

var fetchCryptoCompareTopList = function () {
  var limit = 10;
  var tsym = "USD";
  var apiURL = `https://min-api.cryptocompare.com/data/top/totaltoptiervolfull?limit=${limit}&tsym=${tsym}${API_Key}`;

  fetch(apiURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      buildTopSection(data);
    });
};

/************************************************************************
 * Function : loadPage()
 * Description: Initial function called to initally load the page
 ************************************************************************/
var loadPage = function () {
  fetchCryptoCompareTopList();
  searchIndividualTickerSymbol("BTC");
  fetchTwitterFeedNewsData();
};

//Function called on page load
loadPage();

////////-----------EVENT LSITENER FOR SEARCH BTN----------///////////
searchButtonEl.addEventListener("click", function (event) {
  var tick = searchInput.value;
  event.preventDefault();
  if (tick === "") {
    return;
  } else {
    searchIndividualTickerSymbol(tick);
    getgiphy(tick);
    gifHolder.innerHTML = "";
  }
  saveSeachData(tick);
});

//Save data to local storage
var oldData = [];
var saveSeachData = function (tick) {
  newData = {
    text: tick,
  };
  oldData.push(newData);
  localStorage.setItem("search", JSON.stringify(oldData));
};

//Load data from local storage
var loadData = function () {
  oldData = JSON.parse(localStorage.getItem("search")) || [];
  //console.log(oldData);
  for (let i = 0; i < oldData.length; i++) {
    search = document.createElement("p");
    search.setAttribute(
      "class",
      "mx-3 bg-gray-200 px-3 py-1 rounded text-lg cursor-pointer"
    );
    search.textContent = oldData[i].text;
    SearchHistoryEl.append(search);
  }
};
loadData();

clearBtnEl.addEventListener("click", function () {
  localStorage.clear();
});
