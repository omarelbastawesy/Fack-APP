// Select Elements
let quiz = document.querySelector("section .quiz");
let count = document.querySelector("section .quiz .count");
let start = document.querySelector("section .quiz .count .start");
let end = document.querySelector("section .quiz .count .end");
let question = document.querySelector("section .quiz .question");
let answers = document.querySelector("section .quiz .answers");
let result = document.querySelector(".result");

// Set Options
let currentIndex = 0;
let rightAnswers = 0;
let countdownInterval;

function getQuestions() {
  let myRequest = new XMLHttpRequest();

  myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let questionsObject = JSON.parse(this.responseText);
      let qCount = questionsObject.length;

      end.innerText = qCount;
      // Add Question Data
      addQuestionData(questionsObject[currentIndex], qCount);

      // Click On Submit
      document.querySelectorAll(".quiz .answers").forEach((e) => {
        e.onclick = () => {
          // Get Right Answer
          let theRightAnswer = questionsObject[currentIndex].right_answer;

          // Increase Index
          currentIndex++;

          // Check The Answer
          checkAnswer(theRightAnswer);

          answers.style.pointerEvents = "none";

          setTimeout(() => {
            // Remove Previous Question
            question.innerHTML = "";
            answers.innerHTML = "";

            answers.style.pointerEvents = "auto";

            // Add Question Data
            addQuestionData(questionsObject[currentIndex], qCount);
          }, 1500);

          start.innerText = currentIndex;

          showResults(qCount);
        };
      });
    }
  };

  myRequest.open("GET", "https://api.npoint.io/58efe1703559041bb850", true);
  myRequest.send();
}

getQuestions();

function addQuestionData(obj, count) {
  if (currentIndex < count) {
    // get question data
    let questionText = document.createTextNode(obj["title"]);

    question.appendChild(questionText);

    // Create The Answers
    for (let i = 1; i <= 4; i++) {
      // Create Main Answer Div
      let mainDiv = document.createElement("div");
      mainDiv.className = "answer";

      mainDiv.dataset.answer = obj[`answer_${i}`];

      // Create Label Text
      let answer = document.createTextNode(obj[`answer_${i}`]);

      mainDiv.appendChild(answer);
      answers.appendChild(mainDiv);
    }
  }
}

function checkAnswer(rAnswer) {
  let answers = document.querySelectorAll(".answer");
  answers.forEach((e) => {
    if (rAnswer === e.dataset.answer) {
      e.style.backgroundColor = "#00abff";
    }
  });
}

function showResults(count) {
  if (currentIndex === count) {
    quiz.remove();
    result.style.display = "flex";
  }
}
