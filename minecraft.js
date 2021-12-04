let isNight = false;
const pickaxe = document.querySelector(".pickaxe");
const shovel = document.querySelector(".shovel");
const axe = document.querySelector(".axe");
const keep = document.querySelector(".inventory");
let tools = [pickaxe, shovel, axe, keep];
const reset = document.querySelector(".reset-btn");
const items = []; //For inventory
let restore = null; //Interacting with the grid

//World elements object

const worldElements = [{class: 'sky'}, {class: 'cloud'},  {class: ''} ,  {class: ''},  {class: 'tree'} ,  {class: 'trunk'} ,  {class: 'bush'} ,  {class: 'rock'} ,  {class: 'grass'} ,  {class: 'ground'}  ]

//Work matrix
let initialMatrix = [];
const game = document.querySelector(".game-matrix-grid");


//Creating the world

function createElement(type, num) {
  let skyDiv = document.createElement("div");
  skyDiv.classList.add(type);
  skyDiv.addEventListener("click", gridClick);
  skyDiv.setAttribute("data-type", num);
  game.appendChild(skyDiv);
}

//Access the toolkit
let currentTool = null;
pickaxe.addEventListener("click", () => toolClick("pickaxe"));
shovel.addEventListener("click", () => toolClick("shovel"));
axe.addEventListener("click", () => toolClick("axe"));
keep.addEventListener("click", () => toolClick("inventory"));


//Assign yellow border to clicked tool
let myCurrentTool;
function toolClick(tool) {
    currentTool = tool;
    tools.forEach(tool => {
        tool.classList.remove("selected");
    });
    switch(tool) {
        case 'pickaxe':
            myCurrentTool = pickaxe;
            pickaxe.classList.add("selected");
            break;
        case 'shovel':
            myCurrentTool = shovel;
            shovel.classList.add("selected");
            break;
        case 'axe':
            myCurrentTool = axe;
            axe.classList.add("selected");
            break;
        case 'inventory':
            myCurrentTool = keep;
            keep.classList.add("selected");
            break;
    }
    
    }
  


//Restoring items from the inventory

function gridClick(e) {
  const sqaureGrid = e.target.getAttribute("data-type");
  if (restore != null) {
    let restoreGrid = restore.getAttribute("data-type");
    switch (restoreGrid) {
      case "7":
        e.target.setAttribute("class", "rock");
        e.target.setAttribute("data-type", 7);
        break;
      case "9":
        e.target.setAttribute("class", "ground");
        e.target.setAttribute("data-type", 9);
        break;
      case "8":
        e.target.setAttribute("class", "grass");
        e.target.setAttribute("data-type", 8);
        break;
      case "4":
        e.target.setAttribute("class", "tree");
        e.target.setAttribute("data-type", 4);
        break;
      case "5":
        e.target.setAttribute("class", "trunk");
        e.target.setAttribute("data-type", 5);
        break;
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
      break;
    case "shovel":
      if (+sqaureGrid === 9) {
        keep.setAttribute("class", "inventory ground");
        e.target.setAttribute("class", "sky");
        items.push(e.target);
      }
      else if(+sqaureGrid === 8){
        keep.setAttribute("class", "inventory grass");
        e.target.setAttribute("class", "sky");
        items.push(e.target);
      }
      break;
      case "axe":
        if (+sqaureGrid === 4) {
          keep.setAttribute("class", "inventory tree");
          e.target.setAttribute("class", "sky");
          items.push(e.target);
        }
        else if(+sqaureGrid === 5){
            keep.setAttribute("class", "inventory trunk");
            e.target.setAttribute("class", "sky");
            items.push(e.target);
          }
  }
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
        break;
      case "9":
        keep.setAttribute("class", "inventory ground");
        break;
      case "8":
        keep.setAttribute("class", "inventory grass");
        break;
      case "4":
        keep.setAttribute("class", "inventory tree");
        break;
      case "5":
        keep.setAttribute("class", "inventory trunk");
        break;
    }
  } else {
    keep.setAttribute("class", "inventory");
  }
}


function getClassName (className) {
    if(isNight === true) {
        return "night-" + className
    }
    return className
}
//nightmode
// function nightMode() {
//     if (isNight === false) {
//         isNight = true 
//         for( let i = 0; i< game.children.length; i++) {
//             const className = game.children[i].getAttribute("class")
//             game.children[i].setAttribute("class", "night-" + className)
//         }
//     }
// }


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
        [4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 0, 0, 0],
        [4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 0, 0, 0],
        [4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 0, 0, 0],
        [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0],
        [5, 0, 0, 0, 6, 0, 0, 0, 7, 7, 7, 7, 7, 0, 0, 5, 0, 0, 0, 0],
        [5, 0, 0, 6, 6, 6, 0, 0, 7, 0, 7, 0, 7, 0, 0, 5, 0, 0, 0, 0],
        [5, 0, 6, 6, 6, 6, 6, 0, 7, 0, 7, 0, 7, 0, 0, 5, 0, 0, 0, 7],
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

