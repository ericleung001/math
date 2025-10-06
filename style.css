// ====[ 1. 頁面內容模板 ]====
const quizPageHTML = `
<div class="container">
    <div id="end-screen" class="hidden">
        <h2>做得好！</h2>
        <p>你完成了 10 條題目！</p>
        <p class="final-score">總分: <span id="final-score-value"></span></p>
        <button id="restart-btn" class="play-btn">重新開始</button>
    </div>
    <div id="game-screen">
        <h1>數學小練習</h1>
        <div class="options">
            <button class="option-btn" data-op="add">+</button>
            <button class="option-btn" data-op="subtract">-</button>
            <button class="option-btn" data-op="multiply">×</button>
            <button class="option-btn" data-op="divide">÷</button>
            <button class="option-btn active" data-op="random">隨機</button>
        </div>
        <div class="stats-container">
            <div class="score-board">得分: <span id="score">0</span></div>
            <div class="progress-tracker">題目: <span id="question-count">1</span> / 10</div>
        </div>
        <div class="math-problem-container">
            <div class="math-problem">
                <span id="num1"></span><span id="operator"></span><span id="num2"></span><span>=</span>
            </div>
            <div class="icon-display">
                <div id="icons1" class="icon-group"></div>
                <div id="op-symbol" class="icon-group"></div>
                <div id="icons2" class="icon-group"></div>
            </div>
        </div>
        <input type="text" id="answer-input" placeholder="?" readonly>
        <div id="keypad">
            <button class="keypad-btn" data-key="7">7</button><button class="keypad-btn" data-key="8">8</button><button class="keypad-btn" data-key="9">9</button><button class="keypad-btn" data-key="clear">清除</button>
            <button class="keypad-btn" data-key="4">4</button><button class="keypad-btn" data-key="5">5</button><button class="keypad-btn" data-key="6">6</button><button class="keypad-btn" data-key="backspace">←</button>
            <button class="keypad-btn" data-key="1">1</button><button class="keypad-btn" data-key="2">2</button><button class="keypad-btn" data-key="3">3</button><button class="keypad-btn check" data-key="check">✔</button>
            <button class="keypad-btn" data-key="0" style="grid-column: 1 / 4">0</button>
        </div>
        <p id="feedback"></p>
    </div>
</div>`;

const tablePageHTML = `
<div class="container">
    <h1>九因歌乘數表</h1>
    <button id="play-chant-btn" class="play-btn">🎵 播放九因歌</button>
    <div id="player-container">
        <div id="youtube-player"></div>
    </div>
    <div class="table-scroll-wrapper">
        <div id="multiplication-table" class="table-grid"></div>
    </div>
</div>`;

const adminPageHTML = `
<div class="container">
    <h1>後台設定</h1>
    <div class="setting-item">
        <label for="max-result-input">最大總和值 (0 代表無限制)</label>
        <input type="number" id="max-result-input" min="0">
        <button id="save-settings-btn" class="play-btn">儲存設定</button>
        <p id="save-status"></p>
    </div>
</div>`;

// ====[ 2. 動態載入頁面內容 ]====
document.getElementById('quiz-section').innerHTML = quizPageHTML;
document.getElementById('table-section').innerHTML = tablePageHTML;
document.getElementById('admin-section').innerHTML = adminPageHTML;

// ====[ 3. 元素宣告 ]====
const navQuizBtn = document.getElementById('nav-quiz');
const navTableBtn = document.getElementById('nav-table');
const navAdminBtn = document.getElementById('nav-admin');
const quizSection = document.getElementById('quiz-section');
const tableSection = document.getElementById('table-section');
const adminSection = document.getElementById('admin-section');
const passcodeModal = document.getElementById('passcode-modal');
const passcodeSubmitBtn = document.getElementById('passcode-submit-btn');
const passcodeInput = document.getElementById('passcode-input');
const passcodeError = document.getElementById('passcode-error');
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
const playChantBtn = document.getElementById('play-chant-btn');
const multiplicationTable = document.getElementById('multiplication-table');
const maxResultInput = document.getElementById('max-result-input');
const saveSettingsBtn = document.getElementById('save-settings-btn');
const saveStatus = document.getElementById('save-status');

