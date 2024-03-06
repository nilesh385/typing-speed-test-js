const senInput = document.getElementById("senInput");
const showSentenses = document.getElementById("sentenses");
const totalTime = document.getElementById("time");
const misses = document.getElementById("misses");
const showWPM = document.getElementById("wpm");
const showCPM = document.getElementById("cpm");
const trybtn = document.getElementById("try");

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let mistake = 0;
let isTyping = false;
let charIndex = 0;
let timeInterval;
let totalWordsTyped=0;
let correctWords=0;

function getSentences() {
    const lines = [
        "Going to Tokyo was really very fun with my friends.",
        "Lucifer is a god who rules the Hell.",
        "Winter comes after Rainy season, in the months of October to February in India.",
        "Tomorrow there will be a meeting for the students team who registered",
        "Get FREE certificates from Google, Microsoft, and Amazon!",
        "LIVE attendance is compulsory to get the FREE Certificates",
        "Backend Web Development using Node.js, express and JavaScript",
        "Complete website any e-commerce or social media with all functionality",
        "Don't hesitate to contact me for anything at all.",
        "The way to  get started is to Quit Talking and begin doing.",
        "Your Time is limited, so don't waste it living someone else's life.",
        "You must be the change you wish to see in the world.",
        "The only thing we have to fear is Fear itself.",
        "Well DONE is better than Well SAID.",
        "Be yourself, everyone else is already taken.",
        "The only impossible journey is the one you never begin.",
    ];
    const ranIndex = Math.floor(Math.random() * lines.length);
    showSentenses.innerHTML = "";
    for (let char of lines[ranIndex]) {
        // console.log(char);
        showSentenses.innerHTML += `<span>${char}</span>`;
    }
    showSentenses.querySelectorAll("span")[0].style.color = "black";
    showSentenses.style.color = "blue";

    document.addEventListener("keydown",()=>{
        senInput.focus();
    })
}
getSentences();

senInput.addEventListener("input", typingStart);

function typingStart() {
    totalWordsTyped++;
    const totalChar = showSentenses.querySelectorAll("span");
    const typedChar = senInput.value.charAt(charIndex);

    if (charIndex < totalChar.length && timeLeft > 0) {
        if (totalChar[charIndex].innerText === typedChar) {
            totalChar[charIndex].style.color = "rgb(10,255,100)";
            correctWords++;
            // console.log("correct");
        } else {
            mistake++;
            totalChar[charIndex].style.color = "red";
            // console.log("incorrect");
        }
        charIndex++;
    } else {

    }
    //stop the time when sentence is completed
    if (charIndex >= totalChar.length) {
        clearInterval(timeInterval);
        totalTime.innerText = maxTime;
        timeLeft = 0;
        // show mistakes
        misses.innerText=mistake;

        //calculating wpm
        let timeTakenToComplete= 60-maxTime;
        let timeTakenInMins=timeTakenToComplete/60;
        let charsTyped= totalWordsTyped/5;
        let wpm = charsTyped/timeTakenInMins;
        showWPM.innerText=`${wpm.toFixed(2)}`;

        //calculating cpm
        let correctTyped=correctWords/5;
        let cpm=correctTyped/timeTakenInMins;
        showCPM.innerText=`${cpm.toFixed(2)}`

    }
}

senInput.addEventListener("keydown", () => {
    if (!isTyping) {
        startTime();
    }
    
});
function startTime() {
    isTyping = true;

    timeInterval = setInterval(() => {
        maxTime--;
        totalTime.innerText = maxTime;
    }, 1000);

    if (maxTime <= 0) {
        clearInterval(timeInterval);
    }
}

trybtn.addEventListener("click", () => {
    window.location.reload();
});
