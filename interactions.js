async function buttonPress(button) {
    button.classList.toggle("active")
    var pos = timestamps.indexOf(button.innerText)
    checks[pos] = 1 - checks[pos]
    
}
async function confirmPress() {await fetch('https://api.telegram.org/bot7976528964:AAEFqVm3gOS2E6GUZfOB9mKv_kMijlhikDM/sendMessage?chat_id=-1002270219468&text=' + 
    JSON.stringify({
        checks,
        timestamps
    })
)}

console.log(window.Telegram)
/*window.Telegram.WebApp.requestFullscreen()*/

var timetable = [0, 0, 1, 0, 1, 1, 0, 0]
var timestamps = ["08:00", "09:50", "11:40", "13:40", "15:30", "17:20", "19:05", "20:50"]
var checks = [0, 0, 0, 0, 0, 0, 0, 0]

var grid = document.querySelector(".grid")
for (let i = 0; i < 8; i++) {
    if (timetable[i] == 1) {
        var para = document.createElement("div")
        para.innerText = timestamps[i]
        para.addEventListener('click', (e) =>{buttonPress(e.target)})
        grid.append(para)
    }
}
var confirmButton = document.createElement("div")
confirmButton.innerText = "Отправить"
confirmButton.classList.add("confirm")
confirmButton.addEventListener('click', () =>{confirmPress()})
grid.append(confirmButton)

/*console.log(encodeURI(JSON.stringify(window.Telegram)))*/