document.addEventListener("DOMContentLoaded", () => {
  const dynamicTitle = document.getElementById("dynamicTitle");

  // HEADER
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

    setTimeout(callback, word.length * 80 + 650);
  }

  function cycleWords() {
    createTitleElements(wordList[currentWordIndex], () => {
      currentWordIndex = (currentWordIndex + 1) % wordList.length;
      cycleWords();
    });
  }

  cycleWords();

  // MAIN NAVIGATION
  function scrollToPage(pageNumber) {
    document
      .getElementById("page" + pageNumber)
      .scrollIntoView({ behavior: "smooth" });
  }

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
      scrollToPage(3);
    });

  const player = document.getElementById("player");

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

  // CUTE TOUCH
  let heartCount = 0;

  const heartCountDisplay = document.getElementById('heartCount');
  const heartCounter = document.getElementById('heartCounter');
  const explosionContainer = document.getElementById('heartExplosion');
  const leekContainer = document.getElementById('leekContainer');

  function updateHeartCounter() {
    if (heartCountDisplay) {
        heartCountDisplay.textContent = heartCount;
    } else {
        console.error("Heart count element not found!");
    }

    if (heartCounter) {
        heartCounter.style.opacity = heartCount > 0 ? 1 : 0;
    } else {
        console.error("Heart counter container not found!");
    }
  }

  function createHeartAtPosition(x, y) {
    if (!explosionContainer) {
        console.error("Heart explosion container not found!");
        return;
    }

    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.position = 'absolute';
    heart.style.left = `${x}px`;
    heart.style.top = `${y + window.scrollY}px`;

    explosionContainer.appendChild(heart);

    heart.addEventListener('animationend', () => heart.remove());

    heartCount++;
    updateHeartCounter();
  }

  function initializeLeeks() {
    const maxLeeks = 4;
    const leekImages = [
        'https://cdn.glitch.global/795a55c1-54a0-4877-b64d-5c6da7b4b0c7/leek1.svg?v=1743703441842',
        'https://cdn.glitch.global/795a55c1-54a0-4877-b64d-5c6da7b4b0c7/leek2.svg?v=1743703444770'
    ];

    function createFlyingLeek() {
        if (leekContainer.children.length >= maxLeeks) {
            leekContainer.removeChild(leekContainer.firstChild);
        }

        const leek = document.createElement('div');
        leek.classList.add('flying-leek');
        leek.style.backgroundImage = `url('${getRandomLeek()}')`;
        leek.style.left = `${getRandomX()}px`;

        leekContainer.appendChild(leek);

        const lifespan = getRandomTime(15000, 20000);
        setTimeout(() => leek.remove(), lifespan);
    }

    function getRandomLeek() {
        return leekImages[Math.floor(Math.random() * leekImages.length)];
    }

    function getRandomX() {
        return Math.random() * (window.innerWidth - 200);
    }

    function getRandomTime(min, max) {
        return Math.random() * (max - min) + min;
    }

    setInterval(createFlyingLeek, getRandomTime(2000, 3000));

    leekContainer.addEventListener('click', (event) => {
        if (!event.target.classList.contains('flying-leek')) return;

        const { left, top, width, height } = event.target.getBoundingClientRect();
        const x = left + width / 2;
        const y = top + height / 2;

        createHeartAtPosition(x, y);

        event.target.remove();
    });
  }

  initializeLeeks();
  updateHeartCounter();

  // COMPATIBILITY
  const popupContainer = document.querySelector(".popup-container");
  const popupTitle = document.querySelector(".popup-title");
  const popupText = document.querySelector(".popup-text");
  const fade = document.querySelector(".fade");

  document.querySelectorAll(".open-popup").forEach(button => {
    button.addEventListener("click", () => {
      popupTitle.textContent = button.getAttribute("data-title");
      popupText.textContent = button.getAttribute("data-text");

      popupContainer.style.display = "block";
    });
  });

  fade.addEventListener("click", () => {
    popupContainer.style.display = "none";
  });

  // SOCIAL BUTTONS
  const buttons = document.querySelectorAll(".floating-button");

  buttons.forEach((button) => {
    const randomFloat = () => {
      let randomTime = (Math.random() * 1 + 0.5).toFixed(6);
      let randomDistance = (Math.random() * 40 - 20).toFixed(6);

      button.style.animation = `floatAnim ${randomTime}s ease-in-out infinite alternate`;
      button.style.setProperty("--float-distance", `${randomDistance}px`);
    };

   setTimeout(() => {
    randomFloat();
  }, 10);
  });

  function resetButtonAnimation(button) {
    button.style.animation = "none";

    void button.offsetWidth;

    setTimeout(() => {
      "randomFloat"(button);
    }, 10);
  }
});