import { useEffect, useState } from "react";
import { mcqQuestions } from "./questions";

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

const Question = ({answers, index, submitted, renderCount}) => {

    const [selectedOption, setSelectedOption] = useState("");
  
    let statement  = mcqQuestions[index].statement;
    let options    = mcqQuestions[index].options;
    let correct    = mcqQuestions[index].correct;
    let difficulty = mcqQuestions[index].difficulty;

    
    useEffect(() => {
        if(answers.current[index]) {
            setSelectedOption(answers.current[index]);
        } else {
            setSelectedOption("");
        }
    }, [index, renderCount]);  


    function handleChange(e){
        setSelectedOption(e.target.value);
        answers.current = {...answers.current, [index]: e.target.value}
        
    }

    return ( 
        <div>
            <p>{index + 1 + ". " + statement}</p>
            <div className={"difficulty " + difficulty}></div>
            {
                options.map(option => (
                    <>
                    <label>
                        <input 
                            onChange={(e) => handleChange(e)} 
                            type="radio" 
                            name="option" 
                            value={option} 
                            checked={selectedOption === option}
                        /> 
                        {option}
                    </label>
                    <br/>
                    </>
                ))
            }
            {
            submitted 
            && 
            answers.current[index] === correct
            &&
            <p>+4</p>
            }

            {
            submitted 
            &&
            answers.current[index] 
            &&
            answers.current[index] !== correct
            &&
            <p>-1</p>
            }
            
        </div>
     );
}
 
export default Question;