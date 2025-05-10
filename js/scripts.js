//dropdown menu
function createDropdownMenu(){
  const menuContainer = document.getElementById("menu-container");

  if (!menuContainer) {
    console.error("Error: Menu container not found!");
    return;
  }

  console.log("Menu container found!", menuContainer);

  menuContainer.innerHTML = `
    <div class = "dropdown">
        <button class = "dropbtn"> Menu </button>
        <div class = "dropdown-content">
            <a href = '../html/homepage.html'> Home </a>
            <a href = '../html/attractions.html'> Attractions </a>
            <a href = '../html/hotels.html'> Hotels </a>
            <a href = '../html/weather.html'> Weather </a>
            <a href = '#' id = "profileLink"> Profile </a>
        </div>
    </div>
  `;

  console.log("Dropdown menu HTML injected:", menuContainer.innerHTML);

  const dropBtn = document.querySelector(".dropbtn");
  const dropdownContent = document.querySelector(".dropdown-content");
  const profileLink = document.getElementById("profileLink");


  console.log("Drop button:", dropBtn);
  console.log("Dropdown content:", dropdownContent);
  console.log("Profile link:", profileLink);

  dropBtn.addEventListener("click", function (){
    console.log("Dropdown button clicked!");
    dropdownContent.classList.toggle("show");
  });

  window.addEventListener("click", function (event){
    if (!event.target.matches(".dropbtn")){
      if (dropdownContent.classList.contains("show")) {
        dropdownContent.classList.remove("show");
      }
    }
  });

  profileLink.addEventListener("click", function (event){
    event.preventDefault()

    const user = localStorage.getItem("user");

    if (!user){
      showLoginPopup();
    } else {
      window.location.href =  "../html/userProfile.html";
    }
  });
  console.log("Dropdown menu successfully initialized!");
}

//back button

function goBack(){
  window.history.back();
}

//scrolling banner

function initializeScrollingBanner(){
  let homePageIndex = 0;
  const homePageImages = document.querySelectorAll(".banner-images img");
  const titleBox = document.querySelector(".banner-title");

  if (!homePageImages.length || !titleBox){
    console.error("Error: Required elements not found! Check the selector.");
    return;
  }

  function showHomePageImage(index){
    if (index < 0 || index >= homePageImages.length){
      console.error(`Invalid index: ${index}`);
      return;
    }
    homePageImages.forEach(img => img.classList.remove("active"));
    homePageImages[index].classList.add("active");
    titleBox.textContent = homePageImages[index].dataset.title || "Untitled Location";
  }

  function nextHomePageImage(){
    homePageIndex = (homePageIndex + 1) % homePageImages.length;
    showHomePageImage(homePageIndex)
  }

  setInterval(nextHomePageImage, 5000);

  document.querySelector(".banner").addEventListener("mouseenter", () => {
    titleBox.style.opacity = "1";
  });

  document.querySelector(".banner").addEventListener("mouseleave", () => {
    titleBox.style.opacity = "0";
  });

  showHomePageImage(homePageIndex);
}

//attractions list

const attractionImages = [
  ["../images/attractionImages/attraction1-1.jpg", "../images/attractionImages/attraction1-2.jpg", "../images/attractionImages/attraction1-3.jpg"],
  ["../images/attractionImages/attraction2-1.jpg", "../images/attractionImages/attraction2-2.jpg", "../images/attractionImages/attraction2-3.jpg"],
  ["../images/attractionImages/attraction3-1.jpg", "../images/attractionImages/attraction3-2.jpg", "../images/attractionImages/attraction3-3.jpg"],
  ["../images/attractionImages/attraction4-1.jpg", "../images/attractionImages/attraction4-2.jpg", "../images/attractionImages/attraction4-3.jpg"],
  ["../images/attractionImages/attraction5-1.jpg", "../images/attractionImages/attraction5-2.jpg", "../images/attractionImages/attraction5-3.jpg"],
  ["../images/attractionImages/attraction6-1.jpg", "../images/attractionImages/attraction6-2.jpg", "../images/attractionImages/attraction6-3.jpg"],
  ["../images/attractionImages/attraction7-1.jpg", "../images/attractionImages/attraction7-2.jpg", "../images/attractionImages/attraction7-3.jpg"],
  ["../images/attractionImages/attraction8-1.jpg", "../images/attractionImages/attraction8-2.jpg", "../images/attractionImages/attraction8-3.jpg"]
];

let currentAttractionIndices  = new Array(attractionImages.length).fill(0);

function nextAttractionImage(index){
  currentAttractionIndices [index] = (currentAttractionIndices [index] + 1) % attractionImages[index].length;
  updateAttractionImage(index);
}

