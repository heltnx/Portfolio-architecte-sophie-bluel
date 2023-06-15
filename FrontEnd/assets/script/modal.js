const open_modal = function(event){
    event.preventDefault()
    const target = document.querySelector(event.target.getAttribute('href')) 
    target.style.display = null
    target.setAtrribute('aria-hidden', false )
    target.setAtrribute('aria-modal', true )
}
document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener("click", open_modal)
})