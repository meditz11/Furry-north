const scenes = [...document.querySelectorAll(".scene")];

const dots = document.getElementById("dots");

const progress = document.getElementById("progress");

let currentScene = 0;

let timer;



/* =========================
   CREATE NAVIGATION DOTS
========================= */

scenes.forEach((scene, index) => {

    const dot = document.createElement("span");

    dot.className = "dot";

    if (index === 0) {
        dot.classList.add("active");
    }

    dot.addEventListener("click", () => {
        showScene(index);
    });

    dots.appendChild(dot);

});


const allDots = [
    ...document.querySelectorAll(".dot")
];



/* =========================
   SHOW SCENE
========================= */

function showScene(number) {

    number = Math.max(
        0,
        Math.min(
            scenes.length - 1,
            number
        )
    );


    scenes[currentScene]
        .classList
        .remove("active");


    allDots[currentScene]
        .classList
        .remove("active");


    currentScene = number;


    scenes[currentScene]
        .classList
        .add("active");


    allDots[currentScene]
        .classList
        .add("active");


    /* Progress bar */

    const percentage =
        (currentScene /
        (scenes.length - 1)) * 100;

    progress.style.width =
        percentage + "%";


    /* Reset timer */

    clearTimeout(timer);


    if (currentScene < scenes.length - 1) {

        timer = setTimeout(

            () => {
                showScene(currentScene + 1);
            },

            Number(
                scenes[currentScene]
                .dataset.time
            )

        );

    }


    /* Final scene */

    if (currentScene === scenes.length - 1) {

        createHearts(8);

    }

}



/* =========================
   START BUTTON
========================= */

document
    .querySelector(".start")
    .addEventListener("click", () => {

        showScene(1);

    });



/* =========================
   NEXT BUTTON
========================= */

document
    .getElementById("next")
    .addEventListener("click", () => {

        showScene(currentScene + 1);

    });



/* =========================
   PREVIOUS BUTTON
========================= */

document
    .getElementById("prev")
    .addEventListener("click", () => {

        showScene(currentScene - 1);

    });



/* =========================
   KEYBOARD CONTROL
========================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "ArrowRight" ||
            event.key === " "
        ) {

            showScene(currentScene + 1);

        }


        if (event.key === "ArrowLeft") {

            showScene(currentScene - 1);

        }

    }
);



/* =========================
   CREATE STARS
========================= */

for (let i = 0; i < 90; i++) {

    const star =
        document.createElement("i");

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
   CREATE HEARTS
========================= */

function createHearts(number = 2) {

    for (let i = 0; i < number; i++) {

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
            Math.random() * 1.2 + "s";


        document
            .getElementById("hearts")
            .appendChild(heart);


        setTimeout(() => {

            heart.remove();

        }, 5500);

    }

}



/* =========================
   CONTINUOUS HEARTS
========================= */

setInterval(() => {

    if (
        currentScene === 0 ||
        currentScene === scenes.length - 1
    ) {

        createHearts(1);

    }

}, 1000);



/* =========================
   YES BUTTON
========================= */

document
    .getElementById("yes")
    .addEventListener("click", () => {

        const burst =
            document.getElementById("burst");


        for (let i = 0; i < 70; i++) {

            const particle =
                document.createElement("span");


            particle.className =
                "confetti";


            const symbols = [
                "❤️",
                "💖",
                "💕",
                "✨",
                "🌸",
                "🎉",
                "💗"
            ];


            particle.textContent =
                symbols[
                    Math.floor(
                        Math.random() *
                        symbols.length
                    )
                ];


            particle.style.setProperty(
                "--x",
                (Math.random() * 1100 - 550) + "px"
            );


            particle.style.setProperty(
                "--y",
                (Math.random() * 850 - 425) + "px"
            );


            particle.style.setProperty(
                "--r",
                (Math.random() * 900 - 450) + "deg"
            );


            burst.appendChild(particle);


            setTimeout(() => {

                particle.remove();

            }, 3000);

        }


        document
            .getElementById("finalTitle")
            .textContent =
            "A Beautiful Beginning ❤️";


        document
            .getElementById("finalText")
            .textContent =
            "And this little story gets a brand new chapter.";


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

document
    .getElementById("no")
    .addEventListener(
        "mouseenter",
        () => {

            const button =
                document.getElementById("no");


            button.style.position =
                "relative";


            button.style.left =
                (Math.random() * 180 - 90) +
                "px";


            button.style.top =
                (Math.random() * 120 - 60) +
                "px";

        }
    );



/* =========================
   WATCH AGAIN
========================= */

document
    .getElementById("again")
    .addEventListener("click", () => {

        location.reload();

    });



/* =========================
   START
========================= */

showScene(0);