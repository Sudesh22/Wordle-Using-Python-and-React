import React from "react"
import {Wordle_, boardGen} from './Wordle'

window.onload = function(){
    boardGen();
    const wordle = new Wordle_();
    wordle.display();
    wordle.getWord();
}

export default function Main(){
    return(
        <main>
            <div id="board"></div>
            <br/>
            <div className="content">
                <input type="text" autoComplete="off" placeholder="Type your guess!" id="input"/>
                <button id="button">Submit</button>
            </div>
        </main>
    )
}




























