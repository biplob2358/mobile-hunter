const loadPhones = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, dataLimit);
};

const displayPhones = (phones, dataLimit) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.innerHTML = ``;
  //   display 10 phones only
  const showAll = document.getElementById("show-all");
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }
  //   display fo found massage
  const noPhone = document.getElementById("no-found-messege");

  if (phones.length === 0) {
    noPhone.classList.remove("d-none");
  } else {
    noPhone.classList.add("d-none");
  }

  //   display all phones
  phones.forEach((phone) => {
    // console.log(phone);
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
        <div class="card p-4">
                <img src="${phone.image}" class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">${phone.phone_name}</h5>
                  <p class="card-text">Brand:${phone.brand}</p>
                
                  <button 
                  class='btn btn-primary' onclick="loadPhoneDetails('${phone.slug}')" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Show Details
                  </button>
                </div>
              </div>
    
    
    `;

    phoneContainer.appendChild(phoneDiv);
  });
  //stop loadeing
  toggleLoader(false);
};

const processSearch = (dataLimit) => {
  //start loadeing
  toggleLoader(true);
  const searchField = document.getElementById("btn-searchField");
  const searchText = searchField.value;
  //   searchField.value = "";
  loadPhones(searchText, dataLimit);
};

//input enter key
document
  .getElementById("btn-searchField")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      processSearch(10);
    }
  });

document.getElementById("btn-search").addEventListener("click", function () {
  processSearch(10);
});

const toggleLoader = (isLoading) => {
  const LoaderSection = document.getElementById("loader");
  if (isLoading) {
    LoaderSection.classList.remove("d-none");
  } else {
    LoaderSection.classList.add("d-none");
  }
};
document.getElementById("btn-show-all").addEventListener("click", function () {
  processSearch();
});
// loadPhones();
const loadPhoneDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
};

const displayPhoneDetails = (phone) => {
  console.log(phone);
  const modalTitle = document.getElementById("phoneDetailsModalLabel");
  modalTitle.innerText = phone.name;
  const phoneDetails = document.getElementById("phone-details");
  phoneDetails.innerHTML = `
   
  <p>Release Date:${
    phone.releaseDate ? phone.releaseDate : "No Release date found"
  }</p>
  <p>Storage: ${
    phone.mainFeatures ? phone.mainFeatures.storage : "No imformation found"
  }</p>
  <p>Others:${phone.others ? phone.others.Bluetooth : "No Bluetooth found"}</p>
  
  `;
};
