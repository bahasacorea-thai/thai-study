let APP_ITEMS = [];
let currentMode = "learn";
let selectedMode = "learn";

let currentCategory = "neutral";
let selectedCategory = "neutral";
let setupStep = "category";

let currentDifficulty = "advanced";
let idx = 0;

let quizItem = null;
let quizHistory = [];
let quizHistoryIndex = -1;

let currentQuizDifficulty = "beginner";
let quizQueue = [];
let quizIndex = 0;

let gameQueue = [];
let gameIndex = 0;

let gameResults = [];
let trialStartTime = 0;
let touchStartX = 0;
let touchStartY = 0;

const modeLabels = {
  learn: "학습",
  quiz: "퀴즈",
  game: "게임",
};

const categoryLabels = {
  neutral: "Neutral suffixes",
  tonic: "Tonic endings",
  heavy: "Heavy endings",
  light: "Light endings",
  posttonic: "Posttonic suffixes",
  special: "Special suffixes",
};

const difficultySettings = {
  beginner: 1,
  intermediate: 2,
  advanced: 3,
};

const difficultyLabels = {
  beginner: "초급",
  intermediate: "중급",
  advanced: "고급",
};

const stressLabels = {
  1: { en: "Oxytone", ko: "끝 음절 강세 단어" },
  2: { en: "Paroxytone", ko: "끝에서 두번째 음절 강세 단어" },
  3: { en: "Proparoxytone", ko: "끝에서 세번째 음절 강세 단어" },
  4: { en: "Alter", ko: "기타" },
};

function normalizeAppItem(row) {
  const word = String(row.word || row.Word || "");
  const ipa = String(row.ipa || "");
  const korean = String(row.korean || "");
  const stress = Number(row.stress || row.Stress) || 0;
  const stressInfo = stressLabels[stress] || { en: "", ko: "" };

  return {
    serial: row.serial || row.Serial || "",

    word,
    ipa,
    korean,

    class: String(row.class || row.Class || ""),
    ending: String(row.ending || row.Ending || ""),
    morpheme: String(row.morpheme || row.Morph_Boundary || word || ""),

    stress,
    stressLabel: String(row.stressLabel || stressInfo.en || ""),
    stressKorean: String(row.stressKorean || stressInfo.ko || ""),

    syllableCount: row.syllableCount || "",
    stressPosition: row.stressPosition || "",

    stressNote: String(row.stressNote || ""),
    wikiLink: String(row.wikiLink || ""),
  };
}

async function loadJson() {
  const res = await fetch("data_English_Stress/english_stress_items.json");
  if (!res.ok) throw new Error("english_stress_items.json load failed");
  return res.json();
}

function getCurrentItems() {
  return APP_ITEMS.filter((item) => {
    if (!item.word || !item.ipa || !item.korean) return false;
    if (![1, 2, 3, 4].includes(item.stress)) return false;

    const cls = String(item.class || "").trim();

    // 테스트 단계: 어떤 범주 버튼을 눌러도 TEST 항목 전체를 보여준다.
    if (cls === "TEST") return true;

    if (currentCategory === "neutral") return cls.startsWith("1 ");
    if (currentCategory === "tonic") return cls.startsWith("2 ");
    if (currentCategory === "heavy") return cls.startsWith("3 ");
    if (currentCategory === "light") return cls.startsWith("4 ");
    if (currentCategory === "posttonic") return cls.startsWith("5 ");
    if (currentCategory === "special") return cls.startsWith("6 ");

    return true;
  });
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
  document.getElementById("quizDifficultyRow").classList.remove("show");
  document.getElementById("gameDifficultyRow").classList.remove("show");

  document.getElementById("setupBack").onclick = () => {
    document.body.classList.remove("setup-mode");
    selectedMode = "learn";
    renderSetup();
  };

  [
    ["setupCategoryNeutral", "neutral"],
    ["setupCategoryTonic", "tonic"],
    ["setupCategoryHeavy", "heavy"],
    ["setupCategoryLight", "light"],
    ["setupCategoryPosttonic", "posttonic"],
    ["setupCategorySpecial", "special"],
  ].forEach(([id, category]) => {
    document.getElementById(id).onclick = () => {
      selectedCategory = category;
      currentCategory = category;
      selectedMode = "learn";

      document.getElementById("setupTitle").textContent = `${categoryLabels[category]} · 모드를 선택하세요`;

      document.body.classList.add("setup-mode");
      renderSetup();
    };
  });

  document.getElementById("setupModeLearn").onclick = () => {
    selectedMode = "learn";
    startSelected();
  };

  document.getElementById("setupModeQuiz").onclick = () => {
    selectedMode = selectedMode === "quiz" ? "learn" : "quiz";
    renderSetup();
  };

  document.getElementById("quizDifficultyRow").classList.toggle("show", selectedMode === "quiz");

  document.getElementById("quizDifficultyBeginner").onclick = () => {
    currentQuizDifficulty = "beginner";
    startSelected();
  };

  document.getElementById("quizDifficultyIntermediate").onclick = () => {
    currentQuizDifficulty = "intermediate";
    startSelected();
  };

  document.getElementById("quizDifficultyAdvanced").onclick = () => {
    currentQuizDifficulty = "advanced";
    startSelected();
  };

  document.getElementById("setupModeGame").onclick = () => {
    selectedMode = selectedMode === "game" ? "learn" : "game";
    renderSetup();
  };

  document.getElementById("gameDifficultyRow").classList.toggle("show", selectedMode === "game");

  document.getElementById("gameDifficultyBeginner").onclick = () => {
    currentDifficulty = "beginner";
    startSelected();
  };

  document.getElementById("gameDifficultyIntermediate").onclick = () => {
    currentDifficulty = "intermediate";
    startSelected();
  };

  document.getElementById("gameDifficultyAdvanced").onclick = () => {
    currentDifficulty = "advanced";
    startSelected();
  };
}

