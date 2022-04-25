(function() {
    const myQuestions = [
      {
        question: "Very popular snack made from fried dough pastry, cut into sausage shapes and doused in sugar. They are a favourite at fiestas, or street parties, when they are sold by roadside vendors. Dipping them in hot melted chocolate is pretty much the law.",
        answers: {
          a: "German sausages",
          b: "Churros",
          c: "Mozzarella sticks",
        },
        correctAnswer: "b"
      },
  
      {
        question: "You have these ingredients for Saturday night supper! What will you make with ground beef, beans, chopped onion, tomato sauce, and a whole lot of spices?",
        answers: {
          a: "Chilli con carne",
          b: "Bolognese",
          c: "Tomato soup'",
        },
        correctAnswer: "a"
      },
  
      {
        question: "This is a baked custard dessert topped with a melted sugar crust. With a velvety and pudding-like texture, this burnt cream dessert is so dreamy!",
        answers: {
          a: "Tiramisu",
          b: "Creme Brulee",
          c: "Apple Pie",
        },
        correctAnswer: "b"
      },
  
      {
        question: "This is a traditional Scottish pudding, similar to a trifle. It is layered dessert, consisting of whipped cream, toasted oats, and juicy raspberries. Of course, it would not be scottish without a touch of whiskey in the mix!",
        answers: {
          a: "Scones",
          b: "Cranachan",
          c: "Shortbread",
        },
        correctAnswer: "b"
      },
    ];
  
    function buildQuiz() {
      // we'll need a place to store the HTML output
      const output = [];
  
      // for each question...
      myQuestions.forEach((currentQuestion, questionNumber) => {
        // we'll want to store the list of answer choices
        const answers = [];
  
        // and for each available answer...
        for (letter in currentQuestion.answers) {
          // ...add an HTML radio button
          answers.push(
            `<label>
                 <input type="radio" name="question${questionNumber}" value="${letter}">
                  ${letter} :
                  ${currentQuestion.answers[letter]}
               </label>`
          );
        }
  
        // add this question and its answers to the output
        output.push(
          `<div class="slide">
               <div class="question"> ${currentQuestion.question} </div>
               <div class="answers"> ${answers.join("")} </div>
             </div>`
        );
      });
  
      // finally combine our output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join("");
    }
  
    function showResults() {
      // gather answer containers from our quiz
      const answerContainers = quizContainer.querySelectorAll(".answers");
  
      // keep track of user's answers
      let numCorrect = 0;
  
      // for each question...
      myQuestions.forEach((currentQuestion, questionNumber) => {
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // if answer is correct
        if (userAnswer === currentQuestion.correctAnswer) {
          // add to the number of correct answers
          numCorrect++;
  
          // color the answers green
          answerContainers[questionNumber].style.color = "lightgreen";
        } else {
          // if answer is wrong or blank
          // color the answers red
          answerContainers[questionNumber].style.color = "red";
        }
      });
  
      // show number of correct answers out of total
      resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    }
  
    function showSlide(n) {
      slides[currentSlide].classList.remove("active-slide");
      slides[n].classList.add("active-slide");
      currentSlide = n;
  
      if (currentSlide === 0) {
        previousButton.style.display = "none";
      } else {
        previousButton.style.display = "inline-block";
      }
  
      if (currentSlide === slides.length - 1) {
        nextButton.style.display = "none";
        submitButton.style.display = "inline-block";
      } else {
        nextButton.style.display = "inline-block";
        submitButton.style.display = "none";
      }
    }
  
    function showNextSlide() {
      showSlide(currentSlide + 1);
    }
  
    function showPreviousSlide() {
      showSlide(currentSlide - 1);
    }
  
    const quizContainer = document.getElementById("quiz");
    const resultsContainer = document.getElementById("results");
    const submitButton = document.getElementById("submit");
  
    // display quiz right away
    buildQuiz();
  
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
  
    showSlide(0);
  
    // on submit, show results
    submitButton.addEventListener("click", showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
  })();
  