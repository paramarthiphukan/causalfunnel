import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Timer = ({ mm = 0 }) => {
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);

  const navigate = useNavigate();

  const deadline = new Date();
  deadline.setMinutes(deadline.getMinutes() + mm);

  const getTime = () => {
    const time = Date.parse(deadline) - Date.now();
    if (time < 1000) navigate("/submit");

    setMin(Math.floor((time / 1000 / 60) % 60));
    setSec(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(deadline), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="timer">
      {min} Min:{sec} Sec
    </div>
  );
};

export default Timer;
