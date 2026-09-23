let APP_ITEMS = [];
let currentCategory = "consonant1";
let currentMode = "learn";
let currentDifficulty = "advanced";
let idx = 0;
let quizItem = null;
let quizHistory = [];
let quizHistoryIndex = -1;
let quizPage = 0;
let gameQueue = [];
let gameIndex = 0;
let gamePage = 0;
let gameResults = [];
let trialStartTime = 0;
let resultPage = "scatter";
let resultSaved = false;
let hoveredPoint = null;
let selectedPoint = null;
let analysisGenerated = false;
let reportSaved = false;
let setupStep = "category";
let selectedCategory = "consonant1";
let selectedMode = "learn";
let currentQuizDifficulty = "beginner";
let quizQueue = [];
let quizIndex = 0;

const difficultySettings = { beginner: 1, intermediate: 2, advanced: 3 };
const categoryLabels = {
  consonant1: "자음1",
  consonant2: "자음2",
  consonantAll: "자음전체",
  vowelPlus: "모음+",
  number: "숫자",
  punctuation: "문장부호",
};
const modeLabels = { learn: "학습", quiz: "퀴즈", game: "게임" };
const difficultyLabels = { beginner: "초급", intermediate: "중급", advanced: "고급" };

function normalizeAppItem(row) {
  const symbol = row.Symbol === undefined || row.Symbol === null ? "" : String(row.Symbol);
  const korean = row["Korean Name"] || "";
  return {
    Serial: row.Serial,
    Unicode: row.Unicode,
    Class: row.Class || "",
    Property: row.Property || "",
    Canonical: row.Canonical || "",
    Notes: row.Notes || "",
    index: Number(row.Serial) || 0,
    collation: Number(row.Collation) || 0,
    symbol,
    thaiName: row["Thai Name"] || "",
    koreanName: korean,
    korean,
    rtgsName: row["RTGS Name"] || "",
    meaning: row.Meaning === undefined || row.Meaning === null ? "" : String(row.Meaning),
    image: row.Image || "",
  };
}

function isSameAnswer(a, b) {
  return (a?.symbol || "").trim() === (b?.symbol || "").trim();
}

async function loadJson() {
  const res = await fetch("data/app_items.json");

  if (!res.ok) {
    throw new Error("app_items.json load failed");
  }

  return res.json();
}

function getCurrentItems() {
  if (currentCategory === "consonant1") return APP_ITEMS.filter((item) => item.Class === "자음" && item.Canonical === "O");
  if (currentCategory === "consonant2") return APP_ITEMS.filter((item) => item.Class === "자음" && item.Canonical !== "O");
  if (currentCategory === "consonantAll") return APP_ITEMS.filter((item) => item.Class === "자음");
  if (currentCategory === "vowelPlus") return APP_ITEMS.filter((item) => item.Class === "모음" || item.Class === "부가" || item.Class === "성조");
  if (currentCategory === "number") return APP_ITEMS.filter((item) => item.Class === "숫자");
  if (currentCategory === "punctuation") return APP_ITEMS.filter((item) => item.Class === "문장");
  return APP_ITEMS.filter((item) => item.Class === "자음" && item.Canonical === "O");
}

function imagePath(path) {
  if (!path) return "";
  if (path.startsWith("http") || path.startsWith("data:")) return path;
  if (path.startsWith("assets/")) return path;
  return path;
}

function consonantHint(item) {
  const hint = document.getElementById("learnHint");

  if (!hint) return;

  if (item.Class !== "자음") {
    hint.textContent = "";
    return;
  }

  const meaningKoMap = {
    chicken: "닭",
    egg: "달걀",
    bottle: "병",
    buffalo: "물소",
    person: "사람",
    bell: "종",
    snake: "뱀",
    plate: "접시",
    cymbals: "심벌즈",
    elephant: "코끼리",
    chain: "사슬",
    tree: "나무",
    woman: "여자",
    headdress: "머리장식",
    child: "아이",
    pedestal: "받침대",
    flag: "깃발",
    mouse: "쥐",
    elder: "어른",
    samanera: "사미",
    leaf: "잎",
    fish: "물고기",
    bee: "벌",
    lid: "뚜껑",
    basin: "대야",
    tiger: "호랑이",
    monkey: "원숭이",
    teeth: "이",
    turtle: "거북이",
    horse: "말",
    "giant, yaksha": "야차",
    boat: "배",
    ring: "반지",
    "pavilion, sala": "정자",
    hermit: "은둔자",
    owl: "올빼미",
    "chest, box": "상자",
    kite: "연",
    soldier: "군인",
    sack: "자루",
    "goad, javelin": "몰이막대",
    Junk: "범선",
    Montho: "몬토",
    phan: "쟁반",
  };

  const meaningKey = (item.meaning || "").replace(/\u00a0/g, " ");
  const meaningKo = meaningKoMap[meaningKey] || meaningKey;
  const thaiNameWord = (item.thaiName || "").replace(item.symbol || "", "").trim();

  hint.textContent = `${item.symbol || ""}가 ` + `${thaiNameWord}(${meaningKo})에 ` + `있나요?`;

  fitSingleLineText(hint);
}

