import React, { useEffect, useState } from "react";
import QuestionItem from "../components/QuestionItem";
import SubmitModal from "../components/SubmitModal";
import Timer from "../components/Timer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const questions = useSelector((state) => state.questions.questions);
  const [questionNo, setQuestionNo] = useState(0);
  const [answers, setAnswers] = useState(Array(15).fill(undefined));
  const [confirmSubmit, setConfirmSubmit] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // check if questions state is not initialised
    if (!questions.length) {
      navigate("/");
    }
  }, []);

  // handle previous navigation
  const handlePrev = () => {
    if (questionNo > 0) {
      setQuestionNo(questionNo - 1);
    }
  };

  // handle next navigation
  const handleNext = () => {
    if (questionNo < questions.length - 1) {
      setQuestionNo(questionNo + 1);
    }
  };

  return (
    <div className="quizMain">
      {/* submit confirmation modal */}
      {confirmSubmit && (
        <SubmitModal answers={answers} setConfirmSubmit={setConfirmSubmit} />
      )}

      {/* progress bar */}
      <div
        className="progressBar"
        style={{ width: `${((questionNo + 1) / 15) * 100}%` }}
      ></div>

      {/* main questions space */}
      <div className="questionSpace">
        <div className="question">
          {questions.length && (
            <QuestionItem
              {...questions[questionNo]}
              questionNo={questionNo}
              setAnswers={setAnswers}
              answers={answers}
            />
          )}
        </div>
        <div className="navButton">
          <div
            className="btn"
            onClick={handlePrev}
            style={{
              cursor: `${questionNo === 0 ? "not-allowed" : "pointer"}`,
            }}
          >
            Prev
          </div>
          <div
            className="btn"
            onClick={handleNext}
            style={{
              cursor: `${questionNo === 14 ? "not-allowed" : "pointer"}`,
            }}
          >
            Next
          </div>
        </div>
      </div>

      {/* overview panel */}
      <div className="overviewPanel">
        {/* Timer */}
        <div className="timer">
          <Timer mm={30} />
        </div>

        <div>Question: {questionNo + 1}/15</div>

        <div className="overviewPanelQuestions">
          {questions.map((q, ind) => {
            return (
              <div
                className={`qOverviewNo ${
                  answers[ind] !== undefined ? "qNoAnswered" : ""
                }`}
                onClick={() => {
                  setQuestionNo(ind);
                }}
              >
                {ind + 1}
              </div>
            );
          })}
        </div>

        <div
          className="btn"
          onClick={() => {
            setConfirmSubmit(true);
          }}
        >
          Submit
        </div>
      </div>
    </div>
  );
};

export default Quiz;
