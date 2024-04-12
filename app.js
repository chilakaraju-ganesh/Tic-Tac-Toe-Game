let boxes = document.querySelectorAll(".box");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let newbtn = document.querySelector(".new-btn");
let resetbtn = document.querySelector(".reset-btn");

let turno = true; //playerO player X
let count = 0; // to track draw
//winning patterns
const winpatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];
//function to start a new game
newgame = () => {
  turno = true;
  count = 0;
  enablebtns();
  msgcontainer.classList.add("hide");
};

//event listener for each game box(button)
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("button is clicked");
    if (turno) {
      box.innerHTML = "O";
      turno = false;
    } else {
      box.innerHTML = "X";
      turno = true;
    }
    box.disabled = true;
    count++;
    let iswinner = checkwinner();

    if (count === 9 && !iswinner) {
      gamedraw();
    }
  });
});

const gamedraw = () => {
  msg.innerHTML = "Game was a Draw";
  msgcontainer.classList.remove("hide");
  disablebtns();
};
const disablebtns = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};
const enablebtns = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerHTML = "";
  });
};
const showwinner = (winner) => {
  msg.innerHTML = `Congratulations, Winner ${winner}`;
  msgcontainer.classList.remove("hide");
  disablebtns();
};
const checkwinner = () => {
  for (let pattern of winpatterns) {
    let pos1val = boxes[pattern[0]].innerHTML;
    let pos2val = boxes[pattern[1]].innerHTML;
    let pos3val = boxes[pattern[2]].innerHTML;
    if (pos1val != "" && pos2val != "" && pos3val != "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        console.log("winner", pos1val);
        showwinner(pos1val);
        return true;
      }
    }
  }
};

newbtn.addEventListener("click", newgame);
resetbtn.addEventListener("click", newgame);