function startSelected() {
  currentMode = selectedMode;
  currentCategory = selectedCategory;
  idx = 0;
  quizHistory = [];
  quizHistoryIndex = -1;
  quizQueue = [];
  quizIndex = 0;
  gameQueue = [];
  gameIndex = 0;
  gameResults = [];

  document.body.classList.add("running");
  document.body.classList.remove("learn", "quiz", "game", "result");
  document.body.classList.add(currentMode);

  document.getElementById("screenTitle").textContent = `${categoryLabels[currentCategory]} · ${modeLabels[currentMode]}`;
  document.getElementById("nextBtn").style.visibility = "visible";

  if (currentMode === "learn") renderLearn();
  if (currentMode === "quiz") startQuiz();
  if (currentMode === "game") startGame();
}

function goSetup() {
  if (document.body.classList.contains("result")) {
    const shouldSave = confirm("결과를 저장하시겠습니까?");

    if (shouldSave) {
      const name = prompt("이름을 입력하세요.");

      if (name && name.trim()) {
        saveGameResultPdf(name.trim());
      }
    }
  }

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
  document.getElementById("learnMorpheme").textContent = item.morpheme || item.word;
  document.getElementById("learnIpa").textContent = item.ipa;
  document.getElementById("learnKorean").textContent = item.korean;
  document.getElementById("learnStress").textContent = stressLabels[item.stress].en;
  document.getElementById("learnStressKo").textContent = stressLabels[item.stress].ko;
  document.getElementById("learnDetail").textContent = `음절 수: ${item.syllableCount || "-"} · 강세 위치: ${item.stressPosition || "-"}`;
  document.getElementById("learnProgress").textContent = `${idx + 1}/${items.length}`;

  fitLearnWord();
}

function nextLearn() {
  if (currentMode !== "learn") return;
  const items = getCurrentItems();
  idx = (idx + 1) % items.length;
  renderLearn();
}

function prevLearn() {
  if (currentMode !== "learn") return;
  const items = getCurrentItems();
  idx = (idx - 1 + items.length) % items.length;
  renderLearn();
}

function speakCurrentItem() {
  let item = null;

  if (currentMode === "learn") item = currentItem();
  if (currentMode === "quiz") item = quizItem;
  if (currentMode === "game") item = gameQueue[gameIndex];

  if (!item || !item.word || !window.speechSynthesis) return;
  // 게임 모드에서 발음 듣기를 차단하려면 아래 줄의 주석을 해제하십시오.
  if (currentMode === "game") return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(item.word);
  utterance.lang = "en-US";
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
}

function openWiktionary(itemOrWord) {
  if (!itemOrWord) return;

  if (typeof itemOrWord === "object" && itemOrWord.wikiLink) {
    window.open(itemOrWord.wikiLink, "_blank", "noopener");
    return;
  }

  const word = String(itemOrWord || "");
  const url = `https://en.wiktionary.org/wiki/${encodeURIComponent(word)}`;
  window.open(url, "_blank", "noopener");
}

