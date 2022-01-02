import {
  SET_CATEGORY,
  SET_DIFFICULTY,
  SET_AMOUNT,
  SET_TYPE,
  SET_QUESTIONS,
  SET_CURRENT_INDEX,
  SET_SCORE,
} from "./actionTypes";

export const setCategory = (value) => ({
  type: SET_CATEGORY,
  value,
});

export const setDifficulty = (value) => ({
  type: SET_DIFFICULTY,
  value,
});

export const cangeType = (value) => ({
  type: SET_TYPE,
  value,
});

export const setAmount = (value) => ({
  type: SET_AMOUNT,
  value,
});

export const setCurrentIndex = (value) => ({
  type: SET_CURRENT_INDEX,
  value,
});

export const setScore = (value) => ({
  type: SET_SCORE,
  value,
});