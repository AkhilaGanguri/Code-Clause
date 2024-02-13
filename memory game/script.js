// Card data
const cardsArray = [
    {
      name: "pokemon1",
      img: "pokemon1.png",
    },
    {
      name: "pokemon2",
      img: "pokemon2.png",
    },
    {  
        name: "pokemon3",  
        img: "pokemon3.png",  
       },  
       {  
        name: "pokemon4",  
        img: "pokemon4.png",  
       },  
       {  
        name: "pokemon5",  
        img: "pokemon5.png",  
       },  
       {  
        name: "pokemon6",  
        img: "pokemon6.png",  
       },  
       {  
        name: "pokemon7",  
        img: "pokemon7.png",  
       },  
       {  
        name: "pokemon8",  
        img: "pokemon8.png",  
       },  
       {  
        name: "pokemon9",  
        img: "pokemon9.png",  
       },  
       {  
        name: "pokemon10",  
        img: "pokemon10.png",  
       },  
       {  
        name: "pokemon11",  
        img: "pokemon11.png",  
       },  
       {  
        name: "pokemon12",  
        img: "pokemon12.png",  
       },
  ];
  
  // GAME
  const game = document.getElementById("game");
  const grid = document.createElement("section");
  grid.classList.add("grid");
  game.appendChild(grid);
  
  // DOUBLE ARRAY
  let gameGrid = cardsArray.concat(cardsArray);
  
  // FOR RANDOMIZING THE CARDS EVERY TIME WE REFRESH THE PAGE
  gameGrid.sort(() => 0.5 - Math.random());
  
  // CREATE CARDS
  gameGrid.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card", item.name); 
    card.dataset.name = item.name;
    const front = document.createElement("div");
    front.classList.add("front");
    const back = document.createElement("div");
    back.classList.add("back");
    back.style.backgroundImage = `url(${item.img})`; 
    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
  });
  

// ATTEMPTS COUNT
let attemptCount = 0;
let attempts = document.querySelector(".count");
attempts.innerText = attemptCount;

// TIME COUNT
var sec = 0;
var timeInSec;
let min = 0;
function secCount() {
  sec = sec + 1;
  document.querySelector(".sec-count").innerText = Math.floor(sec % 60);
  timeInSec = setTimeout(secCount, 1000);
  min = Math.floor(sec / 60);
  document.querySelector(".min-count").innerText = min;
}

var timeStarted = false;

// RESET ALL
let reset = document.querySelector(".reset");
reset.addEventListener("click", () => {
  let confirmReset = confirm("Whole game will start again. Continue to reset?");
  if (confirmReset === true) {
    window.location.reload();
  }
});

// VARIABLES FOR THE GAME
let firstGuess = "";
let secondGuess = "";
let previousTarget = null;
let count = 0;
let delay = 1200;
let matchCount = 0; // Added variable for match count

// FUNCTIONS FOR THE GAME
const match = () => {
    var selected = document.querySelectorAll(".selected");
    selected.forEach((card) => {
      card.classList.add("match");
    });
    matchCount++;
  
    // Check if all matches are found
    if (matchCount === cardsArray.length) {
      displayScore();
    }
  };
  
  const resetGuesses = () => {
    firstGuess = "";
    secondGuess = "";
    count = 0;
    var selected = document.querySelectorAll(".selected");
    selected.forEach((card) => {
      card.classList.remove("selected");
    });
  };
  
  const displayScore = () => {
    const scoreBox = document.getElementById("score-box");
    scoreBox.innerHTML = `<p>Congratulations! 🏆 You completed the game with ${attemptCount} attempts and ${min} minutes ${sec % 60} seconds.<br><u><b>SCORE:</b></u>${100-attemptCount}</p>`;
  
    // Display the score box
    scoreBox.style.display = "block";
  };

// GAME LOGICS
grid.addEventListener("click", function (event) {
  !timeStarted && secCount();
  timeStarted = true;
  let clicked = event.target;
  attemptCount++;
  attempts.innerText = attemptCount;
  if (
    clicked.nodeName === "SECTION" ||
    clicked === previousTarget ||
    clicked.parentNode.classList.contains("selected")
  ) {
    return;
  }
  if (count < 2) {
    count++;
    if (count === 1) {
      // Assign first guess
      firstGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add("selected");
    } else {
      // Assign second guess
      secondGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add("selected");
    }
    // If both guesses are not empty...
    if (firstGuess !== "" && secondGuess !== "") {
      // and the first guess matches the second match...
      if (firstGuess === secondGuess) {
        // run the match function
        setTimeout(match, delay);
        setTimeout(resetGuesses, delay);
        var matched = document.querySelectorAll(`.${firstGuess}`);
        matched.forEach((node) =>
          node.addEventListener("click", function (e) {
            e.stopPropagation();
          })
        );
      } else {
        setTimeout(resetGuesses, delay);
      }
    }
  }
  // Set previous target to clicked
  previousTarget = clicked;
});

