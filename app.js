// DOM Nodes
// Clickable cat
const catBtn = document.getElementById("cat-btn");
const clickSound = document.getElementById("click-sound");

// Header
const treatsDisplay = document.getElementById("treats-display");
const tpsDisplay = document.getElementById("tps-display");

// Recruitment
const streetBtn = document.getElementById("buy-street-cat");
const grandmaBtn = document.getElementById("buy-grandma-cat");
const fisherBtn = document.getElementById("buy-fisher-cat");
const hunterBtn = document.getElementById("buy-hunter-cat");
const nekoBtn = document.getElementById("buy-neko-chef");

// Stats Modal Elements
const statsModal = document.getElementById("stats-modal");
const statsBtn = document.getElementById("stats-btn");
const closeStats = document.getElementById("close-stats");
const totalTreatsDisplay = document.getElementById("total-treats");
const currentTreatsDisplay = document.getElementById("current-treats");
const statsTPSDisplay = document.getElementById("stats-tps");
const gameTimeDisplay = document.getElementById("game-time");
const colonySizeDisplay = document.getElementById("colony-size");
const catClicksDisplay = document.getElementById("cat-clicks");

// Settings Modal Elements
const settingsModal = document.getElementById("settings-modal");
const settingsBtn = document.getElementById("settings-btn");
const closeSettings = document.getElementById("close-settings");
const deleteSaveBtn = document.getElementById("delete-save");

// Game Variables
let treats = parseInt(localStorage.getItem("treats")) || 0;
let totalTreatsCollected =
  parseInt(localStorage.getItem("totalTreatsCollected")) || 0;
let tps = parseInt(localStorage.getItem("tps")) || 0;
let gameStartTime =
  parseInt(localStorage.getItem("gameStartTime")) || Date.now();
let catClicks = parseInt(localStorage.getItem("catClicks")) || 0;
let colonySize = parseInt(localStorage.getItem("colonySize")) || 0;

// Initial costs for each type of cat
let streetCost = parseInt(localStorage.getItem("streetCost")) || 100;
let grandmaCost = parseInt(localStorage.getItem("grandmaCost")) || 500;
let fisherCost = parseInt(localStorage.getItem("fisherCost")) || 1000;
let hunterCost = parseInt(localStorage.getItem("hunterCost")) || 2000;
let nekoCost = parseInt(localStorage.getItem("nekoCost")) || 5000;

// Display initial values
treatsDisplay.textContent = treats;
tpsDisplay.textContent = tps;
totalTreatsDisplay.textContent = totalTreatsCollected;
streetBtn.textContent = `Street Cat (Gains 1 treat per second) - ${streetCost} Treats`;
grandmaBtn.textContent = `Grandma Cat (Gains 5 treat per second) - ${grandmaCost} Treats`;
fisherBtn.textContent = `Fisher Cat (Gains 10 treat per second) - ${fisherCost} Treats`;
hunterBtn.textContent = `Hunter Cat (Gains 20 treat per second) - ${hunterCost} Treats`;
nekoBtn.textContent = `Neko Chef (Gains 50 treat per second) - ${nekoCost} Treats`;

// Tracking game time
if (!localStorage.getItem("gameStartTime")) {
  localStorage.setItem("gameStartTime", Date.now());
}

// Update treats per second every second
setInterval(function () {
  treats = treats + tps;
  totalTreatsCollected = totalTreatsCollected + tps;
  treatsDisplay.textContent = treats;
  localStorage.setItem("treats", treats);
  localStorage.setItem("totalTreatsCollected", totalTreatsCollected);
}, 1000);

// Increase treat count by 1 on cat click
catBtn.addEventListener("click", function () {
  treats = treats + 1;
  totalTreatsCollected = totalTreatsCollected + 1;
  catClicks++;
  treatsDisplay.textContent = treats;
  localStorage.setItem("treats", treats);
  localStorage.setItem("totalTreatsCollected", totalTreatsCollected);
  localStorage.setItem("catClicks", catClicks);

  catBtn.classList.add("enlarge");

  setTimeout(function () {
    catBtn.classList.remove("enlarge");
  }, 200);

  clickSound.currentTime = 0;
  clickSound.play();
});

// Buy Street Cat
streetBtn.addEventListener("click", function () {
  if (treats >= streetCost) {
    tps = tps + 1;
    treats = treats - streetCost;
    streetCost = Math.ceil(streetCost * 1.15);
    colonySize++;
    updateDisplay();
    saveToLocalStorage();
  }
});

// Buy Grandma Cat
grandmaBtn.addEventListener("click", function () {
  if (treats >= grandmaCost) {
    tps = tps + 5;
    treats = treats - grandmaCost;
    grandmaCost = Math.ceil(grandmaCost * 1.15);
    colonySize++;
    updateDisplay();
    saveToLocalStorage();
  }
});

// Buy Fisher Cat
fisherBtn.addEventListener("click", function () {
  if (treats >= fisherCost) {
    tps = tps + 10;
    treats = treats - fisherCost;
    fisherCost = Math.ceil(fisherCost * 1.15);
    colonySize++;
    updateDisplay();
    saveToLocalStorage();
  }
});

