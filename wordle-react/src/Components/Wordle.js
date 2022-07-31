export class Wordle_ {
    constructor() {
        this.args = {
            sendButton: document.getElementById('button'),
            text_field: document.getElementsByClassName('content')
        }

        this.state = false;
        this.count = 0;
        this.answer = "";
        this.gameOver = false;
        this.guessed = false;
    }

    display() {
        const {sendButton, text_field} = this.args;

        sendButton.addEventListener('click', () => this.checkWord());

        const node = document.querySelector('#input');
        node.addEventListener("keyup", ({key}) => {
            if (key === "Enter") {
                this.checkWord(text_field)
            }
        })
    }

    checkWord() {
        var textField = document.querySelector('input');
        let text1 = textField.value
        if (text1 === "") {
            return;
        }
        else if(text1.length===5){
            this.fetchdata('/check', true)
        }
        else{
            alert("Enter a word that is 5 characters long");
        }
    }

    fetchdata(route, body_){
        var textField = document.querySelector('input');
        let text1 = textField.value
        fetch(route, {
            method: 'POST',
            body: JSON.stringify(body_ ? { "text": text1.toLowerCase(), "answer" : this.answer } : {}),
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },        
          })
          .then(r => r.json())
          .then(r => {
            this.answer = r.answer;
            var innerJson = r.output;
            var variable = innerJson.error;
            var correct = innerJson.Correct;
            var wrong = innerJson.Wrong;
            if (body_){
                if (variable==="Try again"){
                    alert("This word is not in dictionary")
                }
                else if(variable===null||variable===undefined){
                    this.update_board(text1.toLowerCase(), correct, wrong)
                }
            }
            else{
                // this.answer = response
            }
            textField.value = '';
        }).catch((error) => {
            textField.value = '';
        });
    }

    getWord(){
        this.fetchdata('/newWord', false)
    }

    update_board(word, correct, wrong){
        for (var j = 0; j < word.length; j++) {
            var tile = document.getElementById((this.count).toString() + "-" + j.toString());
            for (var l = 0; l < wrong.length; l++) {
                if (j===wrong[l]){
                    tile.classList.toggle("present");
                }
            }
            for (var k = 0; k < correct.length; k++) {
                if (j===correct[k]){
                    tile.classList.toggle("correct");
                }
            }
            if (word===this.answer){
                this.guessed=true
            }
            if (this.count===6 && j===6){
                this.gameOver=true;
            }
            tile.innerText = word[j].toUpperCase();
        }
        this.count += 1;
        if (this.guessed === false && this.count === 6){
            alert("You lost the word was " + this.answer)
        }
        if (this.guessed === true && this.gameOver){
            alert("You guessed it right! The word was " + this.answer)
        }
    }
}

export function boardGen(){
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
            let tile = document.createElement("span");
            tile.id = i.toString() + "-" + j.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);
        }
    }
}