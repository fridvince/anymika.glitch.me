document.addEventListener("DOMContentLoaded", () => {
  const dynamicTitle = document.getElementById("dynamicTitle");
  document.documentElement.style.overflowX = "hidden";
  document.body.style.overflowX = "hidden";
  
  window.addEventListener('resize', () => {
  if (document.documentElement.scrollWidth > window.innerWidth) {
    console.log('Content is overflowing horizontally');
  }
});
  
  const elements = document.querySelectorAll('*');

elements.forEach((el) => {
  if (el.offsetWidth > window.innerWidth) {
    el.style.overflowX = 'hidden';
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

  document
    .querySelector(".nav-buttons button:nth-child(1)")
    .addEventListener("click", () => {
      scrollToPage(1);
    });

  document
    .querySelector(".nav-buttons button:nth-child(2)")
    .addEventListener("click", () => {
      scrollToPage(2);
    });

  document
    .querySelector(".nav-buttons button:nth-child(3)")
    .addEventListener("click", () => {
      scrollToPage(3);
    });

  const player = document.getElementById("player");



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
      "https://cdn.glitch.global/795a55c1-54a0-4877-b64d-5c6da7b4b0c7/leek1.svg?v=1743703441842",
      "https://cdn.glitch.global/795a55c1-54a0-4877-b64d-5c6da7b4b0c7/leek2.svg?v=1743703444770",
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

  // POPUP TEMPLATE
  const popupContainer = document.querySelector(".popup-container");
  const popupTitle = document.querySelector(".popup-title");
  const popupText = document.querySelector(".popup-text");
  const popupImage = document.querySelector(".popup-content img");
  const popupVideo = document.querySelector(".popup-content iframe");
  const fade = document.querySelector(".fade");

  function lockScroll() {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
  }

  function unlockScroll() {
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
  }

  // POPUP CONTENT DATA
  const contentData = [
    {
      title: "JAM. C# >> PRODUCTION",
      text: "my precious - animations annd sequences with no animations",
      imageUrl:
        "https://cdn.glitch.global/795a55c1-54a0-4877-b64d-5c6da7b4b0c7/cover9-head.jpg?v=1743898715272",
      videoUrl: "https://youtu.be/NT3s8JKfDjs?feature=shared",
    },
    {
      title: "JAM. DISTORTION",
      text: "so basically the distortion pack is essence of this visual design research, i finally understood that distortion is not that hard",
      imageUrl:
        "https://cdn.glitch.global/795a55c1-54a0-4877-b64d-5c6da7b4b0c7/cover8-head.jpg?v=1743898731991",
      videoUrl: "https://youtu.be/NT3s8JKfDjs?feature=shared",
    },
    {
      title: "JAM. VEHICLES",
      text: "more experiments, i and unity becoming united :3",
      imageUrl:
        "https://cdn.glitch.global/795a55c1-54a0-4877-b64d-5c6da7b4b0c7/cover7-head.jpg?v=1743898681089",
      videoUrl: "https://youtu.be/NT3s8JKfDjs?feature=shared",
    },
    {
      title: "JAM. AFTER THU",
      text: "a lot of water has flowed after my first THU challenge (link to artwork), but the idea of JAMS has hooked in my mind",
      imageUrl:
        "https://cdn.glitch.global/795a55c1-54a0-4877-b64d-5c6da7b4b0c7/cover6-head.jpg?v=1743898727568",
      videoUrl: "https://youtu.be/NT3s8JKfDjs?feature=shared",
    },
    {
      title: "3D LEVEL: HELP",
      text: "and back 3d, how it can be useful to have diversity of skills and versatile legacy",
      imageUrl:
        "https://cdn.glitch.global/795a55c1-54a0-4877-b64d-5c6da7b4b0c7/cover5-head.jpg?v=1743898698842",
      videoUrl: "https://youtu.be/NT3s8JKfDjs?feature=shared",
    },
    {
      title: "SPINE 2D CHALLENGES",
      text: "animation is always a part of me and everything i do",
      imageUrl:
        "https://cdn.glitch.global/795a55c1-54a0-4877-b64d-5c6da7b4b0c7/cover4-head.jpg?v=1743898674222",
      videoUrl: "https://youtu.be/NT3s8JKfDjs?feature=shared",
    },
    {
      title: "3D JOURNEY",
      text: "so yeah go back before i dove deeper to ui ux",
      imageUrl:
        "https://cdn.glitch.global/795a55c1-54a0-4877-b64d-5c6da7b4b0c7/cover3-head.jpg?v=1743898685560",
      videoUrl: "https://youtu.be/NT3s8JKfDjs?feature=shared",
    },
    {
      title: "DISTORTION PACK",
      text: "experiments with shader. me and tech art",
      imageUrl:
        "https://cdn.glitch.global/795a55c1-54a0-4877-b64d-5c6da7b4b0c7/cover2-head.jpg?v=1743898694904",
      videoUrl: "https://youtu.be/NT3s8JKfDjs?feature=shared",
    },
    {
      title: "C# ANIMATION PACK",
      text: "i wanna explain here of how i have came to it and why its so many of them and to grab it",
      imageUrl:
        "https://cdn.glitch.global/795a55c1-54a0-4877-b64d-5c6da7b4b0c7/cover1-head.jpg?v=1743898690085",
      videoUrl: "https://youtu.be/NT3s8JKfDjs?feature=shared",
    },
    // WIP...
  ];

  // POPUP PERFORMANCE
  if (popupContainer && popupTitle && popupText && fade) {
    document.querySelectorAll(".grid-item").forEach((button, index) => {
      button.addEventListener("click", () => {
        const itemData = contentData[index];
        if (!itemData) return;

        popupTitle.textContent = itemData.title;
        popupText.textContent = itemData.text;

        if (popupImage && itemData.imageUrl) {
          popupImage.src = itemData.imageUrl;
          popupImage.style.display = "block";
        } else if (popupImage) {
          popupImage.style.display = "none";
        }

        if (popupVideo && itemData.videoUrl) {
          popupVideo.src = `https://www.youtube.com/embed/${extractYouTubeId(
            itemData.videoUrl
          )}`;
          popupVideo.style.display = "block";
        } else if (popupVideo) {
          popupVideo.style.display = "none";
        }

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

  // YOUTUBE ID EXTRACTOR
  function extractYouTubeId(url) {
    const regex =
      /(?:youtube\.com\/(?:[^\/]+\/.*\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : "";
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
      'randomFloat'(button);
    }, 10);
  }
});