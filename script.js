const scenes = [
    ...document.querySelectorAll(".scene")
];

const indicators = [
    ...document.querySelectorAll(
        ".story-indicator span"
    )
];

const progress =
    document.getElementById("progress");

const hearts =
    document.getElementById("hearts");

let current = 0;

let timer = null;



/* =========================
   SCENE CHANGE
========================= */

function showScene(number) {

    if (number < 0) {
        number = 0;
    }

    if (number >= scenes.length) {
        number = scenes.length - 1;
    }


    clearTimeout(timer);


    scenes.forEach((scene, index) => {

        scene.classList.toggle(
            "active",
            index === number
        );

    });


    indicators.forEach((indicator, index) => {

        indicator.classList.toggle(
            "active",
            index <= number
        );

    });


    current = number;


    /* Progress */

    const percentage =
        (current /
        (scenes.length - 1)) * 100;

    progress.style.width =
        percentage + "%";


    /* Hearts */

    if (current > 0) {
        createHearts(2);
    }


    /*
       Automatically move through
       the story after a while.
    */

    if (
        current > 0 &&
        current < scenes.length - 1
    ) {

        timer = setTimeout(() => {

            showScene(current + 1);

        }, 12000);

    }

}



/* =========================
   START
========================= */

document
    .getElementById("start")
    .addEventListener("click", () => {

        showScene(1);

    });



/* =========================
   CONVERSATIONAL BUTTONS
========================= */

const nextButtons =
    document.querySelectorAll(".next");


nextButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            showScene(current + 1);

        }
    );

});



/* =========================
   CREATE STARS
========================= */

for (let i = 0; i < 70; i++) {

    const star =
        document.createElement("span");

    star.className = "star";


    star.style.left =
        Math.random() * 100 + "%";


    star.style.top =
        Math.random() * 100 + "%";


    star.style.animationDelay =
        Math.random() * 2 + "s";


    document
        .getElementById("stars")
        .appendChild(star);

}



/* =========================
   HEARTS
========================= */

function createHearts(amount = 2) {

    for (let i = 0; i < amount; i++) {

        const heart =
            document.createElement("span");

        heart.className = "heart";


        const symbols = [
            "❤️",
            "💕",
            "💗",
            "💖",
            "✨"
        ];


        heart.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        heart.style.left =
            Math.random() * 100 + "%";


        heart.style.animationDelay =
            Math.random() * 1.5 + "s";


        hearts.appendChild(heart);


        setTimeout(() => {

            heart.remove();

        }, 5500);

    }

}



/* =========================
   RANDOM HEARTS
========================= */

setInterval(() => {

    if (
        current === 0 ||
        current === scenes.length - 1
    ) {

        createHearts(1);

    }

}, 1200);



/* =========================
   YES BUTTON
========================= */

document
    .getElementById("yes")
    .addEventListener("click", () => {

        const burst =
            document.getElementById("burst");


        const symbols = [
            "❤️",
            "💕",
            "💖",
            "💗",
            "✨",
            "🌸"
        ];


        for (let i = 0; i < 70; i++) {

            const particle =
                document.createElement("span");


            particle.className =
                "confetti";


            particle.textContent =
                symbols[
                    Math.floor(
                        Math.random() *
                        symbols.length
                    )
                ];


            particle.style.setProperty(
                "--x",
                (Math.random() * 700 - 350)
                + "px"
            );


            particle.style.setProperty(
                "--y",
                (Math.random() * 900 - 450)
                + "px"
            );


            particle.style.setProperty(
                "--r",
                (Math.random() * 720 - 360)
                + "deg"
            );


            burst.appendChild(
                particle
            );


            setTimeout(() => {

                particle.remove();

            }, 2800);

        }


        document
            .getElementById("finalTitle")
            .textContent =
            "Then let's make it happen ❤️";


        document
            .getElementById("finalText")
            .textContent =
            "The next chapter is waiting for us.";


        document
            .getElementById("yes")
            .style.display =
            "none";


        document
            .getElementById("no")
            .style.display =
            "none";


        document
            .getElementById("again")
            .style.display =
            "inline-block";


        createHearts(25);

    });



/* =========================
   MAYBE BUTTON
========================= */

const maybe =
    document.getElementById("no");


function moveMaybe() {

    const x =
        Math.random() * 100 - 50;

    const y =
        Math.random() * 80 - 40;


    maybe.style.transform =
        `translate(${x}px, ${y}px)`;

}


maybe.addEventListener(
    "mouseenter",
    moveMaybe
);


maybe.addEventListener(
    "touchstart",
    (event) => {

        event.preventDefault();

        moveMaybe();

    }
);



/* =========================
   WATCH AGAIN
========================= */

document
    .getElementById("again")
    .addEventListener(
        "click",
        () => {

            location.reload();

        }
    );



/* =========================
   START SCENE
========================= */

showScene(0);
