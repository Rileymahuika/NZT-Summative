const el_regionList = document.querySelector("#region-dropdown");
const el_islandList = document.querySelector("#island-dropdown");
const el_accommodationList = document.querySelector("#accommodation-dropdown");
const el_roomListings = document.querySelector("#room-showcase");
const el_menuNav = document.querySelector("#menu-nav");
const el_stayingList = document.querySelector("#nights__dropdown");

// var displayRegions = [];
// var displayIslands = [];

// JSON STUFF //////////////////////////////////
function init() {
  $.getJSON("json/regions.json", function (data) {
    regions = data.regions;
    console.log(regions);
    displayRegions(regions);
  });

  $.getJSON('json/type.json', function (data) {
    typeArray = data.type;
    console.log(typeArray);
    displayType(typeArray);
  });

  $.getJSON("json/islands.json", function (data) {
    islands = data.islands;
    console.log(islands);
    displayIslands(islands);
  });

  $.getJSON("json/accommodation.json", function (data) {
    accommodation = data.accommodation;
    rooms = data.accommodation;
    stays = data.accommodation;
    displayAccommodation(accommodation);
    displayRooms(rooms);
    displayStay(stays);
  });

}

// NAV ///////////////////////////////////////////

function displayNav(pages) {
  let html = "";
  for (var i = 0; i < pages.length; i++) {
    console.log(i + pages[i]);
  }
  el_menuNav.innerHTML = html;

  return `
<li id="menu-nav__item">
<a id="menu-nav__link" href="/dist/mainpage.html">${pages[i]}</a>
</li>
  `;
}

var pages = ["Home", "Destinations", "Things to do", "About", "STAY"];


// ISLANDS //////////////////////////////////

// display list of islands
function displayIslands(islands) {
  let html = "";
  for (island of islands) {
    html += islandHTML(island);
  }
  el_islandList.innerHTML = html;
}

// return list
function islandHTML(island) {
  return `
<option id="island-dropdown__extended" value="North">${island.name}</option>
    `;
}


// REGIONS //////////////////////////////////

// display list of regions
function displayRegions(regions) {
  let html = "";
  for (region of regions) {
    html += northHTML(region);
  }
  for (region of regions) {
    html += southHTML(region);
  }
  el_regionList.innerHTML = html;
}

// return list
function southHTML(region) {
  return `
<option id="region-dropdown" value="North">${region.name}</option>
    `;
}

// list of returned from selected island

function northHTML(region) {
  return `
<option id="region-dropdown" value="North">${region.name}</option>
    `;
    
}

// ACCOMMODATION /////////////////////////////////

// display accommodation type
function displayAccommodation(accommodation) {
  let html = "";
  for (accommo of accommodation) {
    html += accomoHTML(accommo);
  }
  el_accommodationList.innerHTML = html;

  addCategoryClickListener();
}

// return accommodation type list
function accomoHTML(accommo) {
  return `
<option id="accommodation-selector" data-id="${accommo.id}" value="Accommodation">${accommo.type}</option>
    `;
}
// SORT ACCOMODATION BY CATEGORY
function displayType(type) {
  var type = [];
  var typeArray = [];
  for (var i = 0; i < typeArray.length; i++) {
    if (typeArray[i].typeArray === type) {
      matches.push(typeArray[i]);
    }
  }
  displayType(type);
}

function addCategoryClickListener() {
  $('#accommodation-selector').click(function () {
    var id = $(this).data('id');
    displayAccommodation(id);
  });
}

// SEARCH BUTTON //////////////////////////////////

// make search button toggle 
$('input').submit(function (event) {
  event.preventDefault();

  validateForm($(this)[0]);
});

function validateForm(form) {
  let isError = false;

  const selects = form.elements;
}

//  CALLENDER //////////////////////////////////

// might just use basic option selector

// TOTAL NIGHTS STAYING /////////////////////////////////////////

function displayStay(stays) {
  let html = "";
  for (stay of stays) {
    html += totalNightsHTML(stay);
  }
  el_stayingList.innerHTML = html;
}

// return list
function totalNightsHTML(stay) {
  return `
<option id="nights__selector" type="button" name="min">${stay.minStay}</option>
    `;
}

// ROOMS //////////////////////////////////
function displayRooms(rooms) {
  let html = "";
  for (room of rooms) {
    html += makeHTML(room);
    html += makeHTML2(room);
  }
  el_roomListings.innerHTML = html;
}


function makeHTML(room) {
  return `
  <div id="room-showcase__room">
    <div id="room-showcase__img">
      <img id="room-showcase__img-img" src="https://picsum.photos/300/200" alt="">
    </div>
    <div id="room-showcase__info">
      <h1 id="room-showcase__roomHeader">${room.type}</h1>
      <p id="room-showcase__roomInfo">${room.text}</p>
      <p id="room-showcase__roomInfo">Min Stay: ${room.minStay}</p>
      <p id="room-showcase__roomInfo">Max Stay: ${room.maxStay}</p>
      <p id="room-showcase__roomInfo">Total Guests: ${room.guests}</p>
    </div>  
  </div>

  <div id="room-showcase__select">
    <h4 id="room-showcase__select-button" onclick="myFunction()" >Expand Options</h4>
  </div>
    `;
}

function makeHTML2(room) {

  // on click function to toggle when button is clicked


  return `      <div class="rooms-filter">
  <img
    class="rooms-filter__image"
    src="https://picsum.photos/300/200"
    alt=""
  />
  <div class="rooms-filter__header">
    ${room.type}
    <li class="rooms-filter__list">${room.type}</li>
    <li class="rooms-filter__list--after">${room.header}</li>
    <li class="rooms-filter__list--after">${room.text}</li>
    <li class="rooms-filter__list--after">${room.activity}</li>
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
    <h2 class="flexable__prices">${room.price}
    <br>
    <h5 class="flexable__book">PER NIGHT</h5>
    <h5 class="flexable__book-now">BOOK NOW</h5>
    </h2>
  </div>
</div>
<div class="premium">
  <h3 class="premium__prem">PREMIUM</h3>
  <div class="premium__prices-box">
    <h2 class="flexable__prices">${room.premium}
    <br>
    <h5 class="premium__book">PER NIGHT</h5>
    <h5 class="premium__book-now">BOOK NOW</h5>
    </h2>
  </div>
</div>

<div class="menu">
<h3 class="menu__menu">MENU</h3>
</div>
</div>`
}

// FILTER BY GUESTS //////////////////////////////////////////////

// filter adults by amount of guests required


// SELECT MENU OPTIONS ///////////////////////////////////////////



// RUN-------------------------
init();