function updateMeaning(item) {
  const meaning = document.getElementById("learnMeaning");

  meaning.className = item.Class === "숫자" ? "numberMeaningBlock" : item.Class === "문장" ? "punctuationMeaningBlock" : "";

  meaning.textContent = item.meaning || item.Notes || item.koreanName || "";
}

function extraBlock(item) {
  const image = document.getElementById("learnImage");
  const meaning = document.getElementById("learnMeaning");

  image.style.display = "none";
  image.src = "";

  meaning.style.display = "none";

  if (item.Class === "자음" && item.image) {
    image.src = imagePath(item.image);
    image.alt = item.koreanName || item.thaiName || "";
    image.style.display = "block";

    return;
  }

  meaning.style.display = "block";

  updateMeaning(item);
}

function renderSetup() {
  const title = document.getElementById("setupTitle");
  const notice = document.getElementById("setupSelectionNotice");
  const back = document.getElementById("setupBack");

  const categoryButtons = [
    document.getElementById("setupCategoryConsonant1"),
    document.getElementById("setupCategoryConsonant2"),
    document.getElementById("setupCategoryConsonantAll"),
    document.getElementById("setupCategoryVowelPlus"),
    document.getElementById("setupCategoryNumber"),
    document.getElementById("setupCategoryPunctuation"),
  ];

  const modeButtons = [document.getElementById("setupModeLearn"), document.getElementById("setupModeQuiz"), document.getElementById("setupModeGame")];

  const quizDifficultyRow = document.getElementById("quizDifficultyRow");
  const gameDifficultyRow = document.getElementById("gameDifficultyRow");

  back.style.display = setupStep === "category" ? "none" : "inline-block";

  categoryButtons.forEach((btn) => {
    btn.style.display = setupStep === "category" ? "block" : "none";
  });

  modeButtons.forEach((btn) => {
    btn.style.display = setupStep === "mode" ? "block" : "none";
  });

  quizDifficultyRow.style.display = setupStep === "mode" && selectedMode === "quiz" ? "flex" : "none";

  gameDifficultyRow.style.display = setupStep === "mode" && selectedMode === "game" ? "flex" : "none";

  if (setupStep === "category") {
    notice.style.display = "none";
    notice.textContent = "";
    title.textContent = "범주를 선택하세요";

    addSetupButton("setupCategoryConsonant1", () => {
      selectedCategory = "consonant1";
      selectedMode = "learn";
      setupStep = "mode";
      renderSetup();
    });

    addSetupButton("setupCategoryConsonant2", () => {
      selectedCategory = "consonant2";
      selectedMode = "learn";
      setupStep = "mode";
      renderSetup();
    });

    addSetupButton("setupCategoryConsonantAll", () => {
      selectedCategory = "consonantAll";
      selectedMode = "learn";
      setupStep = "mode";
      renderSetup();
    });

    addSetupButton("setupCategoryVowelPlus", () => {
      selectedCategory = "vowelPlus";
      selectedMode = "learn";
      setupStep = "mode";
      renderSetup();
    });

    addSetupButton("setupCategoryNumber", () => {
      selectedCategory = "number";
      selectedMode = "learn";
      setupStep = "mode";
      renderSetup();
    });

    addSetupButton("setupCategoryPunctuation", () => {
      selectedCategory = "punctuation";
      selectedMode = "learn";
      setupStep = "mode";
      renderSetup();
    });

    return;
  }

  if (setupStep === "mode") {
    notice.style.display = "block";
    notice.textContent = `선택한 범주: ${categoryLabels[selectedCategory]}`;
    title.textContent = "방식을 선택하세요";

    addSetupButton("setupModeLearn", () => {
      selectedMode = "learn";
      startSelected();
    });

    addSetupButton("setupModeQuiz", () => {
      selectedMode = selectedMode === "quiz" ? "learn" : "quiz";
      renderSetup();
    });

    addSetupButton("quizDifficultyBeginner", () => {
      currentQuizDifficulty = "beginner";
      startSelected();
    });

    addSetupButton("quizDifficultyIntermediate", () => {
      currentQuizDifficulty = "intermediate";
      startSelected();
    });

    addSetupButton("quizDifficultyAdvanced", () => {
      currentQuizDifficulty = "advanced";
      startSelected();
    });

    addSetupButton("setupModeGame", () => {
      selectedMode = selectedMode === "game" ? "learn" : "game";
      renderSetup();
    });

    addSetupButton("gameDifficultyBeginner", () => {
      currentDifficulty = "beginner";
      startSelected();
    });

    addSetupButton("gameDifficultyIntermediate", () => {
      currentDifficulty = "intermediate";
      startSelected();
    });

    addSetupButton("gameDifficultyAdvanced", () => {
      currentDifficulty = "advanced";
      startSelected();
    });
  }
}

