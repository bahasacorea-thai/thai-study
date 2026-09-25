// Data is loaded from data/app_syllable_items.json
let ITEMS_V_SYLLABLE = [];

function normalizeSyllableItem(row) {
  return {
    index: Number(row.index) || 0,
    collation: Number(row.collation) || 0,
    pattern: row.pattern || "",
    canonical: row.canonical || "",
    korean: row.korean || "",
    rtgs: row.rtgs || "",
    ipa: row.ipa || "",
    formationType: row.formationType || "",
    codaRule: {
      main: row.codaRule || "",
      note: row["codaRule.note"] || "",
    },
    onsetRule: {
      cluster: row["onsetRule.cluster"] || "",
      note: row["onsetRule.note"] || "",
    },
    note: row.note || "",
  };
}

async function loadSyllableItems() {
  const response = await fetch("data/app_syllable_items.json");
  if (!response.ok) {
    throw new Error("app_syllable_items.json을 불러오지 못했습니다.");
  }

  const rows = await response.json();
  ITEMS_V_SYLLABLE = rows.map(normalizeSyllableItem);

  idx = 0;
  render();
}

/////////////////////////////////////////////// 통제부 ///////////////////////////////////////////////
let currentCategory = "pattern";
let currentSyllableSet = "basic";

let currentConsonantIndex = 0;

const ITEMS_CONSONANT_SYMBOLS = [
  "ก",
  "ข",
  "ฃ",
  "ค",
  "ฅ",
  "ฆ",
  "ง",
  "จ",
  "ฉ",
  "ช",
  "ซ",
  "ฌ",
  "ญ",
  "ฎ",
  "ฏ",
  "ฐ",
  "ฑ",
  "ฒ",
  "ณ",
  "ด",
  "ต",
  "ถ",
  "ท",
  "ธ",
  "น",
  "บ",
  "ป",
  "ผ",
  "ฝ",
  "พ",
  "ฟ",
  "ภ",
  "ม",
  "ย",
  "ร",
  "ล",
  "ว",
  "ศ",
  "ษ",
  "ส",
  "ห",
  "ฬ",
  "อ",
  "ฮ",
];

let idx = 0;

function getCurrentItems() {
  if (currentSyllableSet === "basic") {
    return ITEMS_V_SYLLABLE.filter((item) => item.canonical === "O");
  }

  if (currentSyllableSet === "additional") {
    return ITEMS_V_SYLLABLE.filter((item) => item.canonical !== "O");
  }

  return ITEMS_V_SYLLABLE;
}

function setActiveMode(buttonId) {
  document.querySelectorAll(".mode button").forEach((btn) => {
    btn.classList.remove("active");
  });

  document.getElementById(buttonId).classList.add("active");
}

function setActiveCategory(buttonId) {
  document.querySelectorAll(".category button").forEach((btn) => {
    btn.classList.remove("active");
  });

  document.getElementById(buttonId).classList.add("active");
}

function isIndependentCvItem(item) {
  return item.pattern === "ฤ◌" || item.pattern === "ฤๅ" || item.pattern === "ฦ◌" || item.pattern === "ฦๅ";
}

function getDisplaySyllable(item) {
  if (isIndependentCvItem(item)) {
    return item.pattern;
  }

  const consonant = ITEMS_CONSONANT_SYMBOLS[currentConsonantIndex];
  const replacement = currentCategory === "oang" ? "อ" : currentCategory === "kokai" ? consonant : null;

  if (!replacement) {
    return item.pattern;
  }

  const chars = [...item.pattern];
  const slots = chars.map((ch, i) => (ch === "◌" ? i : -1)).filter((i) => i !== -1);

  const codaIndex = slots.length >= 2 ? slots[slots.length - 1] : -1;

  return chars
    .map((ch, i) => {
      if (ch !== "◌") return ch;
      if (i === codaIndex) return ch;
      return replacement;
    })
    .join("");
}

function getDisplaySyllableHtml(item) {
  const display = getDisplaySyllable(item);

  if (!display.endsWith("◌")) {
    return "<span>" + display + "</span>";
  }

  return "<span>" + display.slice(0, -1) + '<span style="color: red;">◌</span>' + "</span>";
}

