const el_regionList = $("#region-dropdown");
const el_islandList = $("#island-dropdown");
const el_accommodationList = $("#accommodation-dropdown");
const el_roomListings = $("#room-showcase");
const el_menuNav = $("#menu-nav");
const el_minStayingList = $("#nights__dropdown1");
const el_maxStayingList = $("#nights__dropdown2");
const el_detailedRooms = $("#rooms-filter");
const el_categoryList = $("#accommodation-dropdown")
let roomsArray = [];
let minStayArray = [];

// JSON STUFF //////////////////////////////////
function init() {

  $.getJSON("json/type.json", function (data) {
    let categoryArray = data.type;
    let staysArray = data.type;
    displayCategories(categoryArray)
    displayMinStay(staysArray);
    displayMaxStay(staysArray);
  });

  $.getJSON("json/islands.json", function (data) {
    let islands = data.islands;
    displayIslands(islands);
  });

  $.getJSON("json/accommodation.json", function (data) {

    let details = data.accommodation;
    roomsArray = data.accommodation;
    minStayArray = data.accommodation;
    // let staysArray = data.type;
    displayRooms(roomsArray);
    displayDetailedRooms(details);
    getMinGuestsByCategory(minStayArray)


  });
}


// ISLANDS //////////////////////////////////
// display list of islands
function displayIslands(islands) {
  let html = "";
  for (island of islands) {
    html += islandHTML(island);
  }
  el_islandList.html(html);

  el_islandList.change(function () {
    $.getJSON("json/regions.json", function (data) {
      let regions = data.regions;
      let islandId = el_islandList.val();
      let regionIslandFilter = filterRegionsByIsland(regions, islandId);
      displayRegions(regionIslandFilter);
    });
  });
}

// return list
function islandHTML(island) {
  return `
<option id="island-dropdown__extended" value="${island.id}">${island.name}</option>
    `;
}


// REGIONS //////////////////////////////////
// display list of regions
function displayRegions(regions) {
  let html = "";
  for (region of regions) {
    html += regionHTML(region);
  }
  el_regionList.innerHTML = html;
}

// list of returned from selected island
function regionHTML(region) {
  return `
<option id="region-dropdown__extended" value="${region.id}">${region.name}</option>
    `;
}

// FILTER REGIONS BY ISLAND /////////////////////////
function filterRegionsByIsland(regions, island) {
  let matches = [];
  for (region of regions) {
    if (region.id == island) {
      matches.push(region);
    }
  }
  return matches;
};

// SEARCH BUTTON //////////////////////////////////
// make search button toggle
$("button").click(function() {
  $('.toggle').show( "fast");
});

// ACCOMMODATION /////////////////////////////////
// VIEW CATEGORY /////////////////////////////
function displayCategories(categoriesArray) {
  let html = "";
  for (let i = 0; i < categoriesArray.length; i++) {
    html += makeCategoryHtml(categoriesArray[i]);
  }
  el_categoryList.html(html)
  addCategoryClickListener();
}

function makeCategoryHtml(category) {
  return `
  <option class="accommodation-selector" data-id="${category.categoryId}">${category.title}</option>
  `
}



// CATEGORY FILTER /////////////////////////////////
function getAccommodationByCategory(id) {
  let matches = [];
  for (let i = 0; i < roomsArray.length; i++) {
    if (roomsArray[i].id === id) {
      matches.push(roomsArray[i]);
    }
    displayRooms(matches)
  }
}

// CATEGORY CLICK LISTENER /////////////////////////
function addCategoryClickListener() {
  $('.accommodation-selector').click(function () {
    let id = $(this).data('id');
    getAccommodationByCategory(id);
  })
}

// CALANDER //////////////////////////////////
$(function () {
  $("#datepicker").datepicker();
});

$(function () {
  $("#datepickerout").datepicker();
});

// FILTER BY GUESTS //////////////////////////////////////////////



// MIN NIGHTS STAYING /////////////////////////////////////////
// display min stay
function displayMinStay(staysArray) {
  let html = "";
  for (let i = 0; i < staysArray.length; i++) {
    html += minNightsHTML(staysArray[i]);
  }
  el_minStayingList.html(html)
  getMinGuestsByCategory();
}

// return list
function minNightsHTML(stay) {
  return `
<option id="nights__selector" type="button" data-id="${stay.categoryId}" name="min">${stay.minStay}</option>
    `;
}

// // filter by min guests
function getMinGuestsByCategory(id) {
  let matches = [];
  for (let i = 0; i < minStayArray.length; i++) {
    if (minStayArray[i].id === id) {
      console.log(id);
      matches.push(minStayArray[i]);
    }
    displayRooms(matches)
  }
}

