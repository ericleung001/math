// ====[ 1. 頁面導覽和通用元素 ]====
const navQuizBtn = document.getElementById('nav-quiz');
const navTableBtn = document.getElementById('nav-table');
const quizSection = document.getElementById('quiz-section');
const tableSection = document.getElementById('table-section');
const playChantBtn = document.getElementById('play-chant-btn');
const multiplicationTable = document.getElementById('multiplication-table');
const youtubePlayerDiv = document.getElementById('youtube-player');

// ====[ 2. 測驗 App 相關元素和變數 ]====
const num1El = document.getElementById('num1');
const num2El = document.getElementById('num2');
const operatorEl = document.getElementById('operator');
const answerInput = document.getElementById('answer-input');
const feedbackEl = document.getElementById('feedback');
const scoreEl = document.getElementById('score');
const optionBtns = document.querySelectorAll('.option-btn');
const icons1El = document.getElementById('icons1');
const icons2El = document.getElementById('icons2');
const opSymbolEl = document.getElementById('op-symbol');
const keypad = document.getElementById('keypad');
const questionCountEl = document.getElementById('question-count');
const gameScreen = document.getElementById('game-screen');
const endScreen = document.getElementById('end-screen');
const finalScoreValueEl = document.getElementById('final-score-value');
const restartBtn = document.getElementById('restart-btn');

let score = 0, correctAnswer, currentOperation = 'random', questionCounter = 0;
const QUESTIONS_PER_ROUND = 10;
const encouragements = [ '太棒了！', '你真聰明！', '完全正確！', '繼續加油！', '做得好！', '一百分！' ];
const icons = ['🚗', '🍎', '⭐', '🎈', '🐶', '⚽', '🍓', '🌻', '🐠', '🦋'];
let player;
const YOUTUBE_VIDEO_ID = 'D06jY5Y7n9k';

// ====[ 3. 核心邏輯函式 ]====

// --- 3.1 YouTube 播放器 API 回呼函式 ---
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '100%',
        width: '100%',
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: {
            'playsinline': 1,
            'autoplay': 0,
            'controls': 1,
            'rel': 0,
            'modestbranding': 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    console.log('YouTube 播放器已準備就緒！');
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
        playChantBtn.textContent = '⏸️ 暫停播放';
    } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
        playChantBtn.textContent = '🎵 播放九因歌';
    }
}

// --- 3.2 頁面切換邏輯 ---
function showQuizPage() {
    quizSection.classList.remove('hidden');
    tableSection.classList.add('hidden');
    navQuizBtn.classList.add('active');
    navTableBtn.classList.remove('active');
    if (player && typeof player.pauseVideo === 'function' && player.getPlayerState() === YT.PlayerState.PLAYING) {
        player.pauseVideo();
    }
}

function showTablePage() {
    quizSection.classList.add('hidden');
    tableSection.classList.remove('hidden');
    navQuizBtn.classList.remove('active');
    navTableBtn.classList.add('active');
}

// --- 3.3 乘數表生成邏輯 ---
function generateMultiplicationTable() {
    multiplicationTable.innerHTML = '';
    for (let i = 1; i <= 9; i++) {
        for (let j = 1; j <= 9; j++) {
            const cell = document.createElement('div');
            cell.classList.add('table-cell');
            cell.textContent = `${i}×${j}=${i*j}`;
            multiplicationTable.appendChild(cell);
        }
    }
}

// --- 3.4 測驗邏輯 ---
function startQuiz() {
    score = 0;
    questionCounter = 0;
    scoreEl.textContent = score;
    endScreen.classList.add('hidden');
    gameScreen.style.opacity = 1;
    generateProblem();
}

function endQuiz() {
    finalScoreValueEl.textContent = `${score} / ${QUESTIONS_PER_ROUND}`;
    endScreen.classList.remove('hidden');
    gameScreen.style.opacity = 0.5;
}

