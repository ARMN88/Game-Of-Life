eruda.init();

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const scale = 5;

let grid = [];
const newGrid = [];

function Start() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  for(let x = 0;x < canvas.width;x+=scale) {
    grid.push([]);
    newGrid.push([]);
    for(let y = 0;y < canvas.height;y+=scale) {
      var rand = Math.floor(Math.random() * 100);
      if(rand < 10) {
        grid[grid.length-1].push(1);
      }else {
        grid[grid.length-1].push(0);
      }
    newGrid[newGrid.length-1].push(0);
    }
  }
  //setInterval(Update, 100);
  Update();
}

function Update() {
  requestAnimationFrame(Update);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for(let x = 0;x < grid.length;x++) {
    for(let y = 0;y < grid[x].length;y++) {
      newGrid[x][y] = 0;
      if(grid[x][y] === 1) {
        if(getCount(x, y) == 2 || getCount(x, y) == 3) {
          newGrid[x][y] = 1;
        }
      }
      if(grid[x][y] === 0 && getCount(x, y) === 3) {
        newGrid[x][y] = 1;
      }
      ctx.fillStyle = (grid[x][y]) ? "gold" : "black";
      ctx.fillRect(x*scale, y*scale, scale, scale);
    }
  }
  for(let x = 0;x < grid.length;x++) {
    for(let y = 0;y < grid[x].length;y++) {
      grid[x][y] = newGrid[x][y];
    }
  }
}

function DrawGrid() {
  for(let x = 0;x < canvas.width;x+=scale) {
    for(let y = 0;y < canvas.height;y+=scale) {
      ctx.strokeStyle = "#121212";
      ctx.strokeRect(x, y, scale, scale);
    }
  }
}

function getCount(x, y) {
  var count = 0;
  // [-1][-1] [-1][0] [-1][1]
  // [0][-1] [0][0] [0][1]
  // [0][-1] [1][0] [1][1]
  if(grid[x-1]) {
    // [-1][-1]
    if(grid[x-1][y-1]) {
      count++;
    }
    // [-1][0]
    if(grid[x-1][y]) {
      count++
    }
    // [-1][1]
    if(grid[x-1][y+1]) {
      count++
    }
  }
  if(grid[x+1]) {
    // [1][-1]
    if(grid[x+1][y-1]) {
      count++;
    }
    // [1][0]
    if(grid[x+1][y]) {
      count++;
    }
    // [1][1]
    if(grid[x+1][y+1]) {
      count++;
    }
  }
  // [0][-1]
    if(grid[x][y-1]) {
      count++;
    }
    // [0][1]
    if(grid[x][y+1]) {
      count++;
    }
  return count;
}

window.onload = () => {
  Start();
}
