var top5ContainerEl = document.querySelector(".top-five-container");
var btnTwitterFeedEl = document.querySelector(".btc-twitter-feed-section");
var btnTwitterFeedHeadEl = document.querySelector(".btc-twitter-feed-header");
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
var searchTitleEl = document.getElementById("search-title");
var modalMsgTitleEl = document.getElementById("modal-title");
var modalMsgTextEl = document.getElementById("modal-msg");
var btnOKEl = document.querySelector(".btn-ok");
var msgModalEl = document.querySelector(".msg-modal");
var exchangeHolderEl = document.getElementById("exchange-holder");
var API_Base =
  "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC&tsyms=USD";
var API_Key =
  "&api_key=47c595746df319744dafc11abb6db295cfe1ca9e302bec40e6c5a038f1a494da";

var displayMessageModal = function (messageTitle, messageText) {
  modalMsgTitleEl.textContent = messageTitle;
  modalMsgTextEl.textContent = messageText;
  msgModalEl.classList.remove("hidden");
  searchInput.focus();
};

///------CRYPTO-COMPARE API DATA USED TO PRESENT DATA FOR CURRENT BITCOIN INFO.-----/////
var searchIndividualTickerSymbol = function (tSymbol) {
  var isDefault = false;

  if (!tSymbol) {
    tSymbol = "BTC";
    isDefault = true;
  }

  tSymbol = tSymbol.toUpperCase();
  var apiURL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${tSymbol}&tsyms=USD`;

  fetch(apiURL + API_Key)
    .then(function (response) {
      if (response.ok) return response.json();
    })
    .then(function (data) {
      var dataRespObj = data.Response;
      if (dataRespObj) {
        if (dataRespObj.toUpperCase() === "ERROR") {
          displayMessageModal("ERROR", data.Message);
          return;
        }
      }
      //if a default ticker symbol is not provided save the ticker
      if (!isDefault) {
        saveSeachData(tSymbol);
      }
      var displayObj = data.DISPLAY;

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
      searchTitleEl.textContent = "(" + tSymbol + "/USD)";
      var im = document.getElementById("tic-img");
      im.setAttribute(
        "src",
        "https://www.cryptocompare.com" + displayObj[tSymbol].USD.IMAGEURL
      );
      im.setAttribute("class", "h-10 w-15 rounded text-center");
      if (displayObj[tSymbol].USD.CHANGEPCT24HOUR > 0) {
        priceChange24El.setAttribute("class", "bg-green-400");
      } else if (displayObj[tSymbol].USD.CHANGEPCT24HOUR < 0) {
        priceChange24El.setAttribute("class", "bg-red-400");
      } else {
        return;
      }

      if (displayObj[tSymbol].USD.CHANGEPCTHOUR > 0) {
        priceChange1El.setAttribute("class", "bg-green-400");
      } else if (displayObj[tSymbol].USD.CHANGEPCTHOUR < 0) {
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
    })
    .catch(function (error) {
      var title = "Whoops!";
      var msg = "Unable to connect to CryptoCompareAPI to complete you search";
      displayMessageModal(title, msg);
    });
};
var getgiphy = function (tick) {
  fetch(
    "https:api.giphy.com/v1/gifs/search?q=" +
      tick +
      "&api_key=s5QeHwd3F0ZSScsfU69FCbZv9Untc0mC"
  )
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (response) {
      var responseData = response.data;
      var num = Math.floor(Math.random() * responseData.length);
      var img = document.createElement("img");
      img.setAttribute("src", responseData[num].images.fixed_height.url);
      img.setAttribute("class", "h-32 w-60 mr-4 rounded-tr-3xl rounded-bl-3xl");
      gifHolder.append(img);
    });
};
getgiphy("dogecoin");

/////////---------CODE FOR LOADING THE NEWS ON CRYPTO------///////
fetch("https://min-api.cryptocompare.com/data/v2/news/?lang=EN")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    var dataObj = data.Data;
    var num = Math.floor(Math.random() * dataObj.length);
    var newsTitleEl = document.getElementById("news-title");
    var newsImgEl = document.getElementById("news-img");
    var newsTxtEl = document.getElementById("news-txt");
    var category = document.getElementById("category");
    newsImgEl.setAttribute("src", data.Data[num].imageurl);
    newsImgEl.setAttribute(
      "class",
      "rounded sm:w-full sm:h-40 sm:mb-2 sm:ml-2"
    );

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
          <div class="twitter-card m-4 px-4 w-auto shadow pl-4 py-2 rounded-2xl bg-opacity-70 bg-gray-50">
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
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (data) {
      buildBtcTwitterFeedSection(data);
    })
    .catch(function (error) {
      btnTwitterFeedHeadEl.classList.add("hidden");
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

  if (!dataArray) {
    return;
  }

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
          <div class="group hover:shadow-xl hover:border-blue-500 border-double border-4 cursor-pointer crypto-card mt-2 w-72 bg-opacity-80 shadow rounded-bl-3xl rounded-tr-3xl bg-blue-50 shadow-md flex flex-wrap sm:flex sm:flex-wrap sm:mr-4 sm:mt-2 md:mt-4 md:w-80 lg:w-60"
                data-ticker=${tickerName}>
            <p class="ticker-name w-72 shadow font-semibold text-blue-600 bg-opacity-80  text-center bg-blue-200 md:w-80 rounded-tr-3xl">
                ${tickerName}/${toSymbol}
            </p>
            <div class= " rounded-bl-3xl card-txt w-72 md:w-80 py-2 pl-4 font-light bg-gray-100 bg-opacity-50">
              <p class=" font-normal bg-red-100 mr-3"><span class = "label mr-1 font-semibold">Price:</span> ${convertToUSDollars(
                price
              )}</p>
              <p class=" font-normal bg-red-50 mr-3"><span class = "label mr-1  font-semibold">Market Cap:</span> ${marketCap}</p>
              <p class="font-normal bg-red-100 mr-3"><span class = "label mr-1  font-semibold">24-HR Price Change:</span> ${convertToPrecent(
                change24HourPct
              )}</p>
              <p class="font-normal bg-red-50 mr-3"><span class = "label mr-1  font-semibold">1-HR Price Change:</span> ${convertToPrecent(
                changeHourPct
              )}</p>
              <p class="font-normal bg-red-100 mr-3"><span class = "label mr-1  font-semibold">Followers:</span> ${formatNumbers(
                twitterFollowers
              )}</p>
            </div>
         </div>
        `;
    top5ContainerEl.innerHTML += cryptoCard;

    if (index >= 3) break;
  }
  var cryptoCards = document.querySelectorAll(".crypto-card");
  for (var i = 0; i < cryptoCards.length; i++) {
    cryptoCards[i].addEventListener("click", function (event) {
      var clickedSymbol = this.getAttribute("data-ticker").trim();
      searchIndividualTickerSymbol(clickedSymbol);
      gifHolder.innerHTML = "";
      getgiphy(clickedSymbol);
    });
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
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (data) {
      buildTopSection(data);
    })
    .catch(function (error) {
      return;
    });
};

