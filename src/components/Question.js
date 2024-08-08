import React, { useEffect, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code
  // useEffect to handle the countdown timer
  useEffect(() => {
    // Set up the timer to decrease the timeRemaining every second
    const timerId = setTimeout(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    // Cleanup function to clear the timeout if the component unmounts or before re-running the effect
    return () => clearTimeout(timerId);
  }, [timeRemaining]); // Re-run this effect whenever timeRemaining changes

  // Effect to handle what happens when timeRemaining hits 0
  useEffect(() => {
    if (timeRemaining === 0) {
      setTimeRemaining(10); // Reset the timer
      onAnswered(false); // Notify the parent that the question was not answered in time
    }
  }, [timeRemaining, onAnswered]);
  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
