//HEADER ANIMATION
window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  //TRACKER SECTION
  const totalGoal = 34;
  let pintsDonated = 0;

  const pintsElement = document.getElementById("pints");
  const livesElement = document.getElementById("lives");
  const progressBar = document.getElementById("progressBar");
  const message = document.getElementById("message");

  function donatePint() {
    pintsDonated++;
    updateUI();
  }

  function updateUI() {
    pintsElement.textContent = pintsDonated;
    livesElement.textContent = pintsDonated * 3;

    const progressPercent = Math.min((pintsDonated / totalGoal) * 100, 100);
    progressBar.style.width = progressPercent + "%";

    if (pintsDonated > totalGoal) {
      progressBar.style.backgroundColor = "#2ecc71"; // green
      message.textContent = "🎉 Goal exceeded! Amazing job!";
    } else {
      progressBar.style.backgroundColor = "#e63946"; // red
      message.textContent = "";
    }
  }

  updateUI();