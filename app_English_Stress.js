let APP_ITEMS = [];
let currentMode = "learn";
let selectedMode = "learn";
let idx = 0;
let quizItem = null;
let quizHistory = [];
let quizHistoryIndex = -1;
let gameQueue = [];
let gameIndex = 0;
let gameResults = [];
let trialStartTime = 0;

const modeLabels = { learn: "학습", quiz: "퀴즈", game: "게임" };
const stressLabels = {
  1: { en: "Oxytone", ko: "끝음절 강세" },
  2: { en: "Paroxytone", ko: "뒤에서 둘째 강세" },
  3: { en: "Proparoxytone", ko: "뒤에서 셋째 이상 강세" },
};

function normalizeAppItem(row) {
  return {
    id: Number(row.id) || 0,
    word: String(row.word || ""),
    ipa: String(row.ipa || ""),
    korean: String(row.korean || ""),
    stress: Number(row.stress) || 0,
    stressLabel: String(row.stressLabel || ""),
    stressKorean: String(row.stressKorean || ""),
    syllableCount: row.syllableCount || "",
    stressPosition: row.stressPosition || "",
  };
}

async function loadJson() {
  const res = await fetch("data_English_Stress/english_stress_items.json");
  if (!res.ok) throw new Error("english_stress_items.json load failed");
  return res.json();
}

function getCurrentItems() {
  return APP_ITEMS.filter((item) => item.word && item.ipa && item.korean && [1, 2, 3].includes(item.stress));
}

