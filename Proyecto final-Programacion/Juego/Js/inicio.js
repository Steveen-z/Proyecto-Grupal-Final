
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

backgroundMusic.volume = range.value / 100; 
slideValue.innerHTML = range.value;  

range.addEventListener("input", () => { 
    let rangeVal = range.value;
    slideValue.innerHTML = rangeVal;

    backgroundMusic.volume = rangeVal / 100;  


    icon.classList.remove("uil-volume-mute", "uil-volume-down", "uil-volume", "uil-volume-up");

    if (rangeVal > 80) {
        icon.classList.add("uil-volume-up");
    } else if (rangeVal > 30) {
        icon.classList.add("uil-volume");
    } else if (rangeVal > 0) {
        icon.classList.add("uil-volume-down");
    } else {
        icon.classList.add("uil-volume-mute");
    }
});

function startBackgroundMusic() {

    backgroundMusic.play().catch(error => {
        console.log("No se pudo reproducir la música:", error);
    });
}
