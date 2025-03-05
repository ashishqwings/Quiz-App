import './App.css';
import { mcqQuestions } from './questions';
import Question from './Question';
import { useState, useRef } from 'react';

function App() {

  const [index, setIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const answers = useRef({});  //stores what answer we have chosen for which question
  const score = useRef(0);


  function handleNextClick() {
    setIndex(prev => prev + 1);
    console.log(answers.current)
  }

  function handlePreviousClick() {
    setIndex(prev => prev - 1);
  }

  function handleSubmitClick() {

    if(!submitted) {
      mcqQuestions.forEach((ques, index) => {

        if(answers.current[index] && ques.correct === answers.current[index]) {
          score.current += 4;
        }
        else if(answers.current[index]){
          score.current -= 1;
        }
      })
    }
    setSubmitted(true);
  }


  return (
    <div className="App">
      <Question 
        answers={answers}
        index={index}
        submitted={submitted}
        />

      <button 
        onClick={handlePreviousClick} 
        disabled={index == 0}>
          Previous
      </button>

      <button 
        onClick={handleNextClick} 
        disabled={index == mcqQuestions.length - 1}>
          Next
      </button>

      <button 
        onClick={handleSubmitClick}>
        Submit
      </button>

      {submitted && <h1>Your score is: {score.current}</h1>}

    </div>
  );
}

export default App;
