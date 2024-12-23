let currentQuestion = 0;
let questions = [];

function startQuiz() {
    currentQuestion = 0;
    questions = generateQuestions();
    document.querySelector('button[onclick="startQuiz()"]').style.display = 'none'; // Hide start quiz button
    document.getElementById('userAnswer').style.display = 'block'; // Show answer input
    document.querySelector('button[onclick="checkAnswer()"]').style.display = 'block'; // Show submit answer button
    displayQuestion();
    document.getElementById('numberPad').style.display = 'block'; // Show number pad

    // Hide navigation buttons when quiz starts
    document.querySelectorAll('button[onclick^="window.location.href"]').forEach(button => {
        button.style.display = 'none';
    });
}

function generateQuestions() {
    let questionsArray = [];
    for (let i = 0; i < 10; i++) { // Generate 10 questions
        // Randomly choose between table, square, and cube
        let type = Math.floor(Math.random() * 3);
        let multiplier;

        if (type === 0) { // Table (12 to 19)
            multiplier = Math.floor(Math.random() * 8) + 12; // 12 to 19
            let j;
            do {
                j = Math.floor(Math.random() * 10) + 1; // 1 to 10
            } while (j === 1 || j === 10); // Avoid 1 and 10
            questionsArray.push({
                question: `${multiplier} x ${j} = ?`,
                answer: multiplier * j
            });
        } else if (type === 1) { // Square (12 to 49)
            do {
                multiplier = Math.floor(Math.random() * 38) + 12; // 12 to 49
            } while (multiplier === 20 || multiplier === 30 || multiplier === 40); // Avoid 20, 30, and 40
            questionsArray.push({
                question: `${multiplier}² = ?`,
                answer: multiplier * multiplier
            });
        } else { // Cube (5 to 29)
            do {
                multiplier = Math.floor(Math.random() * 25) + 5; // 5 to 29
            } while (multiplier === 10 || multiplier === 20); // Avoid 10 and 20
            questionsArray.push({
                question: `${multiplier}³ = ?`,
                answer: multiplier * multiplier * multiplier
            });
        }
    }
    return questionsArray;
}

function displayQuestion() {
    if (currentQuestion < questions.length) {
        const q = questions[currentQuestion];
        const questionElement = document.getElementById('question');
        questionElement.innerText = q.question;
        questionElement.style.border = '2px solid #00796b'; // Add border to show question in a box
        questionElement.style.padding = '10px'; // Add padding for better appearance
        questionElement.style.borderRadius = '5px'; // Add border-radius for rounded corners
        questionElement.style.fontSize = '24px'; // Increase font size for better visibility
        questionElement.style.fontWeight = 'bold'; // Make the question text bold
        document.getElementById('userAnswer').value = ''; // Clear previous answer
        // document.getElementById('output').innerText = ''; // Clear previous output
    } else {
        document.getElementById('output').innerText = "Quiz Finished!";
        document.getElementById('userAnswer').style.display = 'none'; // Hide input
        document.querySelector('button[onclick="checkAnswer()"]').style.display = 'none'; // Hide submit answer button
    }
}

function checkAnswer() {
    const userAnswer = parseInt(document.getElementById('userAnswer').value);
    const correctAnswer = questions[currentQuestion].answer;

    if (userAnswer === correctAnswer) {
        document.getElementById('output').innerText = `Correct! ${questions[currentQuestion].question.replace('?', `${correctAnswer}`)}.`;
        document.getElementById('output').classList.add('correct'); // Add class for correct answer
        currentQuestion++;
        displayQuestion();
    } else {
        document.getElementById('output').innerText = `Wrong! ${questions[currentQuestion].question.replace('?', `${correctAnswer}`)}.`;
        document.getElementById('output').classList.remove('correct'); // Add class for correct answer
        currentQuestion++;
        displayQuestion();
    }
}

function appendNumber(num) {
    const userAnswerInput = document.getElementById('userAnswer');
    userAnswerInput.value += num; // Append the pressed number to the input
}

function clearInput() {
    document.getElementById('userAnswer').value = ''; // Clear the input field
}

// Initially hide the answer input and submit button
document.getElementById('userAnswer').style.display = 'none';
document.querySelector('button[onclick="checkAnswer()"]').style.display = 'none';