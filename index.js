let currentTime = parseInt(new Date().getTime(), 10)
let endTimeArea = document.querySelector('.endTime')

// 用 API 載入 countdown.json
fetch("https://raw.githubusercontent.com/milkmidi/pre-f2e/main/countdown.json")
  .then((res) => {
    const data = res.json()
    return data
    
  })
  .then((data) => {
  for(let i=0; i< data.length; i++){
    let start = Date.parse(data[i].startDate)
    let end = Date.parse(data[i].endDate)
    
//     判斷是否有有效的時間, 如果有的話回傳endDate
    if (currentTime >= start && currentTime < end){
        endTimeArea.innerText = `Countdown to: ${data[i].endDate}`
        return data[i].endDate
      }
    }
})
  .then((endtime)=> {
  console.log('endtime:',endtime)
  
  let timerId = setInterval(timer, 1000)  //每秒呼叫一次timer function
  let endTime = Date.parse(endtime) || Date.parse('2022-12-31') //endDate 或 2022-12-31 作為終點
  let count = Math.round((endTime- currentTime)/1000) 
  let isPaused = true //使用者未啟動前設為暫停
  
  const countdown = document.querySelector('#countdown')
  const btn = document.querySelector('.btn')
  const timeArea = document.querySelector('.endTime')

  btn.addEventListener('click', pushBtn)
  
   // ---- countdown funtion-------
   //按鈕控制      
  function pushBtn(event){
    let activeBtn = event.target
    
    if(event.target.id === 'start'){
      isPaused = false  //開始計時
      activeBtn.disabled = true   //鎖定開始紐
      activeBtn.nextElementSibling.disabled = false  //解鎖停止鈕
      activeBtn.classList.toggle('active')  //樣式變更
      activeBtn.nextElementSibling.classList.toggle('active')
    } else if (event.target.id === 'stop'){
      isPaused = true
      activeBtn.disabled = true
      activeBtn.previousElementSibling.disabled = false
      activeBtn.classList.toggle('active')
      activeBtn.previousElementSibling.classList.toggle('active')
    }
  }
  
  function timer () {
    if(!isPaused){
      count --
      renderTimer(getDay(count)) 
    }
    if(count === 0){
      clearInterval(timerId)  //時間到停止計時
    }
  }

  // ------time format---------
  function getDay(time){
    let sec = Number(time)
    let calculate = [86400, 3600, 60, 1]  //dd, hh, mm, ss 各為幾秒
    let dayString = []
    if(time <= 0){return} //倒數檢查
    for (let i=0; i< 4; i++){
      dayString.push(Math.floor(sec/calculate[i])) 
      sec = sec % calculate[i]
    }  
    return dayString
  }

  // ---- render view---------
  function renderTimer(dayString){
    countdown.innerText = `${dayString[0]}:${dayString[1]}:${dayString[2]}:${dayString[3]}`
  }

})
  