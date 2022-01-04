import {
  SET_CATEGORY,
  SET_DIFFICULTY,
  SET_AMOUNT,
  SET_TYPE,
  SET_QUESTIONS,
  SET_CURRENT_INDEX,
  SET_CORRECT,
  SET_INCORRECT,
  RESTART,
} from './actionTypes';

const initialState = {
  questionCategory: '0',
  questionDifficulty: 'easy',
  questionType: 'multiple',
  amountOfQuestions: '10',
  questions: null,
  currentIndex: 0,
  correct: [],
  incorrect: [],
};

// eslint-disable-next-line default-param-last
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORY:
      return {
        ...state,
        questionCategory: action.value,
      };
    case SET_DIFFICULTY:
      return {
        ...state,
        questionDifficulty: action.value,
      };
    case SET_TYPE:
      return {
        ...state,
        questionType: action.value,
      };
    case SET_AMOUNT:
      return {
        ...state,
        amountOfQuestions: action.value,
      };
    case SET_QUESTIONS:
      return {
        ...state,
        questions: action.value,
      };
    case SET_CURRENT_INDEX:
      return {
        ...state,
        currentIndex: action.value,
      };
    case SET_CORRECT:
      return {
        ...state,
        correct: action.value,
      };
    case SET_INCORRECT:
      return {
        ...state,
        incorrect: action.value,
      };
    case RESTART:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default reducer;
