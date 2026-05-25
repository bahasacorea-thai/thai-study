// Data is loaded from data/app_items.json
let APP_ITEMS = [];
let ITEMS = [];
let NUMBER_ITEMS = [];
let VOWEL_ITEMS = [];

function normalizeAppItem(row) {
  const symbol = row.Symbol === undefined || row.Symbol === null ? "" : String(row.Symbol);

  return {
    Serial: row.Serial,
    Unicode: row.Unicode,
    Class: row.Class || "",
    Property: row.Property || "",
    Canonical: row.Canonical || "",

    index: Number(row.Serial) || 0,
    collation: Number(row.Collation) || 0,
    symbol,
    thaiName: row["Thai Name"] || "",
    koreanName: row["Korean Name"] || "",
    rtgsName: row["RTGS Name"] || "",
    meaning: row.Meaning === undefined || row.Meaning === null ? "" : String(row.Meaning),
    image: row.Image || "",
  };
}

function isSameAnswer(a, b) {
  return (a?.symbol || "").trim() === (b?.symbol || "").trim();
}

async function loadAppItems() {
  const response = await fetch("data/app_items.json");
  if (!response.ok) {
    throw new Error("app_items.json을 불러오지 못했습니다.");
  }

  const rows = await response.json();
  APP_ITEMS = rows.map(normalizeAppItem);

  ITEMS = APP_ITEMS.filter((item) => item.Class === "자음");
  NUMBER_ITEMS = APP_ITEMS.filter((item) => item.Class === "숫자");
  VOWEL_ITEMS = APP_ITEMS.filter((item) => item.Class !== "자음" && item.Class !== "숫자");

  idx = 0;
  render();
}

/////////////////////////////////////////////// 통제부 ///////////////////////////////////////////////
let currentCategory = "consonant1";

function getCurrentItems() {
  if (currentCategory === "consonant1") {
    return APP_ITEMS.filter((item) => item.Class === "자음" && item.Canonical === "O");
  }

  if (currentCategory === "consonant2") {
    return APP_ITEMS.filter((item) => item.Class === "자음" && item.Canonical !== "O");
  }

  if (currentCategory === "consonantAll") {
    return APP_ITEMS.filter((item) => item.Class === "자음");
  }

  if (currentCategory === "vowelPlus") {
    return APP_ITEMS.filter((item) => item.Class === "모음" || item.Class === "부가" || item.Class === "성조");
  }

  if (currentCategory === "number") {
    return APP_ITEMS.filter((item) => item.Class === "숫자");
  }

  if (currentCategory === "punctuation") {
    return APP_ITEMS.filter((item) => item.Class === "문장");
  }

  return APP_ITEMS.filter((item) => item.Class === "자음" && item.Canonical === "O");
}

let idx = 0;

function setActiveMode(buttonId) {
  document.querySelectorAll(".mode button").forEach((btn) => {
    btn.classList.remove("active");
  });

  document.getElementById(buttonId).classList.add("active");
}

function getThaiVoice() {
  const voices = speechSynthesis.getVoices ? speechSynthesis.getVoices() : [];
  return voices.find((v) => v.lang === "th-TH") || voices.find((v) => v.lang.startsWith("th")) || null;
}

function speakThai(text) {
  if (!("speechSynthesis" in window)) return;

  const u = new SpeechSynthesisUtterance(text);

  u.lang = "th-TH";
  u.rate = 0.75;

  const voices = speechSynthesis.getVoices();

  const thaiVoice = voices.find((v) => v.lang === "th-TH") || voices.find((v) => v.lang.startsWith("th"));

  if (thaiVoice) {
    u.voice = thaiVoice;
  }

  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}