function addSetupButton(id, onClick) {
  const btn = document.getElementById(id);
  if (!btn) return;

  btn.onclick = onClick;
}

function startSelected() {
  currentCategory = selectedCategory;
  currentMode = selectedMode;

  document.body.classList.toggle("punctuation", currentCategory === "punctuation");
  idx = 0;
  quizHistory = [];
  quizHistoryIndex = -1;
  quizPage = 0;
  quizQueue = [];
  quizIndex = 0;
  gamePage = 0;
  document.body.classList.add("running");
  resetResultState();
  document.body.classList.remove("learn", "quiz", "game", "result");
  document.body.classList.add(currentMode);
  document.getElementById("screenTitle").textContent =
    `${categoryLabels[currentCategory]} · ${modeLabels[currentMode]}${currentMode === "game" ? " · " + difficultyLabels[currentDifficulty] : ""}`;
  if (currentMode === "learn") renderLearn();
  if (currentMode === "quiz") startQuiz();
  if (currentMode === "game") startGame();
}

function resetResultState() {
  resultPage = "scatter";
  resultSaved = false;
  analysisGenerated = false;
  reportSaved = false;

  const stimulusSymbol = document.getElementById("stimulusSymbol");
  const responseSymbol = document.getElementById("responseSymbol");
  const analysisText = document.getElementById("analysisText");
  const saveReportBtn = document.getElementById("saveReportBtn");
  const canvas = document.getElementById("resultCanvas");

  if (stimulusSymbol) stimulusSymbol.textContent = "";
  if (responseSymbol) responseSymbol.textContent = "";
  if (analysisText) {
    analysisText.textContent = "";
    analysisText.style.display = "none";
  }
  if (saveReportBtn) saveReportBtn.style.display = "none";
  if (canvas) canvas.style.display = "block";
}

function goSetup() {
  if (document.body.classList.contains("result")) {
    if (!confirmSaveIfNeeded()) return;
  }

  selectedCategory = currentCategory;
  selectedMode = currentMode;
  setupStep = "mode";

  resetResultState();

  document.body.classList.remove("running");
  document.body.classList.remove("learn", "quiz", "game", "result");
  renderSetup();
}

function confirmSaveIfNeeded() {
  if (!document.body.classList.contains("result")) return true;

  if (reportSaved) return true;

  if (analysisGenerated && resultSaved && !reportSaved) {
    const saveReport = confirm("결과분석보고서를 저장하시겠습니까?");
    if (saveReport) return downloadResultImage(true);
    return true;
  }

  if (resultSaved) return true;

  const save = confirm(analysisGenerated ? "결과분석보고서를 저장하시겠습니까?" : "현재 결과를 저장하시겠습니까?");

  if (save) return downloadResultImage(analysisGenerated);

  return true;
}

