import { useGSAP } from '@gsap/react';
import './App.css';
import { Suspense, use, useRef } from 'react';
import gsap from 'gsap';
const user = window.Telegram.WebApp.initDataUnsafe.user || {
  id: 1307263371,
  username: "i_corpse_i"
  //id: 1235009002,
  //username: "manulzivnul"
}
//console.log(user)

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
let checks1: (0 | 1)[] = [0, 0, 0, 0, 0, 0, 0, 0]
let checks: (0 | 1)[] = [...checks1]
let data: Data

type Data = {
  //check: boolean,
  checkdate?: string
  fulldate: string
  checks?: (0 | 1)[]
  groupchecks?: {
    name: string
    checks: (0 | 1)[]
    checkdate: string
  }[]
  timetable?: lesson[]
  role: "unknown" | "student" | "starosta"
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

async function buttonPress(button: HTMLDivElement) {
  button.closest('.para_wrapper')!.classList.toggle("active")
  if (data.role === "student") {
    var pos = timestamps.indexOf(button.id)
    checks[pos] = 1 - checks[pos] as 0 | 1
    if (JSON.stringify(checks) !== JSON.stringify(checks1) || !checks.includes(1)) {
      confirmButton.current.classList.add("enabled")
    } else {
      confirmButton.current.classList.remove("enabled")
    }
  }
}

async function confirmPress() {
  confirmButton.current.classList.remove("enabled")
  checks1 = [...checks]
  //console.log(checks)
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
  confirmButton = useRef(null)

  useGSAP(() => {
    gsap.to('img.logo', { rotate: 360, duration: 12, repeat: -1, ease: "none" })
  })
  return (
    <>

      <Suspense fallback={<img className='logo' alt=''
        style={{ width: 200, height: 200, marginTop: 100 }}
        src='./logo.png' />}>
        <Lessons />
      </Suspense>
    </>
  );
}

function Lessons() {
  data = use(dataPromise) as Data

  useGSAP(() => {
    gsap.from('.grid > div:not(.notif)', {
      y: 100,
      opacity: 0,
      duration: .25,
      stagger: 0.1
    })
  })
  if (data.role === "unknown" || !data.timetable) {
    return <div className='notif'>Не нашёл тебя в списке</div>
  } else {
    if (data.timetable.length === 0) {
      return <div className='notif'>Сегодня пар нет</div>
    } else {
      if (data.checkdate === data.fulldate) {
        checks1 = data.checks!
        checks = [...checks1]
      }
      //console.log(checks)
      const role = data.role
      return (
        <div className={`grid ${role}`}>
          {data.timetable.map((lesson) => <LessonButton
            l={lesson} role={role} groupchecks={data.groupchecks!} fulldate={data.fulldate} />)}
          <ConfirmButton />
        </div>
      )
    }
  }
}

function LessonButton({ l, role, groupchecks, fulldate }: {
  l: lesson, role: "student" | "starosta", groupchecks: {
    name: string
    checks: (0 | 1)[]
    checkdate: string
  }[], fulldate: string
}) {
  const check = (checks) ? checks[timestamps.indexOf(l.start_time)] : 0
  //console.log(check)
  return (
    <div className={'para_wrapper' + ' active'.repeat(check)}>
      <div className='para'
        onClick={(e) => { buttonPress((e.target as Element).closest('.para')!) }}
        id={l.start_time} key={l.start_time}>
        <div className='time'>{l.start_time}</div>
        <div className='name'>{`${l.shortTitle} (${l.subjectType})`}</div>
        <div className='room'>{`ауд.${l.room}`}</div>
        <div className='teacher'>{
          l.teacher.split(' ')
            .map((w, i) => (i === 0) ? w + ' ' : w[0] + '.')
            .join('')
        }</div>
      </div>
      {(role === "starosta") ? <div className='groupchecks_wrapper'>
        <div className='groupchecks'>
          {groupchecks.filter((s) => s.checks[timestamps.indexOf(l.start_time)] && s.checkdate === fulldate).map((s) => (
            <div className='student_name'>{s.name}</div>
          ))}
        </div>
      </div> : ''}
    </div>
  )
}

function ConfirmButton() {
  async function remind() {
    await fetch('https://evstakhii2-0.d-b-17f.workers.dev/', {
      method: "POST",
      body: JSON.stringify({ callback_query: { data: "напомни", id: "0" } })
    })
  }
  const enabled = (data.role === "starosta" || !checks.includes(1)) ? ' enabled' : ''
  const handler = (data.role === "starosta")
    ? () => confirmPress().then(() => window.Telegram.WebApp.close())
    : async () => remind()

  return (
    <div className={`confirm${enabled}`}
      ref={confirmButton}
      onClick={handler}>
      {(data.role === "starosta") ? 'Напомнить' : 'Отправить'}
    </div>)
}

export default App;