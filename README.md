# Quiz

## Demo

Tried to deploy on gh-pages 

## Tech Stack

- React + Hooks
- Redux
- React Router
- Sass
- Swiper

## What Have I Done

Hi there!

Opening the Quiz we see a form with settings. They are optional, you can use default:
![alt text](https://github.com/AlisaVlasova/quiz-app/blob/master/public/readme/settings.png)

After you press "START" you get to /questions page, where you can see:
![alt text](https://github.com/AlisaVlasova/quiz-app/blob/master/public/readme/question-desk.png)

  - arrow btn which brings you back to /home page or to previous question
    (selected data at home page and selected answer on previous question are saved)
  - progressbar
  - score counter
  - slider with questions and category
  - answers
    (after clicking the right one glows green and red if the answer is wrong)
![alt text](https://github.com/AlisaVlasova/quiz-app/blob/master/public/readme/question-desk-selected.png)

After answering the last question you get to /result page where you can see:
![alt text](https://github.com/AlisaVlasova/quiz-app/blob/master/public/readme/result.png)

  - score
  - result button

Also there are:
  - flicking loader on api requests
  - flicking error banner if something goes wrong
  - swipable questions
  - saving state on reload in SessionStorage
  - responsive for mobile
![alt text](https://github.com/AlisaVlasova/quiz-app/blob/master/public/readme/question-mob.png)

## Problems

In some cases api gives an empty array, so if you see an error message just go back to home page ang change some settings)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
