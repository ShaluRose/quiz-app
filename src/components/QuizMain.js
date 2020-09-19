import React, { Component } from 'react';
import './QuizMain.css';
import Question from './question/Question';
import Answer from './answer/Answer';

export default class Quiz extends Component {

    state = {
        questions : {
            1: "Which Indian state has a separate Constitution?",
            2: "LED stands for?",
            3: "What is the Capital of Karnataka?"
        },

        answers: {
            1: {
                1: 'Jammu & Kashmir',
                2: 'Goa',
                3: 'Haryana'
            },
            2: {
                1: 'Light Electronic Diode',
                2: 'Low Emitting Diode',
                3: 'Light Emitting Diode'
            },
            3: {
                1: 'Itanagar',
                2: 'Bangalore',
                3: 'Delhi'
            }
        },
        correctAnswers: {
            1: '1',
            2: '3',
            3: '2'
        },
        correctAnswer: 0,
        clickedAnswer: 0,
        step: 1,
        score: 0

    }

    checkAnswer = answer => {
        const { correctAnswers,  step, score} = this.state;
        if(answer === correctAnswers[step]){
            this.setState({  //if the above expression is true, then set the state
                score: score + 1,
                correctAnswer: correctAnswers[step],
                clickedAnswer: answer
            });
        }else{
            this.setState({
                correctAnswer: 0,
                clickedAnswer: answer
            });
        }
    }

    nextStep = step => {
        this.setState({
            step: step + 1,
            correctAnswer: 0,
            clickedAnswer: 0
        });
    }

    render(){
        let { questions, step, answers, correctAnswer, clickedAnswer, score } = this.state;
        return(
            <div className="Content">
            {step <= Object.keys(questions).length ? (<>
            <Question
                question = {questions[step]}
            />
            <Answer
                answer = {answers[step]}
                step = {step}
                checkAnswer = {this.checkAnswer}
                correctAnswer = {correctAnswer}
                clickedAnswer = {clickedAnswer}
            />
            <button
              className = "NextStep"
              disabled={
                  clickedAnswer && Object.keys(questions).length >= step ?
                  false : true
              }
              onClick = {() => this.nextStep(step)}
            >Next</button>
            </>
            ) : (
                <div className= "finalPage">
                    <p id="res">Your Quiz Result!</p>
                    <p>Your score is : {score} out of {Object.keys(questions).length}</p>
                    
                </div>
            )
            }
            </div>
        );
    }
}