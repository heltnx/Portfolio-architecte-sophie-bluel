let modal = null;

const open_modal = function(event){
    event.preventDefault();
    const target = document.querySelector(event.target.getAttribute('href'));
    const target_index = document.querySelector(event.target.getAttribute('href'));
    target.style.display = null;
    target_index.style.zIndex = "2";
    target.removeAttribute('aria-hidden');
    target.setAttribute('aria-modal', true);
    modal = target;
    modal.addEventListener('click', close_modal);
    modal.querySelector('.js-modal-close').addEventListener('click', close_modal);
}

const close_modal = function(event){
    if (modal === null) return ;
    event.preventDefault();
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', true);
    modal.removeAttribute('aria-modal');
    modal.removeEventListener('click', close_modal);
    modal.querySelector('.js-modal-close').removeEventListener('click', close_modal);
    modal = null;
}

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener("click", open_modal);
});






