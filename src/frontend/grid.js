let gridWidth = 501;
let gridHeight = 501;
let gridX;
let gridY;
let cellWidth;
let cellHeight;
let imgHeight;
let imgWidth;

let rovers = [];
let solution = [];

let error = false;

const rotations = {
  N: '-90',
  E: '180',
  S: '90',
  W: '0'
};

var grid = d3
  .select('#grid')
  .append('svg')
  .attr('width', gridWidth)
  .attr('height', gridHeight);

let tooltip = d3
  .select('#grid')
  .append('div')
  .attr('class', 'tooltip')
  .style('opacity', 0);

function gridData() {
  var data = [];
  var xpos = 1;
  var ypos = 1;
  var click = 0;

  // iterate for rows
  for (var row = 0; row < gridY; row++) {
    data.push([]);

    // iterate for cells/columns inside rows
    for (var column = 0; column < gridX; column++) {
      data[row].push({
        x: xpos,
        y: ypos,
        width: cellWidth,
        height: cellHeight,
        click: click
      });
      xpos += cellWidth;
    }
    xpos = 1;
    ypos += cellHeight;
  }
  return data;
}

function drawGrid() {
  let data = gridData();
  var row = grid
    .selectAll('.row')
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'row');

  row
    .selectAll('.square')
    .data(function (d) {
      return d;
    })
    .enter()
    .append('rect')
    .attr('class', 'square')
    .attr('x', function (d) {
      return d.x;
    })
    .attr('y', function (d) {
      return d.y;
    })
    .attr('width', function (d) {
      return d.width;
    })
    .attr('height', function (d) {
      return d.height;
    })
    .style('fill', '#f1e8e8')
    .style('stroke', '#222');
}

function drawInitialPositions() {
  drawRovers(rovers, 'init');
}

function drawFinalPositions() {
  drawRovers(solution.roverSolutions, 'final');
}

function getCellCenterX(x) {
  return cellWidth / 2 + x * cellWidth;
}

function getCellCenterY(y) {
  assymetricCompensation = gridX > gridY ? cellHeight * (gridX - gridY) : 0;
  return (
    gridHeight - 10 - assymetricCompensation - cellWidth / 2 - y * cellHeight
  );
}

function drawRovers(positions, type) {
  grid
    .selectAll('roverInitial')
    .data(positions)
    .enter()
    .append('svg:image')
    .attr('xlink:href', `rover-${type}.png`)
    .attr('width', imgWidth)
    .attr('height', imgHeight)
    .attr('x', (d) => getCellCenterX(d.position.x) - imgWidth / 2)
    .attr('y', (d) => getCellCenterY(d.position.y) - imgHeight / 2)
    .attr('transform', function (d) {
      var x1 = getCellCenterX(d.position.x);
      var y1 = getCellCenterY(d.position.y);
      rotateString = `rotate(${rotations[d.orientation]}, ${x1}, ${y1})`;
      //   scaleString = `scale${d.orientation === 'E' ? '(1,-1)' : '(1,1)'}`;
      //   translateString = `translate${
      //     d.orientation === 'E'
      //       ? `(0, ${-gridHeight + cellHeight * d.position.y})`
      //       : '(0,0)'
      //   }`;
      return rotateString;
    })
    .on('mouseover', function (d, i) {
      showTooltip(d, i);
    })
    .on('mousemove', function (d, i) {
      showTooltip(d, i);
    })
    .on('mouseleave', function (d, i) {
      hideTooltip();
    });
}

function showTooltip(d, i) {
  tooltip.transition().duration(200).style('opacity', 0.9);
  tooltip
    .html(
      `Rover ${i} ${d.orientation} ${
        d.commands ? `commands ${d.commands}` : ''
      }`
    )
    .style('left', d3.event.pageX + 'px')
    .style('top', d3.event.pageY - 28 + 'px')
    .attr('display', 'block');
}

function hideTooltip() {
  tooltip.transition().duration(500).style('opacity', 0);
}

function solve() {
  const parsedRovers = rovers.map((r) => {
    return {
      fullPosition: {
        position: {
          x: r.position.x,
          y: r.position.y
        },
        orientation: r.orientation
      },
      commands: r.commands
    };
  });
  problem = {
    plateauRange: {
      x: gridX,
      y: gridY
    },
    rovers: parsedRovers
  };
  const baseUrl = 'http://localhost:8080/rovers';
  axios({
    method: 'POST',
    url: baseUrl,
    data: problem
  })
    .then(() => axios.get(baseUrl))
    .then((res) => {
      solution = res.data;
      drawFinalPositions();
    })
    .catch((err) => {
      console.log(err);
      d3.select('#error')
        .style('opacity', 100)
        .text('Mission failed: one or more rovers went out of the grid.');
    });
}

function setPlateauRange() {
  const plateauValues = document
    .getElementById('plateauRange')
    .value.split(' ');
  gridX = +plateauValues[0];
  gridY = +plateauValues[1];
  cellWidth = (gridWidth - 10) / Math.max(gridX, gridY);
  cellHeight = (gridHeight - 10) / Math.max(gridX, gridY);
  imgHeight = cellHeight / 2;
  imgWidth = cellWidth / 2;
  drawGrid();
}

function addRover() {
  const initialPosition = document
    .getElementById('initialPosition')
    .value.split(' ');
  document.getElementById('initialPosition').value = '';
  const commands = document.getElementById('commands').value;
  document.getElementById('commands').value = '';
  x = +initialPosition[0];
  y = +initialPosition[1];
  cp = initialPosition[2];
  actualX = cellWidth / 2 + x * cellWidth;
  actualY = gridHeight - 10 - cellWidth / 2 - y * cellHeight;
  rovers.push({
    position: { x, y, actualX, actualY },
    orientation: cp,
    commands
  });
  drawInitialPositions();
}
