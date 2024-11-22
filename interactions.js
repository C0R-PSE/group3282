console.log(window.Telegram)
/*window.Telegram.WebApp.requestFullscreen()*/
function buttonPress(button) {
    button.classList.toggle("active")
    testButton.innerHTML = "1<br>" + window.Telegram.WebApp.contentSafeAreaInset.top + "<br>" + window.Telegram.WebApp.safeAreaInset.top
}
var grid = document.querySelector(".grid")
var gridElements = grid.getElementsByTagName('div')
var testButton = grid.querySelector(".test")
for (let i=0; i < gridElements.length; i++) {
    gridElements[i].addEventListener("click", () => buttonPress(gridElements[i]))
}
grid.querySelector(".test").innerHTML = window.Telegram.WebApp.contentSafeAreaInset.top + "<br>" + window.Telegram.WebApp.safeAreaInset.top