const botKey = "8101030731:AAEL3fG6Pj17wmsxx2NGM7HRWZ-lJybivaw"
//const channelId = "-1002270219468"
//const openButton = '{"inline_keyboard":[[{"text":"Открыть Журнал","url":"https://t.me/mytestbot2211bot?startapp"}]]}'
const platformCheck = window.Telegram.WebApp.platform != "unknown"
var user
var userCheck
if (platformCheck) {
    user = window.Telegram.WebApp.initDataUnsafe.user
} else {
    user = {
        id: 1307263371,
        username: "i_corpse_i"
    }
}
console.log(user)

if (user.id == 1235009002) { // лиза
//} else if (user.id == 1307263371) { // я
} else {
    userCheck = await fetch('https://evstakhii.d-b-17f.workers.dev/', {
        method: 'POST',
        body: JSON.stringify({
            accessKeyGroup3282 : "1",
            query : "usercheck",
            userId : user.id,
            username : user.username
        })
    }).then(resp => resp.json())
    //window.Telegram.WebApp.requestFullscreen()
    
    var timetable = await fetch('https://evstakhii.d-b-17f.workers.dev/', {
        method: 'POST',
        body: JSON.stringify({
            accessKeyGroup3282 : "1",
            query : "timetable"
        })
    }).then(resp => resp.json());
    var grid = document.querySelector(".grid")
    if (timetable.indexOf(1) >= 0) { // если пары есть
        var timestamps = ["08:00", "09:50", "11:40", "13:40", "15:30", "17:20", "19:05", "20:50"]
        var checks1 = [0, 0, 0, 0, 0, 0, 0, 0]
        var checks = [...checks1]
        
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
        confirmButton.classList.add("enabled")
        confirmButton.addEventListener('click', (e) =>{confirmPress(e)})
        grid.append(confirmButton)
    } else { // если пар нет
        var notif = document.createElement("div")
        notif.classList.add("no_classes")
        notif.innerText = "Сегодня занятий нет"
        grid.append(notif)
    }
    if (userCheck.check && (userCheck.update != "none")) {
        setTimeout(() => alert("Обновил твой " + userCheck.update + "."), 100)
    }
}




//console.log(encodeURI(JSON.stringify(window.Telegram)))

async function sendTgRequest(botMethod, options) {
    var url = 'https://api.telegram.org/bot' + botKey + '/' + botMethod + '?'
    for (var i in options) {
        url += "&" + i + "=" + options[i]
    }
    var data = await fetch(url).then(resp => resp.json())
    return data.result
}
async function buttonPress(button) {
    button.classList.toggle("active")
    var pos = timestamps.indexOf(button.innerText)
    checks[pos] = 1 - checks[pos]
    if (JSON.stringify(checks) != JSON.stringify(checks1)) {
        confirmButton.classList.add("enabled")
    } else {
        confirmButton.classList.remove("enabled")
    }
}
async function confirmPress(event) { 
    await fetch('https://evstakhii.d-b-17f.workers.dev/', {
        method: 'POST',
        body: JSON.stringify({
            accessKeyGroup3282 : "1",
            query : "check-in",
            userId : user.id,
            username : user.username,
            checks
        })
    })
    event.target.classList.remove("enabled")
}