function hasOnsetSlot(item) {
  const chars = [...item.pattern];
  const slots = chars.map((ch, i) => (ch === "◌" ? i : -1)).filter((i) => i !== -1);

  if (slots.length === 0) return false;
  if (slots.length === 1) return true;

  const codaIndex = slots[slots.length - 1];
  return slots.some((i) => i !== codaIndex);
}

function getDisplayKorean(item) {
  if (isIndependentCvItem(item)) {
    return item.korean;
  }

  if (currentCategory !== "kokai" || !hasOnsetSlot(item)) {
    return item.korean;
  }

  const chars = [...item.korean];
  if (chars.length === 0) return item.korean;

  const code = chars[0].charCodeAt(0);
  const base = 0xac00;
  const end = 0xd7a3;

  if (code < base || code > end) return item.korean;

  const offset = code - base;
  const initial = Math.floor(offset / 588);

  if (initial !== 11) return item.korean;

  chars[0] = String.fromCharCode(code - 5880);
  return chars.join("");
}

function getDisplayRtgs(item) {
  if (isIndependentCvItem(item)) {
    return item.rtgs;
  }

  if (currentCategory !== "kokai" || !hasOnsetSlot(item)) {
    return item.rtgs;
  }

  return "k" + item.rtgs;
}

function getDisplayIpa(item) {
  if (isIndependentCvItem(item)) {
    return item.ipa;
  }

  if (currentCategory !== "kokai" || !hasOnsetSlot(item)) {
    return item.ipa;
  }

  if (item.ipa.startsWith("/")) {
    return "/k" + item.ipa.slice(1);
  }

  return "k" + item.ipa;
}

function getCodaText(rule) {
  if (!rule || !rule.main) return "";

  if (rule.main === "forbidden") return "종성 제약: 불가";
  if (rule.main === "required") return "종성 제약: 필수";
  if (rule.main === "allowed") return "종성 제약: 허용";

  return "종성 제약: " + rule.main;
}

function getOnsetText(rule) {
  if (!rule || !rule.cluster) return "";

  if (rule.cluster === "allowed") return "초성 제약: 자음군 허용";
  if (rule.cluster === "only singleton allowed") return "초성 제약: 홑자음만 허용";
  if (rule.cluster === "no C allowed") return "초성 제약: 자음군 불가";

  return "초성 제약: " + rule.cluster;
}

function getFormationText(value) {
  if (!value) return "";

  const labels = {
    after: "후위형",
    above: "상위형",
    below: "하위형",
    before: "전위형",
    frontClosed: "전폐형",
    backClosed: "후폐형",
    wrap: "포위형",
    flank: "중심형",
    special: "특수형",
  };

  return "중성 모양: " + (labels[value] || value);
}

function getRuleNote(item) {
  const lines = [];

  if (item.note) {
    lines.push("기타: " + item.note);
  }

  return lines.join("\n");
}

function render() {
  const items = getCurrentItems();
  const x = items[idx];
  if (!x) return;

  document.getElementById("syllableSymbol").innerHTML = getDisplaySyllableHtml(x);

  document.getElementById("learnKorean").textContent = "한글: " + getDisplayKorean(x);
  document.getElementById("learnRtgs").textContent = "RTGS: " + getDisplayRtgs(x);
  document.getElementById("learnIpa").textContent = "IPA: " + getDisplayIpa(x);

  document.getElementById("learnFormation").textContent = getFormationText(x.formationType);
  document.getElementById("learnCoda").textContent = getCodaText(x.codaRule);
  document.getElementById("learnOnset").textContent = getOnsetText(x.onsetRule);
  document.getElementById("learnNote").textContent = getRuleNote(x);
}

function showSetupPage(pageId) {
  document.querySelectorAll(".setupPage").forEach((page) => {
    page.hidden = page.id !== pageId;
  });
}

function selectMobileCategory(category, buttonId) {
  currentCategory = category;
  idx = 0;

  setActiveCategory(buttonId);
  render();

  const categoryNames = {
    pattern: "공백",
    oang: "오앙(อ)",
    kokai: "꼬까이(ก)",
  };

  document.getElementById("selectedCategoryLabel").textContent = "초성으로 " + categoryNames[category] + "을 선택하셨습니다.";

  showSetupPage("setupModePage");
}

function updateStudyHeader(modeName) {
  const categoryNames = {
    pattern: "공백형",
    oang: "오앙형",
    kokai: "꼬까이형",
  };

  document.getElementById("studyHeaderTitle").textContent = categoryNames[currentCategory] + " · " + modeName + " 모드";
}

