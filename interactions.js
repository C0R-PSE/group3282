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

/*await fetch('https://api.telegram.org/bot7976528964:AAEFqVm3gOS2E6GUZfOB9mKv_kMijlhikDM/sendMessage?chat_id=1307263371&text=' + "test1").then(resp => resp.json())*/
fetch("https://evstakhii.d-b-17f.workers.dev/", {
    method: "POST",
    body: JSON.stringify({
      userId: 1,
      title: "Fix my bugs",
      completed: false
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  }).then(resp => resp.json())
/*console.log(encodeURI(JSON.stringify(window.Telegram)))*/