function shuffle(arr) {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function renderSetup() {
  document.getElementById("setupTitle").textContent = "모드를 선택하세요";
  document.getElementById("setupBack").style.display = "none";

  document.getElementById("setupModeLearn").onclick = () => {
    selectedMode = "learn";
    startSelected();
  };
  document.getElementById("setupModeQuiz").onclick = () => {
    selectedMode = "quiz";
    startSelected();
  };
  document.getElementById("setupModeGame").onclick = () => {
    selectedMode = "game";
    startSelected();
  };
}

function startSelected() {
  currentMode = selectedMode;
  idx = 0;
  quizHistory = [];
  quizHistoryIndex = -1;
  gameQueue = [];
  gameIndex = 0;
  gameResults = [];

  document.body.classList.add("running");
  document.body.classList.remove("learn", "quiz", "game", "result");
  document.body.classList.add(currentMode);

  document.getElementById("screenTitle").textContent = `영어 강세 · ${modeLabels[currentMode]}`;
  document.getElementById("nextBtn").style.visibility = currentMode === "learn" ? "visible" : "hidden";

  if (currentMode === "learn") renderLearn();
  if (currentMode === "quiz") startQuiz();
  if (currentMode === "game") startGame();
}

function goSetup() {
  document.body.classList.remove("running", "learn", "quiz", "game", "result");
  document.getElementById("nextBtn").style.visibility = "visible";
  renderSetup();
}

function currentItem() {
  const items = getCurrentItems();
  return items[idx % items.length];
}

function renderLearn() {
  const items = getCurrentItems();
  const item = currentItem();
  if (!item) return;

  document.getElementById("learnWord").textContent = item.word;
  document.getElementById("learnIpa").textContent = item.ipa;
  document.getElementById("learnKorean").textContent = item.korean;
  document.getElementById("learnStress").textContent = stressLabels[item.stress].en;
  document.getElementById("learnStressKo").textContent = stressLabels[item.stress].ko;
  document.getElementById("learnDetail").textContent = `음절 수: ${item.syllableCount || "-"} · 강세 음절 위치: ${item.stressPosition || "-"}`;
  document.getElementById("learnProgress").textContent = `${idx + 1}/${items.length}`;
}

function nextLearn() {
  if (currentMode !== "learn") return;
  const items = getCurrentItems();
  idx = (idx + 1) % items.length;
  renderLearn();
}

function randomItem() {
  const items = getCurrentItems();
  return items[Math.floor(Math.random() * items.length)];
}

function startQuiz(direction = "next") {
  if (direction === "prev" && quizHistoryIndex > 0) {
    quizHistoryIndex -= 1;
    quizItem = quizHistory[quizHistoryIndex];
  } else {
    quizItem = randomItem();
    quizHistory = quizHistory.slice(0, quizHistoryIndex + 1);
    quizHistory.push(quizItem);
    quizHistoryIndex = quizHistory.length - 1;
  }

  document.getElementById("quizWord").textContent = quizItem.word;
  document.getElementById("quizIpa").textContent = quizItem.ipa;
  document.getElementById("quizKorean").textContent = quizItem.korean;
  document.getElementById("quizInfoText").textContent = "강세 유형을 선택하세요.";
  document.getElementById("quizAnswerText").textContent = "";
  document.getElementById("quizProgress").textContent = "";
  renderKeyboard("quiz");
}

function startGame() {
  gameQueue = shuffle(getCurrentItems());
  gameIndex = 0;
  gameResults = [];
  renderGame();
}

function renderGame() {
  if (gameIndex >= gameQueue.length) {
    showGameResult();
    return;
  }

  const item = gameQueue[gameIndex];
  trialStartTime = Date.now();

  document.getElementById("gameWord").textContent = item.word;
  document.getElementById("gameIpa").textContent = item.ipa;
  document.getElementById("gameKorean").textContent = item.korean;
  document.getElementById("gameInfoText").textContent = "강세 유형을 선택하세요.";
  document.getElementById("gameProgress").textContent = `${gameIndex + 1} / ${gameQueue.length}`;

  renderKeyboard("game");
}

function renderKeyboard(target) {
  const keyboard = document.getElementById(target === "game" ? "gameKeyboard" : "quizKeyboard");
  keyboard.innerHTML = "";

  [1, 2, 3].forEach((stress) => {
    const btn = document.createElement("button");
    btn.innerHTML = `${stressLabels[stress].en}<span class="keySub">${stressLabels[stress].ko}</span>`;
    btn.onclick = () => {
      if (target === "game") answerGame(stress);
      else answerQuiz(stress);
    };
    keyboard.appendChild(btn);
  });
}

function answerQuiz(answerStress) {
  if (!quizItem) return;
  const correct = answerStress === quizItem.stress;

  document.getElementById("quizInfoText").textContent = correct ? "정답" : "오답";
  document.getElementById("quizAnswerText").textContent = `정답: ${stressLabels[quizItem.stress].en} · ${stressLabels[quizItem.stress].ko}`;

  window.setTimeout(() => startQuiz(), 650);
}

function answerGame(answerStress) {
  const item = gameQueue[gameIndex];
  const correct = answerStress === item.stress;

  gameResults.push({
    word: item.word,
    ipa: item.ipa,
    korean: item.korean,
    correctStress: item.stress,
    correctLabel: stressLabels[item.stress].en,
    answerStress,
    answerLabel: stressLabels[answerStress].en,
    correct,
    responseTimeMs: Date.now() - trialStartTime,
  });

  gameIndex += 1;
  renderGame();
}

function showGameResult() {
  document.body.classList.remove("learn", "quiz", "game", "result");
  document.body.classList.add("running", "result");
  document.getElementById("screenTitle").textContent = "영어 강세 · 결과";
  document.getElementById("nextBtn").style.visibility = "hidden";

  const total = gameResults.length;
  const correct = gameResults.filter((r) => r.correct).length;
  const accuracy = total ? Math.round((correct / total) * 100) : 0;
  const wrong = gameResults.filter((r) => !r.correct);

  document.getElementById("scoreBox").textContent = `${correct}/${total} · ${accuracy}%`;

  if (!wrong.length) {
    document.getElementById("wrongList").textContent = "오답 없음";
  } else {
    document.getElementById("wrongList").textContent = wrong
      .map((r, i) => `${i + 1}. ${r.word} ${r.ipa}\n` + `   선택: ${r.answerLabel}\n` + `   정답: ${r.correctLabel}\n`)
      .join("\n");
  }
}

function initEvents() {
  document.getElementById("backBtn").onclick = goSetup;
  document.getElementById("nextBtn").onclick = nextLearn;
  document.getElementById("restartGame").onclick = () => {
    selectedMode = "game";
    startSelected();
  };
  document.getElementById("resultHome").onclick = goSetup;
}

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const rows = await loadJson();
    APP_ITEMS = rows.map(normalizeAppItem).filter((item) => item.word && item.ipa && item.korean && item.stress);
    initEvents();
    renderSetup();
  } catch (e) {
    alert(e.message || e);
  }
});
