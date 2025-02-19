import React from "react";

export const Result = ({ score, totalQuestions, result }) => {
  return (
    <>
      <p className="h4 my-4">Your Score: {score}</p>
      <p>Total Questions: {totalQuestions}</p>
      <p>Attempt Questions: {result.answered}</p>
      <p>Correct Answers: {result.right}</p>
      <p>Wrong Answers: {result.wrong}</p>
    </>
  );
};
