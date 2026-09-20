/* =========================
   PAGE SYSTEM
========================= */

function nextPage(pageNumber) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById("page" + pageNumber)
        .classList.add("active");
}


/* =========================
   HUG QUESTIONS
========================= */

function showHugQuestion() {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById("hugQuestion")
        .classList.add("active");
}


function showBigHug() {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById("bigHug")
        .classList.add("active");
}


function showFinal() {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById("final")
        .classList.add("active");

    startExtraHearts();
}


/* =========================
   MOVING NO BUTTON
========================= */

function moveButton(button) {

    const buttonWidth = button.offsetWidth;
    const buttonHeight = button.offsetHeight;

    const padding = 20;

    const maxX =
        window.innerWidth -
        buttonWidth -
        padding;

    const maxY =
        window.innerHeight -
        buttonHeight -
        padding;

    const randomX =
        padding +
        Math.random() * maxX;

    const randomY =
        padding +
        Math.random() * maxY;

    button.style.position = "fixed";

    button.style.left = randomX + "px";

    button.style.top = randomY + "px";

    button.style.zIndex = "100";
}


/* First NO button */

const noBtn = document.getElementById("noBtn");

noBtn.addEventListener("mouseenter", function () {
    moveButton(noBtn);
});

noBtn.addEventListener("click", function (event) {

    event.preventDefault();

    moveButton(noBtn);
});


/* Phone */

noBtn.addEventListener("touchstart", function (event) {

    event.preventDefault();

    moveButton(noBtn);
});


/* Second NO button */

const hugNoBtn = document.getElementById("hugNoBtn");

const hugYesBtn = document.querySelector("#hugQuestion .yes-btn");

let hugNoClicks = 0;

hugNoBtn.addEventListener("click", function () {

    hugNoClicks++;

    // NO gets smaller
    const noSize = Math.max(0.15, 1 - hugNoClicks * 0.15);

    hugNoBtn.style.transform = `scale(${noSize})`;

    // YES gets bigger
    const yesSize = 1 + hugNoClicks * 0.20;

    hugYesBtn.style.transform = `scale(${yesSize})`;

    // Funny messages
    if (hugNoClicks === 1) {

        hugNoBtn.textContent = "ay 3ad 🥺";

    } else if (hugNoClicks === 2) {

        hugNoBtn.textContent = "emchiiii 😭";

    } else if (hugNoClicks === 3) {

        hugNoBtn.textContent = "7ell 7ell 👀";

    } else if (hugNoClicks === 4) {

        hugNoBtn.textContent = "haya barka 😭";

    } else if (hugNoClicks >= 5) {

        hugNoBtn.textContent = "🥲";
    }

    // Eventually YES takes over
    if (hugNoClicks >= 7) {

        hugYesBtn.style.position = "fixed";
        hugYesBtn.style.left = "0";
        hugYesBtn.style.top = "0";

        hugYesBtn.style.width = "100vw";
        hugYesBtn.style.height = "100vh";

        hugYesBtn.style.borderRadius = "0";

        hugYesBtn.style.fontSize = "70px";

        hugYesBtn.style.zIndex = "1000";

        hugNoBtn.style.display = "none";
    }
});

/* =========================
   FLOATING HEARTS
========================= */

function createHeart() {

    const heart = document.createElement("div");

    heart.classList.add("heart");

    const hearts = ["❤️", "💕", "💗", "💖", "💘"];

    heart.innerHTML =
        hearts[Math.floor(Math.random() * hearts.length)];

    heart.style.left =
        Math.random() * 100 + "vw";

    heart.style.animationDuration =
        (4 + Math.random() * 5) + "s";

    heart.style.fontSize =
        (15 + Math.random() * 20) + "px";

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 9000);
}


/* Start hearts */

setInterval(createHeart, 800);


/* More hearts on final page */

function startExtraHearts() {

    setInterval(() => {

        createHeart();
        createHeart();
        createHeart();

    }, 500);
}

/* =========================
   QUESTION 4 - LOVE METER
========================= */

const loveSlider = document.getElementById("loveSlider");

const loveAmount = document.getElementById("loveAmount");

const loveMessage = document.getElementById("loveMessage");

const loveContinue = document.getElementById("loveContinue");


loveSlider.addEventListener("input", function () {

    const value = Number(loveSlider.value);

    loveAmount.textContent = value + "% ❤️";


    if (value < 25) {

        loveMessage.textContent =
            "NA3AMM? 😭";

    } else if (value < 50) {

        loveMessage.textContent =
            "KHAWWWWW ???? 👀";

    } else if (value < 70) {

        loveMessage.textContent =
            "BECH NODHERBK RAW. 😌";

    } else if (value < 90) {

        loveMessage.textContent =
            "RANI NAWARTK !!!";

    } else if (value < 100) {

        loveMessage.textContent =
            "9ROBET 9ROBET 👀❤️";

    } else {

        loveAmount.textContent =
            "9AD DENYA LKOL Y NAWARTY ❤️♾️";

        loveMessage.textContent =
            "MAW 7OT HAKKA MEN LOWEL ❤️";

        loveContinue.style.display = "inline-block";
    }

});

/* =========================
   QUESTION 3 - LOVE ANSWER
========================= */

function checkLoveAnswer() {

    const input = document.getElementById("loveAnswer");
    const message = document.getElementById("q3Message");

    const answer = input.value.toLowerCase().trim();

    if (answer === "") {
        message.textContent = "Akeka ey wakhaw ?? 😭❤️";
        return;
    }

    // Accepted expressions
    const loveWords = [
        "nhebek bacrha",
        "nheb nawarty",
        "nheb nawarti",
        "ey nheb nawarty",
        "ey nheb nawarti",
        "ey nawarty nhebek barcha",
        "NHEBEK BARCHA",
        "nhebek",
        "ey nhebek",
    ];

    const accepted = loveWords.some(phrase =>
        answer.includes(phrase)
    );

    if (accepted) {

        message.textContent =
            "BEHY MELAA. 🥹❤️";

        setTimeout(() => {
            nextPage(4);
        }, 1500);

    } else {

        message.textContent =
            "Hmmmm... BE9I MAFHEMTCH.";

        input.value = "";
        input.focus();
    }
}

/* =========================
   QUESTION 4 - HOW MUCH?
========================= */


function goToSlider() {

    // Whatever he chooses, he still has to prove it
    nextPage(5);

}