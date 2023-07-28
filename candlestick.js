const candlestickCanvas = document.getElementById('chart');
const ctx = candlestickCanvas.getContext('2d');

const chartWidth = candlestickCanvas.width = window.innerWidth;
const chartHeight = candlestickCanvas.height = window.innerHeight;

const candlestickWidth = 60;
const candlestickSpacing = 30;
const candlestickCount = Math.floor(chartWidth / (candlestickWidth + candlestickSpacing));

let candlesticks = [];

// Generate random candlestick data
function generateCandlestickData(previousClose) {
  const open = previousClose;
  const close = open;
  const high = open;
  const low = open;
  const color = open < close ? '#00FF00' : '#FF0000';

  return { open, close, high, low, color };
}

// Generate random number from a normal distribution
function generateNormalDistribution(mean, stdDev) {
  let u = 0, v = 0;
  while (u === 0) u = Math.random(); // Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return mean + stdDev * z;
}

function drawCandlestick(x, { open, close, high, low, color }) {
  const candlestickCenterX = x + (candlestickWidth / 2);

  // Draw candlestick wick
  ctx.beginPath();
  ctx.moveTo(candlestickCenterX, high);
  ctx.lineTo(candlestickCenterX, low);
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.stroke();

  // Draw candlestick body
  const bodyHeight = Math.abs(open - close);
  const bodyY = Math.min(open, close);

  ctx.fillStyle = color;
  ctx.fillRect(x, bodyY, candlestickWidth, bodyHeight);
}

function drawChart() {
  ctx.clearRect(0, 0, chartWidth, chartHeight);

  const candlestickStartX = candlestickWidth + candlestickSpacing;

  for (let i = 0; i < candlesticks.length; i++) {
    const candlestickX = candlestickStartX + i * (candlestickWidth + candlestickSpacing);
    drawCandlestick(candlestickX, candlesticks[i]);
  }
}

function updateChart() {
  const currentCandle = candlesticks[candlesticks.length - 1];
  let updatedClose = currentCandle.close * generateNormalDistribution(1, .05);

  if (updatedClose >= chartHeight * .8) {
    updatedClose = currentCandle.close * .95;
  } else if (updatedClose <= chartHeight * .2) {
    updatedClose = currentCandle.close * 1.05;
  }

  currentCandle.close = updatedClose;

  if (updatedClose <= currentCandle.open) {
    currentCandle.color = '#00FF00';
  } else {
    currentCandle.color = '#FF0000';
  }

  if (updatedClose > currentCandle.high) {
    currentCandle.high = updatedClose;
  } else if (updatedClose < currentCandle.low) {
    currentCandle.low = updatedClose;
  }

  if (candlesticks.length >= candlestickCount) {
    candlesticks.shift();
  }
  drawChart();
}

function animate() {
  if (candlesticks.length === 0) {
    const previousClose = generateNormalDistribution(chartHeight / 2, 100);
    const candlestickData = generateCandlestickData(previousClose);
    candlesticks.push(candlestickData);
  }

  let updateCount = 0;
  const interval = setInterval(() => {
    updateChart();
    updateCount++;

    if (updateCount >= 30) {
      clearInterval(interval);
      createNewCandle();
    }
  }, 100);
}

function createNewCandle() {
  const previousCandle = candlesticks[candlesticks.length - 1];
  const newOpen = previousCandle.close;
  const newCandlestick = {
    open: newOpen,
    close: newOpen,
    high: newOpen,
    low: newOpen,
    color: '#FF0000'
  };
  candlesticks.push(newCandlestick);

  drawChart();
  animate();
}

drawChart();
animate();
