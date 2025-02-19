import { LOAD_QUIZ, RESET_OPTION, RESET_QUIZ, SELECT_OPTION } from "./types";

export const selectOption = (questionId, selectedOption) => ({
  type: SELECT_OPTION,
  payload: { questionId, selectedOption },
});

export const resetOption = (questionId) => ({
  type: RESET_OPTION,
  payload: { questionId },
});

export const resetQuiz = () => ({
  type: RESET_QUIZ,
});

export const loadQuiz = () => ({
  type: LOAD_QUIZ,
});
