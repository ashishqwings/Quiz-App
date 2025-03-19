import { mcqQuestions } from "./questions";


function Palette({setIndex, questionsStatus}) {

    function handleClick(e) {
        setIndex(parseInt(e.target.value));
    }


    return(
        <div className={"Palette"}>

            {mcqQuestions.map((question, index) => (
                <button 
                    onClick={(e) => handleClick(e)}
                    value={index}
                    className={"palette-button " + questionsStatus[index]}>{index + 1}</button>
            ))}

        </div>
    )

}

export default Palette;
