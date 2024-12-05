let randomNumber;
let guessCount = 0;

let randomNumberTwo;
let gameStarted = false;  

function setRandomNumber() {
  let start = parseInt(document.getElementById('start').value);
  let end = parseInt(document.getElementById('end').value);
  let rangeMessage = document.getElementById('rangeMessage');

  if (gameStarted) {
    location.reload();  
    return; 
  }

  if (isNaN(start) || isNaN(end) || start >= end) {
    rangeMessage.textContent = 'Por favor, ingresa un rango válido.';
    return;
  }
  randomNumberTwo = Math.floor(Math.random() * (end - start + 1)) + start;
  document.getElementById('guessField').disabled = false;
  document.querySelector('.guessSubmit').disabled = false;
  rangeMessage.textContent = `Número aleatorio generado entre ${start} y ${end}. ¡Buena suerte!`;
  console.log(`Número aleatorio generado: ${randomNumberTwo}`);
  
  gameStarted = true;  
}


function checkGuess() {
  let guess = parseInt(document.getElementById('guessField').value);
  guessCount++;
  const guesses = document.querySelector(".guesses");
  const lastResult = document.querySelector(".lastResult");
  const lowOrHi = document.querySelector(".lowOrHi");
  let successSound = document.getElementById('successSound');
  let failSound = document.getElementById('failSound');

  if (guessCount === 1) {
    guesses.textContent = "Intentos anteriores: ";
  }
  guesses.textContent += guess + " ";

  if (guess === randomNumberTwo) {
    lastResult.textContent = `¡Felicidades! Adivinaste el número en ${guessCount} intentos.`;
    lastResult.style.backgroundColor = "#93ff9a";
    lowOrHi.textContent = "";
    successSound.play();
    setGameOver();
  } else if (guessCount === 10) {
    lastResult.textContent = "¡¡¡Fin del juego!!!";
    setGameOver();
  } else {
    lastResult.textContent = "¡Incorrecto!";
    lastResult.style.backgroundColor = "#c7ebfe";
    failSound.play();
    if (guess < randomNumberTwo) {
      lowOrHi.textContent = "¡El número es muy bajo!";
    } else if (guess > randomNumberTwo) {
      lowOrHi.textContent = "¡El número es muy alto!";
    }
  }

  document.getElementById('guessField').value = "";
  document.getElementById('guessField').focus();
}

document.querySelector('.guessSubmit').addEventListener('click', checkGuess);

function setGameOver() {
  document.getElementById('guessField').disabled = true;
  document.querySelector('.guessSubmit').disabled = true;
  
  
  resetButton = document.createElement("button");
  resetButton.textContent = "Iniciar nuevo juego";
  resetButton.classList.add("resetButton"); 
  document.body.append(resetButton);
  
  resetButton.addEventListener("click", resetGame);
}

function resetGame() {
  guessCount = 0;
  const resetParas = document.querySelectorAll(".resultParas p");
  for (let i = 0; i < resetParas.length; i++) {
    resetParas[i].textContent = "";
    location.reload();
  }
  resetButton.parentNode.removeChild(resetButton);
  document.getElementById('guessField').disabled = true;
  document.querySelector('.guessSubmit').disabled = true;
  document.getElementById('rangeMessage').textContent = "";
  document.getElementById('start').value = "";
  document.getElementById('end').value = "";
}

//Control de sonido
const floatingButton = document.querySelector('.floating-button');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.modal__close');

floatingButton.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.add('modal--show');
    startBackgroundMusic();  
});

closeModal.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.remove('modal--show');
});

const backgroundMusic = document.getElementById('backgroundMusic');


const icon = document.querySelector("#icon"), 
      range = document.querySelector("#un-input"), 
      slideValue = document.querySelector(".slide-value");


range.value = 50;
backgroundMusic.volume = range.value / 100; 
slideValue.innerHTML = range.value;  


updateVolumeIcon(range.value);


range.addEventListener("input", () => { 
    let rangeVal = range.value;
    slideValue.innerHTML = rangeVal;

    backgroundMusic.volume = rangeVal / 100;  

    updateVolumeIcon(rangeVal);  
});


function updateVolumeIcon(volume) {
    icon.classList.remove("uil-volume-mute", "uil-volume-down", "uil-volume", "uil-volume-up");

    if (volume > 80) {
        icon.classList.add("uil-volume-up");
    } else if (volume > 30) {
        icon.classList.add("uil-volume");
    } else if (volume > 0) {
        icon.classList.add("uil-volume-down");
    } else {
        icon.classList.add("uil-volume-mute");
    }
}


document.addEventListener('DOMContentLoaded', function() {
    startBackgroundMusic();  
}, false);

function startBackgroundMusic() {
    backgroundMusic.play().catch(error => {
        console.log("No se pudo reproducir la música:", error);
    });
}
