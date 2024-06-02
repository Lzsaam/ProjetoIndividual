const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const timeEl = document.querySelector("#time");
const board = document.querySelector("#board");
const colors = [
  "#5DADE2",
  "#6C3483",
  "#138D75",
  "#ED6908",
  "#A3E4D7",
  "#D4AC0D",
  "#797D7F",
  "#BDC3C7",
  "#C0392B",
  "#BB8FCE",
];
let time = 0;
let score = 0;
let moveInterval;

startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-btn")) {
    time = parseInt(event.target.getAttribute("data-time"));
    screens[1].classList.add("up");
    startGame();
  }
});

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
});

function startGame() {
  
  createRandomCircle();
  setInterval(decreasetime, 1000);
  moveInterval = setInterval(moveCircles, 750); 
  setTime(time);
}

function decreasetime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
  clearInterval(moveInterval); 
  timeEl.parentNode.classList.add("hide");
  board.innerHTML = `<h1>Seu placar: <span class="primary">${score}</span></h1>`;

}

function createRandomCircle() {
  const circle = document.createElement("div");
  const size = 50; 
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);

  circle.style.background = getRandomColor();
  circle.classList.add("circle");
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;

  board.append(circle);
}

function moveCircles() {
  const circles = document.querySelectorAll(".circle");
  const { width, height } = board.getBoundingClientRect();
  circles.forEach(circle => {
    const size = 50; 
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
  });
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}
