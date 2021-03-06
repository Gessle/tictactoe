import "./styles.css";

if (document.readyState !== "loading") {
  console.log("Document ready, excuting");
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    console.log("Document ready, executing after a wait");
    initializeCode();
  });
}

function initializeCode() {
  let player = "x";
  const boardsize = 5;
  var board = new Array(boardsize);
  for (let i = 0; i < board.length; i++) {
    board[i] = new Array(boardsize);
  }
  //console.log(board);

  const node = document.getElementById("board");

  for (let i = 0; i < boardsize; i++) {
    let row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 0; j < boardsize; j++) {
      let cell = document.createElement("div");
      cell.setAttribute("id", j + "-" + i);
      cell.setAttribute("class", "col s2 cell valign-wrapper");
      cell.onclick = function () {
        cellClicked(this.id);
      };
      board[j][i] = "";
      row.appendChild(cell);
    }
    node.appendChild(row);
  }

  var id;
  setTimer();
  function setTimer() {
    var elem = document.getElementById("progressBar");
    clearInterval(id);
    var width = 1;
    id = setInterval(turn, 100);
    function turn() {
      if (width >= 100) {
        if (player === "x") {
          player = "o";
        } else {
          player = "x";
        }
        setTimer();
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }

  function cellClicked(id) {
    //console.log(id);
    if (document.getElementById(id).innerHTML !== "") return;

    let sign = document.createElement("div");
    sign.classList.add("center-align");
    sign.style.width = "100%";
    sign.innerHTML = player;

    document.getElementById(id).appendChild(sign);

    document.getElementById(id).classList.add(player);

    checkForWin();
    setTimer();
    if (player === "x") {
      player = "o";
    } else {
      player = "x";
    }

    function checkForWin() {
      let ids = id.split("-");
      let x = parseInt(ids[0], 10);
      let y = parseInt(ids[1], 10);
      board[x][y] = player;
      let minX = x - 5 < 0 ? 0 : x - 5;
      let minY = y - 5 < 0 ? 0 : y - 5;
      let maxX = x + 5 > boardsize - 1 ? boardsize - 1 : x + 5;
      let maxY = y + 5 > boardsize - 1 ? boardsize - 1 : y + 5;

      //console.log(minX + " " + maxX + " " + minY + " " + maxY);

      for (var i = minX, c = 0, start = false; i <= maxX; i++) {
        //console.log(i + " " + y);
        if (board[i][y] === player) {
          c++;
          start = true;
        } else if (start === true) {
          break;
        }
      }
      if (c === 5) {
        win(player);
      }
      for (var i = minY, c = 0, start = false; i <= maxY; i++) {
        if (board[x][i] === player) {
          c++;
          start = true;
        } else if (start === true) {
          break;
        }
      }
      if (c === 5) {
        win(player);
      }

      let minChangeMin = x - minX < y - minY ? x - minX : y - minY;
      let maxChangeMax = maxX - x < maxY - y ? maxX - x : maxY - y;

      //console.log("***" + minChangeMin + " " + maxChangeMax);
      //console.log("***");
      for (
        var i = -minChangeMin, c = 0, start = false;
        i <= maxChangeMax;
        i++
      ) {
        //console.log(x + i + " " + (y + i));
        if (board[x + i][y + i] === player) {
          c++;
          start = true;
        } else if (start === true) {
          break;
        }
      }
      if (c === 5) {
        win(player);
      }

      minChangeMin = maxX - x < y - minY ? maxX - x : y - minY;
      maxChangeMax = x - minX < maxY - y ? x - minX : maxY - y;

      //console.log("***" + minChangeMin + " " + maxChangeMax);
      console.log("***");
      for (
        var i = -minChangeMin, c = 0, start = false;
        i <= maxChangeMax;
        i++
      ) {
        console.log(x - i + " " + (y + i));
        if (board[x - i][y + i] === player) {
          c++;
          start = true;
        } else if (start === true) {
          break;
        }
      }
      if (c === 5) {
        win(player);
      }
    }

    function win(player) {
      if (player === "x") alert("Player 1 won!");
      else alert("Player 2 won!");
    }
  }
}
