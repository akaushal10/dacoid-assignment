import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetOption, selectOption } from "../redux/actions/quizActions";
import { REVIEW_MODE, TEST_MODE } from "../utils/constants";
import {
  getBoderClassName,
  getQuestionStatus,
  getQuestionStatusClassName,
} from "../utils/helper";

export const IntegerQuestion = ({
  questionId,
  question,
  mode,
  is_marked,
  is_correct,
  answered,
  right_ans,
  question_index,
}) => {
  const dispatch = useDispatch();
  const answer = useSelector(
    (state) =>
      state.quiz.quizData.find((q) => q.question_id === questionId)?.answered
  );

  const handleInputChange = (e) => {
    dispatch(selectOption(questionId, e.target.value));
  };
  const handleReset = () => {
    dispatch(resetOption(questionId));
  };
  return (
    <div
      className={`card p-3 my-3 ${
        mode == REVIEW_MODE && getBoderClassName(is_marked, is_correct)
      }`}
    >
      {mode === REVIEW_MODE && (
        <span
          className={`position-absolute top-0 start-50 translate-middle badge rounded-pill ${getQuestionStatusClassName(
            is_marked,
            is_correct
          )}`}
        >
          {getQuestionStatus(is_marked, is_correct)}
        </span>
      )}

      <h5>
        {question_index}. {question}
      </h5>
      <div className="row">
        <div className="col-9">
          {" "}
          <input
            type="number"
            className="form-control"
            placeholder="Enter your answer"
            value={answer}
            disabled={mode == REVIEW_MODE}
            onChange={handleInputChange}
          />
          {mode == REVIEW_MODE && (
            <h6 className="text-success mt-2">Ans : {right_ans}</h6>
          )}
        </div>
        <div className="col-3 d-flex align-items-end justify-content-end">
          {" "}
          {mode == TEST_MODE && (
            <button className="btn btn-secondary" onClick={handleReset}>
              Reset
            </button>
          )}{" "}
        </div>
      </div>
    </div>
  );
};
