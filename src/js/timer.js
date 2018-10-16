
//create a start stop button with a changing
//mode attribute
const button = document.getElementById("button")
button.setAttribute("onclick","toggle()")

function playSound(){
    let audio = new Audio("notification.wav")
    audio.play();
}

//create a custom event to alert when the timer expires
let timer_end = new CustomEvent("timer_end")

//variables to hold the setInterval references 
let fiveminutebreak, studyTimer

//create memory of the timer cycles
let round = 0

//grab the timer elements from the DOM
let minutes = document.getElementById("minutes")
let seconds = document.getElementById("seconds")

//save the time amount corresponding to seconds/minutes
//for reference when the timer is toggled
let memory  = {
    minutes: 25,
    seconds: 0,
    timerType: "study",
    timerStatus: 0 //0 = timer off, 1 = timer on
}



//toggle timer button logic
function toggle(){
    
    
    //get the mode attribute of the start/stop button
    let mode = memory.timerStatus
    //if the timer is off when pressed
    if(!mode){
        //show mode in DOM
        let status = document.getElementById("timer-mode")
        status.innerText = memory.timerType.toUpperCase()
        //set the timer status to active
        memory.timerStatus = 1
        //make the button read as STOP
        button.innerHTML = "PAUSE"
        button.setAttribute("mode","pause")
        //if the active timer type is study
        mode.innerText = memory.timerType
        if(memory.timerType === "study"){
            //start the timer (again)
            return initiateStudy()
        }else{
            //start the break timer (again)
            return initiateBreak()
        }
    }else{
        button.innerHTML = "START"
        button.setAttribute("mode","start")
        //if the timer is on when pressed
        memory.timerStatus = 0
        if(memory.timerType === "study"){
            //stop the study timer
            clearInterval(studyTimer)
        }else{
            //stop the break  timer
            clearInterval(fiveminutebreak)
        }
    }
}

//increase the timer every second until 25 minutes
function initiateStudy(){
    // memory.minutes = 0
    // memory.seconds = 0
    memory.minutes = memory.minutes
    minutes.innerHTML = memory.minutes
    studyTimer = setInterval(()=>{
    if(memory.minutes==0&&memory.seconds==0){
        
        seconds.innerHTML = '0' + memory.seconds
        document.dispatchEvent(add_tomato)
        document.dispatchEvent(timer_end)
        return clearInterval(studyTimer)
    }
    if(memory.seconds == 0){
        memory.seconds = 59
        memory.minutes--
        minutes.innerHTML = memory.minutes
    }
    if(memory.seconds<10){
        seconds.innerHTML = '0' + memory.seconds
    }else{
        seconds.innerHTML = memory.seconds
    }
    memory.seconds--
    },5)
} 

//increase the timer every second until 5 minutes
function initiateBreak(){
    seconds.innerHTML = memory.seconds
    minutes.innerHTML = memory.minutes
    fiveminutebreak = setInterval(()=>{
        if(memory.minutes===0&&memory.seconds==0){
            seconds.innerHTML = '0' + memory.seconds
            document.dispatchEvent(timer_end)
            return clearInterval(fiveminutebreak)
        }
        if(memory.seconds == 0){
            memory.seconds = 59
            memory.minutes--
            minutes.innerHTML = memory.minutes
        }
        if(memory.seconds<10){
            seconds.innerHTML = '0' + memory.seconds
        }else{
            seconds.innerHTML = memory.seconds
        }
        memory.seconds--
    },5)
} 

document.addEventListener("timer_end", ()=>{
    
    playSound()
    let modaltext = document.getElementById("modal-notification")
    if(memory.timerType === "study"){
        modaltext.innerText = "It's time to take a break"
    }else{
        modaltext.innerText = "It's timer to study"
    }
    let modal = document.getElementById("myModal")
    modal.style.display = "block";
    let modalbutton = document.getElementsByClassName("close")[0]
    modalbutton.onclick = ()=>{modal.style.display = "none"}

    if(memory.timerType === "break"){
        clearInterval(studyTimer)
        memory.timerType = "study"
        memory.minutes = 25
        memory.seconds = 0
    }else{
        clearInterval(fiveminutebreak)
        memory.timerType = "break"
        memory.minutes = 5
        memory.seconds = 0
    }
    if(round>3){
        console.log(round)
        clearInterval(studyTimer)
    }
    memory.timerStatus = 0
    button.innerHTML = "START"
    button.setAttribute("mode","start")

    
    // if(activeTimerType ==="study"){
    //     round++
    //     console.log(round)
    //     return initiateBreak()
    // }else{
    //     return initiateStudy()
    // }
})

//considering making timer into a class to be substantiated 
//whenever a timer is needed 
//this could be handed customized length durations
// class Timer{
//     constructor(studyLength, breakLength){
//         this.memory = {
//             studyLength,
//             breakLength,
//             minutes:studyLength,
//             seconds: 0,
//             round: 0,
//             activeTimer: studyLength
//         }
//         this.interval = setInterval((activeTimer)=>{

//         },100)
//     }
//     start = function(){

//     }

//     stop = function(){
        
//     }
// }