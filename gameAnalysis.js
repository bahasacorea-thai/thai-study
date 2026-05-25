/*
  gameAnalysis.js
  Thai Study - Game Analysis Helper

  목적:
  - gameResults 배열을 분석하여 정답률, 오답쌍, 학습 전략 문장을 생성합니다.
  - 기존 app.js에 붙여 넣거나 별도 파일로 불러올 수 있습니다.

  전제:
  - ITEMS 배열이 이미 존재해야 합니다.
  - gameResults 형식:
    [
      { question: 13, answer: 19 },
      { question: 20, answer: 20 }
    ]
*/

function getItemByCollation(collation) {
  return getCurrentItems().find((item) => item.collation === collation);
}

function getAccuracyInfo(results) {
  const total = results.length;
  const correct = results.filter((r) => r.correct).length;
  const wrong = total - correct;
  const accuracy = total === 0 ? 0 : Math.round((correct / total) * 10000) / 100;

  return { total, correct, wrong, accuracy };
}

function getWrongPairs(results) {
  const pairMap = {};

  results.forEach((r) => {
    if (r.correct) return;

    const key = r.question + "->" + r.answer;

    if (!pairMap[key]) {
      pairMap[key] = {
        question: r.question,
        answer: r.answer,
        count: 0,
      };
    }

    pairMap[key].count += 1;
  });

  return Object.values(pairMap).sort((a, b) => b.count - a.count);
}

function makeLevelComment(accuracy) {
  if (accuracy === 100) {
    return "완벽합니다. 2차례 더 100%가 나오면 다음 단계로 넘어가십시오.";
  }

  if (accuracy >= 95 && accuracy < 100) {
    return "거의 숙달 단계입니다. 전체 반복보다 틀린 문자쌍만 집중 복습하는 것이 효율적입니다.";
  }

  if (accuracy >= 85 && accuracy < 95) {
    return "안정적인 구별 능력이 형성되고 있습니다. 반복 중 나타나는 특정 혼동 문자쌍을 따로 묶어 복습하면 좋습니다.";
  }

  if (accuracy >= 70 && accuracy < 85) {
    return "기본 구별은 가능하지만 아직 혼동이 남아 있습니다. 그림보다 문자 모양과 이름을 함께 확인하는 연습이 필요합니다.";
  }

  if (accuracy >= 50 && accuracy < 70) {
    return "아직 문자 구별이 충분히 안정되지 않았습니다. 학습 모드로 돌아가 글자 이름과 대표 단어를 먼저 반복하는 것이 좋습니다.";
  }

  return "처음 학습 단계입니다. 퀴즈나 게임보다 학습 모드에서 문자와 그림을 천천히 연결하는 연습이 먼저 필요합니다.";
}

function makeWrongPairText(pair) {
  const q = getItemByCollation(pair.question);
  const a = getItemByCollation(pair.answer);

  if (!q || !a) return "";

  return `${q.symbol} (${q.koreanName}, ${q.rtgsName}) → ${a.symbol} (${a.koreanName}, ${a.rtgsName}) : ${pair.count}회`;
}

function makeStudyStrategy(accuracyInfo, wrongPairs) {
  if (accuracyInfo.total === 0) {
    return ["아직 게임 결과가 없습니다.", "게임을 먼저 완료한 뒤 분석을 확인하십시오."];
  }

  if (wrongPairs.length === 0) {
    return ["오답이 없습니다.", "현재 단계에서는 다음 문자 범주나 모음 기호 학습으로 넘어가도 좋습니다."];
  }

  const strategies = [];

  if (wrongPairs.length <= 3) {
    strategies.push("오답이 특정 문자쌍에 제한되어 있습니다.");
    strategies.push("전체를 다시 반복하기보다 아래 혼동 문자쌍만 집중 복습하십시오.");
  } else {
    strategies.push("오답이 여러 문자에 분산되어 있습니다.");
    strategies.push("학습 모드에서 전체 문자를 한 번 훑은 뒤 다시 게임을 실행하는 것이 좋습니다.");
  }

  strategies.push("틀린 문자는 태국 문자 모양, 한글 이름, 로마자 표기를 함께 비교하십시오.");

  return strategies;
}

function makeGameAnalysis(results) {
  const accuracyInfo = getAccuracyInfo(results);
  const wrongPairs = getWrongPairs(results);
  const topWrongPairs = wrongPairs.slice(0, 5);

  const lines = [];

  lines.push("학습 분석");
  lines.push("");
  lines.push(`정답률: ${accuracyInfo.accuracy.toFixed(2)}%`);
  lines.push(`정답: ${accuracyInfo.correct} / ${accuracyInfo.total}`);
  lines.push(`오답: ${accuracyInfo.wrong}`);
  lines.push("");
  lines.push("종합 평가");
  lines.push(makeLevelComment(accuracyInfo.accuracy));
  lines.push("");

  if (topWrongPairs.length > 0) {
    lines.push("주요 혼동 문자");
    topWrongPairs.forEach((pair) => {
      lines.push("- " + makeWrongPairText(pair));
    });
    lines.push("");
  }

  lines.push("추천 전략");
  makeStudyStrategy(accuracyInfo, wrongPairs).forEach((text) => {
    lines.push("- " + text);
  });

  return lines.join("\n");
}

function renderGameAnalysis(targetId, results) {
  const target = document.getElementById(targetId);
  if (!target) return;

  target.textContent = makeGameAnalysis(results);
}