function handleLearnSwipeStart(e) {
  const touch = e.changedTouches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
}

function handleLearnSwipeEnd(e) {
  const touch = e.changedTouches[0];
  const dx = touch.clientX - touchStartX;
  const dy = touch.clientY - touchStartY;

  if (Math.abs(dx) < 45 || Math.abs(dx) <= Math.abs(dy)) return;

  if (dx < 0) nextLearn();
  else prevLearn();
}

function randomItem() {
  const items = getCurrentItems();
  return items[Math.floor(Math.random() * items.length)];
}

function makeQuizQueue() {
  const items = getCurrentItems();

  if (currentQuizDifficulty === "beginner") {
    return shuffle([...items]);
  }

  if (currentQuizDifficulty === "intermediate") {
    const queue = [];

    for (let i = 0; i < 3; i++) {
      queue.push(...shuffle([...items]));
    }

    return shuffle(queue);
  }

  return null;
}

function makeGameQueue() {
  const queue = [];
  const repetition = difficultySettings[currentDifficulty] || 3;

  for (let r = 1; r <= repetition; r++) {
    getCurrentItems().forEach((item) => {
      queue.push({
        ...item,
        repetition: r,
      });
    });
  }

  return shuffle(queue);
}

function startQuiz(direction = "next") {
  if (direction === "prev" && quizHistoryIndex > 0) {
    quizHistoryIndex -= 1;
    quizItem = quizHistory[quizHistoryIndex];
  } else if (currentQuizDifficulty === "advanced") {
    quizItem = randomItem();
    quizHistory = quizHistory.slice(0, quizHistoryIndex + 1);
    quizHistory.push(quizItem);
    quizHistoryIndex = quizHistory.length - 1;
  } else {
    if (quizQueue.length === 0 || quizIndex >= quizQueue.length) {
      quizQueue = makeQuizQueue();
      quizIndex = 0;
    }

    quizItem = quizQueue[quizIndex];
    quizIndex += 1;

    quizHistory = quizHistory.slice(0, quizHistoryIndex + 1);
    quizHistory.push(quizItem);
    quizHistoryIndex = quizHistory.length - 1;
  }

  document.getElementById("quizWord").textContent = quizItem.word;
  document.getElementById("quizInfoText").textContent = "강세 유형을 선택하세요.";
  document.getElementById("quizInfoWrap").classList.remove("answered");

  document.getElementById("quizMorpheme").textContent = "";
  document.getElementById("quizIpa").textContent = "";
  document.getElementById("quizKorean").textContent = "";
  document.getElementById("quizDetail").textContent = "";

  document.getElementById("quizProgress").textContent = currentQuizDifficulty === "beginner" ? `${quizIndex} / ${quizQueue.length}` : "";

  fitQuizWord();
  renderKeyboard("quiz");
}

function fitQuizWord() {
  const el = document.getElementById("quizWord");
  if (!el) return;
  el.style.fontSize = "";
  while (el.scrollWidth > el.clientWidth && parseFloat(getComputedStyle(el).fontSize) > 24) {
    el.style.fontSize = parseFloat(getComputedStyle(el).fontSize) - 2 + "px";
  }
}

function fitTextToWidth(el, minFont = 24) {
  if (!el) return;

  el.style.fontSize = "";

  while (el.scrollWidth > el.clientWidth && parseFloat(getComputedStyle(el).fontSize) > minFont) {
    el.style.fontSize = parseFloat(getComputedStyle(el).fontSize) - 2 + "px";
  }
}

function fitLearnWord() {
  fitTextToWidth(document.getElementById("learnWord"), 24);
}

function fitGameWord() {
  fitTextToWidth(document.getElementById("gameWord"), 24);
}

function startGame() {
  gameQueue = makeGameQueue();
  gameIndex = 0;
  gameResults = [];
  trialStartTime = Date.now();

  renderGame();
}

