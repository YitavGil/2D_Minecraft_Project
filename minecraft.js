let isNight = false;
const pickaxe = document.querySelector(".pickaxe");
const shovel = document.querySelector(".shovel");
const axe = document.querySelector(".axe");
const keep = document.querySelector(".inventory");
const reset = document.querySelector(".reset-btn");
const items = [];
let restore = null;
//World elements object

const worldElements = [{class: 'sky'}, {class: 'cloud'},  {class: ''} ,  {class: ''},  {class: 'tree'} ,  {class: 'trunk'} ,  {class: 'bush'} ,  {class: 'rock'} ,  {class: 'grass'} ,  {class: 'ground'}  ]

//Work matrix
let initialMatrix = [];
const game = document.querySelector(".game-matrix-grid");

let currentTool = null;

//nightmode
function getClassName (className) {
    if(isNight === true) {
        return "night-" + className
    }
    return className
}

function nightMode() {
    if (isNight === false) {
        isNight = true 
        for( let i = 0; i< game.children.length; i++) {
            const className = game.children[i].getAttribute("class")
            game.children[i].setAttribute("class", "night-" + className)
        }
    }
}

//Creating the world

function createElement(type, num) {
  let skyDiv = document.createElement("div");
  skyDiv.classList.add(type);
  skyDiv.addEventListener("click", gridClick);
  skyDiv.setAttribute("data-type", num);
  game.appendChild(skyDiv);
}

//Access the toolkit

pickaxe.addEventListener("click", () => toolClick("pickaxe"));
shovel.addEventListener("click", () => toolClick("shovel"));
axe.addEventListener("click", () => toolClick("axe"));
keep.addEventListener("click", () => toolClick("inventory"));

//Restoring items from the inventory
function gridClick(e) {
  const sqaureGrid = e.target.getAttribute("data-type");
  if (restore != null) {
    let restoreGrid = restore.getAttribute("data-type");
    switch (restoreGrid) {
      case "7":
        e.target.setAttribute("class", "rock");
    }

    restore = null;
  }
  if (currentTool === null) {
    return;
  }

  console.log(sqaureGrid);
//Assign tool to world element
  switch (currentTool) {
    case "pickaxe":
      if (+sqaureGrid === 7) {
        keep.setAttribute("class", "inventory rock");
        e.target.setAttribute("class", "sky");
        items.push(e.target);
      }
  }
}

function toolClick(tool) {
  currentTool = tool;
}
keep.addEventListener("click", addItem);

//Items in the inventory
function addItem() {
  if (items.length === 0) {
    return;
  }
  restore = items.pop();
  if (items.length > 0) {
    let isLeft = items[items.length - 1].getAttribute("data-type");
    switch (isLeft) {
      case "7":
        keep.setAttribute("class", "inventory rock");
    }
  } else {
    keep.setAttribute("class", "inventory");
  }
}
//Gameboard reset

reset.addEventListener("click", resetBoard)
function resetBoard() {
    const defultBoard = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0],
        [0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 5, 0, 0, 0, 0],
        [0, 0, 0, 6, 6, 6, 0, 0, 0, 0, 7, 0, 0, 0, 0, 5, 0, 0, 0, 0],
        [0, 0, 6, 6, 6, 6, 6, 0, 0, 0, 7, 0, 0, 0, 0, 5, 0, 0, 0, 7],
        [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
        [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
        [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
        [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
        [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
        [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
      ];
      initialMatrix = [];
      
      for (let row = 0; row < defultBoard.length; row++) {
          initialMatrix.push([])
        for (let col = 0; col < defultBoard.length; col++) {
            initialMatrix[row][col] = defultBoard[row][col]
        }
    }
    while(game.children.length > 0) {
        game.removeChild(game.lastChild)
    }

    for (let row = 0; row < initialMatrix.length; row++) {
        for (let col = 0; col < initialMatrix.length; col++) {
            const cell = initialMatrix[row][col]
            const c = getClassName(worldElements[cell].class)
            createElement(c, cell)
       
        }
      }
      currentTool = null;
      restore = null;
      while(items.length > 0) {
          items.pop()
      }
      keep.setAttribute("class", "inventory");
}

resetBoard()