function makeDiagnosisText(results) {
  const accuracyInfo = getAccuracyInfo(results);
  const rtInfo = getRtInfo(results);
  const repetitionInfo = getStimulusRepetitionInfo(results);
  const wrongPairs = getWrongPairs(results);
  const topWrongPairs = wrongPairs.slice(0, 5);

  const lines = [];

  lines.push("[진단과 분석]");
  lines.push("");
  lines.push(`정답률: ${accuracyInfo.accuracy.toFixed(2)}%`);
  lines.push(`정답: ${accuracyInfo.correct} / ${accuracyInfo.total}`);
  lines.push(`오답: ${accuracyInfo.wrong}`);
  lines.push(`평균 반응시간: ${rtInfo.avgRt}ms`);
  lines.push(`빠른 반응(1초 이하): ${rtInfo.fastCount}회`);
  lines.push(`느린 반응(3초 이상): ${rtInfo.slowCount}회`);
  lines.push("");
  lines.push("종합 진단");
  lines.push(makeLevelComment(accuracyInfo.accuracy));

  if (topWrongPairs.length > 0) {
    lines.push("");
    lines.push("주요 혼동 문자");
    topWrongPairs.forEach((pair) => {
      lines.push("- " + makeWrongPairText(pair));
    });
  }

  const repeatedWrong = {};

  results.forEach((r) => {
    if (r.correct) return;

    if (!repeatedWrong[r.question]) {
      repeatedWrong[r.question] = 0;
    }

    repeatedWrong[r.question] += 1;
  });

  const hardItems = Object.entries(repeatedWrong)
    .filter(([, count]) => count >= 2)
    .map(([collation, count]) => ({
      item: getItemByCollation(Number(collation)),
      count,
    }));

  if (hardItems.length > 0) {
    lines.push("");
    lines.push("반복 오답 문자");

    hardItems.forEach(({ item, count }) => {
      let label = "";

      if (count === 2) {
        label = "취약 문자";
      } else if (count >= 3) {
        label = "핵심 복습 문자";
      } else {
        label = "일시적 혼동";
      }

      lines.push(`- ${item.symbol}: ${count}회 반복 오답 → ${label}`);
    });
  }

  return lines.join("\n");
}

function makeStrategyText(results) {
  const accuracyInfo = getAccuracyInfo(results);

  const wrongPairs = getWrongPairs(results);

  const lines = [];

  lines.push("[대책과 전략]");

  lines.push("");

  // 오답 없음
  if (wrongPairs.length === 0) {
    lines.push("- 오답이 없습니다.");

    lines.push("- 현재 단계에서는 다음 문자 범주로 넘어가도 좋습니다.");

    return lines.join("\n");
  }

  // 반복 오답 분석
  const repeatedWrong = {};

  results.forEach((r) => {
    if (r.correct) return;

    if (!repeatedWrong[r.question]) {
      repeatedWrong[r.question] = 0;
    }

    repeatedWrong[r.question] += 1;
  });

  const weakItems = [];
  const coreItems = [];

  Object.entries(repeatedWrong).forEach(([collation, count]) => {
    const item = getItemByCollation(Number(collation));

    if (!item) return;

    if (count === 2) {
      weakItems.push(item.symbol);
    }

    if (count >= 3) {
      coreItems.push(item.symbol);
    }
  });

  // 권고 생성
  if (coreItems.length > 0) {
    lines.push(`- 핵심 복습 문자: ${coreItems.join(", ")}`);

    lines.push("- 이 문자는 학습 모드에서 이름과 모양을 함께 반복 확인하십시오.");
  }

  if (weakItems.length > 0) {
    lines.push(`- 취약 문자: ${weakItems.join(", ")}`);

    lines.push("- 퀴즈 모드에서 추가 노출을 권장합니다.");
  }

  if (accuracyInfo.accuracy === 100) {
    lines.push("- 2차례 더 100%가 나오면 다음 단계로 넘어가십시오.");
  } else if (accuracyInfo.accuracy >= 95 && accuracyInfo.accuracy < 100) {
    lines.push("- 현재 수준이면 다음 단계 진입을 고려할 수 있습니다.");
  } else if (accuracyInfo.accuracy >= 85 && accuracyInfo.accuracy < 95) {
    lines.push("- 조금 더 노력하면 이번 단계를 넘어갈 수 있습니다.");
  } else {
    lines.push("- 학습 모드 복습 후 게임을 다시 실행하는 것이 좋습니다.");
  }

  return lines.join("\n");
}

function getRtInfo(results) {
  const valid = results.filter((r) => typeof r.rt === "number");

  if (valid.length === 0) {
    return {
      avgRt: 0,
      fastCount: 0,
      slowCount: 0,
    };
  }

  const avgRt = Math.round(valid.reduce((sum, r) => sum + r.rt, 0) / valid.length);

  const fastCount = valid.filter((r) => r.rt <= 1000).length;
  const slowCount = valid.filter((r) => r.rt >= 3000).length;

  return {
    avgRt,
    fastCount,
    slowCount,
  };
}

function getStimulusRepetitionInfo(results) {
  const map = {};

  results.forEach((r) => {
    const rep = r.repetition;

    if (!map[rep]) {
      map[rep] = {
        total: 0,
        correct: 0,
      };
    }

    map[rep].total += 1;

    if (r.correct) {
      map[rep].correct += 1;
    }
  });

  return Object.entries(map).map(([rep, data]) => ({
    repetition: Number(rep),

    accuracy: Math.round((data.correct / data.total) * 10000) / 100,
  }));
}
