const cards = document.querySelectorAll(".card");

let isHasClicked = false;
let firstCard, secondCard;
let board = false;
let flag = false;
const arr = [];

function flip() {
  if (board) return;
  if (this === firstCard) return;
  this.classList.add("flip-card");
  if (!isHasClicked) {
    isHasClicked = true;
    firstCard = this;

    return;
  } else {
    isHasClicked = false;
    secondCard = this;
    gameTime();
    checkForMatch();
  }
}

function checkForMatch() {
  if (firstCard.dataset.name === secondCard.dataset.name) {
    arr.push(firstCard.dataset.name, secondCard.dataset.name);
    if (arr.length === 12) {
      createTableWin();
      restartGame();
    }
    disableCards();
  } else {
    backFlip();
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flip);
  secondCard.removeEventListener("click", flip);
  resetBoard();
}

function backFlip() {
  board = true;
  setTimeout(() => {
    firstCard.classList.remove("flip-card");
    secondCard.classList.remove("flip-card");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [isHasClicked, board] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

function createTableWin() {
  const table = document.createElement("div");
  document.body.appendChild(table);
  table.classList.add("table");
  table.innerHTML = `<h1 class="win">You Win!!!</h1>
    <p class="time">Your time: <span>${timer.minutes}:${timer.seconds}</span></p>
    <button class="restart">try again.</button>`;
}

const timer = {
  seconds: 0,
  minutes: 0,
  timerGo: false,
};

function gameTime() {
  if (!timer.timerGo) {
    timer.timerGo = true;
    let stopInterval = setInterval(() => {
      console.log(++timer.seconds);
      if (timer.seconds === 59) {
        timer.seconds = 0;
        timer.minutes++;
      } else if (arr.length === 12) {
        clearInterval(stopInterval);
      }
    }, 1000);
    if (timer.timerGo) return;
  }
}

function restartGame() {
  const btn = document.querySelector(".restart");
  btn.addEventListener("click", () => {
    window.location.reload();
  });
}
cards.forEach((card) => card.addEventListener("click", flip));