function render() {
  const items = getCurrentItems();
  const x = items[idx];
  if (!x) return;

  const symbolEl = document.getElementById("symbol");
  const img = document.getElementById("img");
  const infoEl = document.querySelector(".info");
  const cardEl = document.querySelector(".card");

  let fallback = document.getElementById("imageFallback");
  if (!fallback) {
    fallback = document.createElement("div");
    fallback.id = "imageFallback";
    img.parentElement.appendChild(fallback);
  }

  cardEl.style.gridTemplateColumns = "22% 33% 45%";
  infoEl.style.fontSize = "24px";
  infoEl.style.paddingLeft = "20px";
  infoEl.style.paddingRight = "20px";
  infoEl.style.boxSizing = "border-box";
  infoEl.style.overflow = "hidden";
  infoEl.style.whiteSpace = "normal";
  infoEl.style.overflowWrap = "break-word";
  infoEl.style.wordBreak = "keep-all";

  symbolEl.style.fontSize = "180px";
  symbolEl.style.lineHeight = "";
  symbolEl.style.textAlign = "center";

  fallback.style.padding = "0";
  fallback.style.overflow = "";
  fallback.style.whiteSpace = "";
  fallback.style.overflowWrap = "";
  fallback.style.wordBreak = "";

  if (currentCategory === "number") {
    symbolEl.textContent = x.symbol;
    img.style.display = "none";
    fallback.style.display = "flex";
    fallback.textContent = x.meaning || "";
    fallback.style.fontSize = "160px";
    fallback.style.lineHeight = "1";
    fallback.style.fontWeight = "500";
    fallback.style.justifyContent = "center";
    fallback.style.alignItems = "center";
  } else if (currentCategory === "vowelPlus") {
    symbolEl.textContent = x.symbol;
    img.style.display = "none";
    fallback.style.display = "flex";
    fallback.textContent = x.meaning || "";
    fallback.style.fontSize = "32px";
    fallback.style.lineHeight = "1.4";
    fallback.style.whiteSpace = "pre-line";
    fallback.style.textAlign = "center";
    fallback.style.justifyContent = "center";
    fallback.style.alignItems = "center";
  } else if (currentCategory === "punctuation") {
    symbolEl.textContent = x.symbol;

    cardEl.style.gridTemplateColumns = "34% 32% 34%";

    infoEl.style.fontSize = "28px";
    infoEl.style.paddingLeft = "48px";
    infoEl.style.paddingRight = "48px";

    symbolEl.style.fontSize = "140px";
    symbolEl.style.fontWeight = "normal";
    symbolEl.style.lineHeight = "1";

    img.style.display = "none";
    fallback.style.display = "flex";
    fallback.textContent = x.meaning || "";
    fallback.style.fontSize = "33px";
    fallback.style.fontWeight = "bold";
    fallback.style.lineHeight = "1.25";
    fallback.style.textAlign = "center";
    fallback.style.justifyContent = "center";
    fallback.style.alignItems = "center";
    fallback.style.width = "100%";
    fallback.style.maxWidth = "100%";
    fallback.style.boxSizing = "border-box";
    fallback.style.padding = "0 48px";
    fallback.style.overflow = "hidden";
    fallback.style.overflowWrap = "break-word";
    fallback.style.wordBreak = "keep-all";
    fallback.style.whiteSpace = "normal";
  } else {
    symbolEl.textContent = x.symbol;
    fallback.style.display = "none";
    img.style.display = "block";
    img.src = x.image || "";
  }

  document.getElementById("thaiName").textContent = "이름: " + x.thaiName;
  document.getElementById("koreanName").textContent = "한글: " + x.koreanName;
  document.getElementById("rtgsName").textContent = "라틴: " + x.rtgsName;
}

document.getElementById("prev").onclick = () => {
  idx = (idx - 1 + getCurrentItems().length) % getCurrentItems().length;
  render();
};

document.getElementById("next").onclick = () => {
  idx = (idx + 1) % getCurrentItems().length;
  render();
};

/////////////////////////////////////////////// 퀴즈 모드 ///////////////////////////////////////////////
function shuffle(a) {
  return [...a].sort(() => Math.random() - 0.5);
}

