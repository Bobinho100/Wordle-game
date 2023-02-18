// Getting Elements from their dom

const mode = document.getElementById('mode');




const hint = document.getElementById('hint');
const help = document.getElementById('help');
const board1 = document.getElementById('board');
const textHelp = document.getElementById('how');
const widthtextHelp = document.querySelector('child2');

const headWord = document.getElementById('headWord')
const button = document.getElementById('button');
const changeLabel = document.getElementById('lab');

const main = document.getElementById('main');
const body = document.body




mode.addEventListener('click', (event)=>{
  event.preventDefault()
  body.classList.toggle("dark-mode")
  headWord.classList.toggle('white')
  changeLabel.classList.toggle('white')
  mode.classList.toggle('white')
 

})













// Getting the data from the end
var curentWord = {word: ''};









var height = 4; // The number of guesses
var width = 4; //  The number of words


var rows = 0; // Users cureent guessing position
var cols = 0; // Users letter for that attempt

var startOver = false;



window.onload = async () => {
  button.addEventListener('click',()=>{
    button.disabled = true
  })
  const res = await fetch("https://api.masoudkf.com/v1/wordle", {
    headers: {
    "x-api-key": "sw0Tr2othT1AyTQtNDUE06LqMckbTiKWaVYhuirv",
    },
  });
  let json = await res.json();
  let {dictionary} = json;
  curentWord = dictionary[Math.floor(Math.random() * dictionary.length)];
  curentWord.word = curentWord.word.toUpperCase()
  
  var word = curentWord.word
  //console.log(word)
  //console.log(curentWord.hint)
  button.disabled = false;
  const startGame = () => {
    // Creating the game board
  
    for(let row = 0; row < height; row++){
      for (let col = 0; col < width; col++){
        let tile = document.createElement("span");
        tile.id = row.toString() + '-' + col.toString();
        tile.classList.add('tile');
        tile.innerText = "";
        document.getElementById("board").appendChild(tile)
      }
    }
    hint.addEventListener('click', (event)=> {
      event.preventDefault()
      let hintMessage = document.createElement('p')
      hintMessage.classList.add('newHint')
      //hintMessage.id = "hintMess"
      hintMessage.textContent = `hint : ${curentWord.hint}`
      body.appendChild(hintMessage)
    })

    help.addEventListener('click', (event) =>{
      event.preventDefault();
      if (textHelp.style.display === "none"){
        textHelp.style.display = "flex";
      }else{
        textHelp.style.display = "none"
      }
      if(textHelp.style.width === "none"){
        textHelp.style.width = '50%'
      }else{
        textHelp.style.width = "none"
      }


      

    })

  
  
    // Listen for key Press
    document.addEventListener('keyup', (event) => {
      if (startOver) return;
  
      
  
      if("KeyA" <= event.code && event.code <= "KeyZ"){
        const keyBoard = document.createElement('span')
        keyBoard.id = "keyB"
        keyBoard.classList.add('key-text');
        keyBoard.innerHTML = `${event.code[3]}`
        body.appendChild(keyBoard)
        
        if(cols < width){
          let currentTile = document.getElementById(rows.toString() + '-' + cols.toString());
          if(currentTile.innerText == ""){
            currentTile.innerText = event.code[3]
            cols = cols + 1
          }
        }
      }
      else if (event.code == "Backspace"){
        const keyBoard = document.createElement('span')
        keyBoard.id = "keyB"
        keyBoard.classList.add('key-text');
        keyBoard.innerHTML = 'Back'
        body.appendChild(keyBoard)
        


        if (0 < cols && cols <= width){
          cols = cols - 1;
  
        }
        let currentTile = document.getElementById(rows.toString() + '-' + cols.toString());
        currentTile.innerText = "";
      }
      else if (event.code == "Enter"){

        const keyBoard = document.createElement('span')
        keyBoard.id = "keyB"
        keyBoard.classList.add('key-text');
        keyBoard.innerHTML = 'Enter'
        body.appendChild(keyBoard)
        


        const code = document.createElement('h4');
        code.id = 'code'
        code.innerHTML = '&U+23CE'

    
      
        if(cols != width){
          window.alert('first complete the word');
        }
        else if( cols == width){
          modify();
        rows= rows + 1;
        cols = 0;
  
        }
        
      }
      if (!startOver && rows == height){
        startOver = true;
        document.getElementById('answer').innerText = word;
  
      }
    })
  }

  

  const modify = () =>{
    let correct = 0;
    for (let cols = 0; cols < width; cols++){
      let currentTile = document.getElementById(rows.toString() + '-' + cols.toString());
      let letter = currentTile.innerText;


    
      

  
  
      //IS it in the correct position?
  
      if(word[cols] == letter){
        currentTile.classList.add("correct");
        correct = correct + 1;
        if (correct == 4){
          const newDiv = document.createElement('div')
          newDiv.classList.add('image')
          const congratulations = document.createElement('img');
          congratulations.classList.add('congratulations')
          congratulations.src = "https://res.cloudinary.com/mkf/image/upload/v1675467141/ENSF-381/labs/congrats_fkscna.gif"

          let conMessage = document.createElement('p')
          conMessage.classList.add('newHint')
          //hintMessage.id = "hintMess"
          conMessage.textContent = `You guessed the word ${curentWord.word} correctly`

          //body.innerHTML = ''
          //main.appendChild(congratulations)
          newDiv.appendChild(congratulations)

          board1.innerHTML = ""
          body.appendChild(newDiv)
          body.append(conMessage)

          
        }
      }
      else if (word.includes(letter)){
        currentTile.classList.add('present');
      }
    
    
      else {
        currentTile.classList.add('absent')
        //console.log(row)
        if (rows == 3){
          const lost = document.createElement('p')
          lost.id = 'lost';
          lost.classList.add('newHint');
          lost.innerHTML = `You failed to guess the word ${curentWord.word} correctly`
          body.append(lost)
        }
        
      }
  
      if (correct == width){
        startOver = true;

      }
  
  
    }
    

}

 
  startGame()
  button.addEventListener('click', (event)=>{
    event.preventDefault()
    location.reload()

  })

}
  




























  

  


  