function prevAttractionImage(index){
  currentAttractionIndices [index] = (currentAttractionIndices [index] - 1 + attractionImages[index].length) % attractionImages[index].length;
  updateAttractionImage(index);
}

function updateAttractionImage(index){
  const attractionImageElement = document.getElementById(`image${index}`);
  if (attractionImageElement){
    attractionImageElement.src = attractionImages[index][currentAttractionIndices[index]];

    attractionImageElement.style.width = "100%";
    attractionImageElement.style.height = "350px";
    attractionImageElement.style.objectFit = "cover";

    console.log(`Updated #image${index} to: ${attractionImageElement.src}`);
  } else {
    console.error(`Image element #image${index} not found`);
  }
}

//individual image scrolling

const images = [
  "../images/attractionImages/attraction1-1.jpg", "../images/attractionImages/attraction1-2.jpg", "../images/attractionImages/attraction1-3.jpg",
  "../images/attractionImages/attraction2-1.jpg", "../images/attractionImages/attraction2-2.jpg", "../images/attractionImages/attraction2-3.jpg",
  "../images/attractionImages/attraction3-1.jpg", "../images/attractionImages/attraction3-2.jpg", "../images/attractionImages/attraction3-3.jpg",
  "../images/attractionImages/attraction4-1.jpg", "../images/attractionImages/attraction4-2.jpg", "../images/attractionImages/attraction4-3.jpg",
  "../images/attractionImages/attraction5-1.jpg", "../images/attractionImages/attraction5-2.jpg", "../images/attractionImages/attraction5-3.jpg",
  "../images/attractionImages/attraction6-1.jpg", "../images/attractionImages/attraction6-2.jpg", "../images/attractionImages/attraction6-3.jpg",
  "../images/attractionImages/attraction7-1.jpg", "../images/attractionImages/attraction7-2.jpg", "../images/attractionImages/attraction7-3.jpg",
  "../images/attractionImages/attraction8-1.jpg", "../images/attractionImages/attraction8-2.jpg", "../images/attractionImages/attraction8-3.jpg"
];

let currentIndex = 0;

function changeMainImage(direction){
  currentIndex += direction;
  if (currentIndex < 0) currentIndex = images.length - 1;
  if (currentIndex >= images.length) currentIndex = 0;

  document.getElementById("mainImage").src = images[currentIndex];
}

//post review

function postReview(){
  const name  = document.getElementById("name").value;
  const date  = document.getElementById("date").value;
  const location  = document.getElementById("location").value;
  const review  = document.getElementById("review").value;
  const rating  = document.getElementById("rating").value;

  if (name && date && location && review && rating){
    let formattedLocation = location.replace(/\s+/g, '') + "Reviews.html";
    formattedLocation = formattedLocation.charAt(0).toLowerCase() + formattedLocation.slice(1);

    //get existing reviews OR create an empty array if there are none
    let reviews = JSON.parse(sessionStorage.getItem("reviews")) || [];

    //add new review to the array
    reviews.push({name, date, review, rating, location});

    //store updated reviews in session storage
    sessionStorage.setItem("reviews", JSON.stringify(reviews))

    console.log("Stored Data:", JSON.stringify(reviews));

    let reviewCount = localStorage.getItem("reviewCount") || 0;
    reviewCount++;
    localStorage.setItem("reviewCount", reviewCount);

    //send user back to review page
    window.location.href = formattedLocation;
  } else {
    alert("Please fill in all fields before posting")
  }
}


//hotels list

const hotelImages = [
  ["../images/hotelImages/hotel1-1.jpg", "../images/hotelImages/hotel1-2.jpg", "../images/hotelImages/hotel1-3.jpg", "../images/hotelImages/hotel1-4.jpg"],
  ["../images/hotelImages/hotel2-1.jpg", "../images/hotelImages/hotel2-2.jpg", "../images/hotelImages/hotel2-3.jpg", "../images/hotelImages/hotel2-4.jpg"],
  ["../images/hotelImages/hotel3-1.jpg", "../images/hotelImages/hotel3-2.jpg", "../images/hotelImages/hotel3-3.jpg", "../images/hotelImages/hotel3-4.jpg"],
  ["../images/hotelImages/hotel4-1.jpg", "../images/hotelImages/hotel4-2.jpg", "../images/hotelImages/hotel4-3.jpg", "../images/hotelImages/hotel4-4.jpg"],
  ["../images/hotelImages/hotel5-1.jpg", "../images/hotelImages/hotel5-2.jpg", "../images/hotelImages/hotel5-3.jpg", "../images/hotelImages/hotel5-4.jpg"],
  ["../images/hotelImages/hotel6-1.jpg", "../images/hotelImages/hotel6-2.jpg", "../images/hotelImages/hotel6-3.jpg", "../images/hotelImages/hotel6-4.jpg"],
  ["../images/hotelImages/hotel7-1.jpg", "../images/hotelImages/hotel7-2.jpg", "../images/hotelImages/hotel7-3.jpg", "../images/hotelImages/hotel7-4.jpg"],
  ["../images/hotelImages/hotel8-1.jpg", "../images/hotelImages/hotel8-2.jpg", "../images/hotelImages/hotel8-3.jpg", "../images/hotelImages/hotel8-4.jpg"]
];

