import React, { useEffect } from "react";
import Option from "./Option";
import htmlDecode from "../utils/htmlDecode";

// function to randomly shuffle the options array
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const QuestionItem = (props) => {
  const options = [...props.incorrect_answers, props.correct_answer];

  useEffect(() => {
    shuffle(options); // shuffle the array
  }, []);

  return (
    <div className="qItem">
      <div className="qItemQuestion">
        <span style={{ marginRight: "10px" }}>{props.questionNo + 1}.</span>
        {htmlDecode(props.question)}
        <span style={{ marginLeft: "5px" }}>
          Difficulty: {props.difficulty}
        </span>
      </div>

      <div className="qItemOptions">
        {options.map((op) => {
          return (
            <Option
              op={op}
              answers={props.answers}
              setAnswers={props.setAnswers}
              questionNo={props.questionNo}
            />
          );
        })}
      </div>
    </div>
  );
};

export default QuestionItem;
