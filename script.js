document.addEventListener("DOMContentLoaded", () => {
  const dynamicTitle = document.getElementById("dynamicTitle");

  // List of words to cycle through
  const wordList = [
    "UI-UX",
    "사용성",
    "(//_//)",
    "TIDY",
    "涼しい",
    "ʕ•ᴥ•ʔ",
    "hyvä"
  ];

  let currentWordIndex = 0;

  // Function to create letter elements
  function createTitleElements(word, callback) {
    dynamicTitle.innerHTML = ""; // Clear previous text

    word.split("").forEach((char, index) => {
      const span = document.createElement("span");
      span.classList.add("letter");
      span.textContent = " "; // Start with empty space
      span.style.opacity = "0"; // Make letters invisible initially
      dynamicTitle.appendChild(span);

      // Delay each letter's appearance with fade-in
      setTimeout(() => {
        span.textContent = char;
        span.style.opacity = "1"; // Make it fade in
      }, index * 150);
    });

    // After the last letter appears, wait 1s before switching words
    setTimeout(callback, word.length * 80 + 650);
  }

  // Function to cycle words with delays
  function cycleWords() {
    createTitleElements(wordList[currentWordIndex], () => {
      currentWordIndex = (currentWordIndex + 1) % wordList.length;
      cycleWords();
    });
  }

  cycleWords();

  // Smooth Scroll Function
  function scrollToPage(pageNumber) {
    document.getElementById("page" + pageNumber).scrollIntoView({ behavior: "smooth" });
  }

  // Navigation buttons
  document.querySelector(".nav-buttons button:nth-child(1)").addEventListener("click", () => {
    scrollToPage(1); // Scroll to "ENJOY" page
  });
  document.querySelector(".nav-buttons button:nth-child(2)").addEventListener("click", () => {
    scrollToPage(2); // Scroll to "WATCH" page
  });
  document.querySelector(".nav-buttons button:nth-child(3)").addEventListener("click", () => {
    scrollToPage(3); // Scroll to "ORDER" page
  });

  const player = document.getElementById("player");

  // Function to check if it's mobile
  function isMobile() {
    return window.innerWidth <= 768;
  }

  function updateBounds() {
    if (isMobile()) {
      player.style.width = "100%";
      player.style.left = "0px";
      player.style.bottom = "20px";
      player.style.top = "auto";
      player.style.right = "0px";
      player.style.cursor = "default";
    } else {
      player.style.width = "calc(100% - 400px)";
      player.style.height = "80px";
      player.style.left = "200px";
      player.style.bottom = "0";
      player.style.cursor = "default";
    }
  }
});

// Disable right-click on images
document.querySelectorAll('.grid-item img').forEach(img => {
  img.addEventListener('contextmenu', (e) => {
    e.preventDefault(); // Disable right-click
  });

  // Disable touch hold for mobile (to prevent long press save)
  img.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevent the long press
  });
});