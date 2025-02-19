export const getBoderClassName = (is_marked, is_correct) => {
  if (!is_marked) return "border-2 border-warning";
  if (is_correct) return "border-2 border-success";
  return "border-2 border-danger";
};

export const getQuestionStatusClassName = (is_marked, is_correct) => {
  if (!is_marked) return "bg-warning";
  if (is_correct) return "bg-success";
  return "bg-danger";
};
export const getQuestionStatus = (is_marked, is_correct) => {
  if (!is_marked) return "Unattempt";
  if (is_correct) return "Right";
  return "Wrong";
};
export const getLabelClass = (
  is_marked,
  is_correct,
  option_key,
  option_marked,
  right_ans
) => {
  if (!is_marked && right_ans == option_key) return "fw-bold text-success";
  if (is_marked && right_ans == option_key) return "fw-bold text-success";
  if (is_marked && !is_correct && option_marked == option_key)
    return "fw-bold text-danger";
  return "";
};
