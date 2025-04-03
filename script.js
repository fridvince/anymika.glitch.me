document.addEventListener("DOMContentLoaded", () => {
  const dynamicTitle = document.getElementById("dynamicTitle");

  // List of words to cycle through
  const wordList = [
    "UI-UX",
    "사용성",
    "(//_//)",
    "oi bruv",
    "涼しい",
    "ʕ•ᴥ•ʔ",
    "직관적",
    "no niin",
    "UwU",
    "微細",
    "｡◕‿‿◕｡",
  ];

  let currentWordIndex = 0;

  // Function to create letter elements
  function createTitleElements(word, callback) {
    const dynamicTitle = document.querySelector(".dynamic-title");
    dynamicTitle.innerHTML = "";

    word.split("").forEach((char, index) => {
      const span = document.createElement("span");
      span.classList.add("letter");
      span.textContent = " ";
      span.style.opacity = "0";
      dynamicTitle.appendChild(span);

      setTimeout(() => {
        span.textContent = char;
        span.style.opacity = "1";
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

  function scrollToPage(pageNumber) {
    document
      .getElementById("page" + pageNumber)
      .scrollIntoView({ behavior: "smooth" });
  }

  // Navigation buttons
  document
    .querySelector(".nav-buttons button:nth-child(1)")
    .addEventListener("click", () => {
      scrollToPage(1); // Scroll to "ENJOY" page
    });
  document
    .querySelector(".nav-buttons button:nth-child(2)")
    .addEventListener("click", () => {
      scrollToPage(2); // Scroll to "WATCH" page
    });
  document
    .querySelector(".nav-buttons button:nth-child(3)")
    .addEventListener("click", () => {
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

document.querySelectorAll(".grid-item").forEach(item => {
  item.addEventListener("mouseup", () => {
    console.log("Grid item released!");
    // Add your action here (e.g., open modal, navigate, etc.)
  });
});

// Disable right-click on images
document.querySelectorAll(".grid-item img").forEach((img) => {
  img.addEventListener("contextmenu", (e) => {
    e.preventDefault(); // Disable right-click
  });
  // Disable touch hold for mobile (to prevent long press save)
  img.addEventListener("touchstart", (e) => {
    e.preventDefault(); // Prevent the long press
  });
});

// CUTE TOUCH
function createHeartAtPosition(x, y) {
    const explosionContainer = document.getElementById('heartExplosion');
    
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = `${x - 50}px`;
    heart.style.top = `${y - 50}px`;

    explosionContainer.appendChild(heart);

    
    setTimeout(() => {
        heart.style.display = 'none';
    }, 2000);
}

// Function to create flying leeks with random positions and animations
function createFlyingLeeks() {
    const leekContainer = document.getElementById('leekContainer');
    const maxLeeks = 4;

    const leekImages = [
      'https://cdn.glitch.global/795a55c1-54a0-4877-b64d-5c6da7b4b0c7/leek1.svg?v=1743703441842',
      'https://cdn.glitch.global/795a55c1-54a0-4877-b64d-5c6da7b4b0c7/leek2.svg?v=1743703444770'
    ];

    setInterval(() => {
        if (leekContainer.children.length < maxLeeks) {
            const leek = document.createElement('div');
            leek.classList.add('flying-leek');

            const randomLeekImage = leekImages[Math.floor(Math.random() * leekImages.length)];
            leek.style.backgroundImage = `url('${randomLeekImage}')`;

            const randomX = Math.random() * (window.innerWidth - 200);
            leek.style.left = `${randomX}px`;

            leekContainer.appendChild(leek);

            setTimeout(() => {
                leek.remove();
            }, Math.random() * (6000 - 4000) + 4000);
        }
    }, Math.random() * (3000 - 2000) + 2000);

    // Attach click event for leek explosion
    leekContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('flying-leek')) {
            const leekPosition = event.target.getBoundingClientRect();
            const leekCenterX = leekPosition.left + leekPosition.width / 2;
            const leekCenterY = leekPosition.top + leekPosition.height / 2;

            createHeartAtPosition(leekCenterX, leekCenterY);

            event.target.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    createFlyingLeeks();
});
// CUTE TOUCH

// Both click and touch events compatibility
const closeButton = document.querySelector(".close-button");
closeButton.addEventListener("click", closePopup);
closeButton.addEventListener("touchstart", closePopup);

function closePopup() {
  console.log("Close button clicked");
  const popupContainer = document.querySelector(".popup-content");
  if (popupContainer) {
    popupContainer.remove();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".floating-button");

  buttons.forEach((button) => {
    const randomFloat = () => {
      let randomTime = (Math.random() * 1.5 + 0.5).toFixed(2);
      let randomDistance = (Math.random() * 12 - 6).toFixed(2);
      let randomOffsetX = (Math.random() * 8 - 4).toFixed(2);

      button.style.animation = `floatAnim ${randomTime}s ease-in-out infinite alternate`;
      button.style.setProperty("--float-distance", `${randomDistance}px`);
      button.style.transform = `translateX(${randomOffsetX}px)`;
    };

    randomFloat();

    // Stop movement on hover
    button.addEventListener("mouseenter", () => {
      button.style.animation = "none";
      button.style.transform = "translateY(0)";
    });

    // Resume movement when mouse leaves
    button.addEventListener("mouseleave", () => {
      setTimeout(randomFloat, 500); // Small delay for smooth transition
    });

    // When the button is pressed (clicked or touched), stop the floating animation
    button.addEventListener("mousedown", () => {
      button.style.animation = "none";
      button.style.transform = "translateY(0)";
    });

    button.addEventListener("touchstart", () => {
      button.style.animation = "none";
      button.style.transform = "translateY(0)";
    });

    // When the mouse or touch ends, resume the floating animation
    button.addEventListener("mouseup", () => {
      window.open(button.querySelector("a").href, "_blank");
      resetButtonAnimation(button);
    });

    button.addEventListener("touchend", () => {
      window.open(button.querySelector("a").href, "_blank");
      resetButtonAnimation(button);
    });
  });

  // Function to reset the button animation to its initial state
  function resetButtonAnimation(button) {
    // Remove the animation to stop it temporarily
    button.style.animation = "none";

    // Force a reflow to reset the button's state
    void button.offsetWidth;

    // Reapply the animation after a brief delay
    setTimeout(() => {
      "randomFloat"(button);
    }, 10);
  }
});
