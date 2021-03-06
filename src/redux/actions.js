import {
  SET_CATEGORY,
  SET_DIFFICULTY,
  SET_AMOUNT,
  SET_TYPE,
  SET_QUESTIONS,
  SET_CURRENT_INDEX,
  SET_CORRECT,
  RESTART,
} from './actionTypes';

export const setCategory = (value) => ({
  type: SET_CATEGORY,
  value,
});

export const setDifficulty = (value) => ({
  type: SET_DIFFICULTY,
  value,
});

export const setType = (value) => ({
  type: SET_TYPE,
  value,
});

export const setAmount = (value) => ({
  type: SET_AMOUNT,
  value,
});

export const setQuestions = (value) => ({
  type: SET_QUESTIONS,
  value,
});

export const setCurrentIndex = (value) => ({
  type: SET_CURRENT_INDEX,
  value,
});

export const setCorrect = (value) => ({
  type: SET_CORRECT,
  value,
});

export const restart = () => ({
  type: RESTART,
});
