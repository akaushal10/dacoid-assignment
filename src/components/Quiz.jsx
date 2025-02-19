import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion";
import { IntegerQuestion } from "./IntegerQuestion";
import { loadQuiz, resetQuiz } from "../redux/actions/quizActions";
import { REVIEW_MODE, TEST_MODE } from "../utils/constants";
import { addData } from "../utils/dbConnection";

export const Quiz = () => {
  const dispatch = useDispatch();
  const quizData = useSelector((state) => state.quiz.quizData);
  useEffect(() => {
    dispatch(loadQuiz());
  }, []);
  const [mode, setMode] = useState(TEST_MODE);
  const [score, setScore] = useState(0);

  const [isSubmited, setIsSubmited] = useState(false);
  const [result, setResult] = useState({
    totalQuestion: 10,
    answered: 0,
    notAnswered: 0,
    right: 0,
    wrong: 0,
  });

  const handleSubmit = () => {
    // dispatch(resetQuiz());
    let tempResult = {
      totalQuestion: quizData.length,
      answered: 0,
      notAnswered: 0,
      right: 0,
      wrong: 0,
    };
    let tempScore = 0;
    quizData.forEach((que) => {
      if (que.is_marked) {
        tempResult.answered++;
        if (que.is_correct) {
          tempScore += 2;
          tempResult.right++;
        } else {
          tempScore -= 1;
          tempResult.wrong++;
        }
      }
    });
    setResult({
      ...tempResult,
      notAnswered: quizData.length - tempResult.answered,
    });
    let quizResult = {
      id: `quiz${Math.floor(Date.now() / 1000)}`,
      result: tempResult,
      score: tempScore,
      quizData: quizData,
    };
    addData(quizResult);
    setScore(tempScore);
    setIsSubmited(true);
  };
  const handleRetake = () => {
    setMode(TEST_MODE);
    setIsSubmited(false);
    dispatch(resetQuiz());
  };
  const handleReview = () => {
    setMode(REVIEW_MODE);
    setIsSubmited(false);
  };
  return (
    <div className="container my-4">
      {!isSubmited && (
        <>
          <h2 className="mb-3">Quiz</h2>
          {quizData.map((q, index) =>
            q.type === "multiple_choice" ? (
              <MultipleChoiceQuestion
                key={q.question_id}
                questionId={q.question_id}
                question={q.question}
                is_marked={q.is_marked}
                is_correct={q.is_correct}
                options={q.options}
                answered={q.answered}
                mode={mode}
                right_ans={q.right_ans}
                question_index={index + 1}
              />
            ) : (
              <IntegerQuestion
                key={q.question_id}
                questionId={q.question_id}
                question={q.question}
                is_marked={q.is_marked}
                is_correct={q.is_correct}
                answered={q.answered}
                mode={mode}
                right_ans={q.right_ans}
                question_index={index + 1}
              />
            )
          )}
          <div className="text-center">
            {mode == TEST_MODE && (
              <button className="btn btn-primary mt-3" onClick={handleSubmit}>
                Submit Quiz
              </button>
            )}
            {mode == REVIEW_MODE && (
              <button className="btn btn-primary mt-3" onClick={handleRetake}>
                Retake Quiz
              </button>
            )}
          </div>
        </>
      )}
      {isSubmited && (
        <>
          <div className="card">
            <div className="card-body text-center">
              <h3>Quiz Completed!</h3>
              <p className="h4 my-4">Your Score: {score}</p>
              <p>Total Questions: {quizData.length}</p>
              <p>Attempt Questions: {result.answered}</p>
              <p>Correct Answers: {result.right}</p>
              <p>Wrong Answers: {result.wrong}</p>
              <div>
                <button onClick={handleRetake} className="btn btn-primary">
                  Retake
                </button>

                <button onClick={handleReview} className="ms-2 btn btn-info">
                  Review
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
