import React, { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

const Submit = () => {
  const navigate = useNavigate();
  const answers = useSelector((state) => state.questions.answers);
  const questions = useSelector((state) => state.questions.questions);
  let correct = 0, // number of correct answers
    incorrect = 0, // number of incorrect answers
    unanswered = 0; // number of unanswered questions
  for (let i = 0; i < 15; ++i) {
    if (questions[i].correct_answer === answers[i]) correct++;
    else if (answers[i]) incorrect++;
    else unanswered++;
  }

  useEffect(() => {
    // check if questions state is not initialised
    if (!questions.length) {
      navigate("/");
    }
  }, []);

  // data for doughnut chart
  const data = {
    labels: ["Correct", "Incorrect", "Unanswered"],
    datasets: [
      {
        data: [correct, incorrect, unanswered],
        backgroundColor: [
          "rgb(8, 183, 8, 0.4)",
          "rgb(197, 33, 33, 0.4)",
          "rgba(255, 206, 86, 0.4)",
        ],
        borderColor: [
          "rgb(8, 183, 8, 1)",
          "rgb(197, 33, 33, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="submitMain">
      <div className="score">Score: {correct}/15</div>

      <div className="scoreDetails">
        {/* doughnut chart */}
        <div className="doughnut">
          <Doughnut data={data} />
        </div>
        <div className="btnCnt">
          <div
            className="btn"
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </div>

          <div
            className="btn"
            onClick={() => {
              navigate("/quiz");
            }}
          >
            Restart
          </div>

          <div
            className="btn"
            onClick={() => {
              navigate("/answers");
            }}
          >
            View Answers
          </div>
        </div>
      </div>
    </div>
  );
};

export default Submit;