function playCorrect() {
  const ctx = new AudioContext();

  const notes = [523, 659, 784, 1046]; // 도 미 솔 높은 도

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

  // C5(523Hz) ~ B5 반음 12개
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

function quiz() {
  const items = getCurrentItems();
  const correct = items[Math.floor(Math.random() * items.length)];

  window.currentQuizItem = correct;

  document.getElementById("quizTitle").textContent = "제시된 내용에 해당하는 글자를 키보드에서 마우스 클릭하세요.";

  document.getElementById("quizSymbol").textContent = "";
  document.getElementById("result").textContent = "";

  const quizImg = document.getElementById("quizImg");

  if (currentCategory === "number") {
    quizImg.outerHTML = `<div id="quizImg" class="img" style="display:flex;align-items:center;justify-content:center;font-size:160px;font-weight:500;">${correct.meaning || ""}</div>`;
  } else if (currentCategory === "vowelPlus") {
    quizImg.outerHTML = `
    <div id="quizImg" class="img" style="display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1.6;font-weight:bold;text-align:center;">
      <div style="font-size:32px;">${correct.thaiName || ""}</div>
      <div style="font-size:28px;">${correct.koreanName || ""}</div>
      <div style="font-size:28px;">${correct.rtgsName || ""}</div>
      <div style="font-size:28px;color:#555;">${correct.meaning || ""}</div>
    </div>
  `;
  } else if (currentCategory === "punctuation") {
    quizImg.outerHTML = `
    <div id="quizImg" class="img"
      style="
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        text-align:center;
        line-height:1.35;
        font-weight:bold;
      "
    >
      <div style="font-size:33px;">
        ${correct.thaiName || ""}
      </div>

      <div style="font-size:33px;">
        ${correct.koreanName || ""}
      </div>

      <div style="font-size:33px;">
        ${correct.rtgsName || ""}
      </div>

      <div style="font-size:33px;color:#555;">
        ${correct.meaning || ""}
      </div>
    </div>
  `;
  } else {
    quizImg.outerHTML = `<img id="quizImg" class="img" />`;
    document.getElementById("quizImg").src = correct.image || "";
  }

  const box = document.getElementById("choices");
  box.innerHTML = "";

  if (currentCategory === "punctuation") {
    box.style.gridTemplateColumns = "repeat(9, minmax(96px, 1fr))";
    box.style.gap = "4px";
  } else {
    box.style.gridTemplateColumns = "repeat(11, 1fr)";
    box.style.gap = "8px";
  }

  if (currentCategory === "punctuation") {
    box.style.gridTemplateColumns = "repeat(9, minmax(96px, 1fr))";
    box.style.gap = "4px";
  } else {
    box.style.gridTemplateColumns = "repeat(11, 1fr)";
    box.style.gap = "8px";
  }

  items.forEach((v) => {
    const b = document.createElement("button");
    b.textContent = v.symbol;

    b.onclick = () => {
      if (v.collation === correct.collation) {
        playCorrect();

        document.getElementById("result").innerHTML = `
      <div>
        <div>${correct.thaiName}</div>
        <div>${correct.koreanName}</div>
        <div>${correct.rtgsName}</div>
      </div>
    `;
      } else {
        playWrong();

        document.getElementById("result").innerHTML = `
      <div>
        <div>${v.thaiName}</div>
        <div>${v.koreanName}</div>
        <div>${v.rtgsName}</div>
      </div>
    `;
      }
    };

    box.appendChild(b);
  });
}

document.getElementById("newQuiz").onclick = quiz;

if ("speechSynthesis" in window) {
  speechSynthesis.onvoiceschanged = getThaiVoice;
}

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
      base.push({
        ...item,
        repetition: r,
      });
    });
  }

  return shuffle(base);
}

