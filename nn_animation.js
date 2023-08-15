var coords = [];
var rewards = [0];
var boxList = [];

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas2');
  const ctx = canvas.getContext('2d');

  const width = canvas.width;
  const height = canvas.height;

  const nodeList = [2, 6, 6, 1];

  const ySpacing = height * 0.1;
  const nodeRadius = 20;
  const xSpacing = width * 0.2;

  // Define the positions of the nodes
  function Coordinates(nodes, layer) {
    var coordx = 0 
    const startY = height / 2 - (nodes / 2) * (ySpacing + nodeRadius) + nodeRadius / 2;
    const startX = width *.15;
    if (layer === 0) {
      coordx = startX;
    } else {
      coordx = startX + xSpacing * (layer);
    }
    if (nodes === 1) {
      let coordy = startY;
      coords.push({ x: coordx, y: coordy, layer: layer });
    } else {
      for (let i = 0; i < nodes; i++) {
        let coordy = startY + (ySpacing + nodeRadius) * i;
        coords.push({ x: coordx, y: coordy, layer: layer });
      }
    }
  }

  for (let i = 0; i < nodeList.length; i++) {
    Coordinates(nodeList[i], i);
  }


  // Draw the nodes
  function drawCircle(x, y, radius, color) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // Function to draw a line
  function drawLine(x1, y1, x2, y2, color) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.stroke();
  }

  // Draw the connections between nodes
  function drawNetwork() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < coords.length; i++) {
      const node = coords[i];
      drawCircle(node.x, node.y, nodeRadius, 'black');
      for (let j = i + 1; j < coords.length; j++) {
        if ((node.layer + 1) === coords[j].layer) {
          drawLine(node.x, node.y, coords[j].x, coords[j].y, 'black');
        }
      }
    }
  }

  // Function to highlight the lines connected to a node
  function highlightConnectedLines(x, y) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < coords.length; i++) {
      const node = coords[i];
      for (let j = i + 1; j < coords.length; j++) {
        if ((node.layer + 1) === coords[j].layer) {
          if (node.x === x && node.y === y) {
            drawLine(node.x, node.y, coords[j].x, coords[j].y, 'red');
          }
          if (node.x !== x) {
            drawLine(node.x, node.y, coords[j].x, coords[j].y, 'black');
          } else if (node.x === x) {
            drawLine(node.x, node.y, coords[j].x, coords[j].y, 'red');
          }
          }
        }
      }
    }

  // Function to get the color based on the node layer
  function getColor(layer) {
    if (layer === 0) {
      return 'blue';
    } else if (layer === 1 || layer === 2) {
      return 'yellow';
    } else if (layer === 3) {
      return 'green';
    }
  }

  function highlightLayer(layer) {
    for (let i = 0; i < coords.length; i++) {
      const node = coords[i];
      if (node.layer === layer) {
        highlightConnectedLines(node.x, node.y, node.layer);
        for (let j = 0; j < coords.length; j++) {
          const node = coords[j];
          if (node.layer <= layer + 1) {
            drawCircle(node.x, node.y, nodeRadius, getColor(node.layer));
          } else if (node.layer > layer + 1) {
            drawCircle(node.x, node.y, nodeRadius, 'black');
          }
        }
      } else if (node.layer > layer) {
          break;
      }
    }
  }

  function drawSquare(x, y, size, text, color) {
    ctx.beginPath();
    ctx.rect(x - size / 2, y - size / 2, size, size);
    ctx.fillStyle = color; // Change the color to your preference
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.font = '12px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x, y);
  }

  function updateWeights() {
    for (let i = 0; i < coords.length; i++) {
      if (coords[i].layer === 1 || coords[i].layer === 2) {
        drawCircle(coords[i].x, coords[i].y, nodeRadius, 'purple');
        console.log('Purple Circle')
      }
    }
    setTimeout(function() {
      for (let i = 0; i < coords.length; i++) {
        if (coords[i].layer === 1 || coords[i].layer === 2) {
          drawCircle(coords[i].x, coords[i].y, nodeRadius, getColor(coords[i].layer));
        }
      };
    }, 2000);
  }
  var isAnimating = false;
  // Event listener for mouse click
  canvas.addEventListener('click', (event) => {

    if (isAnimating) {
        return;
    }
    
    isAnimating = true;
    // Check if the mouse is over a node
    for (let i = 0; i < nodeList.length; i++) {
      setTimeout(function () {
        highlightLayer(i);
      }, i * 1000); // Introduce delay between layers
    }

    setTimeout(function () {
      const boxWidth = 100;
      const boxX = coords[coords.length - 1].x * 1.2;
      const boxY = coords[coords.length - 1].y + boxWidth * 1.25;
      drawLine(coords[coords.length - 1].x, coords[coords.length - 1].y, boxX, boxY)
      drawCircle(coords[coords.length - 1].x, coords[coords.length - 1].y, nodeRadius, 'green');
      drawSquare(boxX, boxY, boxWidth, 'Action', 'orange');
      boxList.push({x: boxX, y: boxY});
    }, nodeList.length * 1000);

    setTimeout(function () {
      const boxWidth = 100;
      const boxX = boxList[boxList.length - 1].x;
      const boxY = boxList[boxList.length - 1].y - boxWidth * 1.25;
      drawLine(boxList[boxList.length - 1].x, boxList[boxList.length - 1].y, boxX, boxY)
      drawSquare(boxX, boxY, boxWidth, 'Reward Function', 'red');
      drawSquare(boxX, boxList[boxList.length - 1].y, boxWidth, 'Action', 'orange');
      boxList.push({x: boxX, y: boxY})
    }, nodeList.length * 1000 + 1000);

    setTimeout(function () {
      const boxWidth = 100;
      const boxX = boxList[boxList.length - 1].x;
      const boxY = boxList[boxList.length - 1].y - boxWidth * 1.25;
      drawLine(boxList[boxList.length - 1].x, boxList[boxList.length - 1].y, boxX, boxY)
      drawSquare(boxX, boxY, boxWidth, 'Update Weights', 'purple');
      drawSquare(boxX, boxList[boxList.length - 1].y, boxWidth, 'Reward Function', 'red');
      boxList.push({x: boxX, y: boxY})
    }, nodeList.length * 1000 + 2000);

    setTimeout(updateWeights, nodeList.length * 1000 + 3000);
    boxList = [] // Introduce delay before updating weights

    setTimeout(function() {
      drawNetwork();
      isAnimating = false;
    }, nodeList.length * 1000 + 13000);
  });
  // Initial drawing
  drawNetwork();
});