function downloadResultImage(includeReport = false) {
  const participantName = prompt("이름을 입력하세요 (선택)\n비워두면 자동 파일명으로 저장됩니다.");

  if (participantName === null) {
    return false;
  }

  const now = new Date();

  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const hh = String(now.getHours()).padStart(2, "0");
  const mi = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");

  const safeName = (participantName || "").trim().replace(/[\\/:*?"<>|]/g, "_");

  const fileBaseName = [
    safeName || "anonymous",
    categoryLabels[currentCategory],
    currentMode,
    currentDifficulty,
    `${yyyy}${mm}${dd}`,
    `${hh}${mi}${ss}`,
    `${gameResults.length}`,
  ].join("_");

  const resultData = {
    participantName: participantName || "",
    category: currentCategory,
    difficulty: currentDifficulty,
    mode: currentMode,
    savedAt: now.toISOString(),
    totalTrials: gameResults.length,
    results: gameResults,
    analysis: includeReport
      ? {
          diagnosis: makeDiagnosisText(gameResults),
          strategy: makeStrategyText(gameResults),
        }
      : null,
  };

  const jsonBlob = new Blob([JSON.stringify(resultData, null, 2)], { type: "application/json" });
  const jsonUrl = URL.createObjectURL(jsonBlob);

  const jsonLink = document.createElement("a");
  jsonLink.href = jsonUrl;
  jsonLink.download = fileBaseName + ".json";
  jsonLink.click();

  URL.revokeObjectURL(jsonUrl);

  const canvas = document.getElementById("resultCanvas");

  if (!includeReport) {
    const imageLink = document.createElement("a");
    imageLink.download = fileBaseName + ".png";
    imageLink.href = canvas.toDataURL("image/png");
    imageLink.click();

    resultSaved = true;

    return true;
  }

  const { jsPDF } = window.jspdf;

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  pdf.addImage(canvas.toDataURL("image/png"), "PNG", 15, 15, 180, 180);

  pdf.addPage();

  const reportText = makeAnalysisReport();
  const reportCanvas = document.createElement("canvas");
  const ctx = reportCanvas.getContext("2d");

  reportCanvas.width = 1200;
  reportCanvas.height = 1600;

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, reportCanvas.width, reportCanvas.height);

  ctx.fillStyle = "#222";
  ctx.font = "32px Malgun Gothic, 맑은 고딕, sans-serif";
  ctx.textBaseline = "top";

  const maxWidth = 1080;
  const lineHeight = 52;
  let y = 50;

  reportText.split("\n").forEach((paragraph) => {
    let line = "";

    Array.from(paragraph).forEach((char) => {
      const testLine = line + char;

      if (ctx.measureText(testLine).width > maxWidth) {
        ctx.fillText(line, 60, y);
        line = char;
        y += lineHeight;
      } else {
        line = testLine;
      }
    });

    ctx.fillText(line, 60, y);
    y += lineHeight;
  });

  pdf.addImage(reportCanvas.toDataURL("image/png"), "PNG", 10, 10, 190, 253);

  pdf.save(fileBaseName + ".pdf");

  resultSaved = true;
  reportSaved = true;

  return true;
}

function renderLearn() {
  const items = getCurrentItems();
  const item = items[idx];
  if (!item) return;

  const symbol = document.getElementById("learnSymbol");
  symbol.textContent = item.symbol || "";
  symbol.classList.toggle("punctuationSymbolPanel", item.Class === "문장");

  const thaiName = document.getElementById("learnThaiName");

  thaiName.textContent = item.thaiName || "";
  thaiName.style.fontSize = "";
  thaiName.style.whiteSpace = "";

  const koreanName = document.getElementById("learnKoreanName");
  koreanName.textContent = item.koreanName || "";
  koreanName.style.fontSize = "";

  document.getElementById("learnRtgsName").textContent = item.rtgsName || "";

  if (currentCategory === "punctuation") {
    thaiName.style.fontSize = "37.5px";
    koreanName.style.fontSize = "18.75px";
  }
  consonantHint(item);
  document.getElementById("learnProgress").textContent = idx + 1 + "/" + items.length;

  if (item.Class === "문장") {
    fitSingleLineText(thaiName);
  }

  extraBlock(item);
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

  quizPage = 0;
  updateQuizPrompt(quizItem);

  document.getElementById("quizInfoWrap").style.display = "grid";
  document.getElementById("quizAnswerWrap").style.display = "none";
  document.getElementById("quizInfoText").textContent = "해당 글자를 선택하세요.";
  document.getElementById("quizProgress").textContent = currentQuizDifficulty === "beginner" ? `${quizIndex} / ${quizQueue.length}` : "";

  renderKeyboard("quiz");
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

function startGame() {
  resetResultState();

  currentMode = "game";

  gameQueue = makeGameQueue();
  gameIndex = 0;
  gamePage = 0;
  gameResults = [];
  trialStartTime = Date.now();

  document.body.classList.remove("learn", "quiz", "result");
  document.body.classList.add("running", "game");

  renderGame();
}

function renderGame() {
  if (gameIndex >= gameQueue.length) {
    document.getElementById("gamePromptImage").style.display = "none";
    document.getElementById("gamePromptImage").src = "";
    document.getElementById("gamePromptKorean").textContent = "게임 종료";
    document.getElementById("gamePromptRtgs").textContent = "";
    document.getElementById("gamePromptMeaning").textContent = "";

    document.getElementById("gameInfoText").textContent = "";
    document.getElementById("gameProgress").textContent = gameQueue.length + " 문항 완료";

    document.getElementById("showGameResultBtn").textContent = "결과 확인";
    document.getElementById("showGameResultBtn").style.display = "inline-block";
    document.getElementById("gameKeyboard").parentElement.classList.add("keyboardHidden");
    document.getElementById("gamePageInfo").textContent = "";
    document.getElementById("showGameResultBtn").onclick = showGameResult;

    return;
  }

  const item = gameQueue[gameIndex];
  trialStartTime = Date.now();
  updateQuizPrompt(item, "game");
  document.getElementById("showGameResultBtn").style.display = "none";
  document.getElementById("gameInfoText").textContent = "해당 글자를 선택하세요.";
  document.getElementById("gameProgress").textContent = gameIndex + 1 + " / " + gameQueue.length;

  document.getElementById("gameKeyboard").parentElement.classList.remove("keyboardHidden");

  renderKeyboard("game");
}

function showGameResult() {
  resetResultState();

  document.body.classList.remove("learn", "quiz", "game", "result");

  document.body.classList.add("result");

  document.getElementById("screenTitle").textContent = `${categoryLabels[currentCategory]} · 결과`;

  setupResultSwipe();
  updateResultPage();

  document.getElementById("restartBtn").onclick = () => {
    if (!confirmSaveIfNeeded()) return;

    currentMode = "game";
    selectedMode = "game";

    resetResultState();

    document.body.classList.remove("learn", "quiz", "result");
    document.body.classList.add("running", "game");

    document.getElementById("screenTitle").textContent = `${categoryLabels[currentCategory]} · 게임 · ${difficultyLabels[currentDifficulty]}`;

    startGame();
  };

  document.getElementById("saveReportBtn").onclick = () => {
    downloadResultImage(true);
  };
}

function updateResultPage() {
  const resultScreen = document.getElementById("resultScreen");
  const analysisText = document.getElementById("analysisText");
  const saveReportBtn = document.getElementById("saveReportBtn");

  resultScreen.classList.toggle("resultScatter", resultPage === "scatter");
  resultScreen.classList.toggle("resultAnalysis", resultPage === "analysis");

  if (resultPage === "scatter") {
    analysisText.style.display = "none";
    saveReportBtn.style.display = "none";
    drawResultCanvas();
    return;
  }

  analysisText.style.display = "block";
  saveReportBtn.style.display = "inline-block";
  analysisText.textContent = makeAnalysisReport();
  analysisGenerated = true;
}

function makeAnalysisReport() {
  return [makeDiagnosisText(gameResults), "", makeStrategyText(gameResults)].join("\n");
}

function setupResultSwipe() {
  const screen = document.getElementById("resultScreen");

  let startX = 0;
  let deltaX = 0;

  screen.ontouchstart = (e) => {
    startX = e.touches[0].clientX;
    deltaX = 0;
  };

  screen.ontouchmove = (e) => {
    deltaX = e.touches[0].clientX - startX;
  };

  screen.ontouchend = () => {
    if (Math.abs(deltaX) < 60) return;

    if (deltaX < 0) {
      resultPage = "analysis";
    } else {
      resultPage = "scatter";
    }
    updateResultPage();
  };
}

function drawResultCanvas() {
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

  const total = gameResults.length;
  const correctCount = gameResults.filter((r) => r.correct).length;
  const accuracy = total === 0 ? 0 : Math.round((correctCount / total) * 10000) / 100;

  ctx.fillStyle = "#111";
  ctx.font = "32px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("정답률: " + accuracy.toFixed(2) + "%", W / 2, 40);

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

  ctx.textAlign = "right";
  for (let i = 1; i <= max; i += 5) {
    ctx.fillText(String(i), pad - 9, sy(i) + 8);
  }

  const legendX = W - pad + 18;
  const legendTopY = pad + 10;
  const legendBottomY = H - pad - 80;

  ctx.textAlign = "left";
  ctx.font = "18px sans-serif";
  ctx.fillStyle = "#111";

  [1, 2, 3].forEach((rep, i) => {
    const r = rep === 1 ? 5 : rep === 2 ? 7 : 9;
    const y = legendTopY + i * 30;
    ctx.beginPath();
    ctx.arc(legendX, y, r, 0, Math.PI * 2);
    ctx.strokeStyle = "#111";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillText(`${rep}회`, legendX + 18, y + 6);
  });

  ctx.beginPath();
  ctx.arc(legendX, legendBottomY, 7, 0, Math.PI * 2);
  ctx.strokeStyle = "#111";
  ctx.stroke();
  ctx.fillText("정답", legendX + 18, legendBottomY + 6);

  ctx.beginPath();
  ctx.arc(legendX, legendBottomY + 30, 7, 0, Math.PI * 2);
  ctx.strokeStyle = "#d11";
  ctx.stroke();
  ctx.fillText("오답", legendX + 18, legendBottomY + 36);

  ctx.beginPath();
  ctx.arc(legendX, legendBottomY + 60, 8, 0, Math.PI * 2);
  ctx.strokeStyle = "blue";
  ctx.stroke();
  ctx.fillText("확인", legendX + 18, legendBottomY + 66);

  window.resultPoints = [];

  gameResults.forEach((r) => {
    const qIndex = indexMap[r.question];
    const aIndex = indexMap[r.answer];
    if (!qIndex || !aIndex) return;

    const x = sx(qIndex);
    const y = sy(aIndex);
    const radius = r.repetition === 1 ? 5 : r.repetition === 2 ? 7 : 9;

    window.resultPoints.push({ x, y, r });

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.strokeStyle = r.correct ? "#111" : "#d11";
    ctx.lineWidth = 2;
    ctx.stroke();
  });
}

function drawPoint(point, isBlue = false) {
  const canvas = document.getElementById("resultCanvas");
  const ctx = canvas.getContext("2d");

  const baseRadius = point.r.repetition === 1 ? 5 : point.r.repetition === 2 ? 7 : 9;

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

function isKeyboardWideKey(item, keyboard) {
  const text = String(item?.symbol || "");
  if (!text) return false;

  const probe = document.createElement("span");

  probe.textContent = text;
  probe.style.position = "fixed";
  probe.style.left = "-10000px";
  probe.style.top = "0";
  probe.style.visibility = "hidden";
  probe.style.pointerEvents = "none";
  probe.style.whiteSpace = "nowrap";
  probe.style.fontFamily = '"Noto Sans Thai", Tahoma, "Leelawadee UI", sans-serif';
  probe.style.fontSize = "50px";
  probe.style.fontWeight = "500";
  probe.style.lineHeight = "1";

  document.body.appendChild(probe);

  const textWidth = probe.getBoundingClientRect().width;

  probe.remove();

  return textWidth > 75;
}

function buildKeyboardPages(items, keyboard) {
  const columnCount = 4;
  const maxRows = 4;
  const capacity = columnCount * maxRows;
  const pages = [];

  let page = [];
  let usedCells = 0;

  items.forEach((item) => {
    const wide = isKeyboardWideKey(item, keyboard);
    const cells = wide ? 2 : 1;

    if (wide && usedCells % columnCount === columnCount - 1) {
      usedCells += 1;
    }

    if (usedCells + cells > capacity) {
      pages.push(page);
      page = [];
      usedCells = 0;
    }

    page.push({
      item,
      wide,
    });

    usedCells += cells;
  });

  if (page.length) {
    pages.push(page);
  }

  return pages.length ? pages : [[]];
}

function getKeyboardRowCount(pageItems) {
  const columnCount = 4;
  let usedCells = 0;

  pageItems.forEach(({ wide }) => {
    if (wide && usedCells % columnCount === columnCount - 1) {
      usedCells += 1;
    }

    usedCells += wide ? 2 : 1;
  });

  return Math.max(1, Math.min(4, Math.ceil(usedCells / columnCount)));
}

function renderKeyboard(target) {
  const items = getCurrentItems();
  const keyboard = document.getElementById(target + "Keyboard");
  const pageInfo = document.getElementById(target + "PageInfo");

  keyboard.classList.toggle("gameKeyboardAll", target === "game");

  const pages = buildKeyboardPages(items, keyboard);
  const totalPages = pages.length;

  let currentPage = target === "game" ? gamePage : quizPage;

  currentPage = Math.max(0, Math.min(totalPages - 1, currentPage));

  if (target === "game") {
    gamePage = currentPage;
  } else {
    quizPage = currentPage;
  }

  const pageItems = pages[currentPage];

  keyboard.replaceChildren();

  pageItems.forEach(({ item, wide }) => {
    const btn = document.createElement("button");

    btn.textContent = item.symbol || "";

    if (wide) {
      btn.classList.add("wideKey");
    }

    btn.onclick = () => chooseKey(target, item);

    keyboard.appendChild(btn);
  });

  if (totalPages === 1) {
    pageInfo.textContent = "";
  } else {
    pageInfo.textContent = `${currentPage + 1} / ${totalPages}`;
  }
}

function chooseKey(target, chosen) {
  if (target === "game") playTap();

  if (target === "quiz") {
    if (quizItem && isSameAnswer(chosen, quizItem)) playCorrect();
    else playWrong();

    showQuizAnswer(chosen);
    return;
  }

  const answer = gameQueue[gameIndex];

  if (!answer) return;

  gameResults.push({
    trial: gameIndex + 1,
    repetition: answer.repetition || 1,
    difficulty: currentDifficulty,
    question: answer.collation,
    answer: chosen.collation,
    correct: isSameAnswer(chosen, answer),
    rt: Date.now() - trialStartTime,
  });

  gameIndex += 1;
  renderGame();
}

function changeKeyboardPage(target, delta) {
  const items = getCurrentItems();
  const keyboard = document.getElementById(target + "Keyboard");

  const pages = buildKeyboardPages(items, keyboard);
  const totalPages = pages.length;

  if (totalPages <= 1) {
    return;
  }

  if (target === "game") {
    gamePage = (gamePage + delta + totalPages) % totalPages;
  } else {
    quizPage = (quizPage + delta + totalPages) % totalPages;
  }

  renderKeyboard(target);
}

function updateQuizPrompt(item, target = "quiz") {
  const prefix = target === "game" ? "gamePrompt" : "quizPrompt";

  const image = document.getElementById(prefix + "Image");
  const korean = document.getElementById(prefix + "Korean");
  const rtgs = document.getElementById(prefix + "Rtgs");
  const meaning = document.getElementById(prefix + "Meaning");

  if (!image || !korean || !rtgs || !meaning) {
    return;
  }

  image.style.display = "none";
  image.src = "";

  korean.textContent = "";
  rtgs.textContent = "";
  meaning.textContent = "";
  meaning.className = "";
  meaning.style.color = "";

  if (item.Class === "자음" && item.image) {
    image.src = imagePath(item.image);
    image.style.display = "block";
    korean.textContent = item.koreanName || "";
    rtgs.textContent = item.rtgsName || "";
    return;
  }

  if (item.Class === "숫자") {
    meaning.textContent = item.meaning || "";
    meaning.className = "numberQuizPrompt";
    return;
  }

  korean.textContent = item.koreanName || "";
  rtgs.textContent = item.rtgsName || "";

  if (item.Class === "모음" || item.Class === "부가" || item.Class === "성조" || item.Class === "문장") {
    meaning.textContent = item.meaning || item.Notes || "";
    meaning.className = "quizPromptMeaningSub";
  }
  requestAnimationFrame(() => {
    const wrap = document.getElementById(prefix + "Wrap");
    if (!wrap) return;
    fitSingleLineText(wrap);
  });
}

function showQuizAnswer(chosen) {
  const quizAnswerWrap = document.getElementById("quizAnswerWrap");
  const quizThaiName = document.getElementById("quizThaiName");
  const quizKoreanName = document.getElementById("quizKoreanName");

  document.getElementById("quizInfoWrap").style.display = "none";
  quizAnswerWrap.style.display = "grid";

  quizThaiName.textContent = chosen.thaiName || "";
  quizKoreanName.textContent = chosen.koreanName || "";
  document.getElementById("quizRtgsName").textContent = chosen.rtgsName || "";
  document.getElementById("quizAnswerProgress").textContent = currentQuizDifficulty === "beginner" ? `${quizIndex} / ${quizQueue.length}` : "";

  fitSingleLineText(quizAnswerWrap);

  if (currentCategory === "punctuation") {
    quizThaiName.style.fontSize = "37.5px";
    quizKoreanName.style.fontSize = "18.75px";

    fitSingleLineText(quizThaiName);
  }

  document.getElementById("prevQuizBtn").onclick = () => startQuiz("prev");
  document.getElementById("nextQuizBtn").onclick = () => startQuiz("next");
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

function playTap() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "triangle";
  osc.frequency.value = 880;

  osc.connect(gain);
  gain.connect(ctx.destination);

  const t = ctx.currentTime;

  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.linearRampToValueAtTime(0.08, t + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);

  osc.start(t);
  osc.stop(t + 0.05);
}

function fitSingleLineText(container) {
  if (!container) return;

  const rows = container.matches?.("#learnThaiName, #quizThaiName") ? [container] : [...container.querySelectorAll(":scope > div")];

  rows.forEach((row) => {
    row.style.fontSize = "";
    row.style.whiteSpace = "nowrap";
    row.style.textAlign = "center";

    const availableWidth = row.getBoundingClientRect().width;
    if (!availableWidth || !row.textContent.trim()) return;

    const computed = getComputedStyle(row);

    const probe = document.createElement("span");
    probe.textContent = row.textContent;
    probe.style.position = "fixed";
    probe.style.left = "-10000px";
    probe.style.top = "0";
    probe.style.visibility = "hidden";
    probe.style.pointerEvents = "none";
    probe.style.whiteSpace = "nowrap";
    probe.style.fontFamily = computed.fontFamily;
    probe.style.fontWeight = computed.fontWeight;
    probe.style.fontStyle = computed.fontStyle;
    probe.style.fontSize = computed.fontSize;
    probe.style.letterSpacing = computed.letterSpacing;

    document.body.appendChild(probe);

    const textWidth = probe.getBoundingClientRect().width;
    const baseSize = parseFloat(computed.fontSize);

    probe.remove();

    if (textWidth > availableWidth) {
      const fittedSize = Math.floor(baseSize * (availableWidth / textWidth));

      row.style.fontSize = `${fittedSize}px`;
    }
  });
}

function shuffle(a) {
  const arr = [...a];

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

function getThaiVoice() {
  const voices = speechSynthesis.getVoices ? speechSynthesis.getVoices() : [];
  return voices.find((v) => v.lang === "th-TH") || voices.find((v) => v.lang.startsWith("th")) || null;
}

function speakThai(text) {
  if (!text || !("speechSynthesis" in window)) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "th-TH";
  u.rate = 0.75;
  const voice = getThaiVoice();
  if (voice) u.voice = voice;
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}

function currentSpeakItem() {
  if (currentMode === "quiz") return quizItem;
  if (currentMode === "game") return gameQueue[gameIndex];
  return getCurrentItems()[idx];
}

function setupSwipe(el, onLeft, onRight) {
  let sx = 0;
  let sy = 0;
  el.addEventListener(
    "touchstart",
    (e) => {
      sx = e.touches[0].clientX;
      sy = e.touches[0].clientY;
    },
    { passive: true },
  );
  el.addEventListener(
    "touchend",
    (e) => {
      const dx = e.changedTouches[0].clientX - sx;
      const dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy)) return;
      if (dx < 0) onLeft();
      else onRight();
    },
    { passive: true },
  );
}

function bind() {
  document.getElementById("setupBack").onclick = () => {
    selectedMode = "learn";
    setupStep = "category";
    renderSetup();
  };
  document.getElementById("backBtn").onclick = goSetup;
  document.getElementById("speakBtn").onclick = () => {
    const item = currentSpeakItem();
    if (!item) return;
    const wordOnly = (item.thaiName || "").trim().split(/\s+/).slice(1).join(" ") || item.thaiName || item.symbol;
    speakThai(wordOnly);
  };
  setupSwipe(
    document.getElementById("learnScreen"),
    () => {
      idx = (idx + 1) % getCurrentItems().length;
      renderLearn();
    },
    () => {
      idx = (idx - 1 + getCurrentItems().length) % getCurrentItems().length;
      renderLearn();
    },
  );
  setupSwipe(
    document.getElementById("quizKeyboard"),
    () => changeKeyboardPage("quiz", 1),
    () => changeKeyboardPage("quiz", -1),
  );
  setupSwipe(
    document.getElementById("gameKeyboard"),
    () => changeKeyboardPage("game", 1),
    () => changeKeyboardPage("game", -1),
  );

  const resultCanvas = document.getElementById("resultCanvas");

  resultCanvas.onclick = (e) => {
    const rect = resultCanvas.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * resultCanvas.width;
    const y = ((e.clientY - rect.top) / rect.height) * resultCanvas.height;

    const hit = (window.resultPoints || []).find((p) => Math.hypot(p.x - x, p.y - y) < 12);

    if (!hit) return;

    if (selectedPoint) {
      drawPoint(selectedPoint, false);
    }

    selectedPoint = hit;
    drawPoint(selectedPoint, true);

    const q = getCurrentItems().find((v) => v.collation === hit.r.question);
    const a = getCurrentItems().find((v) => v.collation === hit.r.answer);

    document.getElementById("stimulusSymbol").textContent = q?.symbol || "";
    document.getElementById("responseSymbol").textContent = a?.symbol || "";
  };

  resultCanvas.onmousemove = (e) => {
    const canvas = document.getElementById("resultCanvas");
    const rect = canvas.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((e.clientY - rect.top) / rect.height) * canvas.height;

    const hit = (window.resultPoints || []).find((p) => Math.hypot(p.x - x, p.y - y) < 12);

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
}

async function init() {
  bind();
  renderSetup();
  APP_ITEMS = (await loadJson()).map(normalizeAppItem);
}

if ("speechSynthesis" in window) speechSynthesis.onvoiceschanged = getThaiVoice;

function refitCurrentScreen() {
  if (!document.body.classList.contains("running")) return;

  if (currentMode === "learn") {
    const thaiName = document.getElementById("learnThaiName");

    if (currentCategory === "punctuation") {
      fitSingleLineText(thaiName);
    }

    fitSingleLineText(document.getElementById("learnMeaning")?.parentElement);
  }

  if (currentMode === "quiz") {
    fitSingleLineText(document.getElementById("quizPromptWrap"));

    if (document.getElementById("quizAnswerWrap")?.style.display !== "none") {
      fitSingleLineText(document.getElementById("quizAnswerWrap"));
    }
  }

  if (currentMode === "game") {
    fitSingleLineText(document.getElementById("gamePromptWrap"));
  }
}

window.addEventListener("resize", () => requestAnimationFrame(refitCurrentScreen));
window.addEventListener("orientationchange", () => requestAnimationFrame(refitCurrentScreen));

init().catch((err) => {
  console.error(err);
  alert("data/app_items.json을 불러오지 못했습니다.");
});
alert(
  `inner: ${window.innerWidth} × ${window.innerHeight}\n` + `visual: ${visualViewport.width} × ${visualViewport.height}\n` + `DPR: ${window.devicePixelRatio}`,
);
