console.log(window.Telegram)
window.Telegram.WebApp.requestFullscreen()
function buttonPress(button) {
    button.classList.toggle("active")
}
var grid = document.querySelector(".grid")
var gridElements = grid.getElementsByTagName('div')
for (let i=0; i < gridElements.length; i++) {
    gridElements[i].addEventListener("click", () => buttonPress(gridElements[i]))
}
grid.querySelector(".test").innerHTML = window.Telegram.WebApp.contentSafeAreaInset.top + "<br>" + window.Telegram.WebApp.safeAreaInset.top