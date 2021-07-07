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
    currentPriceEl.textContent = data.DISPLAY.BTC.USD.PRICE;
    marketCapEl.textContent = data.DISPLAY.BTC.USD.MKTCAP;
    priceChange24El.textContent = data.DISPLAY.BTC.USD.CHANGEPCT24HOUR + "%";
    priceChange1El.textContent = data.DISPLAY.BTC.USD.CHANGEPCTHOUR + "%";
    volumeEl.textContent = data.DISPLAY.BTC.USD.VOLUMEDAYTO;
    dailyvolumeEl.textContent = data.DISPLAY.BTC.USD.VOLUMEDAYTO;
    openPriceEl.textContent = data.DISPLAY.BTC.USD.OPENDAY;
    dayHighEl.textContent = data.DISPLAY.BTC.USD.HIGHDAY;
    dayLowEl.textContent = data.DISPLAY.BTC.USD.LOWDAY;
    var img = document.createElement("img");
    img.setAttribute("src", API_Base + "/media/37746238/eth.png");
    logoDisplayEl.append(img);
    if (data.DISPLAY.BTC.USD.CHANGEPCT24HOUR > 0) {
      priceChange24El.setAttribute("class", "bg-green-400");
    } else if (data.DISPLAY.BTC.USD.CHANGEPCT24HOUR < 0) {
      priceChange24El.setAttribute("class", "bg-red-400");
    } else {
      return;
    }

    if (data.DISPLAY.BTC.USD.CHANGEPCTHOUR > 0) {
      priceChange1El.setAttribute("class", "bg-green-400");
    } else if (data.DISPLAY.BTC.USD.CHANGEPCTHOUR < 0) {
      priceChange1El.setAttribute("class", "bg-red-400");
    } else {
      return;
    }
    if (data.DISPLAY.BTC.USD.PRICE < data.DISPLAY.BTC.USD.OPENDAY) {
      currentPriceEl.setAttribute("class", "bg-green-400");
    } else if (data.DISPLAY.BTC.USD.PRICE > data.DISPLAY.BTC.USD.OPENDAY) {
      currentPriceEl.setAttribute("class", "bg-red-400");
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

var tickEl = fetch(
  "https://api.coinstats.app/public/v1/coins/bitcoin?currency=AMD"
)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    getSearchData(data);
  });

var getSearchData = function (data) {};

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

///Crypto Cpmare API
// fetch("https://min-api.cryptocompare.com/data/all/coinlist")
// .then(function (response) {
//   return response.json();
// })
// .then(function (data) {
//  console.log(data);
// });

/********************************************************************************************************************
 *  Function: buildBtcTwitterFeedSection(data)
 *  Desscription :
 *        1. Receives data from endpoint: https://api.coinpaprika.com/v1/coins/btc-bitcoin/twitter"
 *        2. Loop through the array 3 times to retrieve relevant data to build out the Bitcoin Twitter Feed Section
 *        3. Display section on the page
 *********************************************************************************************************************/
var buildBtcTwitterFeedSection = function (data) {
  console.log(data);

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
    })
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

  if(!num){
    num = 0
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
              <p><span class = "label">Price:</span> ${convertToUSDollars(price)}</p>
              <p><span class = "label">Market Cap:</span> ${marketCap}</p>
              <p><span class = "label">24-HR Price Change:</span> ${convertToPrecent(change24HourPct)}</p>
              <p><span class = "label">1-HR Price Change:</span> ${convertToPrecent(changeHourPct)}</p>
              <p><span class = "label">Twitter followers:</span> ${formatNumbers(twitterFollowers)}</p>
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
  fetchTwitterFeedNewsData();
};

//function called on page load
loadPage();
