import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { initQuestions } from "../features/questions/questionSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import Loader from "../components/Loader";

const Home = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // function to fetch questions and update state
  const fetchQuestions = async () => {
    const res = await axios.get(`https://opentdb.com/api.php?amount=15`);
    const data = res.data;

    dispatch(initQuestions(data.results));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!validator.isEmail(email)) {
      window.alert("Enter a valid email!");
      setIsLoading(false);
      return;
    }
    await fetchQuestions();
    navigate("/quiz");
    setIsLoading(false);
  };
  return (
    <div className="home">
      {/* loader */}
      {isLoading && <Loader />}
      <div className="homeMain">
        <div className="homeHead">Quiz-App</div>
        <div className="form">
          <label htmlFor="email">Enter Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        {/* button to handle submit event */}
        <div className="btn" onClick={handleSubmit} style={{ margin: "1rem" }}>
          Start Quiz
        </div>
      </div>
    </div>
  );
};

export default Home;
