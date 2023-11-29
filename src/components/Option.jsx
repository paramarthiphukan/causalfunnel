import React, { useEffect } from "react";
import htmlDecode from "../utils/htmlDecode";
import { useDispatch, useSelector } from "react-redux";
import { updateAnswers } from "../features/questions/questionSlice";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const Option = (props) => {
  const location = useLocation();
  const [select, setSelect] = useState(false);
  const isAnswerShown = location.pathname === "/answers"; // check if current page is the answers page
  const questions = useSelector((state) => state.questions.questions);
  const dispatch = useDispatch();
  const handleSelect = () => {
    // disable select when in answers page
    if (isAnswerShown) {
      return;
    }
    const answers = [...props.answers];
    answers[props.questionNo] = props.op;
    props.setAnswers(answers);
    dispatch(updateAnswers(answers));
    setSelect(true);
  };

  // update select state of option when answer is updated
  useEffect(() => {
    setSelect(props.answers[props.questionNo] === props.op);
  }, [props.answers, props.questionNo]);
  return (
    <div
      // green - select, green - right answer, red - wrong answer
      className={`option ${!isAnswerShown && select ? "optionSelected" : ""}
      ${
        isAnswerShown && props.op === props.answers[props.questionNo]
          ? "optionWrong"
          : ""
      }
      ${
        isAnswerShown && props.op === questions[props.questionNo].correct_answer
          ? "optionSelected"
          : ""
      }`}
      onClick={handleSelect}
    >
      <div className="optionSelectBtn">
        <div className={`${select ? "optionSelectBtnInner" : ""}`}></div>
      </div>
      <div>{htmlDecode(props.op)}</div>
    </div>
  );
};

export default Option;
