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
import './style.scss';

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

  const decode = (html) => {
    const txt = document.createElement('textarea');

    txt.innerHTML = html;

    return txt.value;
  };
  const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));
  const getAnswerClass = (answer, id) => {
    let className = 'questions__answer btn';

    if (
      questions[id].answer === answer
      && questions[id].correct_answer.includes(answer)
    ) {
      className += ' questions__answer--correct btn';
    } else if (
      questions[id].answer === answer
      && !questions[id].correct_answer.includes(answer)
    ) {
      className += ' questions__answer--incorrect btn';
    }

    return className;
  };
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
  const swipeBack = () => {
    if (currentIndex !== 0) {
      swiper.current.swiper.slidePrev();
    } else {
      navigate('/');
    }
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
      <p className="loader primary-title">???</p>
    );
  }

  if (error) {
    return (
      <p className="error primary-title">
        Something Wrong!
      </p>
    );
  }

  return (
    <div className="questions">
      {(questions && options) && (
        <>
          <div className="questions__score">
            <button
              className="questions__arrow"
              type="button"
              onClick={swipeBack}
            >
              &lt;
            </button>
            <div className="questions__progress">
              <div
                className="questions__progress-bar"
                style={{ width: `${((currentIndex + 1) / amount) * 100}%` }}
              />
            </div>
            <p className="text">
              Score:
              {' '}
              {correct.length}
            </p>
          </div>

          <Swiper
            ref={swiper}
            slidesPerView={1}
            slidesPerGroup={1}
            onSlideChange={handleSwipe}
            allowSlideNext={questions[currentIndex].answer}
            initialSlide={currentIndex}
          >
            {questions.map((question) => (
              <SwiperSlide key={question.question}>
                <div className="questions__slide">
                  <p className="questions__category text">
                    Category:
                    {' '}
                    {question.category}
                  </p>
                  <p className="questions__text third-title">
                    {question.question}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="questions__answers">
            {options.map((answer) => (
              <label
                htmlFor={answer}
                key={answer}
                className={getAnswerClass(answer, currentIndex)}
              >
                {answer}
                <input
                  type="radio"
                  name="answer"
                  id={answer}
                  value={answer}
                  onChange={(event) => handleAnswer(event, currentIndex)}
                  checked={
                    questions[currentIndex].answer === answer
                  }
                />
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Questions;
