const correctDate = "2007-09-16";

const herName = "Bertha";



const birthdaySong =
    document.getElementById("birthdaySong");

const birthDate =
    document.getElementById("birthDate");

const continueButton =
    document.getElementById("continueButton");

const message =
    document.getElementById("message");

const birthdayScreen =
    document.getElementById("birthday-screen");

const welcomeScreen =
    document.getElementById("welcome-screen");

const personName =
    document.getElementById("personName");

const beginButton =
    document.getElementById("beginButton");

const experience3Screen =
    document.getElementById("experience3-screen");

const finalSection =
    document.getElementById("final-section");

const myAudio =
    document.getElementById("myAudio");

const memoryPhotos =
    document.querySelectorAll(".memory-photo");

const memoryText =
    document.getElementById("memoryText");

const giftArea =
    document.getElementById("gift-area");

const flowerGift =
    document.getElementById("flowerGift");

const chocolateGift =
    document.getElementById("chocolateGift");

const giftMessage =
    document.getElementById("giftMessage");

const distanceArea =
    document.getElementById("distance-area");

const giftHint =
    document.getElementById("giftHint");

const distanceLines =
    document.querySelectorAll(".distance-line");




let currentMemory = 0;

let memoryTimer;

let musicFadeTimer;




const memoryMessages = [

    "Remember when you were this little? ❤️",

    "And somehow... you grew up.",

    "Look at you now...",

    "You've changed so much.",

    "But you're still you. ❤️"

];





continueButton.addEventListener(
    "click",
    function() {

        const enteredDate =
            birthDate.value;


        if (enteredDate === correctDate) {

            personName.textContent =
                herName;


            birthdayScreen.classList.add(
                "hidden"
            );

            welcomeScreen.classList.remove(
                "hidden"
            );


           

            birthdaySong.volume = 0;

            birthdaySong.currentTime = 0;


            const playPromise =
                birthdaySong.play();


            if (playPromise !== undefined) {

                playPromise.catch(
                    function(error) {

                        console.log(
                            "Birthday music could not start:",
                            error
                        );

                    }
                );

            }


            

            fadeInMusic(
                birthdaySong,
                5000
            );


        } else {

            message.textContent =
                "Hmm... 🤨 I don't think that's your birthday. Try again!";

        }

    }
);




beginButton.addEventListener(
    "click",
    function() {

        welcomeScreen.classList.add(
            "hidden"
        );

        experience3Screen.classList.remove(
            "hidden"
        );


        currentMemory = 0;


        memoryPhotos.forEach(
            function(photo) {

                photo.classList.remove(
                    "active"
                );

            }
        );


        memoryPhotos[0].classList.add(
            "active"
        );


        memoryText.classList.remove(
            "hidden"
        );


        memoryText.textContent =
            memoryMessages[0];


        giftArea.classList.add(
            "hidden"
        );


        distanceArea.classList.add(
            "hidden"
        );


        memoryTimer =
            setInterval(
                function() {

                    memoryPhotos[
                        currentMemory
                    ].classList.remove(
                        "active"
                    );


                    currentMemory++;


                    if (
                        currentMemory >=
                        memoryPhotos.length
                    ) {

                        clearInterval(
                            memoryTimer
                        );


                        memoryText.classList.add(
                            "hidden"
                        );


                        giftArea.classList.remove(
                            "hidden"
                        );


                        return;

                    }


                    memoryPhotos[
                        currentMemory
                    ].classList.add(
                        "active"
                    );


                    memoryText.textContent =
                        memoryMessages[
                            currentMemory
                        ];

                },

                5000
            );

    }
);




  

flowerGift.addEventListener(
    "click",
    function() {

        flowerGift.textContent =
            "💐";


        giftMessage.textContent =
            "There you go... a little something for you. ❤️";


        giftHint.textContent =
            "";


        setTimeout(
            function() {

                flowerGift.classList.add(
                    "hidden"
                );


                giftMessage.textContent =
                    "And of course... I couldn't forget this. 🍫";


                chocolateGift.classList.remove(
                    "hidden"
                );

            },

            2500
        );

    }
);




chocolateGift.addEventListener(
    "click",
    function() {

        giftMessage.textContent =
            "There... now you're ready. ❤️";


       

        fadeOutMusic(
            birthdaySong,
            10000
        );


        /*
           Give the chocolate message
           3 seconds before changing
           into the distance scene.
        */

        setTimeout(
            function() {

                giftArea.classList.add(
                    "hidden"
                );


                distanceArea.classList.remove(
                    "hidden"
                );


                showDistanceStory();

            },

            3000
        );

    }
);





function showDistanceStory() {

    let currentLine = 0;


    distanceLines.forEach(
        function(line) {

            line.style.opacity = "0";

            line.style.transform =
                "translateY(20px)";

        }
    );


    function showNextLine() {

        if (
            currentLine >=
            distanceLines.length
        ) {

            setTimeout(
                function() {

                    showFinalSection();

                },

                2000
            );


            return;

        }


        const line =
            distanceLines[currentLine];


        line.style.opacity = "1";

        line.style.transform =
            "translateY(0)";


        currentLine++;


        setTimeout(
            showNextLine,
            3000
        );

    }


    showNextLine();

}




function showFinalSection() {

    experience3Screen.classList.add(
        "hidden"
    );


    finalSection.classList.remove(
        "hidden"
    );


   

    setTimeout(
        function() {

            const playPromise =
                myAudio.play();


            if (
                playPromise !== undefined
            ) {

                playPromise.catch(
                    function(error) {

                        console.log(
                            "Your audio could not start automatically:",
                            error
                        );

                    }
                );

            }

        },

        1200
    );

}



/* =================================
   FADE MUSIC IN
================================= */

function fadeInMusic(
    audio,
    duration = 5000
) {

    clearInterval(
        musicFadeTimer
    );


    const startTime =
        performance.now();


    function fade() {

        const elapsed =
            performance.now() -
            startTime;


        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        /*
           Smooth easing.
        */

        const easedProgress =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        audio.volume =
            easedProgress;


        if (progress < 1) {

            musicFadeTimer =
                requestAnimationFrame(
                    fade
                );

        } else {

            audio.volume = 1;

        }

    }


    fade();

}



/* =================================
   FADE MUSIC OUT
================================= */

function fadeOutMusic(
    audio,
    duration = 10000
) {

    clearInterval(
        musicFadeTimer
    );


    const startingVolume =
        audio.volume;


    const startTime =
        performance.now();


    function fade() {

        const elapsed =
            performance.now() -
            startTime;


        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        /*
           Smooth fade-out.
        */

        const easedProgress =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        audio.volume =
            startingVolume *
            (1 - easedProgress);


        if (progress < 1) {

            musicFadeTimer =
                requestAnimationFrame(
                    fade
                );

        } else {

            audio.volume = 0;

            audio.pause();

        }

    }


    fade();

}