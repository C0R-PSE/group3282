async function buttonPress(button) {
    button.classList.toggle("active")
}

console.log(window.Telegram)
/*window.Telegram.WebApp.requestFullscreen()*/

var grid = document.querySelector(".grid")
var gridElements = grid.getElementsByTagName('div')
for (let i=0; i < gridElements.length; i++) {
    gridElements[i].addEventListener("click", () => buttonPress(gridElements[i]))
}

await fetch('https://api.telegram.org/bot6456899038:AAF77UCiYBe2dfdVsmIy9l5NiM2bkMYQADo/sendMessage?chat_id=1307263371&text=' + JSON.stringify(window.Telegram)).then(resp => resp.json())