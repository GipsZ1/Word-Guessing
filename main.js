let row = 0;  
let currentLetter = 0;  
let wordOfToday = ""; 
const wordRow = document.querySelectorAll('.row');  


async function fetchWord() {
    const response = await fetch("https://words.dev-apis.com/word-of-the-day");
    const data = await response.json();
    wordOfToday = data.word.toUpperCase();  
}
fetchWord();


function isALetter(key) {
    return /^[a-zA-Z]$/.test(key);
}


document.addEventListener('keydown', function(e) {
    const key = e.key;
    if (isALetter(key)) {
        addWordIn(key);  
    } else if (key === "Enter") {
        valid();  
    } else if (key === "Backspace") {
        removeLetter();  
    } else {
        console.log("The key you entered can't be used: " + key);
    }
});


function addWordIn(key) {
    if (currentLetter < 5) {  
        wordRow[row].querySelectorAll('.word')[currentLetter].innerHTML = key.toUpperCase();  
        currentLetter++;  }
}   

function removeLetter(){
    if(currentLetter>0){
        currentLetter--;
        wordRow[row].querySelectorAll('.word')[currentLetter].innerHTML=""
        
    } 
}

function valid() {
   const allWord=wordRow[row].querySelectorAll(".word")
   allWord.forEach((key,index)=>{
    const letterFixIndex=wordOfToday.indexOf(key.textContent)

    if(letterFixIndex===index){
        key.classList.add("green")
    }else if(letterFixIndex>0){
        key.classList.add("yellow")
    }else{
        key.classList.add('red')
    }
   })
   row++
   currentLetter=0;
   if(row>5){
    alert("You can't play again")
    return
   }
}