// ====[ 4. 變數宣告 ]====
let score = 0, correctAnswer, currentOperation = 'random', questionCounter = 0;
const QUESTIONS_PER_ROUND = 10;
const encouragements = [ '太棒了！', '你真聰明！', '完全正確！', '繼續加油！', '做得好！', '一百分！' ];
const icons = ['🚗', '🍎', '⭐', '🎈', '🐶', '⚽', '🍓', '🌻', '🐠', '🦋'];
let player;
const YOUTUBE_VIDEO_ID = 'D06jY5Y7n9k';
let maxResultSetting = 0;
let isAdminAuthenticated = false;
const ADMIN_PASSCODE = '0114';

// ====[ 5. 核心函式 ]====

function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '100%', width: '100%', videoId: YOUTUBE_VIDEO_ID,
        playerVars: { 'playsinline': 1, 'autoplay': 0, 'controls': 1, 'rel': 0, 'modestbranding': 1 },
        events: { 'onReady': onPlayerReady, 'onStateChange': onPlayerStateChange }
    });
}
function onPlayerReady(event) { console.log('YouTube 播放器已準備就緒！'); }
function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) { playChantBtn.textContent = '⏸️ 暫停播放'; }
    else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) { playChantBtn.textContent = '🎵 播放九因歌'; }
}

function showQuizPage() {
    quizSection.classList.remove('hidden'); tableSection.classList.add('hidden'); adminSection.classList.add('hidden');
    navQuizBtn.classList.add('active'); navTableBtn.classList.remove('active'); navAdminBtn.classList.remove('active');
    if (player && typeof player.pauseVideo === 'function' && player.getPlayerState() === YT.PlayerState.PLAYING) { player.pauseVideo(); }
}
function showTablePage() {
    quizSection.classList.add('hidden'); tableSection.classList.remove('hidden'); adminSection.classList.add('hidden');
    navQuizBtn.classList.remove('active'); navTableBtn.classList.add('active'); navAdminBtn.classList.remove('active');
}
function showAdminPage() {
    quizSection.classList.add('hidden'); tableSection.classList.add('hidden'); adminSection.classList.remove('hidden');
    navQuizBtn.classList.remove('active'); navTableBtn.classList.remove('active'); navAdminBtn.classList.add('active');
}

function saveSettings() {
    const value = parseInt(maxResultInput.value, 10);
    if (!isNaN(value) && value >= 0) {
        maxResultSetting = value;
        localStorage.setItem('mathQuizMaxResult', maxResultSetting);
        saveStatus.textContent = '設定已儲存！';
        setTimeout(() => { saveStatus.textContent = ''; }, 2000);
    } else {
        saveStatus.textContent = '請輸入有效的數字 (>=0)';
    }
}
function loadSettings() {
    const savedValue = localStorage.getItem('mathQuizMaxResult');
    maxResultSetting = (savedValue !== null) ? parseInt(savedValue, 10) : 0;
    maxResultInput.value = maxResultSetting;
}

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

