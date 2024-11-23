const botKey = "7976528964:AAEFqVm3gOS2E6GUZfOB9mKv_kMijlhikDM"
const channelId = "-1002270219468"

const openButton = '{"inline_keyboard":[[{"text":"Открыть Журнал","url":"https://t.me/mytestbot2211bot?startapp"}]]}'

async function buttonPress(button) {
    button.classList.toggle("active")
    var pos = timestamps.indexOf(button.innerText)
    checks[pos] = 1 - checks[pos]
    
}
async function confirmPress() { 
    await sendRequest("sendMessage", {
        "chatId" : channelId,
        "text" : JSON.stringify({
            checks,
            timestamps
        })
})}

var JournalMessage = sendRequest("getChat", {"chat_id" : channelId})

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
'https://api.telegram.org/bot7976528964:AAEFqVm3gOS2E6GUZfOB9mKv_kMijlhikDM/sendMessage?chat_id=-1002270219468&text=123&reply_markup='

async function sendRequest(botMethod, options) {
    var url = 'https://api.telegram.org/bot' + botKey + '/' + botMethod + '?'
    for (var i in options) {
        url += "&" + i + "="
        if (typeof(options[i]) == "object") {
            url += JSON.stringify(options[i])
        } else {
            url += options[i]
        }
    }
    await fetch(encodeURI(url)).then(resp => resp.json())
}