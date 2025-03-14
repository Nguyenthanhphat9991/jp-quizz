const urlParams = new URLSearchParams(window.location.search);
const QUESTION_COUNT = 25;
const lessonId = urlParams.get("lessonId");
const courseId = urlParams.get("courseId");

const dataFile = `./data/questions/question-${courseId}-${lessonId}.json`;

fetch(dataFile)
    .then(response => response.json())
    .then(data => {

        document.getElementById("lesson-title").innerText = 'Bài ' + lessonId;

        let questions = data.questions.sort(() => Math.random() - 0.5).slice(0, ((data.questions.length > QUESTION_COUNT) ? QUESTION_COUNT : data.questions.length));
        let currentQuestionIndex = 0;
        let correctCount = 0;
        let wrongCount = 0;
        let wrongQuestions = [];

        function loadQuestion() {
            if (currentQuestionIndex >= questions.length) {
                showResults();
                return;
            }

            const question = questions[currentQuestionIndex];
            document.getElementById("question-title").innerHTML = `Câu ${currentQuestionIndex + 1}: ${question.question_text}`; // 🔥 Sửa thành innerHTML
            document.getElementById("answers-container").innerHTML = "";

            let shuffledAnswers = [...question.answers].sort(() => Math.random() - 0.5);
            let labels = ["A", "B", "C", "D"];

            shuffledAnswers.forEach((answer, index) => {
                const btn = document.createElement("button");
                btn.classList.add("answer");
                btn.innerText = `${labels[index]}. ${answer.answer_text}`;
                btn.onclick = () => checkAnswer(btn, answer.is_correct, shuffledAnswers, question, currentQuestionIndex + 1);
                document.getElementById("answers-container").appendChild(btn);
            });
        }

        function checkAnswer(button, isCorrect, answers, question, questionNumber) {
            const buttons = document.querySelectorAll(".answer");
            buttons.forEach(btn => btn.disabled = true);

            if (isCorrect) {
                button.classList.add("correct");
                correctCount++;
            } else {
                button.classList.add("wrong");
                wrongCount++;
                const correctAnswer = answers.find(a => a.is_correct);
                const correctButton = [...buttons].find(btn => btn.innerText.includes(correctAnswer.answer_text));
                if (correctButton) correctButton.classList.add("correct");

                wrongQuestions.push({
                    number: questionNumber,
                    text: question.question_text,
                    correct: correctAnswer.answer_text
                });
            }

            setTimeout(() => {
                currentQuestionIndex++;
                loadQuestion();
            }, 2000);
        }

        function showResults() {
            localStorage.setItem("quizResults", JSON.stringify({
                "correctCount": correctCount,
                'wrongCount': wrongCount,
                'wrongQuestions': wrongQuestions
            }));
            localStorage.setItem("lessonId", JSON.stringify(lessonId));
            console.log(lessonId);

            window.location.href = `details.html?courseId=${courseId}&lessonId=${lessonId}`;
        }

        loadQuestion();
    })
    .catch(error => console.error("Lỗi khi tải dữ liệu:", error));
