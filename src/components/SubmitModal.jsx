import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SubmitModal = (props) => {
  const [attempted, setAttempted] = useState(0);
  const navigate = useNavigate();

  // To track attempted questions
  useEffect(() => {
    let cnt = 0;
    props.answers.forEach((ans) => {
      if (ans) cnt++;
    });
    setAttempted(cnt);
  }, [props.answers]);

  return (
    <div className="modalCnt">
      <div className="modal">
        <div>
          You have attempted {attempted}/15 questions. Do you wish to submit?
        </div>
        <div className="btnCnt">
          <div
            className="btn"
            onClick={() => {
              navigate("/submit");
            }}
          >
            Submit
          </div>
          <div
            className="btn"
            onClick={() => {
              props.setConfirmSubmit(false);
            }}
          >
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitModal;
