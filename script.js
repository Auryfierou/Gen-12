const quizData = [
  { image: "/src/gen12/Aralie_1.jpeg", correctAnswer: "Aralie" },
  { image: "/src/gen12/Aralie_2.jpeg", correctAnswer: "Aralie" },
  { image: "/src/gen12/Delynn_1.jpeg", correctAnswer: "Delynn" },
  { image: "/src/gen12/Delynn_2.jpeg", correctAnswer: "Delynn" },
  { image: "/src/gen12/Erine_1.jpeg", correctAnswer: "Erine" },
  { image: "/src/gen12/Erine_2.jpeg", correctAnswer: "Erine" },
  { image: "/src/gen12/Fritzy_1.jpeg", correctAnswer: "Fritzy" },
  { image: "/src/gen12/Fritzy_2.jpeg", correctAnswer: "Fritzy" },
  { image: "/src/gen12/Kimmy_1.jpeg", correctAnswer: "Kimmy" },
  { image: "/src/gen12/Kimmy_2.jpeg", correctAnswer: "Kimmy" },
  { image: "/src/gen12/Lana_1.jpeg", correctAnswer: "Lana" },
  { image: "/src/gen12/Lana_2.jpeg", correctAnswer: "Lana" },
  { image: "/src/gen12/Levi_1.jpeg", correctAnswer: "Levi" },
  { image: "/src/gen12/Levi_2.jpeg", correctAnswer: "Levi" },
  { image: "/src/gen12/Lily_1.jpeg", correctAnswer: "Lily" },
  { image: "/src/gen12/Lily_2.jpeg", correctAnswer: "Lily" },
  { image: "/src/gen12/Moreen_1.jpeg", correctAnswer: "Moreen" },
  { image: "/src/gen12/Moreen_2.jpeg", correctAnswer: "Moreen" },
  { image: "/src/gen12/Nachia_1.jpeg", correctAnswer: "Nachia" },
  { image: "/src/gen12/Nachia_2.jpeg", correctAnswer: "Nachia" },
  { image: "/src/gen12/Nala_1.jpeg", correctAnswer: "Nala" },
  { image: "/src/gen12/Nala_2.jpeg", correctAnswer: "Nala" },
  { image: "/src/gen12/Nayla_1.jpeg", correctAnswer: "Nayla" },
  { image: "/src/gen12/Nayla_2.jpeg", correctAnswer: "Nayla" },
  { image: "/src/gen12/Oline_1.jpeg", correctAnswer: "Oline" },
  { image: "/src/gen12/Oline_2.jpeg", correctAnswer: "Oline" },
  { image: "/src/gen12/Regie_1.jpeg", correctAnswer: "Regie" },
  { image: "/src/gen12/Regie_2.jpeg", correctAnswer: "Regie" },
  { image: "/src/gen12/Ribka_1.jpeg", correctAnswer: "Ribka" },
  { image: "/src/gen12/Ribka_2.jpeg", correctAnswer: "Ribka" },
  { image: "/src/gen12/Shasa_1.jpeg", correctAnswer: "Shasa" },
  { image: "/src/gen12/Shasa_2.jpeg", correctAnswer: "Shasa" },
  { image: "/src/gen12/Trisha_1.jpeg", correctAnswer: "Trisha" },
  { image: "/src/gen12/Trisha_2.jpeg", correctAnswer: "Trisha" },
];

const duplicatedQuizData = [...quizData, ...quizData];

for (let i = duplicatedQuizData.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [duplicatedQuizData[i], duplicatedQuizData[j]] = [duplicatedQuizData[j], duplicatedQuizData[i]];
}

let currentQuestion = 0;
let correctCount = 0;
let incorrectCount = 0;
const totalQuestions = 20;

const fotoElement = document.getElementById("foto");
const choicesElements = document.querySelectorAll(".choice-btn");
const correctSpan = document.getElementById("correct");
const incorrectSpan = document.getElementById("incorrect");

function loadQuestion() {
  if (currentQuestion < totalQuestions) {
    const currentQuiz = duplicatedQuizData[currentQuestion];

    fotoElement.src = currentQuiz.image;

    const choices = generateRandomChoices(currentQuiz.correctAnswer);
    choicesElements.forEach((btn, index) => {
      btn.textContent = choices[index];
    });
  } else {
    quizCompleted();
  }
}

function generateRandomChoices(correctAnswer) {
  const choices = [];

  while (choices.length < 4) {
    const randomIndex = Math.floor(Math.random() * duplicatedQuizData.length);
    const randomChoice = duplicatedQuizData[randomIndex].correctAnswer;

    if (!choices.includes(randomChoice)) {
      choices.push(randomChoice);
    }
  }

  if (!choices.includes(correctAnswer)) {
    const randomIndex = Math.floor(Math.random() * choices.length);
    choices[randomIndex] = correctAnswer;
  }

  return shuffleArray(choices);
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function checkAnswer(btn) {
  if (currentQuestion < totalQuestions) {
    const selectedAnswer = btn.textContent;
    const correctAnswer = duplicatedQuizData[currentQuestion].correctAnswer;

    if (selectedAnswer === correctAnswer) {
      correctCount++;
    } else {
      incorrectCount++;
    }

    currentQuestion++;

    loadQuestion();
    updateScore();
  } else {
    quizCompleted();
  }
}

function quizCompleted() {
    swal("Selesai!", "Quiz completed! Total Benar: " + correctCount + ", Total Salah: " + incorrectCount, "success", {
        button: "Let's Go!"})
    .then(() => {
        resetQuiz()
        loadQuestion()
      });
}

function updateScore() {
  correctSpan.textContent = correctCount;
  incorrectSpan.textContent = incorrectCount;
}

function resetQuiz() {
  currentQuestion = 0;
  correctCount = 0;
  incorrectCount = 0;
  updateScore();
}

loadQuestion();