let gameStartTime = null;
let gameEndTime = null;
let trialStartTime = null;
analysisGenerated = false;
resultSaved = false;

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

  const gameImageBox = document.querySelector(".gameImageBox");

  function makeNameBlock(item, size = 28) {
    return `
      <div style="
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        text-align:center;
        font-weight:bold;
        line-height:1.35;
      ">
        <div style="font-size:${size}px;">${item.thaiName || ""}</div>
        <div style="font-size:${size}px;">${item.koreanName || ""}</div>
        <div style="font-size:${size}px;">${item.rtgsName || ""}</div>
      </div>
    `;
  }

  if (currentCategory === "punctuation") {
    document.getElementById("gameKorean").innerHTML = makeNameBlock(x, 28);
    document.getElementById("gameRtgs").textContent = "";
    gameImageBox.innerHTML = `
      <div style="font-size:32px;font-weight:500;line-height:1.5;text-align:center;color:#555;">
        ${x.meaning || ""}
      </div>
    `;
  } else if (currentCategory === "number") {
    document.getElementById("gameKorean").innerHTML = makeNameBlock(x, 28);
    document.getElementById("gameRtgs").textContent = "";
    gameImageBox.innerHTML = `
      <div style="font-size:160px;font-weight:500;line-height:1;text-align:center;">
        ${x.meaning || ""}
      </div>
    `;
  } else if (currentCategory === "vowelPlus") {
    document.getElementById("gameKorean").innerHTML = `
      <div>${x.thaiName || ""}</div>
      <div>${x.koreanName || ""}</div>
    `;
    document.getElementById("gameRtgs").textContent = x.rtgsName || "";
    gameImageBox.innerHTML = `
      <div style="font-size:32px;font-weight:500;line-height:1.5;text-align:center;color:#555;">
        ${x.meaning || ""}
      </div>
    `;
  } else {
    document.getElementById("gameKorean").textContent = x.koreanName || "";
    document.getElementById("gameRtgs").textContent = x.rtgsName || "";
    gameImageBox.innerHTML = `<img id="gameImg" class="img" />`;
    document.getElementById("gameImg").src = x.image || "";
  }

  document.getElementById("gameProgressText").textContent = gameIndex + 1 + " / " + gameQueue.length;

  const progress = ((gameIndex + 1) / gameQueue.length) * 100;
  document.getElementById("progressBar").style.width = progress + "%";

  const box = document.getElementById("gameChoices");
  box.innerHTML = "";

  if (currentCategory === "punctuation") {
    box.style.gridTemplateColumns = "repeat(9, minmax(96px, 1fr))";
    box.style.gap = "4px";
  } else {
    box.style.gridTemplateColumns = "repeat(11, 1fr)";
    box.style.gap = "8px";
  }

  getCurrentItems().forEach((v) => {
    const b = document.createElement("button");
    b.textContent = v.symbol;

    b.onclick = () => {
      gameResults.push({
        trial: gameIndex + 1,
        repetition: x.repetition,
        difficulty: gameDifficulty,
        question: x.collation,
        answer: v.collation,
        correct: isSameAnswer(v, x),
        rt: Date.now() - trialStartTime,
      });

      gameIndex += 1;
      renderGame();
    };

    box.appendChild(b);
  });
}

function getPointRadius(r) {
  if (r.repetition === 1) return 5;
  if (r.repetition === 2) return 7;
  if (r.repetition === 3) return 9;
  return 6;
}