function closeMobileSetup() {
  const mobileSetup = document.getElementById("mobileSetup");
  const studyHeader = document.getElementById("studyHeader");

  mobileSetup.style.display = "none";
  studyHeader.hidden = false;
}

function reopenMobileSetup() {
  const mobileSetup = document.getElementById("mobileSetup");
  const studyHeader = document.getElementById("studyHeader");

  studyHeader.hidden = true;
  mobileSetup.style.display = "block";

  document.getElementById("learn").style.display = "none";
  document.getElementById("quiz").style.display = "none";
  document.getElementById("game").style.display = "none";
  document.getElementById("resultView").style.display = "none";

  showSetupPage("setupModePage");
}

document.getElementById("prev").onclick = () => {
  idx = (idx - 1 + getCurrentItems().length) % getCurrentItems().length;
  render();
};

document.getElementById("next").onclick = () => {
  idx = (idx + 1) % getCurrentItems().length;
  render();
};

/////////////////////////////////////////////// 음성 ///////////////////////////////////////////////
function getThaiVoice() {
  const voices = speechSynthesis.getVoices ? speechSynthesis.getVoices() : [];
  return voices.find((v) => v.lang === "th-TH") || voices.find((v) => v.lang.startsWith("th")) || null;
}

function speakThai(text) {
  if (!("speechSynthesis" in window)) return;

  const u = new SpeechSynthesisUtterance(text.replaceAll("◌", ""));
  u.lang = "th-TH";
  u.rate = 0.75;

  const thaiVoice = getThaiVoice();
  if (thaiVoice) u.voice = thaiVoice;

  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}

if ("speechSynthesis" in window) {
  speechSynthesis.onvoiceschanged = getThaiVoice;
}

/////////////////////////////////////////////// 퀴즈 모드 ///////////////////////////////////////////////
function shuffle(a) {
  return [...a].sort(() => Math.random() - 0.5);
}

