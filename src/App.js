import './App.css';
import { mcqQuestions } from './questions';
import Question from './Question';
import Countdown from './Countdown';
import { useState, useRef, use, useEffect } from 'react';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}


function App() {

  const [index, setIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [renderCount, setRenderCount] = useState(0);
  const [is5050Clicked, setIs5050Clicked] = useState(false);
  const [isPollUsed, setIsPollUsed] = useState(false);
  const [pollResults, setPollResults] = useState({});
  const [timer, setTimer] = useState(5);
  const answers = useRef({});  //stores what answer we have chosen for which question
  const score = useRef(0);

  useEffect(() => {

    if(timer === 1 && index == mcqQuestions.length - 1) {
      setSubmitted(true);
    }

    else if (timer === 0) {
      setIndex(curr => curr + 1);
      setTimer(5);
    }
  }, [timer])



  function handleNextClick() {
    setIndex(prev => prev + 1);
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

  function handleClearClick(){
    console.log(answers.current)
    delete answers.current[index];
    setRenderCount(prev => prev + 1);
    console.log(answers.current)
  }

  function handle5050Click() {
    
    let randomIndex = Math.floor(Math.random() * 4);
    while(mcqQuestions[index].options[randomIndex] === mcqQuestions[index].correct) {
      randomIndex = Math.floor(Math.random() * 4);
    }

    mcqQuestions[index].options = [
      mcqQuestions[index].correct,
      mcqQuestions[index].options[randomIndex]
    ]

    //mcqQuestions = shuffleArray(mcqQuestions);

    setIs5050Clicked(true);
  }

  function handlePollClick() {

    let pollValues = mcqQuestions[index].options.map((option) => {
      if(option === mcqQuestions[index].correct) {
        return 70;
      }
      return 10;
    })

    let obj = {}
    obj[index] = pollValues;
    setPollResults(obj);
    setIsPollUsed(true);
  }


  return (
    <div className="App">
      <Countdown timer={timer} setTimer={setTimer} index={index}/>
      <Question 
        answers={answers}
        index={index}
        submitted={submitted}
        renderCount={renderCount}
        pollResults={pollResults}
      />

      <div className='lifelines'>
        <button 
          className='lifeline'
          disabled={is5050Clicked} 
          onClick={handle5050Click}>
          50-50
        </button>

        <button
          className='lifeline'
          disabled={isPollUsed}
          onClick={handlePollClick}>
          Audience Poll
        </button>
        
      </div>

      <div className='handlers'>

        <button 
          className='handler'
          onClick={handlePreviousClick} 
          disabled={index == 0}>
            Previous
        </button>

        <button 
          className='handler'
          onClick={handleNextClick} 
          disabled={index == mcqQuestions.length - 1}>
            Next
        </button>

        <button 
          className='handler'
          onClick={handleClearClick}>
            Clear
        </button>

        <button 
          className='handler'
          onClick={handleSubmitClick}>
          Submit
        </button>

      </div>

      {submitted && <h1>Your score is: {score.current}</h1>}

    </div>
  );
}

export default App;
