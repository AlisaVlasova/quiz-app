/* eslint-disable import/no-unresolved */
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

import {
  setQuestions,
  setCurrentIndex,
  setCorrect,
} from '../../redux/actions';
import { getQuestions } from '../../api';

import 'swiper/css';

function Questions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const swiper = useRef(null);

  const category = useSelector((state) => state.questionCategory);
  const difficulty = useSelector((state) => state.questionDifficulty);
  const type = useSelector((state) => state.questionType);
  const amount = useSelector((state) => state.amountOfQuestions);
  const questions = useSelector((state) => state.questions);
  const currentIndex = useSelector((state) => state.currentIndex);
  const correct = useSelector((state) => state.correct);

  const decode = function (html) {
    const txt = document.createElement('textarea');

    txt.innerHTML = html;

    return txt.value;
  };
  const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));
  const setAnswers = (data, index) => {
    const answers = [...data[index].incorrect_answers];

    answers.splice(
      getRandomInt(data[index].incorrect_answers.length),
      0,
      data[index].correct_answer,
    );
    setOptions(answers);
  };
  const setQuestionsData = async (data) => {
    setLoading(true);

    try {
      const questionsData = await getQuestions(data);
      const decodedQuestionsData = questionsData.results.map((q) => ({
        ...q,
        question: decode(q.question),
        correct_answer: decode(q.correct_answer),
        incorrect_answers: q.incorrect_answers.map((a) => decode(a)),
      }));

      dispatch(setQuestions(decodedQuestionsData));
      setAnswers(decodedQuestionsData, currentIndex);
    } catch (err) {
      setError(err);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const swipeNext = () => {
    setTimeout(() => {
      if (currentIndex < amount - 1) {
        swiper.current.swiper.slideNext();
      } else {
        navigate('/result');
      }
    }, 1000);
  };
  const handleSwipe = (event) => {
    dispatch(setCurrentIndex(event.activeIndex));
    setAnswers(questions, event.activeIndex);
  };
  const handleAnswer = (event, id) => {
    const answer = event.target.value;
    const answeredQuestion = { ...questions[id], answer };

    dispatch(setQuestions(
      [...questions]
        .map((item) => {
          if (item.question === questions[id].question) {
            return answeredQuestion;
          }

          return item;
        }),
    ));

    if (
      questions[id].correct_answer.includes(answer) && !correct.includes(answer)
    ) {
      dispatch(setCorrect([...correct, answer]));
    }

    swipeNext();
  };

  useEffect(() => {
    if (!questions) {
      setQuestionsData({
        amount, category, difficulty, type,
      });
    } else {
      setAnswers(questions, currentIndex);
    }
  }, []);

  if (loading) {
    return (
      <p className="loader">Loading...</p>
    );
  }

  if (error) {
    return (
      <p className="error">
        Something Went Wrong!
        <br />
        Please, try again later
      </p>
    );
  }

  return (
    <div className="questions">
      {questions && (
        <>
          <div className="questions__progress">
            <div
              className="question__progress-bar"
              style={{ width: `${((currentIndex + 1) / amount) * 100}%` }}
            />
          </div>
          <Swiper
            ref={swiper}
            slidesPerView={1}
            onSlideChange={handleSwipe}
            allowSlideNext={questions[currentIndex].answer}
            initialSlide={currentIndex}
          >
            {questions.map((question) => (
              <SwiperSlide key={question.question}>
                <p className="questions__category">
                  Category:
                  {' '}
                  {question.category}
                </p>
                <p className="questions__text">
                  {question.question}
                </p>
              </SwiperSlide>
            ))}
          </Swiper>

          {options && options.map((answer) => (
            <label htmlFor={answer} key={answer}>
              {answer}
              <input
                type="radio"
                name="answer"
                id={answer}
                value={answer}
                onChange={(event) => handleAnswer(event, currentIndex)}
                className={`
                  ${questions[currentIndex].correct_answer.includes(answer)
                  ? 'questions__answer--correct'
                  : 'questions__answer--incorrect'}
                  question__answer
                `}
                checked={
                  questions[currentIndex].answer === answer
                }
              />
            </label>
          ))}

          <p className="questions__score">
            Score
            {' '}
            {correct.length}
          </p>
        </>
      )}
    </div>
  );
}

export default Questions;
