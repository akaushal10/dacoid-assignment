import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetOption, selectOption } from "../redux/actions/quizActions";
import { REVIEW_MODE, TEST_MODE } from "../utils/constants";
import {
  getBoderClassName,
  getLabelClass,
  getQuestionStatus,
  getQuestionStatusClassName,
} from "../utils/helper";

export const MultipleChoiceQuestion = ({
  questionId,
  question,
  options,
  mode,
  is_marked,
  is_correct,
  answered,
  right_ans,
  question_index,
}) => {
  const dispatch = useDispatch();
  const selectedOption = useSelector(
    (state) =>
      state.quiz.quizData.find((q) => q.question_id === questionId)?.answered
  );

  const handleOptionChange = (optionKey) => {
    dispatch(selectOption(questionId, optionKey));
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
          {Object.entries(options).map(([key, value]) => (
            <div
              className={`form-check ${mode == REVIEW_MODE && "ps-0"}`}
              key={key}
            >
              {mode === TEST_MODE && (
                <input
                  className="form-check-input"
                  type="radio"
                  name={question}
                  id={key}
                  checked={selectedOption === key}
                  onChange={() => handleOptionChange(key)}
                />
              )}
              <label
                className={`form-check-label ${
                  mode == REVIEW_MODE &&
                  getLabelClass(is_marked, is_correct, key, answered, right_ans)
                }`}
                htmlFor={key}
              >
                {key}. {value}{" "}
                {mode == REVIEW_MODE && is_marked && key == answered && (
                  <span class="small badge bg-primary">Marked</span>
                )}
              </label>
            </div>
          ))}
        </div>

        <div className="col-3 d-flex align-items-end justify-content-end">
          {" "}
          {mode == TEST_MODE && (
            <button className="btn btn-secondary" onClick={handleReset}>
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