/************************************************************************
 * Function : loadPage()
 * Description: Initial function called to initally load the page
 ************************************************************************/
var loadPage = function () {
  fetchCryptoCompareTopList();
  searchIndividualTickerSymbol();
  fetchTwitterFeedNewsData();
};

//Function called on page load
loadPage();

////////-----------EVENT LSITENER FOR SEARCH BTN----------///////////
searchButtonEl.addEventListener("click", function (event) {
  var tick = searchInput.value;
  searchInput.value = "";
  event.preventDefault();
  if (tick === "") {
    var msgTitle = "Input Required!";
    var msg = "Please input a valid ticker symbol to search!";

    displayMessageModal(msgTitle, msg);
    return;
  } else {
    searchIndividualTickerSymbol(tick);
    gifHolder.innerHTML = "";
    getgiphy(tick);
  }
  //saveSeachData(tick);
});
var counter = 0;

//Save data to local storage
var oldData = [];
var saveSeachData = function (tick) {
  newData = {
    text: tick,
    id: counter,
  };
  oldData.push(newData);
  counter++;
  localStorage.setItem("search", JSON.stringify(oldData));
};

//Load data from local storage
var loadData = function () {
  oldData = JSON.parse(localStorage.getItem("search")) || [];
  counter = oldData.length;
  for (let i = 0; i < oldData.length; i++) {
    search = document.createElement("p");
    search.setAttribute(
      "class",
      "mx-3 bg-gray-200 px-3 py-1 rounded text-lg cursor-pointer mt-2"
    );
    search.textContent = oldData[i].text;
    SearchHistoryEl.append(search);

    search.addEventListener("click", function () {
      tSymbol = this.textContent;
      tSymbol = tSymbol.toUpperCase();
      searchIndividualTickerSymbol(tSymbol);
      gifHolder.innerHTML = "";
      getgiphy(tSymbol);
    });
  }
};
loadData();

clearBtnEl.addEventListener("click", function () {
  localStorage.clear();
});

btnOKEl.addEventListener("click", function () {
  msgModalEl.classList.add("hidden");
});

fetch("https://api.coingecko.com/api/v3/exchanges")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    for (var i = 0; i < 3; i++) {
      var exchangeCard = `<div id="exchane-card" class="lg:mr-3  border-1 xl:mr-4 xl:w-full shadow px-2 rounded m-4">
      <img class="pt-1" id="exchange-logo" src="${data[i].image}" alt="exchange iamge">
      <span class="flex">
        <p class="font-semibold pr-1 font-serif">Name:</p>
        <p id="exch-name">${data[i].name}</p>
      </span>
      <span class="flex">
        <p class="font-semibold pr-1 font-serif">Location:</p>
        <p id="location">${data[i].country}</p>
      </span>
      <span class="flex">
        <p class="font-semibold pr-1 font-serif">Trust Score:</p>
        <p id="score">${data[i].trust_score}/10</p>
      </span>
      <span class="flex">
        <p class="font-semibold pr-1 font-serif">Ranking:</p>
        <p id="ranking">#${data[i].trust_score_rank}/10</p>
      </span>
      <span class="flex">
        <p class="font-semibold pr-1 font-serif">Established:</p>
        <p id="date-est">${data[i].year_established}</p>
      </span>
      <a target="blank" href="${data[i].url}"><p class="text-blue-700 pt-4 font-semibold">Click Here</p></a>
    </div>`;
      exchangeHolderEl.innerHTML += exchangeCard;
    }
  });
