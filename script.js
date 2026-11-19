
"use strict";

/* =====================================
   MK992 CONTACT LINKS
===================================== */

const links = {
  whatsappCS: "https://wa.link/k3t0oe",
  whatsappGroup: "https://wa.link/k3t0oe",
  telegramCS: "https://t.me/MK992_BuktiCuci",
  telegramChannel: "https://t.me/MK992_BuktiCuci"
};

/* =====================================
   GAME LIST - 18 PROVIDERS
   EVO REMOVED, EVO888 RETAINED
===================================== */

const games = [
  { name:"918KISS ORI", file:"918kissori" },
  { name:"918KISS PLUS", file:"918kissplus" },
  { name:"MEGA888", file:"mega888" },
  { name:"PUSSY888", file:"pussy888" },
  { name:"XE88", file:"xe88" },
  { name:"NEWTOWN", file:"newtown" },
  { name:"LPE", file:"lpe" },
  { name:"EVO888", file:"evo888" },
  { name:"ROLLEX", file:"rollex" },
  { name:"LIVE22", file:"live22" },
  { name:"KING855", file:"king855" },
  { name:"SUNCITY", file:"suncity" },
  { name:"JOKER", file:"joker" },
  { name:"PLAYBOY", file:"playboy" },
  { name:"ACE333", file:"ace333" },
  { name:"GW99", file:"gw99" },
  { name:"3WIN8", file:"3win8" },
  { name:"SLOTS22", file:"slots22" }
];

/* =====================================
   ELEMENTS
===================================== */

const gameGrid = document.getElementById("gameGrid");
const modal = document.getElementById("serviceModal");
const closeModalButton = document.getElementById("closeModal");
const modalGameName = document.getElementById("modalGameName");
const modalGameLogo = document.getElementById("modalGameLogo");
const modalFallback = document.getElementById("modalFallback");

let lastFocusedElement = null;

/* =====================================
   CONTACT LINKS
===================================== */

document.getElementById("telegramChannel").href =
  links.telegramChannel;

document.getElementById("whatsappGroup").href =
  links.whatsappGroup;

document.getElementById("modalWhatsApp").href =
  links.whatsappCS;

document.getElementById("modalTelegram").href =
  links.telegramCS;

/* =====================================
   IMAGE PATHS
===================================== */

function imagePaths(file) {
  const names = [
    file,
    file.toLowerCase(),
    file.toUpperCase()
  ];

  const extensions = [
    ".png",
    ".webp",
    ".jpg",
    ".jpeg",
    ".PNG"
  ];

  const paths = [];

  names.forEach(function(name) {
    extensions.forEach(function(ext) {
      const path = "images/" + name + ext;

      if (!paths.includes(path)) {
        paths.push(path);
      }
    });
  });

  return paths;
}

/* =====================================
   IMAGE LOADER - FIXED
===================================== */

function loadImage(img, fallback, game) {
  const paths = imagePaths(game.file);
  let index = 0;

  img.alt = game.name;

  img.hidden = false;
  fallback.hidden = true;

  function tryNextImage() {
    if (index >= paths.length) {
      img.hidden = true;
      fallback.hidden = false;
      fallback.textContent = game.name;

      console.warn(
        "MK992: Gambar tidak dijumpai:",
        game.name
      );
      return;
    }

    img.src = paths[index];
    index++;
  }

  img.onload = function() {
    img.hidden = false;
    fallback.hidden = true;
  };

  img.onerror = function() {
    tryNextImage();
  };

  tryNextImage();
}

/* =====================================
   CREATE GAME LIST
===================================== */

function createGames() {
  if (!gameGrid) return;

  gameGrid.replaceChildren();

  games.forEach(function(game) {
    const card = document.createElement("button");

    card.type = "button";
    card.className = "game-card";

    card.setAttribute(
      "aria-label",
      "Pilih " + game.name
    );

    const imageArea = document.createElement("div");
    imageArea.className = "game-image";

    const fallback = document.createElement("div");
    fallback.className = "game-fallback";
    fallback.textContent = game.name;
    fallback.hidden = true;

    const image = document.createElement("img");

    image.loading = "lazy";
    image.decoding = "async";
    image.alt = game.name;

    imageArea.appendChild(fallback);
    imageArea.appendChild(image);

    const name = document.createElement("div");

    name.className = "game-name";
    name.textContent = game.name;

    card.appendChild(imageArea);
    card.appendChild(name);

    card.addEventListener("click", function() {
      openServiceModal(game);
    });

    gameGrid.appendChild(card);

    loadImage(image, fallback, game);
  });
}

/* =====================================
   OPEN PROVIDER POPUP
===================================== */

function openServiceModal(game) {
  lastFocusedElement = document.activeElement;

  modalGameName.textContent = game.name;

  // Remove old provider image handlers
  modalGameLogo.onload = null;
  modalGameLogo.onerror = null;
  modalGameLogo.removeAttribute("src");

  // Load the selected provider image
  loadImage(
    modalGameLogo,
    modalFallback,
    game
  );

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");

  document.body.classList.add("modal-open");

  closeModalButton.focus();
}

/* =====================================
   CLOSE POPUP
===================================== */

function closeServiceModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");

  document.body.classList.remove("modal-open");

  if (
    lastFocusedElement &&
    typeof lastFocusedElement.focus === "function"
  ) {
    lastFocusedElement.focus();
  }
}

closeModalButton.addEventListener(
  "click",
  closeServiceModal
);

modal.addEventListener("click", function(event) {
  if (event.target === modal) {
    closeServiceModal();
  }
});

/* =====================================
   KEYBOARD SUPPORT
===================================== */

document.addEventListener("keydown", function(event) {
  if (!modal.classList.contains("show")) {
    return;
  }

  if (event.key === "Escape") {
    closeServiceModal();
    return;
  }

  if (event.key === "Tab") {
    const focusable = Array.from(
      modal.querySelectorAll(
        'button:not([disabled]), a[href]'
      )
    );

    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (
      event.shiftKey &&
      document.activeElement === first
    ) {
      event.preventDefault();
      last.focus();
    } else if (
      !event.shiftKey &&
      document.activeElement === last
    ) {
      event.preventDefault();
      first.focus();
    }
  }
});

/* =====================================
   INITIALIZE
===================================== */

createGames();
