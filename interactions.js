window.Telegram.WebApp.requestFullscreen()
console.log(window.Telegram)
function buttonPress(button) {
    button.classList.toggle("active")
}
var grid = document.querySelector(".grid")
var gridElements = grid.getElementsByTagName('div')
for (let i=0; i < gridElements.length; i++) {
    gridElements[i].addEventListener("click", () => buttonPress(gridElements[i]))
}