const botKey = "7976528964:AAEFqVm3gOS2E6GUZfOB9mKv_kMijlhikDM"
const channelId = "-1002270219468"
const JournalMessage = (await sendRequest("getChat", {chat_id : channelId})).pinned_message
var Journal = JSON.parse(JournalMessage.text)
console.log(Journal)
const user = window.Telegram.WebApp.initDataUnsafe.user
if (user) {
    await sendRequest("sendMessage", {chat_id : channelId, text : user.username})
}
//const openButton = '{"inline_keyboard":[[{"text":"Открыть Журнал","url":"https://t.me/mytestbot2211bot?startapp"}]]}'

async function buttonPress(button) {
    button.classList.toggle("active")
    var pos = timestamps.indexOf(button.innerText)
    checks[pos] = 1 - checks[pos]
    
}
var date = new Date().toISOString()
date = date.slice(0, date.indexOf("T"))
async function confirmPress() { 
    if (user) {
    await sendRequest("sendMessage", {
        chat_id : channelId,
        text : JSON.stringify({
            username:user.username,
            checks:checks
        })})
    } else {
        console.log("not in Telegram")
    }
}


console.log(window.Telegram)
//window.Telegram.WebApp.requestFullscreen()

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

//console.log(encodeURI(JSON.stringify(window.Telegram)))

async function sendRequest(botMethod, options) {
    var url = 'https://api.telegram.org/bot' + botKey + '/' + botMethod + '?'
    for (var i in options) {
        url += "&" + i + "=" + options[i]
    }
    var data = await fetch(url).then(resp => resp.json())
    return data.result
}