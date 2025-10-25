const bitNumberGenerate = document.getElementById("bitNumberGenerate");
const bitNumber = document.getElementById("bitNumber");
const bitNumberResult = document.getElementById("bitNumberResult");
const validP = document.getElementById("validP");
const numberResult = document.getElementById("numberResult");
const maxPrime = document.getElementById("maxPrime");
const validResult = document.getElementById("validResult");
const testCount = document.getElementById("testCount");
const bAndMOutput = document.getElementById("bAndMOutput");
const aValueMin = document.getElementById("aValueMin");
const interalA = document.getElementById("interalA");
const runTests = document.getElementById("runTests");

let arrayPrime = [];
let p = null;
let pTemp = null;
let [b, m] = [null, null];
let minA = null;
let maxA = null;

function randomNumberBit(size) {
  let result = [];

  for (let i = 0; i < size; i++) {
    result.push(Math.random() * 10 > 5 ? "1" : "0");
  }

  bitNumber.textContent = result.join("");

  result[0] = "1";
  result[result.length - 1] = "1";

  bitNumberResult.textContent = result.join("");
  numberResult.textContent = parseInt(result.join(""), 2);
  return parseInt(result.join(""), 2);
}

bitNumberGenerate.addEventListener("click", () => {
  init();
});

function isPrime(number) {
  if (number <= 1) return false;

  for (let i = 2; i < number; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

function isPrimeArray(number) {
  let result = [];

  for (let i = 0; i < number; i++) {
    if (isPrime(i)) {
      result.push(i);
    }
  }

  return result;
}

function checkValidP(pValue, arrayValues) {
  for (let i = 0; i < arrayValues.length; i++) {
    if (pValue % arrayValues[i] === 0) {
      validResult.innerHTML += `<div class="valid-result-item">${pValue} % ${
        arrayValues[i]
      } = ${pValue % arrayValues[i]} ❌</div>`;

      return false;
    }
  }

  validResult.innerHTML += `<div class="valid-result-item">p = ${pValue}  ✅</div>`;

  return true;
}

maxPrime.addEventListener("change", () => {
  if (Number(maxPrime.value) < maxPrime.min || isNaN(maxPrime.value)) {
    maxPrime.value = maxPrime.min;
  }
});

testCount.addEventListener("change", () => {
  if (Number(testCount.value) < testCount.min || isNaN(testCount.value)) {
    testCount.value = testCount.min;
  }
});

aValueMin.addEventListener("change", () => {
  if (aValueMin.value < aValueMin.min) {
    aValueMin.value = aValueMin.min;
  }
  if (aValueMin.value > maxA - 1) {
    aValueMin.value = maxA - 1;
  }
  setIntervalA(aValueMin.value, p);
});

function setIntervalA(aValue, pValue) {
  minA = Number(aValue);
  maxA = pValue - 1;

  interalA.textContent = `a ∈ [${minA}, ${maxA}]`;
}

function randomValueA(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sumMod(a, x, n) {
  let p = 1;
  let i = x;

  while (i > 0) {
    const s = i % 2;

    if (s === 1) {
      p = (p * a) % n;
    }

    a = (a * a) % n;
    i = Math.floor((i - s) / 2);
  }

  return p;
}

function mValueAndValueB(pValue) {
  let b = 1;
  let m = Math.floor((pValue - 1) / 2);

  bAndMOutput.innerHTML = "";

  const table = document.createElement("table");
  table.className = "b-table-m";
  const headerRow = document.createElement("tr");
  const thB = document.createElement("th");
  thB.textContent = "b";
  const thM = document.createElement("th");
  thM.textContent = "m";
  headerRow.appendChild(thB);
  headerRow.appendChild(thM);
  table.appendChild(headerRow);

  createRowTableBAndM(table, b, m);

  for (let i = 2; i < pValue; i++) {
    if (m % Math.pow(2, i) === 0) {
      b++;
      m /= 2;

      createRowTableBAndM(table, b, m);
    } else break;
  }

  bAndMOutput.appendChild(table);
  return [b, m];
}

function createRowTableBAndM(table, bValue, mValue) {
  const tr = document.createElement("tr");
  const tdBValue = document.createElement("td");
  tdBValue.innerHTML = `${bValue}`;
  const tdMValue = document.createElement("td");
  tdMValue.innerHTML = `${mValue}`;
  tr.appendChild(tdBValue);
  tr.appendChild(tdMValue);
  table.appendChild(tr);
}

function rabinMiller(pValue, testCount) {
  const testResultsOutput = document.getElementById("testResultsOutput");
  testResultsOutput.innerHTML = "";

  const testResultsText = document.getElementById("testResultsText");
  testResultsText.innerHTML = "";

  let testPassedText = true;

  for (let i = 0; i < testCount; i++) {
    const testDiv = document.createElement("div");
    testDiv.className = "test-case";
    testDiv.innerHTML = `<h4>Тест ${i + 1}</h4>`;

    const stepsDiv = document.createElement("div");
    stepsDiv.className = "test-steps";

    let a = randomValueA(minA, maxA);
    addStep(stepsDiv, `a = ${a} `);

    let z = sumMod(a, m, pValue);
    addStep(
      stepsDiv,
      `Вычисляем z = a<sup>m</sup> mod p = ${a}<sup>${m}</sup> mod ${pValue} = ${z}`
    );

    let testPassed = false;

    if (z === 1 || z === pValue - 1) {
      addStep(stepsDiv, `✅ z = ${z} (равно 1 или p-1), тест пройден`);
      testPassed = true;
    } else {
      addStep(stepsDiv, `z = ${z} (не равно 1 или p-1), продолжаем проверку`);

      for (let j = 0; j < b; j++) {
        addStep(stepsDiv, `j = ${j}`);

        z = sumMod(z, z, pValue);
        addStep(
          stepsDiv,
          `z = z<sup>2</sup> mod p = ${z}² mod ${pValue} = ${z}`
        );

        if (z === pValue - 1) {
          addStep(
            stepsDiv,
            `✅ z = ${z} (равно p-1), тест пройден на шаге j = ${j}`
          );
          testPassed = true;
          break;
        }

        if (j > 0 && z === 1) {
          addStep(stepsDiv, `❌ j > 0 (j = ${j}) и z = 1, тест НЕ пройден`);
          testPassed = false;
          testPassedText = false;
          break;
        }

        if (j === b - 1 && z !== pValue - 1) {
          addStep(
            stepsDiv,
            `❌ j = b-1 (j = ${j}) и z ≠ p-1 (z = ${z}), тест НЕ пройден`
          );
          testPassed = false;
          testPassedText = false;
        }
      }
    }

    const resultDiv = document.createElement("div");
    resultDiv.className = testPassed ? "test-passed" : "test-failed";
    resultDiv.innerHTML = testPassed ? `Тест ${i + 1} ✅` : `Тест ${i + 1} ❌`;

    testDiv.appendChild(stepsDiv);
    testDiv.appendChild(resultDiv);
    testResultsOutput.appendChild(testDiv);
  }

  const finalResult = document.createElement("div");
  finalResult.className = "final-result";
  finalResult.classList.toggle("test-passed", testPassedText);
  finalResult.classList.toggle("test-failed", !testPassedText);
  finalResult.innerHTML = testPassedText
    ? `<h3>Все ${testCount} тестов завершены</h3>`
    : `<h3>Не все ${testCount} тестов завершены</h3>`;
  testResultsText.appendChild(finalResult);
}

function addStep(container, text) {
  const stepDiv = document.createElement("div");
  stepDiv.className = "step";
  stepDiv.innerHTML = text;
  container.appendChild(stepDiv);
}

function init() {
  p = randomNumberBit(21);
  pTemp = p;

  arrayPrime = isPrimeArray(maxPrime.value);
  validResult.innerHTML = "";
  testResultsOutput.innerHTML = "";
  testResultsText.innerHTML = "";

  while (!checkValidP(p, arrayPrime)) {
    p += 2;
  }

  aValueMin.max = p - 2;

  [b, m] = mValueAndValueB(p);

  setIntervalA(aValueMin.value, p);
}

validP.addEventListener("click", () => {
  p = pTemp;
  arrayPrime = isPrimeArray(maxPrime.value);
  validResult.innerHTML = "";

  while (!checkValidP(p, arrayPrime)) {
    p += 2;
  }

  aValueMin.max = p - 2;

  [b, m] = mValueAndValueB(p);

  setIntervalA(aValueMin.value, p);
});

runTests.addEventListener("click", () => {
  rabinMiller(p, testCount.value);
});

init();
