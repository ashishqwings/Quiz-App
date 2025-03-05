import { useState } from "react";
import { mcqQuestions } from "./questions";

const Question = ({answers, index, submitted}) => {

    const [selectedOption, setSelectedOption] = useState("");

    let statement = mcqQuestions[index].statement;
    let options = mcqQuestions[index].options;
    let correct = mcqQuestions[index].correct;

    // function shuffleArray(array) {
    //     for (let i = array.length - 1; i > 0; i--) {
    //       const j = Math.floor(Math.random() * (i + 1));
    //       [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    //     }
    //     return array;
    // }

    // options = shuffleArray(options);
    

    function handleChange(e){
        console.log(e.target.value)
        setSelectedOption(e.target.value);
        answers.current = {...answers.current, [index]: e.target.value}
    }

    return ( 
        <div>
            <p>{statement}</p>
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
                            /> {option}
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
            answers.current[index] !== correct
            &&
            <p>-1</p>
            }
            
        </div>
     );
}
 
export default Question;