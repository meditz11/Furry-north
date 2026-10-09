/* ================================= */
/* SCENES */
/* ================================= */

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


/* ================================= */
/* SHOW SCENE */
/* ================================= */

function showScene(number) {


    if (number < 0) {

        number = 0;

    }


    if (number >= scenes.length) {

        number =
            scenes.length - 1;

    }


    scenes.forEach(
        (scene, index) => {

            scene.classList.toggle(
                "active",
                index === number
            );

        }
    );


    indicators.forEach(
        (indicator, index) => {

            indicator.classList.toggle(
                "active",
                index <= number
            );

        }
    );


    current = number;


    const percentage =
        (current /
        (scenes.length - 1)) * 100;


    progress.style.width =
        percentage + "%";


    if (current > 0) {

        createHearts(2);

    }

}


/* ================================= */
/* START BUTTON */
/* ================================= */

const backgroundMusic =
    document.getElementById("backgroundMusic");

document
    .getElementById("start")
    .addEventListener("click", async () => {

        showScene(1);

        try {
            backgroundMusic.volume = 0.65;
            await backgroundMusic.play();
        } catch (error) {
            console.log("Music playback was blocked by the browser.");
        }

    });

/* ================================= */
/* NEXT BUTTONS */
/* ================================= */

const nextButtons =
    document.querySelectorAll(".next");


nextButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                showScene(
                    current + 1
                );

            }
        );

    }
);


/* ================================= */
/* CREATE STARS */
/* ================================= */

for (let i = 0; i < 70; i++) {


    const star =
        document.createElement("span");


    star.className =
        "star";


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


/* ================================= */
/* CREATE HEARTS */
/* ================================= */

function createHearts(
    amount = 2
) {


    for (
        let i = 0;
        i < amount;
        i++
    ) {


        const heart =
            document.createElement("span");


        heart.className =
            "heart";


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


        hearts.appendChild(
            heart
        );


        setTimeout(
            () => {

                heart.remove();

            },
            5500
        );

    }

}


/* ================================= */
/* AMBIENT HEARTS */
/* ================================= */

setInterval(
    () => {


        if (
            current === 0 ||
            current === scenes.length - 1
        ) {

            createHearts(1);

        }


    },
    1400
);


/* ================================= */
/* INITIAL SCENE */
/* ================================= */

showScene(0);
