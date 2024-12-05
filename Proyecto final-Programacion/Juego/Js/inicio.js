
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

