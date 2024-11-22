function buttonPress(button) {
    button.classList.toggle("active")
}

console.log(window.Telegram)
/*window.Telegram.WebApp.requestFullscreen()*/

var grid = document.querySelector(".grid")
var gridElements = grid.getElementsByTagName('div')
for (let i=0; i < gridElements.length; i++) {
    gridElements[i].addEventListener("click", () => buttonPress(gridElements[i]))
}