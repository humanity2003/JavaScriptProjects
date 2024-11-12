let boxes = document.querySelectorAll(".box");
let resetBtn = document.getElementById("reset-game");
let msgContainer = document.querySelector(".msg-container");
let newGameBtn = document.getElementById("new-game");
let msg = document.getElementById("msg");

let turn0 = false;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8]
];

const checkWinner = () => {
    for(let box of winPatterns){
            if (boxes[box[0]].innerText!= '' && boxes[box[1]].innerText!= '' && boxes[box[2]].innerText!= ''){
                if (boxes[box[0]].innerText === boxes[box[1]].innerText && boxes[box[1]].innerText === boxes[box[2]].innerText){
                    msgContainer.classList.remove("hide");
                    msg.innerText = boxes[box[0]].innerText + " wins!";
                    msgContainer.classList.add("show"); // Adds class to show the overlay
                    msg.focus(); // Focus on the message for accessibility
                    disableBoxes();
                    box.forEach(i => boxes[i].classList.add("winning-box"));
                    return; // Stop further checks once a winner is found
                }
            }
        }
    };

const resetGame = () => {
    enableBoxes();
    // msgContainer.classList.add("hide");
    msgContainer.classList.remove("show"); // Hides the overlay
    turn0 = false; // Reset the turn to ensure consistent start player

    // Remove the "winning-box" class and reset the background color
    boxes.forEach((box) => {
        box.classList.remove("winning-box"); // Removes the winning box style
        box.style.backgroundColor = ''; // Resets the background color
    });
}

const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    }); 
}

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.innerHTML = '';
        box.disabled = false;
    }); 
}

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (box.disabled) return; // Ignore clicks on disabled boxes 
        console.log("box was clicked!");
        if (turn0){
            box.innerHTML = "o";
            turn0 = false;
        }else{
            box.innerHTML = "x";
            turn0 = true;
        }
        box.disabled = true;
        
        checkWinner();
    })});

resetBtn.addEventListener('click', resetGame);
newGameBtn.addEventListener("click", resetGame);

   