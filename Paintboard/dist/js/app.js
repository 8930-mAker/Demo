const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const increase = document.getElementById('increase');
const decrease = document.getElementById('decrease');
const sizeEl = document.getElementById('size');
const colorEl = document.getElementById('color');
const clear = document.getElementById('clear');


let size = 10;
let color = 'black';
let isPressed = false;
let x;
let y;


canvas.addEventListener('mousedown', function (e) {
   isPressed = true;
   x = e.offsetX;
   y = e.offsetY;
});
canvas.addEventListener('mouseup', function (e) {
   isPressed = false;
   x = undefined;
   y = undefined;
});
canvas.addEventListener('mousemove', function (e) {
   if (isPressed) {
      const x2 = e.offsetX;
      const y2 = e.offsetY;
      drawCircle(x2, y2);
      drawLine(x, y, x2, y2);

      x = x2;
      y = y2;
   }
});


function drawCircle(x, y) {
   ctx.beginPath();
   ctx.arc(x, y, size, 0, Math.PI * 2);
   ctx.fillStyle = color;
   ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
   ctx.beginPath();
   ctx.moveTo(x1, y1);
   ctx.lineTo(x2, y2);
   ctx.strokeStyle = color;
   ctx.lineWidth = size * 2;
   ctx.stroke();
}

colorEl.addEventListener('change', function (e) {
   color = e.target.value;
});


increase.addEventListener('click', function (e) {
   size += 1;
   if (size > 40) {
      size = 40;
   }

   const updateSizeOnScreen = () => {
      sizeEl.textContent = size;
   }

   updateSizeOnScreen();
});

decrease.addEventListener('click', function (e) {
   size -= 1;
   if (size < 2) {
      size = 2;
   }

   const updateSizeOnScreen = () => {
      sizeEl.textContent = size;
   }

   updateSizeOnScreen();
});


clear.addEventListener('click', function (e) {
   ctx.clearRect(0, 0, canvas.width, canvas.clientHeight);
});
