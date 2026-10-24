/* =========================================
   MK992
========================================= */


/* =========================================
   LINKS
========================================= */

const links = {

    whatsappCS:
        "https://wa.link/k3t0oe",

    telegramCS:
        "#",

    telegramChannel:
        "http://t.me/MK992_BuktiCuci",

    whatsappGroup:
        "#"

};


/* =========================================
   GAME LIST
========================================= */

const games = [

    {
        name: "918KISS ORI",
        image: "images/918kissori.png"
    },

    {
        name: "918KISS PLUS",
        image: "images/918kissplus.png"
    },

    {
        name: "MEGA888",
        image: "images/mega888.png"
    },

    {
        name: "PUSSY888",
        image: "images/pussy888.png"
    },

    {
        name: "XE88",
        image: "images/xe88.png"
    },

    {
        name: "EVO",
        image: "images/evo.png"
    },

    {
        name: "NEWTOWN",
        image: "images/newtown.png"
    },

    {
        name: "LPE",
        image: "images/lpe.png"
    },

    {
        name: "EVO888",
        image: "images/evo888.png"
    },

    {
        name: "ROLLEX",
        image: "images/rollex.png"
    },

    {
        name: "LIVE22",
        image: "images/live22.png"
    },

    {
        name: "KING855",
        image: "images/king855.png"
    },

    {
        name: "SUNCITY",
        image: "images/suncity.png"
    },

    {
        name: "JOKER",
        image: "images/joker.png"
    },

    {
        name: "PLAYBOY",
        image: "images/playboy.png"
    },

    {
        name: "ACE333",
        image: "images/ace333.png"
    },

    {
        name: "GW99",
        image: "images/gw99.png"
    },

    {
        name: "3WIN8",
        image: "images/3win8.png"
    },

    {
        name: "SLOTS22",
        image: "images/slots22.png"
    }

];


/* =========================================
   ELEMENTS
========================================= */

const gameGrid =
    document.getElementById("gameGrid");

const modal =
    document.getElementById("serviceModal");

const closeModal =
    document.getElementById("closeModal");

const modalGameName =
    document.getElementById("modalGameName");

const toast =
    document.getElementById("toast");


/* =========================================
   CREATE GAME CARDS
========================================= */

function createGames() {

    gameGrid.innerHTML = "";


    games.forEach((game) => {

        const card =
            document.createElement("div");


        card.className =
            "game-card";


        /* IMAGE AREA */

        const imageArea =
            document.createElement("div");


        imageArea.className =
            "game-image";


        /* DEFAULT */

        const defaultLogo =
            document.createElement("div");


        defaultLogo.className =
            "default-game-logo";


        defaultLogo.innerHTML = `

            <strong>
                ${game.name}
            </strong>

            <span>
                MK992
            </span>

        `;


        /* IMAGE */

        const image =
            document.createElement("img");


        image.src =
            game.image;


        image.alt =
            game.name;


        image.style.display =
            "none";


        /* IMAGE AVAILABLE */

        image.onload =
            function () {

                image.style.display =
                    "block";


                defaultLogo.style.display =
                    "none";

            };


        /* IMAGE NOT AVAILABLE */

        image.onerror =
            function () {

                image.style.display =
                    "none";


                defaultLogo.style.display =
                    "flex";

            };


        imageArea.appendChild(
            defaultLogo
        );


        imageArea.appendChild(
            image
        );


        /* NAME */

        const name =
            document.createElement("div");


        name.className =
            "game-name";


        name.textContent =
            game.name;


        card.appendChild(
            imageArea
        );


        card.appendChild(
            name
        );


        /* CLICK GAME */

        card.addEventListener(
            "click",
            function () {

                openServiceModal(
                    game.name
                );

            }
        );


        gameGrid.appendChild(
            card
        );

    });

}


/* =========================================
   OPEN POPUP
========================================= */

function openServiceModal(gameName) {

    modalGameName.textContent =
        gameName;


    modal.classList.add(
        "show"
    );


    document.body.style.overflow =
        "hidden";

}


/* =========================================
   CLOSE POPUP
========================================= */

function closeServiceModal() {

    modal.classList.remove(
        "show"
    );


    document.body.style.overflow =
        "";

}


/* CLOSE BUTTON */

closeModal.addEventListener(
    "click",
    closeServiceModal
);


/* CLICK OUTSIDE */

modal.addEventListener(
    "click",
    function (event) {

        if (event.target === modal) {

            closeServiceModal();

        }

    }
);


/* ESC */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            modal.classList.contains("show")
        ) {

            closeServiceModal();

        }

    }
);


/* =========================================
   PENDING LINK
========================================= */

document
    .querySelectorAll(
        ".pending-link"
    )
    .forEach((item) => {

        item.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                const name =
                    item.dataset.name ||
                    "Link";


                showToast(
                    name +
                    " akan ditambah nanti."
                );

            }
        );

    });


/* =========================================
   TOAST
========================================= */

let toastTimer;


function showToast(message) {

    clearTimeout(
        toastTimer
    );


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    toastTimer =
        setTimeout(
            function () {

                toast.classList.remove(
                    "show"
                );

            },
            2200
        );

}


/* =========================================
   START
========================================= */

createGames();