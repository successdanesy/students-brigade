const rbdButton = document.getElementById("rbdButton");
const resetButton = document.getElementById("resetButton");

const pintsDisplay = document.querySelector(".fa-tint").nextSibling;
const livesDisplay = document.querySelector(".fa-heartbeat").nextSibling;

let pints = 0;
let lives = 0;

// ✅ Function to update the numbers on the page
function updateDisplay() {
  pintsDisplay.textContent = pints;
  livesDisplay.textContent = lives;
}

// ✅ Load initial counts from backend when page loads
document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/api/counts")
    .then((res) => res.json())
    .then((data) => {
      pints = data.pints;
      lives = data.lives;
      updateDisplay();
    })
    .catch((err) => console.error("Failed to load counts:", err));
});

// ✅ Function to save current counts to backend
function saveCounts() {
  fetch("http://localhost:3000/api/counts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pints, lives }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to save counts");
      console.log("Counts saved to backend");
    })
    .catch((err) => console.error("Error saving counts:", err));
}

// ✅ Handle Add Donation (RBD) button click
rbdButton.addEventListener("click", () => {
  pints++;
  lives += 3;
  updateDisplay();
  saveCounts();
});

// ✅ Handle Reset Donation button click
resetButton.addEventListener("click", () => {
  if (pints > 0 && lives > 0) {
    pints--;
    lives -= 3;
    updateDisplay();
    saveCounts();
  }
});
// ✅ Optional: Save counts periodically (e.g., every 5 seconds)
setInterval(() => {
  saveCounts();
}, 5000);