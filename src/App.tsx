import { useGSAP } from '@gsap/react';
import './App.css';
import { Suspense, use, useRef } from 'react';
const user = window.Telegram.WebApp.initDataUnsafe.user || {
  id: 1307263371,
  username: "i_corpse_i"
}
console.log(user)

const url = 'https://evstakhii2-0.d-b-17f.workers.dev/'
  //'http://127.0.0.1:8787/'
const dataPromise = fetch(url, {
  method: 'POST',
  body: JSON.stringify({
    accessKeyGroup3282: "1",
    action: "usercheck",
    userId: user.id,
    username: user.username
  })
}).then(resp => resp.json())

const timestamps = ["08:00", "09:50", "11:40", "13:40", "15:30", "17:20", "19:05", "20:50"]
let checks1 = [0, 0, 0, 0, 0, 0, 0, 0]
let checks = [...checks1]

type Data = {
  //check: boolean,
  //checkDate?: string,
  checks?: (0 | 1)[]
  timetable?: lesson[]
}
type lesson = {
  teacher: string,
  subjectType: string,
  week: "1" | "2",
  name: string,
  shortTitle: string,
  start_time: string,
  end_time: string,
  room: string
}

let confirmButton: any

function Lessons() {
  const data = use(dataPromise) as Data
  console.log(data)
  if (data.timetable) {
    if (data.timetable.length > 0) {
      checks = data.checks!
      return (
        <>
          {data.timetable.map((l) => {
            const check = checks[timestamps.indexOf(l.start_time)]
            return <div id={l.start_time} key={l.start_time}
              onClick={(e) => { buttonPress((e.target as Element).closest('.para')!) }}
              className={'para' + ' active'.repeat(check)}>
              <div className='time'>{l.start_time}</div>
              <div className='name'>{`${l.shortTitle} (${l.subjectType})`}</div>
              <div className='room'>{`ауд.${l.room}`}</div>
              <div className='teacher'>{
                l.teacher.split(' ')
                  .map((w, i) => (i == 0) ? w + ' ' : w[0] + '.')
                  .join('')
              }</div>
            </div>
          })}
          <div ref={confirmButton} className='confirm enabled' onClick={(e) => {
            confirmPress()
              .then(() => window.Telegram.WebApp.close())
          }}>Отправить</div>
        </>
      )
    } else {
      return (
        <div className='notif'>Сегодня пар нет</div>
      )
    }
  } else {
    return (
      <div className='notif'>Не нашёл тебя в списке</div>
    )
  }
}
async function buttonPress(button: HTMLDivElement) {
  button.classList.toggle("active")
  var pos = timestamps.indexOf(button.id)
  checks[pos] = 1 - checks[pos]
  if (JSON.stringify(checks) != JSON.stringify(checks1)) {
    confirmButton.current.classList.add("enabled")
  } else {
    confirmButton.current.classList.remove("enabled")
  }
}

async function confirmPress() {
  confirmButton.current.classList.remove("enabled")
  checks1 = [...checks]
  console.log(checks)
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      accessKeyGroup3282: "1",
      action: "check-in",
      userId: user.id,
      username: user.username,
      checks
    })
  })
}

function App() {
  confirmButton = useRef(<></>)

  return (
    <div className="grid">
      <Suspense fallback={'Loading...'}>
        <Lessons />
      </Suspense>
    </div>
  );
}

export default App;