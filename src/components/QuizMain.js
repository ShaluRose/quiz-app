import React, { Component } from 'react';
import './QuizMain.css';
import Question from './question/Question';
import Answer from './answer/Answer';

export default class Quiz extends Component {

    state = {
        questions : {
            1: "What US city is the birthplace of Jazz?",
            2: "What is the Capital of Greece",
            3: "What planet was Superman born?"
        },

        answers: {
            1: {
                1: 'Chicago',
                2: 'New Orleans',
                3: 'New York'
            },
            2: {
                1: 'Athens',
                2: 'New Delhi',
                3: 'Patras'
            },
            3: {
                1: 'Krypton',
                2: 'Mars',
                3: 'Earth'
            }
        },
        correctAnswers: {
            1: '2',
            2: '1',
            3: '1'
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
                    <h1>You have Completed the Quiz</h1>
                    <p>Your score is: {score} of {Object.keys(questions).length}</p>
                    <p>Thank You!</p>
                </div>
            )
            }
            </div>
        );
    }
}