function playCorrect() {
  const ctx = new AudioContext();
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
  const ctx = new AudioContext();
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

let quizQueue = [];
let quizIndex = 0;
let quizChoicePage = 0;

const QUIZ_CHOICES_PER_PAGE = 16;

function renderPrompt(item) {
  document.getElementById("quizKorean").textContent = getDisplayKorean(item);
  document.getElementById("quizRtgs").textContent = getDisplayRtgs(item);
  document.getElementById("quizIpa").textContent = getDisplayIpa(item);
}

function clearQuizAnswer() {
  document.getElementById("answerKorean").textContent = "";
  document.getElementById("answerRtgs").textContent = "";
  document.getElementById("answerIpa").textContent = "";
}

function renderQuizAnswer(item) {
  document.getElementById("answerKorean").textContent = getDisplayKorean(item);
  document.getElementById("answerRtgs").textContent = getDisplayRtgs(item);
  document.getElementById("answerIpa").textContent = getDisplayIpa(item);
}

function hasSamePronInfo(a, b) {
  return getDisplayKorean(a) === getDisplayKorean(b) && getDisplayRtgs(a) === getDisplayRtgs(b) && getDisplayIpa(a) === getDisplayIpa(b);
}

function renderQuizChoices() {
  const items = getCurrentItems();
  const box = document.getElementById("choices");

  const totalPages = Math.max(1, Math.ceil(items.length / QUIZ_CHOICES_PER_PAGE));

  quizChoicePage = Math.max(0, Math.min(quizChoicePage, totalPages - 1));

  const start = quizChoicePage * QUIZ_CHOICES_PER_PAGE;
  const pageItems = items.slice(start, start + QUIZ_CHOICES_PER_PAGE);

  box.innerHTML = "";

  pageItems.forEach((v) => {
    const b = document.createElement("button");
    b.innerHTML = getDisplaySyllableHtml(v);

    b.onclick = () => {
      renderQuizAnswer(v);

      if (hasSamePronInfo(v, window.currentQuizItem)) {
        playCorrect();
      } else {
        playWrong();
      }
    };

    box.appendChild(b);
  });

  document.getElementById("choicePageInfo").textContent = quizChoicePage + 1 + " / " + totalPages;
}

function renderQuizQuestion() {
  if (!quizQueue.length) return;

  const correct = quizQueue[quizIndex];

  window.currentQuizItem = correct;

  document.getElementById("quizTitle").textContent = "제시된 발음에 해당하는 음절을 선택하세요.";

  document.getElementById("quizSymbol").textContent = "";

  renderPrompt(correct);
  clearQuizAnswer();

  document.getElementById("quizProgressBar").style.width = ((quizIndex + 1) / quizQueue.length) * 100 + "%";

  document.getElementById("prevQuiz").disabled = quizIndex === 0;

  document.getElementById("newQuiz").disabled = quizIndex === quizQueue.length - 1;

  quizChoicePage = 0;
  renderQuizChoices();
}

function quiz() {
  quizQueue = shuffle(getCurrentItems());
  quizIndex = 0;
  quizChoicePage = 0;

  renderQuizQuestion();
}

document.getElementById("prevQuiz").onclick = () => {
  if (quizIndex === 0) return;

  quizIndex -= 1;
  renderQuizQuestion();
};

document.getElementById("newQuiz").onclick = () => {
  if (quizIndex >= quizQueue.length - 1) return;

  quizIndex += 1;
  renderQuizQuestion();
};

const quizChoices = document.getElementById("choices");

let quizSwipeStartX = 0;
let quizSwipeStartY = 0;

quizChoices.addEventListener(
  "touchstart",
  (event) => {
    const touch = event.changedTouches[0];

    quizSwipeStartX = touch.clientX;
    quizSwipeStartY = touch.clientY;
  },
  { passive: true },
);

quizChoices.addEventListener(
  "touchend",
  (event) => {
    const touch = event.changedTouches[0];

    const deltaX = touch.clientX - quizSwipeStartX;
    const deltaY = touch.clientY - quizSwipeStartY;

    if (Math.abs(deltaX) < 40 || Math.abs(deltaX) <= Math.abs(deltaY)) {
      return;
    }

    const totalPages = Math.max(1, Math.ceil(getCurrentItems().length / QUIZ_CHOICES_PER_PAGE));

    if (deltaX < 0) {
      if (quizChoicePage >= totalPages - 1) return;

      quizChoicePage += 1;
    } else {
      if (quizChoicePage === 0) return;

      quizChoicePage -= 1;
    }

    renderQuizChoices();
  },
  { passive: true },
);

/////////////////////////////////////////////// 게임 모드 ///////////////////////////////////////////////
let gameQueue = [];
let gameIndex = 0;
let gameResults = [];
let participantName = "";
let participantId = "";
let resultSaved = false;
let analysisGenerated = false;
let reportSaved = false;
let gameDifficulty = "advanced";
let gameStartTime = null;
let gameEndTime = null;
let trialStartTime = null;
let gameChoicePage = 0;
const GAME_CHOICES_PER_PAGE = 16;

function renderGameChoices() {
  const items = getCurrentItems();
  const box = document.getElementById("gameChoices");
  const totalPages = Math.max(1, Math.ceil(items.length / GAME_CHOICES_PER_PAGE));

  gameChoicePage = Math.max(0, Math.min(gameChoicePage, totalPages - 1));

  const start = gameChoicePage * GAME_CHOICES_PER_PAGE;
  const pageItems = items.slice(start, start + GAME_CHOICES_PER_PAGE);

  box.innerHTML = "";

  pageItems.forEach((v) => {
    const b = document.createElement("button");
    b.innerHTML = getDisplaySyllableHtml(v);

    b.onclick = () => {
      const x = gameQueue[gameIndex];

      gameResults.push({
        trial: gameIndex + 1,
        repetition: x.repetition,
        difficulty: gameDifficulty,
        question: x.collation,
        answer: v.collation,
        correct: v.collation === x.collation,
        rt: Date.now() - trialStartTime,
      });

      gameIndex += 1;
      renderGame();
    };

    box.appendChild(b);
  });

  document.getElementById("gameChoicePageInfo").textContent = gameChoicePage + 1 + " / " + totalPages;
}

const difficultySettings = {
  beginner: 1,
  intermediate: 2,
  advanced: 3,
};

function makeGameQueue() {
  const base = [];
  const repetition = difficultySettings[gameDifficulty];

  for (let r = 1; r <= repetition; r++) {
    getCurrentItems().forEach((item) => {
      base.push({ ...item, repetition: r });
    });
  }

  return shuffle(base);
}

function startGame() {
  gameStartTime = Date.now();
  gameEndTime = null;
  gameQueue = makeGameQueue();
  gameIndex = 0;
  gameResults = [];
  resultSaved = false;
  analysisGenerated = false;
  reportSaved = false;
  document.getElementById("showResult").style.display = "none";
  renderGame();
}

function renderGame() {
  if (gameIndex >= gameQueue.length) {
    gameEndTime = Date.now();
    document.getElementById("progressBar").style.width = "100%";
    document.getElementById("gameProgressText").textContent = "게임 종료!";
    document.getElementById("showResult").style.display = "inline-block";
    return;
  }

  const x = gameQueue[gameIndex];
  trialStartTime = Date.now();

  document.getElementById("gameTitle").textContent = "제시된 발음에 해당하는 음절을 선택하세요.";
  document.getElementById("gameSymbol").textContent = "";

  document.getElementById("gameKorean").textContent = getDisplayKorean(x);
  document.getElementById("gameRtgs").textContent = getDisplayRtgs(x);
  document.getElementById("gameIpa").textContent = getDisplayIpa(x);

  document.getElementById("gameFormation").textContent = getFormationText(x.formationType);
  document.getElementById("gameCoda").textContent = getCodaText(x.codaRule);
  document.getElementById("gameOnset").textContent = getOnsetText(x.onsetRule);
  document.getElementById("gameNote").textContent = getRuleNote(x);

  document.getElementById("gameProgressText").textContent = gameIndex + 1 + " / " + gameQueue.length;

  const progress = ((gameIndex + 1) / gameQueue.length) * 100;
  document.getElementById("progressBar").style.width = progress + "%";

  gameChoicePage = 0;
  renderGameChoices();
}

const gameChoices = document.getElementById("gameChoices");

let gameSwipeStartX = 0;
let gameSwipeStartY = 0;

gameChoices.addEventListener(
  "touchstart",
  (event) => {
    const touch = event.changedTouches[0];

    gameSwipeStartX = touch.clientX;
    gameSwipeStartY = touch.clientY;
  },
  { passive: true },
);

gameChoices.addEventListener(
  "touchend",
  (event) => {
    const touch = event.changedTouches[0];

    const deltaX = touch.clientX - gameSwipeStartX;
    const deltaY = touch.clientY - gameSwipeStartY;

    if (Math.abs(deltaX) < 40 || Math.abs(deltaX) <= Math.abs(deltaY)) {
      return;
    }

    const totalPages = Math.max(1, Math.ceil(getCurrentItems().length / GAME_CHOICES_PER_PAGE));

    if (deltaX < 0) {
      if (gameChoicePage >= totalPages - 1) return;
      gameChoicePage += 1;
    } else {
      if (gameChoicePage === 0) return;
      gameChoicePage -= 1;
    }

    renderGameChoices();
  },
  { passive: true },
);

function getPointRadius(r) {
  if (r.repetition >= 3) return 9;
  if (r.repetition === 2) return 7;
  return 5;
}

function showGameResult() {
  document.getElementById("game").style.display = "none";
  document.getElementById("resultView").style.display = "block";
  document.getElementById("speak").style.display = "none";

  const canvas = document.getElementById("resultCanvas");
  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;

  const items = getCurrentItems();

  const indexMap = {};
  items.forEach((item, i) => {
    indexMap[item.collation] = i + 1;
  });

  ctx.clearRect(0, 0, W, H);

  const pad = 70;
  const min = 1;
  const max = getCurrentItems().length;

  function sx(x) {
    return pad + ((x - min) / (max - min)) * (W - pad * 2);
  }

  function sy(y) {
    return H - pad - ((y - min) / (max - min)) * (H - pad * 2);
  }

  ctx.strokeStyle = "#111";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(pad, pad);
  ctx.lineTo(pad, H - pad);
  ctx.lineTo(W - pad, H - pad);
  ctx.stroke();

  ctx.strokeStyle = "#aaa";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(sx(1), sy(1));
  ctx.lineTo(sx(max), sy(max));
  ctx.stroke();

  ctx.strokeStyle = "#e5e5e5";
  ctx.lineWidth = 1;

  for (let i = 1; i <= max; i++) {
    ctx.beginPath();
    ctx.moveTo(sx(i), sy(1));
    ctx.lineTo(sx(i), sy(max));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(sx(1), sy(i));
    ctx.lineTo(sx(max), sy(i));
    ctx.stroke();
  }

  ctx.fillStyle = "#111";
  ctx.font = "24px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Stimuli", W / 2, H - 8);
  ctx.save();
  ctx.translate(24, H / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText("Responses", 0, 0);
  ctx.restore();

  ctx.textAlign = "center";
  for (let i = 1; i <= max; i += 5) {
    ctx.fillText(String(i), sx(i), H - pad + 32);
  }

  if ((max - 1) % 5 !== 0) {
    ctx.fillText(String(max), sx(max), H - pad + 32);
  }

  ctx.textAlign = "right";
  for (let i = 1; i <= max; i += 5) {
    ctx.fillText(String(i), pad - 9, sy(i) + 8);
  }

  if ((max - 1) % 5 !== 0) {
    ctx.fillText(String(max), pad - 9, sy(max) + 8);
  }

  const total = gameResults.length;
  const correctCount = gameResults.filter((r) => r.correct).length;
  const accuracy = total === 0 ? 0 : Math.round((correctCount / total) * 10000) / 100;

  ctx.fillStyle = "#111";
  ctx.font = "32px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("정답률: " + accuracy.toFixed(2) + "%", W / 2, 40);

  window.resultPoints = [];

  gameResults.forEach((r) => {
    const x = sx(indexMap[r.question]);
    const y = sy(indexMap[r.answer]);
    const radius = getPointRadius(r);

    window.resultPoints.push({ x, y, r });

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.strokeStyle = r.correct ? "#111" : "#d11";
    ctx.lineWidth = 2;
    ctx.stroke();
  });

  document.querySelectorAll(".sideTitle").forEach((x) => {
    x.style.display = "none";
  });

  document.getElementById("responseSymbol").textContent = "";
  document.getElementById("stimulusSymbol").textContent = "";

  document.getElementById("analysisLeft").style.display = "block";
  document.getElementById("analysisRight").style.display = "block";
  document.getElementById("analysisLeft").style.visibility = "hidden";
  document.getElementById("analysisRight").style.visibility = "hidden";

  document.getElementById("analysisLeft").textContent = "";
  document.getElementById("analysisRight").textContent = "";

  hoveredPoint = null;
  selectedPoint = null;
}

let hoveredPoint = null;
let selectedPoint = null;

function drawPoint(point, isBlue = false) {
  const canvas = document.getElementById("resultCanvas");
  const ctx = canvas.getContext("2d");
  const baseRadius = getPointRadius(point.r);
  const drawRadius = isBlue ? baseRadius + 2 : baseRadius;

  ctx.beginPath();
  ctx.arc(point.x, point.y, baseRadius + 4, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(point.x, point.y, drawRadius, 0, Math.PI * 2);
  ctx.strokeStyle = isBlue ? "blue" : point.r.correct ? "#111" : "#d11";
  ctx.lineWidth = isBlue ? 3 : 2;
  ctx.stroke();
}

document.getElementById("resultCanvas").onclick = (e) => {
  const canvas = document.getElementById("resultCanvas");
  const rect = canvas.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
  const y = ((e.clientY - rect.top) / rect.height) * canvas.height;
  const hit = window.resultPoints.find((p) => Math.hypot(p.x - x, p.y - y) < 12);

  if (!hit) return;

  if (selectedPoint) {
    drawPoint(selectedPoint, false);
  }

  selectedPoint = hit;
  drawPoint(selectedPoint, true);

  const q = getCurrentItems().find((v) => v.collation === hit.r.question);
  const a = getCurrentItems().find((v) => v.collation === hit.r.answer);

  document.getElementById("stimulusSymbol").textContent = q ? getDisplaySyllable(q) : "";
  document.getElementById("responseSymbol").textContent = a ? getDisplaySyllable(a) : "";

  document.querySelectorAll(".sideTitle").forEach((x) => {
    x.style.display = "block";
  });
};

document.getElementById("resultCanvas").onmousemove = (e) => {
  const canvas = document.getElementById("resultCanvas");
  const rect = canvas.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
  const y = ((e.clientY - rect.top) / rect.height) * canvas.height;
  const hit = window.resultPoints.find((p) => Math.hypot(p.x - x, p.y - y) < 12);

  canvas.style.cursor = hit ? "pointer" : "default";

  if (hoveredPoint && hoveredPoint !== selectedPoint) {
    drawPoint(hoveredPoint, false);
  }

  hoveredPoint = null;

  if (hit && hit !== selectedPoint) {
    drawPoint(hit, true);
    hoveredPoint = hit;
  }

  if (selectedPoint) {
    drawPoint(selectedPoint, true);
  }
};

function downloadResultImage(includeReport = false) {
  participantName = prompt("이름을 입력하세요 (선택)\n비워두면 자동 파일명으로 저장됩니다.");

  if (participantName === null) return false;

  participantName = participantName.trim();

  const start = new Date(gameStartTime);
  const yyyy = start.getFullYear();
  const mm = String(start.getMonth() + 1).padStart(2, "0");
  const dd = String(start.getDate()).padStart(2, "0");
  const hh = String(start.getHours()).padStart(2, "0");
  const mi = String(start.getMinutes()).padStart(2, "0");
  const ss = String(start.getSeconds()).padStart(2, "0");

  const durationSec = Math.round((gameEndTime - gameStartTime) / 1000);
  const safeName = participantName || "thai_study";
  const fileBaseName = `${safeName}_${yyyy}${mm}${dd}_${hh}${mi}${ss}_${durationSec}s_${gameQueue.length}`;

  if (includeReport) {
    makeReport();
    reportSaved = true;
    return true;
  }

  const canvas = document.getElementById("resultCanvas");

  const out = document.createElement("canvas");
  out.width = canvas.width;
  out.height = canvas.height;

  const ctx = out.getContext("2d");
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, out.width, out.height);
  ctx.drawImage(canvas, 0, 0);

  const link = document.createElement("a");
  link.download = fileBaseName + ".png";
  link.href = out.toDataURL("image/png");
  link.click();

  resultSaved = true;
  return true;
}

function makeReport() {
  document.getElementById("reportMeta").textContent =
    `이름: ${participantName}\n` +
    `ID: ${participantId}\n` +
    `난이도: ${gameDifficulty}\n` +
    `문항 수: ${gameQueue.length}\n` +
    `소요 시간: ${Math.round((gameEndTime - gameStartTime) / 1000)}초`;

  const sourceCanvas = document.getElementById("resultCanvas");
  const reportCanvas = document.getElementById("reportCanvas");
  const ctx = reportCanvas.getContext("2d");

  ctx.clearRect(0, 0, reportCanvas.width, reportCanvas.height);
  ctx.drawImage(sourceCanvas, 0, 0);

  document.getElementById("reportDiagnosis").textContent = makeDiagnosisText(gameResults);
  document.getElementById("reportStrategy").textContent = makeStrategyText(gameResults);

  window.print();
}

function confirmSaveIfNeeded() {
  if (document.getElementById("resultView").style.display !== "block") return true;

  if (reportSaved) return true;

  if (analysisGenerated && !reportSaved) {
    const saveReport = confirm("결과분석보고서를 저장하시겠습니까?");
    if (saveReport) downloadResultImage(true);
    return true;
  }

  if (resultSaved) return true;

  const save = confirm("현재 결과를 저장하시겠습니까?");
  if (save) downloadResultImage(false);

  return true;
}

/////////////////////////////////////////////// 버튼 연결 ///////////////////////////////////////////////
document.getElementById("speak").onclick = () => {
  if (document.getElementById("game").style.display === "block") {
    return;
  }

  let item;

  if (document.getElementById("quiz").style.display === "block") {
    item = window.currentQuizItem;
  } else {
    item = getCurrentItems()[idx];
  }

  if (!item) return;

  speakThai(getDisplaySyllable(item));
};

document.getElementById("learnTab").onclick = () => {
  confirmSaveIfNeeded();

  document.getElementById("learn").style.display = "grid";
  document.getElementById("quiz").style.display = "none";
  document.getElementById("game").style.display = "none";
  document.getElementById("resultView").style.display = "none";
  document.getElementById("speak").style.display = "inline-block";

  setActiveMode("learnTab");
  updateStudyHeader("학습");
  closeMobileSetup();
  render();
};

document.getElementById("quizTab").onclick = () => {
  document.getElementById("gameDifficultyRow").style.display = "none";
  document.getElementById("quizDifficultyRow").style.display = "flex";
};

function startQuizWithDifficulty(level) {
  gameDifficulty = level;

  document.getElementById("learn").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  document.getElementById("game").style.display = "none";
  document.getElementById("resultView").style.display = "none";
  document.getElementById("speak").style.display = "inline-block";

  setActiveMode("quizTab");
  updateStudyHeader("퀴즈");
  closeMobileSetup();
  quiz();
}

document.getElementById("quizDifficultyBeginner").onclick = () => {
  startQuizWithDifficulty("beginner");
};

document.getElementById("quizDifficultyIntermediate").onclick = () => {
  startQuizWithDifficulty("intermediate");
};

document.getElementById("quizDifficultyAdvanced").onclick = () => {
  startQuizWithDifficulty("advanced");
};

document.getElementById("gameTab").onclick = () => {
  document.getElementById("quizDifficultyRow").style.display = "none";
  document.getElementById("gameDifficultyRow").style.display = "flex";
};

function startGameWithDifficulty(level) {
  gameDifficulty = level;

  confirmSaveIfNeeded();

  document.getElementById("learn").style.display = "none";
  document.getElementById("quiz").style.display = "none";
  document.getElementById("game").style.display = "block";
  document.getElementById("resultView").style.display = "none";
  document.getElementById("speak").style.display = "inline-block";

  setActiveMode("gameTab");
  updateStudyHeader("게임");
  closeMobileSetup();
  startGame();
}

document.getElementById("gameDifficultyBeginner").onclick = () => {
  startGameWithDifficulty("beginner");
};

document.getElementById("gameDifficultyIntermediate").onclick = () => {
  startGameWithDifficulty("intermediate");
};

document.getElementById("gameDifficultyAdvanced").onclick = () => {
  startGameWithDifficulty("advanced");
};

document.getElementById("showResult").onclick = showGameResult;

document.getElementById("downloadResult").onclick = () => {
  const save = confirm(analysisGenerated ? "결과분석보고서를 저장하시겠습니까?" : "현재 결과를 저장하시겠습니까?");

  if (!save) return;

  downloadResultImage(analysisGenerated);
};

document.getElementById("analyzeResult").onclick = () => {
  analysisGenerated = true;

  document.getElementById("analysisLeft").style.display = "block";
  document.getElementById("analysisRight").style.display = "block";

  document.getElementById("analysisLeft").style.visibility = "visible";
  document.getElementById("analysisRight").style.visibility = "visible";

  document.getElementById("analysisLeft").textContent = makeDiagnosisText(gameResults);
  document.getElementById("analysisRight").textContent = makeStrategyText(gameResults);
};

document.getElementById("restartGame").onclick = () => {
  if (analysisGenerated && !reportSaved) {
    const save = confirm("결과분석보고서를 저장하시겠습니까?");

    if (save) {
      downloadResultImage(true);
    }
  } else if (!resultSaved) {
    const save = confirm("이번 게임의 결과를 저장할까요?");

    if (save) {
      downloadResultImage(false);
    }
  }

  document.getElementById("resultView").style.display = "none";
  document.getElementById("game").style.display = "block";

  gameResults = [];
  resultSaved = false;
  analysisGenerated = false;
  reportSaved = false;

  startGame();
};

document.getElementById("patternBtn").onclick = () => {
  selectMobileCategory("pattern", "patternBtn");
};

document.getElementById("oangBtn").onclick = () => {
  selectMobileCategory("oang", "oangBtn");
};

document.getElementById("kokaiBtn").onclick = () => {
  selectMobileCategory("kokai", "kokaiBtn");
};

document.getElementById("backToCategory").onclick = () => {
  showSetupPage("setupCategoryPage");
};

document.getElementById("backToSetup").onclick = () => {
  reopenMobileSetup();
};

document.getElementById("learn").style.display = "none";
document.getElementById("quiz").style.display = "none";
document.getElementById("game").style.display = "none";
document.getElementById("resultView").style.display = "none";
document.getElementById("studyHeader").hidden = true;

showSetupPage("setupCategoryPage");

loadSyllableItems().catch((err) => {
  console.error(err);
  alert("데이터를 불러오지 못했습니다. GitHub Pages나 Live Server에서 실행해 주십시오.");
});
