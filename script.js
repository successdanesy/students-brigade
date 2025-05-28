const rbdButton = document.getElementById("rbdButton");
  const resetButton = document.getElementById("resetButton");
  const pintsDisplay = document.querySelector(".fa-tint").nextSibling;
  const livesDisplay = document.querySelector(".fa-heartbeat").nextSibling;

  let pints = 0;
  let lives = 0;

  function updateDisplay() {
    pintsDisplay.textContent = pints;
    livesDisplay.textContent = lives;
  }

  rbdButton.addEventListener("click", () => {
    pints += 1;
    lives += 3;
    updateDisplay();
  });

  resetButton.addEventListener("click", () => {
    if (pints > 0 && lives >= 3) {
      pints -= 1;
      lives -= 3;
      updateDisplay();
    }
  });

  // Optional: Initialize display on page load
  updateDisplay();