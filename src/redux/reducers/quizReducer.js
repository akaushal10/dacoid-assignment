import data from "../../utils/data.json";
import {
  LOAD_QUIZ,
  RESET_OPTION,
  RESET_QUIZ,
  SELECT_OPTION,
} from "../actions/types";
const initialState = {
  quizData: data,
  loading: false,
  error: null,
};

const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_QUIZ: {
      return {
        ...state,
      };
    }
    case SELECT_OPTION: {
      const { questionId, selectedOption } = action.payload;

      return {
        ...state,
        quizData: state.quizData.map((q) =>
          q.question_id === questionId
            ? {
                ...q,
                answered: selectedOption,
                is_marked: true,
                is_correct:
                  q.type === "multiple_choice"
                    ? selectedOption === q.right_ans
                    : parseInt(selectedOption) === q.right_ans,
              }
            : q
        ),
      };
    }

    case RESET_OPTION: {
      const { questionId } = action.payload;
      return {
        ...state,
        quizData: state.quizData.map((q) =>
          q.question_id === questionId
            ? { ...q, answered: "", is_marked: false, is_correct: false }
            : q
        ),
      };
    }

    case RESET_QUIZ:
      return initialState;

    default:
      return state;
  }
};
export default quizReducer;