function startQuiz() {
    score = 0; questionCounter = 0; scoreEl.textContent = score;
    endScreen.classList.add('hidden'); gameScreen.style.opacity = 1;
    generateProblem();
}
function endQuiz() {
    finalScoreValueEl.textContent = `${score} / ${QUESTIONS_PER_ROUND}`;
    endScreen.classList.remove('hidden');
    gameScreen.style.opacity = 0.5;
}
function generateProblem() {
    if (questionCounter >= QUESTIONS_PER_ROUND) { endQuiz(); return; }
    if (questionCounter === 0) { // Only increment on subsequent problems
        questionCounter = 1;
    } else {
        questionCounter++;
    }
    questionCountEl.textContent = questionCounter;
    icons1El.innerHTML = ''; icons2El.innerHTML = '';
    const currentIcon = icons[Math.floor(Math.random() * icons.length)];
    let num1, num2, result, operation;
    let loopGuard = 0;

    do {
        operation = currentOperation;
        if (operation === 'random') {
            const operations = ['add', 'subtract', 'multiply', 'divide'];
            operation = operations[Math.floor(Math.random() * operations.length)];
        }
        let upperLimit = (maxResultSetting > 0) ? maxResultSetting : 10;
        switch (operation) {
            case 'add':
                num1 = Math.floor(Math.random() * (upperLimit + 1));
                num2 = Math.floor(Math.random() * (upperLimit + 1));
                result = num1 + num2;
                operatorEl.textContent = '+'; opSymbolEl.textContent = '+';
                break;
            case 'subtract':
                num1 = Math.floor(Math.random() * 21);
                num2 = Math.floor(Math.random() * 21);
                if (num1 < num2) { [num1, num2] = [num2, num1]; }
                result = num1 - num2;
                operatorEl.textContent = '-'; opSymbolEl.textContent = '-';
                break;
            case 'multiply':
                num1 = Math.floor(Math.random() * 10);
                num2 = Math.floor(Math.random() * 10);
                result = num1 * num2;
                operatorEl.textContent = '×'; opSymbolEl.textContent = '×';
                break;
            case 'divide':
                const quotient = Math.floor(Math.random() * 9) + 1;
                num2 = Math.floor(Math.random() * 9) + 1;
                num1 = quotient * num2;
                result = quotient;
                operatorEl.textContent = '÷'; opSymbolEl.textContent = '÷';
                break;
        }
        loopGuard++;
        if (loopGuard > 100) {
            console.warn("找不到符合條件的題目，已暫時取消最大值限制。");
            maxResultSetting = 0;
        }
    } while (maxResultSetting > 0 && result > maxResultSetting);
    
    correctAnswer = result;
    num1El.textContent = num1; num2El.textContent = num2;
    const iconSize = (num1 > 20 || num2 > 20) ? '20px' : '30px';
    icons1El.style.fontSize = iconSize; icons2El.style.fontSize = iconSize;
    for (let i = 0; i < num1; i++) { icons1El.innerHTML += `<span>${currentIcon}</span>`; }
    for (let i = 0; i < num2; i++) { icons2El.innerHTML += `<span>${currentIcon}</span>`; }
    answerInput.value = ''; feedbackEl.textContent = '';
}
function checkAnswer() {
    answerInput.classList.remove('shake'); scoreEl.classList.remove('correct-animation');
    const userAnswer = parseInt(answerInput.value, 10);
    if (isNaN(userAnswer) || answerInput.value === '') {
        feedbackEl.textContent = '請先輸入答案哦！'; feedbackEl.style.color = 'orange'; answerInput.classList.add('shake'); return;
    }
    if (userAnswer === correctAnswer) {
        feedbackEl.textContent = encouragements[Math.floor(Math.random() * encouragements.length)];
        feedbackEl.style.color = '#2ecc71'; score++; scoreEl.textContent = score;
        scoreEl.classList.add('correct-animation');
        setTimeout(() => { generateProblem(); scoreEl.classList.remove('correct-animation'); }, 1200);
    } else {
        feedbackEl.textContent = '答錯了，再試一次！'; feedbackEl.style.color = '#e74c3c';
        answerInput.classList.add('shake');
        setTimeout(() => { answerInput.value = ''; }, 1000);
    }
}

// ====[ 6. 事件監聽 ]====
navQuizBtn.addEventListener('click', showQuizPage);
navTableBtn.addEventListener('click', showTablePage);
navAdminBtn.addEventListener('click', () => {
    if (isAdminAuthenticated) {
        showAdminPage();
    } else {
        passcodeModal.classList.remove('hidden');
        passcodeInput.focus();
    }
});

passcodeSubmitBtn.addEventListener('click', () => {
    if (passcodeInput.value === ADMIN_PASSCODE) {
        isAdminAuthenticated = true;
        passcodeModal.classList.add('hidden');
        passcodeInput.value = '';
        passcodeError.textContent = '';
        showAdminPage();
    } else {
        passcodeError.textContent = '密碼錯誤！';
        passcodeInput.value = '';
    }
});
passcodeInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') { passcodeSubmitBtn.click(); }
});
passcodeModal.addEventListener('click', (event) => {
    if (event.target === passcodeModal) {
        passcodeModal.classList.add('hidden');
        passcodeError.textContent = '';
        passcodeInput.value = '';
    }
});

saveSettingsBtn.addEventListener('click', saveSettings);
playChantBtn.addEventListener('click', () => {
    if (!player || typeof player.getPlayerState !== 'function') { alert("YouTube 播放器尚未準備好，請稍候再試。"); return; }
    const playerState = player.getPlayerState();
    if (playerState === YT.PlayerState.PLAYING) { player.pauseVideo(); } else { player.playVideo(); }
});
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
        optionBtns.forEach(b => b.classList.remove('active')); btn.classList.add('active');
        currentOperation = btn.dataset.op;
        startQuiz();
    });
});
restartBtn.addEventListener('click', startQuiz);

// ====[ 7. 初始化 ]====
function initialize() {
    loadSettings();
    showQuizPage();
    generateMultiplicationTable();
    startQuiz();
}
window.addEventListener('DOMContentLoaded', initialize);
