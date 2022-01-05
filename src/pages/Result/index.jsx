import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { restart } from '../../redux/actions';

import './style.scss';

function Result() {
  const correct = useSelector((state) => state.correct);
  const amount = useSelector((state) => state.amountOfQuestions);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRestart = () => {
    dispatch(restart());
    navigate('/');
  };

  return (
    <div className="result">
      <p className="result__title secondary-title">
        {correct.length < Math.round(amount / 2) ? 'You can do better!' : 'Great result!'}
      </p>
      <p className="result__score primary-title">
        {correct.length}
        {' '}
        /
        {' '}
        {amount}
      </p>

      <button
        type="button"
        className="btn result__btn"
        onClick={handleRestart}
      >
        Try again
      </button>
    </div>
  );
}

export default Result;