let currentHotelIndices = new Array(hotelImages.length).fill(0);

function nextHotelImage(index){
  currentHotelIndices [index] = (currentHotelIndices [index] + 1) % hotelImages[index].length;
  updateHotelImage(index);
}

function prevHotelImage(index){
  currentHotelIndices [index] = (currentHotelIndices [index] - 1 + hotelImages[index].length) % hotelImages[index].length;
  updateHotelImage(index);
}

function updateHotelImage(index){
  const hotelImageElement = document.getElementById(`image${index}`);
  if (hotelImageElement){
    hotelImageElement.src = hotelImages[index][currentHotelIndices[index]];

    hotelImageElement.style.width = "100%";
    hotelImageElement.style.height = "350px";
    hotelImageElement.style.objectFit = "cover";

    console.log(`Updated #image${index} to: ${hotelImageElement.src}`);
  } else {
    console.error(`Image element #image${index} not found`);
  }
}


//hotel filtering

function filterHotels() {
  const filterValue = document.getElementById("hotelFilter").value;
  const allHotelBlocks = Array.from(document.querySelectorAll(".hotel-block"));

  // Hide hotels that don't match the filter
  allHotelBlocks.forEach(block => {
    if (filterValue === "all" || block.dataset.category === filterValue) {
      block.style.display = "block"; // Show matching hotels
    } else {
      block.style.display = "none"; // Hide non-matching hotels
    }
  });
}

//review booking

function reviewBooking(){

  const name = document.getElementById("name").value;
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const hotelName = document.getElementById("hotelName").value;
  const roomType = document.getElementById("roomType").value;
  const adults = parseInt(document.getElementById("adults").value) || 0;
  const children = parseInt(document.getElementById("children").value) || 0;
  const billingInfo = document.getElementById("billingInfo").value;

  //check if all fields are filled in (except children as that can be zero)
  if (!name || !startDate || !endDate || !hotelName|| !roomType ||!adults || !billingInfo) {
    alert("Please fill in all required fields!");
    return;
  }

  //error checking to not allow zero adults to one or more children
  if (children > 0 && adults === 0){
    alert("You cannot book a room with children but no adults");
  }

  //error checking to not allow family rooms to be booked by the wrong type of guests
  if (roomType.toLowerCase() === "family" && (adults !== 2 || children !== 2)){
    alert("Family rooms can only be booked by two adults and two children");
  }

  document.getElementById("reviewName").textContent = name;
  document.getElementById("reviewStartDate").textContent = startDate;
  document.getElementById("reviewEndDate").textContent = endDate;
  document.getElementById("reviewHotelName").textContent = hotelName;
  document.getElementById("reviewRoomType").textContent = roomType;
  document.getElementById("reviewAdults").textContent = adults;
  document.getElementById("reviewChildren").textContent = children || "0"; // Default to 0 if empty
  document.getElementById("reviewBilling").textContent = billingInfo;

  //display review section
  document.getElementById("reviewBookingSection").style.display = "block";
}

function confirmBooking(){
  const booking = {
    name: document.getElementById("name").value,
    startDate: document.getElementById("startDate").value,
    endDate: document.getElementById("endDate").value,
    hotelName: document.getElementById("hotelName").value,
    roomType: document.getElementById("roomType").value,
    adults: document.getElementById("adults").value,
    children: document.getElementById("children").value || "0",
    billingInfo: document.getElementById("billingInfo").value
  };

  let bookings = JSON.parse(sessionStorage.getItem("userBookings")) || [];
  bookings.push(booking);
  sessionStorage.setItem("userBookings", JSON.stringify(bookings));

  document.getElementById("reviewBookingSection").style.display = "none";
  document.getElementById("confirmationMessage").style.display = "block";

  alert("Booking Saved!");

}


//user profile

function showTab(tabId){
  //hide tab content
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
  //show tab content
  document.getElementById(tabId).classList.add('active');

  if (tabId === 'reviews'){
    displayReviews()
    document.getElementById("reviews").innerHTML += `<p> Total Reviews: ${localStorage.getItem("reviewCount") || 0}`;
  }

  if (tabId === 'bookings'){
    displayBookings()
  }

  if (tabId === 'info'){
    displayUserInfo()
  }
}

