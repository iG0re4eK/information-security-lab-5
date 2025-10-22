const bitNumberGenerate = document.getElementById("bitNumberGenerate");
const bitNumber = document.getElementById("bitNumber");
const bitNumberResult = document.getElementById("bitNumberResult");
const numberResult = document.getElementById("numberResult");
const maxPrime = document.getElementById("maxPrime");
const validResult = document.getElementById("validResult");
const testCount = document.getElementById("testCount");

let arrayPrime = [];
let p = null;

bitNumberGenerate.addEventListener("click", () => {
  console.log(maxPrime.value);
  p = randomNumberBit(21);

  arrayPrime = isPrimeArray(maxPrime.value);
  validResult.innerHTML = "";

  while (!checkValidP(p, arrayPrime)) {
    p += 2;
    console.log(p);
  }
});

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

  validResult.innerHTML += `<div class="valid-result-item">${pValue}  ✅</div>`;
  return true;
}

function rabinMiller() {
  for (let i = 0; i < testCount.value; i++) {
    let a = randomNumberBit(10000, p);
    let z = sumMod(a, m, p);
  }
}
