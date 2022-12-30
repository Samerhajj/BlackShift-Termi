import React, { Component } from "react";
import { randomWord } from './words';

import "./hangman.css";
import img0 from "./images/0.jpg";
import img1 from "./images/1.jpg";
import img2 from "./images/2.jpg";
import img3 from "./images/3.jpg";
import img4 from "./images/4.jpg";
import img5 from "./images/5.jpg";
import img6 from "./images/6.jpg";

class Hangman extends Component{
    /**by default, allow  6 guesses and use the images provided*/
    static defaultProps={
        maxWrong:6,
        images:[img0,img1,img2,img3,img4,img5,img6]
    };
    constructor(props){
        super(props);
        
        this.state={
            nWrong:0,
            guessed:new Set(),
            //answer
            answer:randomWord()
        };
        this.handleGuess=this.handleGuess.bind(this);
        this.resetGame=this.resetGame.bind(this);
    }
    
    //reset game with default
    resetGame(){
        this.setState({
            nWrong:0,
            guessed:new Set(),
            answer:randomWord()
        });
    }
     /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord(){
      //constructor
      const{answer,guessed} = this.state;
      return answer
      .split("")
      .map(ltr=>(guessed.has(ltr)? ltr: "_"));
  }
  
  /**handleGuess:handle a guessed letter
   * add to guessed letter
   * if not in answer,increase number in wrong answers
   * */
   handleGuess(evt){
       let ltr=evt.target.value;
       
       this.setState(st=>({
           guessed:st.guessed.add(ltr),
           nWrong:st.nWrong + (st.answer.includes(ltr) ? 0:1)
       }));
   }
   /**generate buttons in array to rendrer*/
   generateButtons(){
       const {handleGuess} = this;
       const{guessed}=this.state;
       return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr,index)=>(
           <button
           key={index}
           value={ltr}
           onClick={handleGuess}
           disabled={guessed.has(ltr)}
           >
           {ltr}
           </button>
       
   ));
   }
   
   /**render game*/
   render(){
       const{nWrong,answer}=this.state;
       const{images,maxWrong}=this.props;
       
       let alternateText=`${this.state.nWrong}wrong guessess`;
       
       return(
           <div className="Hangman">
           <h1>Hangman</h1>
           <img src={images[nWrong]} alt={alternateText}/>
           <p>Number Wrong : {nWrong} </p>
           
           {answer ===this.guessedWord().join("")? <p>You Win</p>:
               (nWrong===maxWrong?
               <div>
               <p>You Lose</p>
               <p>Correct Word is :{answer} </p>
               </div>
               :<div>
               <p className="Hangman-word">{this.guessedWord()}</p>
               <p className="Hangman-btns">{this.generateButtons()}</p>
               </div>)
           }
           
           <button id='reset' onClick={this.resetGame}>Reset Game </button>
           </div>
           );
   }
}

export default Hangman;