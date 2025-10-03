document.addEventListener("DOMContentLoaded", () => {
  const dynamicTitle = document.getElementById("dynamicTitle");
  document.documentElement.style.overflowX = "hidden";
  document.body.style.overflowX = "hidden";

  window.addEventListener("resize", () => {
    if (document.documentElement.scrollWidth > window.innerWidth) {
      console.log("Content is overflowing horizontally");
    }
  });

  const elements = document.querySelectorAll("*");

  elements.forEach((el) => {
    if (el.offsetWidth > window.innerWidth) {
      el.style.overflowX = "hidden";
    }
  });

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
  
    document.querySelector(".logo-button").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  
    document.querySelectorAll(".center-buttons button").forEach((button, index) => {
    button.addEventListener("click", () => scrollToPage(index + 2));
  });

  const player = document.getElementById("player");

  function updateBounds() {
    if ("isMobile"()) {
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

  window.onload = function () {
    scrollToPage(1);
  };

  // CUTE TOUCH
  let heartCount = 0;

  const heartCountDisplay = document.getElementById("heartCount");
  const heartCounter = document.getElementById("heartCounter");
  const explosionContainer = document.getElementById("heartExplosion");
  const leekContainer = document.getElementById("leekContainer");

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

    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.style.position = "absolute";
    heart.style.left = `${x}px`;
    heart.style.top = `${y + window.scrollY}px`;

    explosionContainer.appendChild(heart);

    heart.addEventListener("animationend", () => heart.remove());

    heartCount++;
    updateHeartCounter();
  }

  function initializeLeeks() {
    const maxLeeks = 4;
    const leekImages = [
      "assets/games/leek1.svg",
      "assets/games/leek2.svg",
    ];

    function createFlyingLeek() {
      if (leekContainer.children.length >= maxLeeks) {
        leekContainer.removeChild(leekContainer.firstChild);
      }

      const leek = document.createElement("div");
      leek.classList.add("flying-leek");
      leek.style.backgroundImage = `url('${getRandomLeek()}')`;
      leek.style.left = `${getRandomX()}px`;

      leekContainer.appendChild(leek);

      const lifespan = 4000;
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

    leekContainer.addEventListener("click", (event) => {
      if (!event.target.classList.contains("flying-leek")) return;

      const { left, top, width, height } = event.target.getBoundingClientRect();
      const x = left + width / 2;
      const y = top + height / 2;

      createHeartAtPosition(x, y);

      event.target.remove();
    });
  }

  initializeLeeks();
  updateHeartCounter();

  // 1. POPUP CONTENT DATA
  const popupContainer = document.querySelector(".popup-container");
  const popupTitle = document.querySelector(".popup-title");
  const popupText = document.querySelector(".popup-text");
  const popupImage = document.querySelector(".popup-content img");
  const popupVideo = document.querySelector(".popup-content iframe");
  const fade = document.querySelector(".fade");
  const contentData = [
    { title: "CROSS PLATFORM", txtUrl: "item.0.smash.txt" },
    { title: "JAM. C# >> PRODUCTION", txtUrl: "item.1.prototype.txt" },
    { title: "JAM. DISTORTION", txtUrl: "item.2.distortion.txt" },
    { title: "JAM. VEHICLES", txtUrl: "item.3.customs.txt" },
    { title: "JAM. AFTER THU", txtUrl: "item.4.sequences.txt" },
    { title: "3D LEVEL: HELP", txtUrl: "item.5.again.txt" },
    { title: "SPINE 2D CHALLENGES", txtUrl: "item.6.spine.txt" },
    { title: "3D JOURNEY", txtUrl: "item.7.beginning.txt" },
    { title: "DISTORTION PACK", txtUrl: "item.8.assets1.txt" },
    { title: "C# ANIMATION PACK", txtUrl: "item.9.assets2.txt" },
  ];

  function lockScroll() {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
  }

  function unlockScroll() {
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
  }

  // 2. FUNCTION TO LOAD CONTENT FROM TXT FILE
  async function loadPopupContent(txtUrl) {
    const response = await fetch(txtUrl);
    const text = await response.text();

    const popupText = document.querySelector(".popup-text");
    popupText.innerHTML = ""; // Clear previous content

    const lines = text.split(/\n\n+/); // Split by double newlines
    lines.forEach((block) => {
      if (block.startsWith("[text]")) {
        const p = document.createElement("p");
        p.textContent = block.replace("[text]", "").trim();
        popupText.appendChild(p);
      } else if (block.startsWith("[image]")) {
        const img = document.createElement("img");
        img.src = block.replace("[image]", "").trim();
        img.alt = "image";
        img.classList.add("popup-dynamic-image");
        popupText.appendChild(img);
      }
    });
  }

  // 3. POPUP PERFORMANCE
  if (popupContainer && popupTitle && popupText && fade) {
    document.querySelectorAll(".grid-item").forEach((button, index) => {
      button.addEventListener("click", () => {
        const itemData = contentData[index];
        if (!itemData) return;

        popupTitle.textContent = itemData.title;
        loadPopupContent(itemData.txtUrl); // <-- here’s the magic

        popupContainer.style.display = "block";
        fade.style.display = "block";
        document.body.classList.add("no-scroll");
        lockScroll();
      });
    });

    fade.addEventListener("click", () => {
      popupContainer.style.display = "none";
      fade.style.display = "none";
      if (popupVideo) popupVideo.src = "";
      document.body.classList.remove("no-scroll");
      unlockScroll();
    });
  }

  // SOCIAL BUTTONS
  const buttons = document.querySelectorAll(".floating-button");

  buttons.forEach((button) => {
    const randomFloat = () => {
      let randomTime = (Math.random() * 2 + 2).toFixed(2);
      let randomDistance = (Math.random() * 20 - 10).toFixed(10);

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
