const reusltEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const upEl = document.getElementById('uppercase');
const lowEl = document.getElementById('lowercase');
const numberEl = document.getElementById('number');
const symEl = document.getElementById('symbol');
const clipboardEl = document.getElementById('clipboard');
const generateBtn = document.getElementById('generate');

const randomFunc = {
   lower: getRandomlower,
   upper: getRandomUper,
   number: getRandomNumber,
   symbol: getRandomSymbols
}


generateBtn.addEventListener('click', function (e) {
   const length = +lengthEl.value;
   const hasLower = lowEl.checked;
   const hasUp = upEl.checked;
   const hasNumb = numberEl.checked;
   const hasSym = symEl.checked;

   reusltEl.textContent = generatePass(hasUp, hasLower, hasNumb, hasSym, length);
});


clipboardEl.addEventListener('click', function (e) {
   const textarea = document.createElement('textarea');
   const password = reusltEl.textContent;
   if (!password) {
      return
   }

   textarea.value = password;
   document.body.appendChild(textarea);
   textarea.select();
   document.execCommand('copy');
   textarea.remove();
   
});


function getRandomlower() {
   return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUper() {
   return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber() {
   return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbols() {
   const symbols = '!@#$%^&*(){}[]+-_=<>,./?\\'
   return symbols[Math.floor(Math.random() * symbols.length)]
}


function generatePass(upper, lower, number, symbol, length) {
   let password = '';
   const typesCount = lower + upper + number + symbol;
   const typesArr = [{
      lower
   }, {
      upper
   }, {
      number
   }, {
      symbol
   }].filter((item) => Object.values(item)[0])

   if (typesCount === 0) {
      return '';
   }

   // for (let i = 0, len = length; i < len; i += typesCount) {
   //    typesArr.forEach(function (item) {
   //       const funcName = Object.keys(item)[0];
   //       password += randomFunc[funcName]();
   //    });
   // }
   for (let i = 0, len = length; i < len; i++) {
      password += randomFunc[Object.keys(typesArr[Math.floor(Math.random() * typesArr.length)])]();
   }

   return password;
}