function showGameResult() {
  document.getElementById("learn").style.display = "none";
  document.getElementById("quiz").style.display = "none";
  document.getElementById("game").style.display = "none";
  document.getElementById("resultView").style.display = "block";
  document.getElementById("speak").style.display = "inline-block";

  const canvas = document.getElementById("resultCanvas");
  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;

  const items = getCurrentItems();

  const indexMap = {};
  items.forEach((item, i) => {
    indexMap[item.collation] = i + 1;
  });

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, W, H);

  const pad = 70;
  const min = 1;
  const max = items.length;

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

  ctx.textAlign = "right";
  for (let i = 1; i <= max; i += 5) {
    ctx.fillText(String(i), pad - 9, sy(i) + 8);
  }

  const total = gameResults.length;
  const correctCount = gameResults.filter((r) => r.correct).length;
  const accuracy = total === 0 ? 0 : Math.round((correctCount / total) * 10000) / 100;

  ctx.fillStyle = "#111";
  ctx.font = "32px sans-serif";
  ctx.textAlign = "center";

  ctx.fillText("정답률: " + accuracy.toFixed(2) + "%", W / 2, 40);

  // =========================
  // 범례 상대 위치 설정
  // =========================
  // =========================
  // 범례 위치 설정
  // 캔버스 오른쪽 눈금과 외곽선 사이
  // =========================
  const legendX = W - pad + 18;

  // 위쪽: 반복 범례
  const legendTopY = pad + 10;

  // 아래쪽: 정오답 범례
  const legendBottomY = H - pad - 80;

  // =========================
  // 반복 범례 (우상단)
  // =========================
  ctx.textAlign = "left";
  ctx.font = "18px sans-serif";
  ctx.fillStyle = "#111";

  ctx.strokeStyle = "#111";
  ctx.lineWidth = 2;

  // 1회
  ctx.beginPath();
  ctx.arc(legendX, legendTopY, 5, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillText("1회", legendX + 18, legendTopY + 6);

  // 2회
  ctx.beginPath();
  ctx.arc(legendX, legendTopY + 30, 7, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillText("2회", legendX + 18, legendTopY + 36);

  // 3회
  ctx.beginPath();
  ctx.arc(legendX, legendTopY + 60, 9, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillText("3회", legendX + 18, legendTopY + 66);

  // =========================
  // 정오답 범례 (우하단)
  // =========================
  ctx.textAlign = "left";
  ctx.font = "18px sans-serif";

  // 정답
  ctx.beginPath();
  ctx.arc(legendX, legendBottomY, 7, 0, Math.PI * 2);

  ctx.strokeStyle = "#111";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = "#111";

  ctx.fillText("정답", legendX + 18, legendBottomY + 6);

  // 오답
  ctx.beginPath();
  ctx.arc(legendX, legendBottomY + 30, 7, 0, Math.PI * 2);

  ctx.strokeStyle = "#d11";
  ctx.stroke();

  ctx.fillText("오답", legendX + 18, legendBottomY + 36);

  // 확인
  ctx.beginPath();
  ctx.arc(legendX, legendBottomY + 60, 8, 0, Math.PI * 2);

  ctx.strokeStyle = "blue";
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillText("확인", legendX + 18, legendBottomY + 66);

  document.getElementById("r2Text").textContent = "";

  window.resultPoints = [];

  gameResults.forEach((r) => {
    const qIndex = indexMap[r.question];
    const aIndex = indexMap[r.answer];
    if (!qIndex || !aIndex) return;

    const x = sx(qIndex);
    const y = sy(aIndex);
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

  // 왼쪽 = 자극
  document.getElementById("stimulusSymbol").textContent = q.symbol;
  // 오른쪽 = 반응
  document.getElementById("responseSymbol").textContent = a.symbol;
  document.querySelectorAll(".sideTitle").forEach((x) => {
    x.style.display = "block";
  });
};

let hoveredPoint = null;
let selectedPoint = null;

function drawPoint(point, isBlue = false) {
  const canvas = document.getElementById("resultCanvas");
  const ctx = canvas.getContext("2d");

  const baseRadius = getPointRadius(point.r);
  const drawRadius = isBlue ? baseRadius + 2 : baseRadius;

  // 기존 hover/확인 흔적 지우기
  ctx.beginPath();
  ctx.arc(point.x, point.y, baseRadius + 4, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();

  // 점 다시 그리기
  ctx.beginPath();
  ctx.arc(point.x, point.y, drawRadius, 0, Math.PI * 2);

  ctx.strokeStyle = isBlue ? "blue" : point.r.correct ? "#111" : "#d11";

  ctx.lineWidth = isBlue ? 3 : 2;
  ctx.stroke();
}

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

  if (hit) {
    if (hit !== selectedPoint) {
      drawPoint(hit, true);
      hoveredPoint = hit;
    }
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

  const resultData = {
    participantName: participantName || "",
    difficulty: gameDifficulty,
    gameStartTime: new Date(gameStartTime).toISOString(),
    gameEndTime: new Date(gameEndTime).toISOString(),
    durationMs: gameEndTime - gameStartTime,
    totalTrials: gameQueue.length,
    results: gameResults,
    analysis: includeReport
      ? {
          diagnosis: makeDiagnosisText(gameResults),
          strategy: makeStrategyText(gameResults),
        }
      : null,
  };

  const blob = new Blob([JSON.stringify(resultData, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = fileBaseName + ".json";
  a.click();

  URL.revokeObjectURL(url);

  const canvas = document.getElementById("resultCanvas");
  const link = document.createElement("a");

  link.download = fileBaseName + ".png";
  link.href = canvas.toDataURL("image/png");
  link.click();

  if (includeReport) {
    makeReport();
  }

  resultSaved = true;

  if (includeReport) {
    reportSaved = true;
  }

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

document.getElementById("gameTab").onclick = () => {
  confirmSaveIfNeeded();
  setActiveMode("gameTab");
  document.getElementById("learn").style.display = "none";
  document.getElementById("quiz").style.display = "none";
  document.getElementById("game").style.display = "block";
  document.getElementById("resultView").style.display = "none";
  document.getElementById("speak").style.display = "inline-block";
  if (gameResults.length > 0) {
    renderGame();
  } else {
    startGame();
  }
};

document.getElementById("showResult").onclick = showGameResult;
document.getElementById("downloadResult").onclick = () => {
  const save = confirm(analysisGenerated ? "결과 분석 보고서를 저장하시겠습니까?" : "현재 결과를 저장하시겠습니까?");

  if (!save) return;

  downloadResultImage(analysisGenerated);
};

function confirmSaveIfNeeded() {
  if (document.getElementById("resultView").style.display !== "block") return true;

  if (reportSaved) return true;

  if (analysisGenerated && resultSaved && !reportSaved) {
    const saveReport = confirm("결과분석보고서를 저장하시겠습니까?");
    if (saveReport) downloadResultImage(true);
    return true;
  }

  if (resultSaved) return true;

  const save = confirm(analysisGenerated ? "결과분석보고서를 저장하시겠습니까?" : "현재 결과를 저장하시겠습니까?");

  if (save) {
    downloadResultImage(analysisGenerated);
  }

  return true;
}

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
  if (!resultSaved) {
    const save = confirm("이번 게임의 결과를 저장할까요?");

    if (save) {
      downloadResultImage(analysisGenerated);
    }
  }

  document.getElementById("resultView").style.display = "none";

  document.getElementById("game").style.display = "block";

  gameResults = [];
  resultSaved = false;

  startGame();
};

document.getElementById("speak").onclick = () => {
  let item;

  // 게임 모드
  if (document.getElementById("game").style.display === "block") {
    item = gameQueue[gameIndex];
  }
  // 퀴즈 모드
  else if (document.getElementById("quiz").style.display === "block") {
    item = currentQuizItem;
  }
  // 학습 모드
  else {
    item = getCurrentItems()[idx];
  }

  const wordOnly = item.thaiName.trim().split(/\s+/).slice(1).join(" ");

  speakThai(wordOnly);
};

document.getElementById("learnTab").onclick = () => {
  confirmSaveIfNeeded();
  setActiveMode("learnTab");
  document.getElementById("learn").style.display = "block";
  document.getElementById("quiz").style.display = "none";
  document.getElementById("game").style.display = "none";
  document.getElementById("resultView").style.display = "none";
  document.getElementById("speak").style.display = "inline-block";
};

document.getElementById("quizTab").onclick = () => {
  confirmSaveIfNeeded();
  setActiveMode("quizTab");
  document.getElementById("learn").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  document.getElementById("game").style.display = "none";
  document.getElementById("resultView").style.display = "none";
  document.getElementById("speak").style.display = "inline-block";
  quiz();
};

function changeCategory(category, buttonId) {
  confirmSaveIfNeeded();

  currentCategory = category;
  idx = 0;

  gameQueue = [];
  gameIndex = 0;
  gameResults = [];
  window.resultPoints = [];
  resultSaved = false;
  analysisGenerated = false;
  reportSaved = false;

  document.querySelectorAll(".category button").forEach((btn) => {
    btn.classList.remove("active");
  });

  document.getElementById(buttonId).classList.add("active");

  document.getElementById("learn").style.display = "block";
  document.getElementById("quiz").style.display = "none";
  document.getElementById("game").style.display = "none";
  document.getElementById("resultView").style.display = "none";
  document.getElementById("speak").style.display = "inline-block";

  setActiveMode("learnTab");
  render();
}

function setDifficulty(level) {
  gameDifficulty = level;

  document.querySelectorAll(".difficultyBox button").forEach((btn) => {
    btn.classList.remove("active");
  });

  document.getElementById(level + "Btn").classList.add("active");
}

document.getElementById("beginnerBtn").onclick = () => {
  setDifficulty("beginner");
  startGame();
};

document.getElementById("intermediateBtn").onclick = () => {
  setDifficulty("intermediate");
  startGame();
};

document.getElementById("advancedBtn").onclick = () => {
  setDifficulty("advanced");
  startGame();
};

setDifficulty("advanced");

setActiveMode("learnTab");

document.getElementById("consonant1Btn").onclick = () => {
  changeCategory("consonant1", "consonant1Btn");
};

document.getElementById("consonant2Btn").onclick = () => {
  changeCategory("consonant2", "consonant2Btn");
};

document.getElementById("consonantAllBtn").onclick = () => {
  changeCategory("consonantAll", "consonantAllBtn");
};

document.getElementById("vowelPlusBtn").onclick = () => {
  changeCategory("vowelPlus", "vowelPlusBtn");
};

document.getElementById("numberBtn").onclick = () => {
  changeCategory("number", "numberBtn");
};

document.getElementById("punctuationBtn").onclick = () => {
  changeCategory("punctuation", "punctuationBtn");
};

loadAppItems().catch((err) => {
  console.error(err);
  alert("데이터를 불러오지 못했습니다. GitHub Pages나 Live Server에서 실행해 주십시오.");
});