function renderGame() {
  const gameScreen = document.getElementById("gameScreen");

  if (gameIndex >= gameQueue.length) {
    gameScreen.classList.add("gameDone");

    document.getElementById("gameWord").textContent = "";
    document.getElementById("gameProgress").textContent = "";

    return;
  }

  gameScreen.classList.remove("gameDone");

  const item = gameQueue[gameIndex];
  trialStartTime = Date.now();

  document.getElementById("gameWord").textContent = item.word;
  fitGameWord();

  document.getElementById("gameInfoText").textContent = "강세 유형을 선택하세요.";
  document.getElementById("gameProgress").textContent = `${gameIndex + 1} / ${gameQueue.length}`;

  renderKeyboard("game");
}

function renderKeyboard(target) {
  const keyboard = document.getElementById(target === "game" ? "gameKeyboard" : "quizKeyboard");
  keyboard.innerHTML = "";

  [4, 3, 2, 1].forEach((stress) => {
    const btn = document.createElement("button");
    const shapes = {
      1: `
    <svg width="24" height="24" viewBox="0 0 100 100">
      <polygon
        points="50,10 90,90 10,90"
        fill="#ff8ad8"
        stroke="#0077ff"
        stroke-width="8"/>
    </svg>
  `,

      2: `
    <svg width="24" height="24" viewBox="0 0 100 100">
      <rect
        x="12" y="12"
        width="76" height="76"
        fill="#90ee90"
        stroke="#ff00ff"
        stroke-width="8"/>
    </svg>
  `,

      3: `
    <svg width="24" height="24" viewBox="0 0 100 100">
      <circle
        cx="50" cy="50" r="38"
        fill="#87cefa"
        stroke="#ff6600"
        stroke-width="8"/>
    </svg>
  `,
      4: `
    <svg viewBox="0 0 100 100" width="52" height="52" aria-hidden="true">
      <circle cx="50" cy="50" r="36"
        fill="none"
        stroke="#111"
        stroke-width="4"/>
      <polygon
        points="50,20 57,41 80,41 61,55 68,78 50,64 32,78 39,55 20,41 43,41"
        fill="#111"/>
    </svg>
  `,
    };
    btn.className = `stress-${stress}`;
    btn.innerHTML =
      `<span class="keyShape">${shapes[stress]}</span>` +
      `<span class="keyLabel">${stressLabels[stress].en}</span>` +
      `<span class="keySub">${stressLabels[stress].ko}</span>`;
    btn.onclick = () => {
      if (target === "game") answerGame(stress);
      else answerQuiz(stress);
    };
    keyboard.appendChild(btn);
  });
}

let sharedAudioContext = null;

function getAudioContext() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;

  if (!AudioContextClass) return null;

  if (!sharedAudioContext) {
    sharedAudioContext = new AudioContextClass();
  }

  if (sharedAudioContext.state === "suspended") {
    sharedAudioContext.resume();
  }

  return sharedAudioContext;
}

function playCorrect() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [523, 659, 784, 1046];

  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();

    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.value = freq;

    osc.connect(gain);
    gain.connect(ctx.destination);

    const t = ctx.currentTime + i * 0.18;

    gain.gain.setValueAtTime(0, t);

    gain.gain.linearRampToValueAtTime(0.25, t + 0.02);

    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.16);

    osc.start(t);
    osc.stop(t + 0.18);
  });
}

function playWrong() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const freqs = [523.25, 554.37, 587.33, 622.25, 659.25, 698.46, 739.99, 783.99, 830.61, 880.0, 932.33, 987.77];

  const master = ctx.createGain();

  master.gain.value = 0.04;
  master.connect(ctx.destination);

  freqs.forEach((freq) => {
    const osc = ctx.createOscillator();

    const gain = ctx.createGain();

    osc.type = "sawtooth";

    osc.frequency.value = freq;

    osc.connect(gain);
    gain.connect(master);

    const t = ctx.currentTime;

    gain.gain.setValueAtTime(0.001, t);

    gain.gain.linearRampToValueAtTime(1, t + 0.02);

    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.7);

    osc.start(t);
    osc.stop(t + 0.7);
  });
}

function answerQuiz(answerStress) {
  if (!quizItem) return;

  const correct = answerStress === quizItem.stress;

  if (correct) playCorrect();
  else playWrong();

  document.getElementById("quizInfoWrap").classList.add("answered");

  document.getElementById("quizMorpheme").textContent = "";
  document.getElementById("quizIpa").textContent = quizItem.ipa || "";
  document.getElementById("quizKorean").textContent = "";
  document.getElementById("quizDetail").textContent = `음절 수: ${quizItem.syllableCount || "-"} · 강세 위치: ${quizItem.stressPosition || "-"}`;

  document.getElementById("quizProgress").textContent = currentQuizDifficulty === "beginner" ? `${quizIndex} / ${quizQueue.length}` : "";

  document.getElementById("prevQuizBtn").onclick = () => startQuiz("prev");
  document.getElementById("nextQuizBtn").onclick = () => startQuiz("next");
}

