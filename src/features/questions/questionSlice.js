import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
  answers: [],
};

export const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    initQuestions: (state, action) => {
      state.questions = action.payload;
    },
    updateAnswers: (state, action) => {
      state.answers = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { initQuestions, initAnswers, updateAnswers } = questionSlice.actions;

export default questionSlice.reducer;
