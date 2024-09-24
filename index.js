var walletAmount = 250000;
var donationHistory = [];

function makeDonation(location, disaster) {
  var donationInput = document.getElementById(
    "donation-input-" + location.toLowerCase()
  ).value;
  var donationAmount = parseInt(donationInput);

  if (donationAmount > 0 && donationAmount <= walletAmount) {
    walletAmount -= donationAmount;
    document.getElementById("wallet-amount").textContent = walletAmount;

    var donatedElement = document.getElementById(
      "donated-" + location.toLowerCase()
    );
    var currentDonation = parseInt(donatedElement.textContent);
    donatedElement.textContent = currentDonation + donationAmount;

    // donation history with time
    var donationTime = new Date().toString(); 
      location: location,
      amount: donationAmount,
      time: donationTime,
      disaster: disaster, 
    };
    donationHistory.push(historyEntry);
    updateHistory();

    document.getElementById("donation-modal").checked = true;
    document.getElementById("donation-input-" + location.toLowerCase()).value =
      "";
  } else {
    document.getElementById("invalid-modal").checked = true;
  }
}

function updateHistory() {
  var historyList = document.getElementById("donation-history");
  historyList.innerHTML = "";

  donationHistory.forEach(function (entry) {
    var li = document.createElement("li");

    li.classList.add("p-4");

    li.innerHTML = `
           <div  class="border-[1px] rounded-md mb-8 p-8"> <strong>${entry.amount} Taka
            is donated for ${entry.disaster} at ${entry.location}, Bangladesh</strong> 
            <br>
            <span class="text-sm text-gray-500">Date: ${entry.time}</span> </div>
        `;

    historyList.appendChild(li);
  });
}

// Switch tabs
document.getElementById("donation-tab").addEventListener("click", function () {
  document.getElementById("donation-section").classList.remove("hidden");
  document.getElementById("history-section").classList.add("hidden");
  setActiveTab("donation-tab");
});

document.getElementById("history-tab").addEventListener("click", function () {
  document.getElementById("donation-section").classList.add("hidden");
  document.getElementById("history-section").classList.remove("hidden");
  updateHistory();
  setActiveTab("history-tab");
});

// tab styling
function setActiveTab(activeId) {
  var tabs = document.querySelectorAll(".tab");
  tabs.forEach(function (tab) {
    tab.classList.remove("bg-[#B4F461]", "text-white", "font-bold");
    tab.classList.add("border", "border-gray-300", "text-gray-500");
  });
  var activeTab = document.getElementById(activeId);
  activeTab.classList.add("bg-[#B4F461]", "text-black", "font-bold"); 
  activeTab.classList.remove("border", "border-gray-300", "text-gray-500"); 
}
