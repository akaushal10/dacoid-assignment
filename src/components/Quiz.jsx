import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion";
import { IntegerQuestion } from "./IntegerQuestion";
import { loadQuiz, resetQuiz } from "../redux/actions/quizActions";
import { REVIEW_MODE, TEST_MODE } from "../utils/constants";
import { addData, getAllData } from "../utils/dbConnection";
import { Result } from "./Result";

export const Quiz = () => {
  const dispatch = useDispatch();
  const quizData = useSelector((state) => state.quiz.quizData);
  const [mode, setMode] = useState(TEST_MODE);
  const [score, setScore] = useState(0);
  const [isSubmited, setIsSubmited] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [result, setResult] = useState({
    totalQuestion: 10,
    answered: 0,
    notAnswered: 0,
    right: 0,
    wrong: 0,
  });

  const handleSubmit = () => {
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
  const handleStart = () => {
    setIsStarted(true);
    startCountdown();
  };
  const [oldQuiz, setOldQuiz] = useState([]);
  useEffect(() => {
    dispatch(loadQuiz());
    getAllData().then((res) => {
      setOldQuiz([...res]);
    });
  }, []);

  useEffect(() => {
    let timer;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      handleSubmit(); // Call function when time ends
    }

    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  const startCountdown = () => {
    setTimeLeft(30 * 60); // Reset to 30 minutes
    setIsActive(true);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  if (!isStarted) {
    return (
      <div className="container my-4">
        <div className="card">
          <div className="card-body text-center">
            <h2>Quiz Start</h2>
            <div className="d-flex justify-content-center">
              <button className="btn btn-primary" onClick={handleStart}>
                Start
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          {oldQuiz.map((value, index) => {
            return (
              <div className="card my-2" key={index}>
                <div className="card-body text-left">
                  <Result
                    score={value.score}
                    totalQuestions={value.quizData.length}
                    result={value.result}
                  ></Result>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return (
    <div className="container my-4">
      {!isSubmited && (
        <>
          <div className="d-flex justify-content-between">
            <h2 className="mb-3">Quiz</h2>
            <h2>{formatTime(timeLeft)}</h2>
          </div>
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
              <Result
                score={score}
                totalQuestions={quizData.length}
                result={result}
              ></Result>
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
