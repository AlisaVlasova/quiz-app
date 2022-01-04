import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { restart } from '../../redux/actions';

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
      <p className="result__title">
        {correct.length < Math.round(amount / 2) ? "Well, that's fine, but you can do better!" : 'Great result!'}
      </p>
      <p className="result__score">
        {correct.length}
        {' '}
        /
        {' '}
        {amount}
      </p>

      <button
        type="button"
        onClick={handleRestart}
      >
        Try again
      </button>
    </div>
  );
}

export default Result;
