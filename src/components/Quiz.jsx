import React, { useState } from "react";

//style
import styles from "./Quiz.module.css";

function Quiz() {

    const data = [
        {
          "question": "Which is the most popular JavaScript framework?",
          "options": [
            "Angular",
            "React",
            "Svelte",
            "Vue"
          ],
          "correctOption": 1,
          "points": 10
        },
        {
          "question": "Which company invented React?",
          "options": [
            "Google",
            "Apple",
            "Netflix",
            "Facebook"
          ],
          "correctOption": 3,
          "points": 10
        },
        {
          "question": "What's the fundamental building block of React apps?",
          "options": [
            "Components",
            "Blocks",
            "Elements",
            "Effects"
          ],
          "correctOption": 0,
          "points": 10
        },
        {
          "question": "What's the name of the syntax we use to describe the UI in React components?",
          "options": [
            "FBJ",
            "Babel",
            "JSX",
            "ES2015"
          ],
          "correctOption": 2,
          "points": 10
        },
        {
          "question": "How does data flow naturally in React apps?",
          "options": [
            "From parents to children",
            "From children to parents",
            "Both ways",
            "The developers decides"
          ],
          "correctOption": 0,
          "points": 10
        },
        {
          "question": "How to pass data into a child component?",
          "options": [
            "State",
            "Props",
            "PropTypes",
            "Parameters"
          ],
          "correctOption": 1,
          "points": 10
        },
        {
          "question": "When to use derived state?",
          "options": [
            "Whenever the state should not trigger a re-render",
            "Whenever the state can be synchronized with an effect",
            "Whenever the state should be accessible to all components",
            "Whenever the state can be computed from another state variable"
          ],
          "correctOption": 3,
          "points": 30
        },
        {
          "question": "What triggers a UI re-render in React?",
          "options": [
            "Running an effect",
            "Passing props",
            "Updating state",
            "Adding event listeners to DOM elements"
          ],
          "correctOption": 2,
          "points": 20
        },
        {
          "question": "When do we directly \"touch\" the DOM in React?",
          "options": [
            "When we need to listen to an event",
            "When we need to change the UI",
            "When we need to add styles",
            "Almost never"
          ],
          "correctOption": 3,
          "points": 20
        },
        {
          "question": "In what situation do we use a callback to update state?",
          "options": [
            "When updating the state will be slow",
            "When the updated state is very data-intensive",
            "When the state update should happen faster",
            "When the new state depends on the previous state"
          ],
          "correctOption": 3,
          "points": 30
        },
        {
          "question": "If we pass a function to useState, when will that function be called?",
          "options": [
            "On each re-render",
            "Each time we update the state",
            "Only on the initial render",
            "The first time we update the state"
          ],
          "correctOption": 2,
          "points": 30
        },
        {
          "question": "Which hook to use for an API request on the component's initial render?",
          "options": [
            "useState",
            "useEffect",
            "useRef",
            "useReducer"
          ],
          "correctOption": 1,
          "points": 10
        },
        {
          "question": "Which variables should go into the useEffect dependency array?",
          "options": [
            "Usually none",
            "All our state variables",
            "All state and props referenced in the effect",
            "All variables needed for clean up"
          ],
          "correctOption": 2,
          "points": 30
        },
        {
          "question": "An effect will always run on the initial render.",
          "options": [
            "True",
            "It depends on the dependency array",
            "False",
            "In depends on the code in the effect"
          ],
          "correctOption": 0,
          "points": 30
        },
        {
          "question": "When will an effect run if it doesn't have a dependency array?",
          "options": [
            "Only when the component mounts",
            "Only when the component unmounts",
            "The first time the component re-renders",
            "Each time the component is re-rendered"
          ],
          "correctOption": 3,
          "points": 20
        }
    ];
    
    //states
    const[currentQuestion, setCurrentQuestion] = useState(0);
    const[selectedOption,setSelectedOption] = useState(null);
    const[finished,setFinished] = useState(false);
    const[score,setScore] = useState(0);
    const[answered, setAnswered] = useState(false);

    //functions
    const handleAnswer = (index) => {
      if (answered) return;

        setSelectedOption(index);
        setAnswered(true);

      if (index === data[currentQuestion].correctOption) {
        setScore(prevScore => prevScore + data[currentQuestion].points);
      }
    };

    const nextHandler = () =>{

        // if (selectedOption === data[currentQuestion].options[data[currentQuestion].correctOption]) {
        //     setScore(score + data[currentQuestion].points);
        // }

        if (currentQuestion < data.length - 1) {
          setCurrentQuestion(prev => prev + 1);
          setSelectedOption(null);
          setAnswered(false);
        }

        else {
            setFinished(true);
        }
    };

  //progress bar
  const progress = ((currentQuestion + 1) / data.length) * 100;

  return (
    <div className={styles.container}>
        <div className={styles.title}>
            <img src="/logo.jpg" alt="react-icon"/>
            <h1>The React Quiz</h1>
        </div>
        <div className={styles.line}>
          <div className={styles.progressBar}
          style={ { width: `${progress}%`}}>

          </div>
        </div>

      {finished ? 
          <div className={styles.final}>
            <h2>
              your final score: {score}   !!!
            </h2>
          </div>
          :
          <div>
              <div className={styles.status}>
                <p>
                  Question {currentQuestion+1}/15
                </p>
                <p>
                   Your Score: {score}/280 
                </p>
              </div>
              <h3 className={styles.question}>
                {data[currentQuestion].question}
              </h3>
              {data[currentQuestion].options.map((option, index) =>{

                let backgroundColor = "#fff";
                if (answered) {
                  if (index === data[currentQuestion].correctOption) {
                      backgroundColor = "lightgreen";
                  } 
                  else if (index === selectedOption) {
                      backgroundColor = "lightcoral"; 
                  }
              }
                   return(
                     <li
                     disabled={answered}
                     style={{
                         backgroundColor:
                             selectedOption === null ? "#fff" : 
                             index === data[currentQuestion].correctOption ? "lightgreen" : 
                             index === selectedOption ? "lightcoral" : "#fff"
                     }}
                       onClick={() => handleAnswer(index)}
                      >
                     {option}
                     </li>
                   );
                })
              }
              <button onClick={nextHandler}
                      disabled={!answered}>
                Next
              </button>
            </div>
      }
    </div>
  )
};

export default Quiz;