// //  min stays click listner
function addMinGuestsClickListner() {
  $('#nights__selector').click(function () {
    let id = $(this).data('id');
    console.log($(this).data);
    getMinGuestsByCategory(id);
  })
}


// MAX NIGHTS STAYING /////////////////////////////////////////
function displayMaxStay(staysArray) {
  let html = "";
  for (let i = 0; i < staysArray.length; i++) {
    html += maxNightsHTML(staysArray[i]);
  }
  el_maxStayingList.html(html)
  addMinGuestsClickListner();
}

// return list
function maxNightsHTML(stay) {
  return `
<option id="nights__selector" type="button" data-id="${stay.categoryId}" name="max">${stay.maxStay}</option>
    `;
}

// ACCEPT FILTER /////////////////////////
$("h4").click(function() {
  $("main").show( "fast");
});

// ROOMS //////////////////////////////////
// display rooms
function displayRooms(roomsArray) {
  var html = '';
  for (var i = 0; i < roomsArray.length; i++) {
    html += makeRoomHTML(roomsArray[i]);
  }
  el_roomListings.html(html);
}

function makeRoomHTML(roomObjects) {
  return `
  <div id="room-showcase__room" data-id="${roomObjects.type}">
    <div id="room-showcase__img">
      <img id="room-showcase__img-img" src="https://picsum.photos/300/200" alt="">
    </div>
    <div id="room-showcase__info">
      <h1 id="room-showcase__roomHeader">${roomObjects.type}</h1>
      <p id="room-showcase__roomInfo">${roomObjects.text}</p>
      <p id="room-showcase__roomInfo">Min Stay: ${roomObjects.minStay}</p>
      <p id="room-showcase__roomInfo">Max Stay: ${roomObjects.maxStay}</p>
      <p id="room-showcase__roomInfo">Total Guests: ${roomObjects.guests}</p>
    </div>  
  </div>

  <div id="room-showcase__select">
  <h4 id="room-showcase__select-button">Expand Options</h4>
  </div>
    `;
}


// DETAILS ROOMS /////////////////////////////////////
function displayDetailedRooms(details) {
  var html = '';
  for (var i = 0; i < details.length; i++) {
    html += makeHTML(details[i]);
  }
  el_detailedRooms.html(html);
}

function makeHTML(room) {
  // on click function to toggle when button is clicked
  return `
  <section id="each-room">
<div id="rooms-filter__boxes">
  <img
    id="rooms-filter__image"
    src="https://picsum.photos/300/200"
    alt=""
  />
  <div id="rooms-filter__header">
    ${room.type}
    <li id="rooms-filter__list">${room.type}</li>
    <li id="rooms-filter__list--after">${room.header}</li>
    <li id="rooms-filter__list--after">${room.text}</li>
    <li id="rooms-filter__list--after">${room.activity}</li>
  </div>
</div>

<div class="room-plans">
<h3 class="room-plans__rooms">
  <hr class="hr1" />
  ROOMS
  <hr class="hr2" />
</h3>
<div class="flexable">
  <h3 class="flexable__flex">FLEXABLE</h3>
  <div class="flexable__prices-box">
  <a href="">
    <h2 class="flexable__prices">${room.price}
    <br>
    <h5 class="flexable__book">PER NIGHT</h5>
    <h5 class="flexable__book-now">ADD TO CART</h5>
    </h2>
    </a>
  </div>
</div>
<div class="premium">
  <h3 class="premium__prem">PREMIUM</h3>
  <div class="premium__prices-box">
  <a href="">
    <h2 class="flexable__prices">${room.premium}
    <br>
    <h5 class="premium__book">PER NIGHT</h5>
    <h5 class="premium__book-now">ADD TO CART</h5>
    </h2>
    </a>
  </div>
</div>

<div class="flexable">
  <h3 class="flexable__flex">ADD MEAL SERVICE</h3>
  <div class="flexable__prices-box">
  <a href="">
    <h2 class="flexable__prices">${room.meals}
    <br>
    <h5 class="flexable__book">PER NIGHT</h5>
    <h5 class="flexable__book-now">ADD TO CART</h5>
    </h2>
    </a>
  </div>
</div>
</section>`;
}

// filter adults by amount of guests required

// SELECT MENU OPTIONS ///////////////////////////////////////////

// RUN-------------------------
init();

// GET ACCOMMODATION BY TITLE

// function getAccommodationByTitle(string) {
//   string = string.toLowerCase();
//   let matches = [];
//   for (let i = 0; i < categoryArray.length; i ++) {
//     let accommodationTitle = categoryArray[i].title.toLowerCase();

//     if (accommodationTitle.includes(string)) {
//       matches.push(categoryArray[i]);
//     }
//   }
//   displayRooms(matches)
// }
