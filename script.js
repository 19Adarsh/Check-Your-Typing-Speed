document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const retryBtn = document.getElementById('retry-btn');
    const inputField = document.getElementById('input');
    const sentenceDisplay = document.getElementById('sentence');
    const timerDisplay = document.getElementById('timer');
    const resultDisplay = document.getElementById('result');
    const speedDisplay = document.getElementById('speed');
    const accuracyDisplay = document.getElementById('accuracy');

    let startTime;
    let interval;

    const sentences = [
        "The quick brown fox jumps over the lazy dog.",
        "A journey of a thousand miles begins with a single step.",
        "To be or not to be, that is the question."
    ];

    function startTest() {
        inputField.disabled = false;
        inputField.value = '';
        inputField.focus();
        startBtn.style.display = 'none';
        resultDisplay.style.display = 'none';

        const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
        sentenceDisplay.textContent = randomSentence;

        startTime = new Date();
        interval = setInterval(updateTimer, 1000);
    }

    function updateTimer() {
        const elapsedTime = Math.floor((new Date() - startTime) / 1000);
        timerDisplay.textContent = `Time: ${elapsedTime} seconds`;
    }

    function endTest() {
        clearInterval(interval);
        const elapsedTime = Math.floor((new Date() - startTime) / 1000);
        const typedText = inputField.value;
        const wordCount = typedText.split(' ').length;
        const speed = (wordCount / elapsedTime) * 60;
        const accuracy = calculateAccuracy(typedText, sentenceDisplay.textContent);

        speedDisplay.textContent = Math.round(speed);
        accuracyDisplay.textContent = Math.round(accuracy);

        resultDisplay.style.display = 'block';
        startBtn.style.display = 'block';
        inputField.disabled = true;
    }

    function calculateAccuracy(typed, original) {
        const typedWords = typed.split(' ');
        const originalWords = original.split(' ');
        let correctWords = 0;

        for (let i = 0; i < typedWords.length; i++) {
            if (typedWords[i] === originalWords[i]) {
                correctWords++;
            }
        }

        return (correctWords / originalWords.length) * 100;
    }

    startBtn.addEventListener('click', startTest);
    inputField.addEventListener('input', (event) => {
        if (event.target.value === sentenceDisplay.textContent) {
            endTest();
        }
    });
    retryBtn.addEventListener('click', startTest);
});