// Buy Hunter Cat
hunterBtn.addEventListener("click", function () {
  if (treats >= hunterCost) {
    tps = tps + 20;
    treats = treats - hunterCost;
    hunterCost = Math.ceil(hunterCost * 1.15);
    colonySize++;
    updateDisplay();
    saveToLocalStorage();
  }
});

// Buy Neko Chef
nekoBtn.addEventListener("click", function () {
  if (treats >= nekoCost) {
    tps = tps + 50;
    treats = treats - nekoCost;
    nekoCost = Math.ceil(nekoCost * 1.15);
    colonySize++;
    updateDisplay();
    saveToLocalStorage();
  }
});

// Function to update the display
function updateDisplay() {
  treatsDisplay.textContent = treats;
  tpsDisplay.textContent = tps;
  streetBtn.textContent = `Street Cat (Gains 1 treat per second)  - ${streetCost} Treats`;
  grandmaBtn.textContent = `Grandma Cat (Gains 5 treat per second) - ${grandmaCost} Treats`;
  fisherBtn.textContent = `Fisher Cat (Gains 10 treat per second) - ${fisherCost} Treats`;
  hunterBtn.textContent = `Hunter Cat (Gains 20 treat per second) - ${hunterCost} Treats`;
  nekoBtn.textContent = `Neko Chef (Gains 50 treat per second) - ${nekoCost} Treats`;
}

// Function to save variables to localStorage
function saveToLocalStorage() {
  localStorage.setItem("treats", treats);
  localStorage.setItem("tps", tps);
  localStorage.setItem("streetCost", streetCost);
  localStorage.setItem("grandmaCost", grandmaCost);
  localStorage.setItem("fisherCost", fisherCost);
  localStorage.setItem("hunterCost", hunterCost);
  localStorage.setItem("nekoCost", nekoCost);
  localStorage.setItem("colonySize", colonySize);
}

// Open the Stats modal
statsBtn.addEventListener("click", function () {
  statsModal.style.display = "block";
  // Update stats values before showing the modal
  totalTreatsDisplay.textContent = totalTreatsCollected;
  currentTreatsDisplay.textContent = treats;
  statsTPSDisplay.textContent = tps;

  // Calculate game time
  const currentTime = Date.now();
  const gameTime = Math.floor((currentTime - gameStartTime) / 1000);
  gameTimeDisplay.textContent = formatTime(gameTime);

  // Update stat values every 5 seconds
  setInterval(function () {
    totalTreatsDisplay.textContent = totalTreatsCollected;
    currentTreatsDisplay.textContent = treats;
    statsTPSDisplay.textContent = tps;

    // Calculate game time
    const currentTime = Date.now();
    const gameTime = Math.floor((currentTime - gameStartTime) / 1000);
    gameTimeDisplay.textContent = formatTime(gameTime);
  }, 5000);

  colonySizeDisplay.textContent = colonySize;
  catClicksDisplay.textContent = catClicks;
});

// Function to format time in hours, minutes, seconds
function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h}h ${m}m ${s}s`;
}

// Close the Stats modal when the close button is clicked
closeStats.addEventListener("click", function () {
  statsModal.style.display = "none";
});

// Open the Settings modal
settingsBtn.addEventListener("click", function () {
  settingsModal.style.display = "block";
});

// Close the Settings modal when the close button is clicked
closeSettings.addEventListener("click", function () {
  settingsModal.style.display = "none";
});

// Close the modals if the user clicks outside the modal content
window.addEventListener("click", function (event) {
  if (event.target == statsModal) {
    statsModal.style.display = "none";
  } else if (event.target == settingsModal) {
    settingsModal.style.display = "none";
  }
});

// Sound toggle logic (simple example, expand as needed)
// Select the audio element
const bgMusic = document.getElementById("bg-music");

// Start the music when the game starts
function startGame() {
  bgMusic.play();
  gameStartTime = Date.now();
}

// Mute button functionality
const muteBtn = document.getElementById("mute-btn");
let isMuted = true; // Start as muted

muteBtn.textContent = "Unmute"; // Initial button text

muteBtn.addEventListener("click", function () {
  if (isMuted) {
    bgMusic.muted = false; // Unmute
    bgMusic.play(); // Start playing audio
    muteBtn.textContent = "Mute"; // Change button text
  } else {
    bgMusic.muted = true; // Mute
    bgMusic.pause(); // Pause audio
    muteBtn.textContent = "Unmute"; // Change button text
  }
  isMuted = !isMuted; // Toggle mute state
});

// Volume control functionality
const volumeControl = document.getElementById("volume-control");

// Set initial volume
bgMusic.volume = 0.5; // Default volume at 50%

// Update volume when slider is changed
volumeControl.addEventListener("input", function () {
  bgMusic.volume = this.value;
});

// Autoplay audio when the page loads (muted)
window.addEventListener("load", function () {
  bgMusic.muted = true; // Start muted to allow autoplay
  bgMusic.play().catch((error) => {
    console.log("Autoplay prevented. User interaction needed to play audio.");
  });
});

// Delete save data (reset the game)
deleteSaveBtn.addEventListener("click", function () {
  localStorage.clear();
  treats = 0;
  tps = 0;
  totalTreatsCollected = 0;
  colonySize = 0;
  treatsDisplay.textContent = treats;
  tpsDisplay.textContent = tps;
  totalTreatsDisplay = totalTreatsCollected;
  colonySizeDisplay = colonySize;
  console.log("Save data deleted");
});