function answerGame(answerStress) {
  if (gameIndex >= gameQueue.length) return;

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
  document.getElementById("gameScreen").classList.remove("gameDone");

  document.body.classList.remove("learn", "quiz", "game", "result");
  document.body.classList.add("running", "result");
  document.getElementById("screenTitle").textContent = "영어 강세 · 결과";
  document.getElementById("nextBtn").style.visibility = "hidden";

  const total = gameResults.length;
  const correct = gameResults.filter((r) => r.correct).length;
  const wrong = gameResults.filter((r) => !r.correct);
  const accuracyRate = total ? Math.round((correct / total) * 10000) / 100 : 0;

  document.getElementById("scoreBox").innerHTML = `점수: ${correct}/${total} (정답률: ${accuracyRate}%)`;

  if (!wrong.length) {
    document.getElementById("wrongList").textContent = "오답 없음";
  } else {
    document.getElementById("wrongList").innerHTML = wrong
      .map(
        (r, i) =>
          `<div class="wrongRow">` +
          `<span class="wrongLeft">${i + 1}. ${r.word} ${r.ipa || ""}</span>` +
          `<span class="wrongRight">자극: ${r.correctLabel.slice(0, 3).toLowerCase()}, 반응: ${r.answerLabel.slice(0, 3).toLowerCase()}</span>` +
          `</div>`,
      )
      .join("");
  }
}

function confirmSaveGameResult(onDone) {
  const shouldSave = confirm("결과를 저장하시겠습니까?");

  if (!shouldSave) {
    onDone?.();
    return;
  }

  const name = prompt("저장 이름을 입력하세요.");

  if (!name || !name.trim()) {
    onDone?.();
    return;
  }

  saveGameResultPdf(name.trim());

  onDone?.();
}

function saveGameResultPdf(name) {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  const total = gameResults.length;
  const correct = gameResults.filter((r) => r.correct).length;
  const accuracy = total ? Math.round((correct / total) * 10000) / 100 : 0;

  const now = new Date();
  const safeName = name.replace(/[\\/:*?"<>|]/g, "_");
  const fileName = `${safeName}_EnglishStress_${currentDifficulty}_${now.toISOString().slice(0, 10)}.pdf`;

  pdf.setFontSize(18);
  pdf.text(`점수: ${correct}/${total}`, 15, 18);
  pdf.text(`정답률: ${accuracy}%`, 15, 28);

  pdf.setFontSize(10);

  let y = 42;

  gameResults
    .filter((r) => !r.correct)
    .forEach((r, i) => {
      if (y > 285) {
        pdf.addPage();
        y = 18;
      }

      const left = `${i + 1}. ${r.word} ${r.ipa || ""}`;
      const right = `자극: ${r.correctLabel.slice(0, 3).toLowerCase()}  ` + `반응: ${r.answerLabel.slice(0, 3).toLowerCase()}`;

      pdf.text(left, 15, y);
      pdf.text(right, 195, y, { align: "right" });

      y += 7;
    });

  pdf.save(fileName);
}

function initEvents() {
  document.getElementById("backBtn").onclick = goSetup;
  document.getElementById("nextBtn").onclick = speakCurrentItem;

  document.getElementById("learnWord").onclick = () => {
    const item = currentItem();
    openWiktionary(item);
  };

  document.getElementById("quizWord").onclick = () => {
    openWiktionary(quizItem);
  };

  // document.getElementById("gameWord").onclick = () => {
  //   const item = gameQueue[gameIndex];
  //   openWiktionary(item);
  // };

  document.getElementById("learnScreen").addEventListener("touchstart", handleLearnSwipeStart, { passive: true });
  document.getElementById("learnScreen").addEventListener("touchend", handleLearnSwipeEnd, { passive: true });
  document.getElementById("restartGame").onclick = () => {
    confirmSaveGameResult(() => {
      startGame();
    });
  };

  document.getElementById("gameResultBtn").onclick = () => {
    showGameResult();
  };
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