function displayReviews(){
  const reviewsContainer = document.getElementById("reviews");
  reviewsContainer.innerHTML = ""; //clear previous content

  let reviews = JSON.parse(sessionStorage.getItem("reviews")) || [];

  console.log("Stored Reviews:", reviews);

  if (reviews.length === 0) {
    reviewsContainer.innerHTML = "<p> No reviews available yet </p>";
    return;
  }

  //group reviews by location
  const reviewsByLocation = {};
  reviews.forEach(({name, date, review, rating, location}) => {
    if (!reviewsByLocation[location]) {
      reviewsByLocation[location] = []
  }
    reviewsByLocation[location].push({name, date, review, rating});
  });

  console.log("Grouped Reviews by Location:", reviewsByLocation);

  //create review display per location
  for(const [location, locationReviews] of Object.entries(reviewsByLocation)) {
    const locationSection = document.createElement("div");
    locationSection.innerHTML = `<h2> ${location} </h2>`;

    locationReviews.forEach(({ name, date, review, rating }) => {
      const reviewDiv = document.createElement("div");
      reviewDiv.innerHTML = `
      <p><strong>${name}</strong> - <em>${date}</em></p>
      <p>Rating: ${rating} ⭐</p>
      <p>${review}</p>
      <hr>
    `;
      locationSection.appendChild(reviewDiv);
    });
    reviewsContainer.appendChild(locationSection)
  }
}

function displayBookings(){
  const bookingsContainer = document.getElementById("bookings");
  bookingsContainer.innerHTML = "";

  let bookings = JSON.parse(sessionStorage.getItem("userBookings")) || [];

  if (bookings.length === 0) {
    bookingsContainer.innerHTML = "<p>No bookings found </p>";
    return;
  }

  bookings.forEach((booking, index) => {
    const bookingElement = document.createElement("div");
    bookingElement.classList.add("booking");
    bookingElement.innerHTML = `
     <h3>Booking ${index + 1}</h3>
      <p><strong>Hotel:</strong> ${booking.hotelName}</p>
      <p><strong>Name:</strong> ${booking.name}</p>
      <p><strong>Check-in:</strong> ${booking.startDate}</p>
      <p><strong>Check-out:</strong> ${booking.endDate}</p>
      <p><strong>Room Type:</strong> ${booking.roomType}</p>
      <p><strong>Adults:</strong> ${booking.adults}</p>
      <p><strong>Children:</strong> ${booking.children}</p>
      <p><strong>Billing:</strong> ${booking.billingInfo}</p>
      <button onclick="deleteBooking(${index})">Delete</button>
    `;
    bookingsContainer.appendChild(bookingElement);
  });
}

function deleteBooking(index){
  let bookings = JSON.parse(sessionStorage.getItem("userBookings")) || [];

  bookings.splice(index, 1);

  sessionStorage.setItem("userBookings", JSON.stringify(bookings));

  displayBookings();
}

function displayUserInfo(){
  const userData = JSON.parse(localStorage.getItem("user"));

  if (userData){
    document.getElementById("info").innerHTML = `
    <h2> User Information </h2>
    <p><strong> Name: </strong> ${userData.name}</p>
    <p><strong> Email: </strong> ${userData.email}</p>
    <button onclick = "logout()"> Logout </button>
    `;
  } else {
    document.getElementById("info").innerHTML = `
    <p> No user information found. Please <a href = '../html/login.html'> Login </a></p>
    `;
  }
}


//login system

function login(){
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (username && password === storedUser.username && password === storedUser.password) {
    localStorage.setItem("user", username);
    document.getElementById("message").textContent = `Welcome, ${username}!`;

    setTimeout(() => {
      window.location.href = "userProfile.html";
    }, 1000);
  } else {
    document.getElementById("message").textContent = "Please enter valid credentials";
  }
}

function logout(){
  localStorage.removeItem("user");
  window.location.href = "../html/login.html";
}

//sign up system

function signUp(){
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (name && email && password){
    localStorage.setItem("user", JSON.stringify({name,email,password}));
    document.getElementById("message").textContent = `Welcome, ${name}! Your account has been created`;

    setTimeout(() => {
      window.location.href = "userProfile.html";
    }, 1000);
  } else {
    document.getElementById("message").textContent = "Please enter valid credentials";
  }
}

function showLoginPopup(){
  const popup = document.createElement("div");
  popup.classList.add("popup");

  popup.innerHTML = `
  <div class = "popup-content">
  <p> You need to login to access your profile. </p>
  <button onclick = "window.location.href = '../html/login.html'"> Login </button>
  <button onclick = "window.location.href = '../html/signup.html'"> Sign Up </button>
  <button onclick = "closePopup()"> Close </button>
  <div>
  `;

  document.body.appendChild(popup);
}

function closePopup(){
  document.querySelector(".popup").remove();
}