function generateProblem() {
    if (questionCounter >= QUESTIONS_PER_ROUND) {
        endQuiz();
        return;
    }
    questionCounter++;
    questionCountEl.textContent = questionCounter;
    icons1El.innerHTML = '';
    icons2El.innerHTML = '';
    const currentIcon = icons[Math.floor(Math.random() * icons.length)];
    let num1, num2;
    let operation = currentOperation;
    if (operation === 'random') {
        const operations = ['add', 'subtract', 'multiply', 'divide'];
        operation = operations[Math.floor(Math.random() * operations.length)];
    }
    switch (operation) {
        case 'add':
            num1 = Math.floor(Math.random() * 10);
            num2 = Math.floor(Math.random() * 10);
            operatorEl.textContent = '+';
            opSymbolEl.textContent = '+';
            correctAnswer = num1 + num2;
            break;
        case 'subtract':
            num1 = Math.floor(Math.random() * 10);
            num2 = Math.floor(Math.random() * 10);
            if (num1 < num2) { [num1, num2] = [num2, num1]; }
            operatorEl.textContent = '-';
            opSymbolEl.textContent = '-';
            correctAnswer = num1 - num2;
            break;
        case 'multiply':
            num1 = Math.floor(Math.random() * 10);
            num2 = Math.floor(Math.random() * 10);
            operatorEl.textContent = '×';
            opSymbolEl.textContent = '×';
            correctAnswer = num1 * num2;
            break;
        case 'divide':
            const quotient = Math.floor(Math.random() * 9) + 1;
            num2 = Math.floor(Math.random() * 9) + 1;
            num1 = quotient * num2;
            if (num1 === num2) {
                num2 = Math.floor(Math.random() * (num2 - 1)) + 1;
                if (num2 > 1) { num1 = quotient * num2; }
            }
            operatorEl.textContent = '÷';
            opSymbolEl.textContent = '÷';
            correctAnswer = quotient;
            break;
    }
    num1El.textContent = num1;
    num2El.textContent = num2;
    const iconSize = (num1 > 20 || num2 > 20) ? '20px' : '30px';
    icons1El.style.fontSize = iconSize;
    icons2El.style.fontSize = iconSize;
    for (let i = 0; i < num1; i++) { icons1El.innerHTML += `<span>${currentIcon}</span>`; }
    for (let i = 0; i < num2; i++) { icons2El.innerHTML += `<span>${currentIcon}</span>`; }
    answerInput.value = '';
    feedbackEl.textContent = '';
}

function checkAnswer() {
    answerInput.classList.remove('shake');
    scoreEl.classList.remove('correct-animation');
    const userAnswer = parseInt(answerInput.value, 10);
    if (isNaN(userAnswer) || answerInput.value === '') {
        feedbackEl.textContent = '請先輸入答案哦！';
        feedbackEl.style.color = 'orange';
        answerInput.classList.add('shake');
        return;
    }
    if (userAnswer === correctAnswer) {
        feedbackEl.textContent = encouragements[Math.floor(Math.random() * encouragements.length)];
        feedbackEl.style.color = '#2ecc71';
        score++;
        scoreEl.textContent = score;
        scoreEl.classList.add('correct-animation');
        setTimeout(() => {
            generateProblem();
            scoreEl.classList.remove('correct-animation');
        }, 1200);
    } else {
        feedbackEl.textContent = '答錯了，再試一次！';
        feedbackEl.style.color = '#e74c3c';
        answerInput.classList.add('shake');
        setTimeout(() => { answerInput.value = ''; }, 1000);
    }
}

// ====[ 4. 設定事件監聽 ]====

// --- 4.1 導覽按鈕 ---
navQuizBtn.addEventListener('click', showQuizPage);
navTableBtn.addEventListener('click', showTablePage);

// --- 4.2 播放九因歌按鈕 ---
playChantBtn.addEventListener('click', () => {
    if (!player || typeof player.getPlayerState !== 'function') {
        alert("YouTube 播放器尚未準備好，請稍候再試。");
        return;
    }
    const playerState = player.getPlayerState();
    if (playerState === YT.PlayerState.PLAYING) {
        player.pauseVideo();
    } else {
        player.playVideo();
    }
});

// --- 4.3 測驗相關按鈕 ---
keypad.addEventListener('click', (event) => {
    const target = event.target;
    if (!target.matches('.keypad-btn')) { return; }
    const key = target.dataset.key;
    if (key === 'check') { checkAnswer(); }
    else if (key === 'clear') { answerInput.value = ''; }
    else if (key === 'backspace') { answerInput.value = answerInput.value.slice(0, -1); }
    else { if (answerInput.value.length < 3) { answerInput.value += key; } }
});

optionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        optionBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentOperation = btn.dataset.op;
        startQuiz();
    });
});

restartBtn.addEventListener('click', startQuiz);

// ====[ 5. 初始設定 ]====
function initialize() {
    showQuizPage();
    generateMultiplicationTable();
    startQuiz();
}

// 由於 onYouTubeIframeAPIReady 是由外部 API 呼叫，我們需要確保它在 global scope
// 而 initialize 則在 DOM 載入後執行比較保險
window.addEventListener('DOMContentLoaded', initialize);