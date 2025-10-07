let gameinfo = document.querySelector(".game-info")
let boxes = document.querySelectorAll(".box")
let newgamebtn = document.querySelector(".btn")
let conffitee = document.querySelector(".conffitee")

let currentplayer = "X";
let gamegrid;
let winningpositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

function initialisedgame()
{
    currentplayer = "X";
    gamegrid = ["","","","","","","","",""];
    conffitee.classList.remove("conffitee-popup")
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //one more thing is missing, initialise box with css properties again
        box.classList = `box box${index+1}`;

    });
    newgamebtn.classList.remove("active");
    gameinfo.innerText = `Current Player - ${currentplayer}`;
}

initialisedgame();

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleclick(index);
    })
})

function Swapplayer()
{
    if(currentplayer === "X")
    {
        currentplayer = "O"
    }
    else
    {
        currentplayer = "X"
    }

    gameinfo.innerText = `Current Player - ${currentplayer}`
}

function checkwinner()
{
    let answer = "";

    winningpositions.forEach((positions)=>{

        if((gamegrid[positions[0]] !== ""  && gamegrid[positions[1]] !== "" && gamegrid[positions[2]] !== "") && (gamegrid[positions[0]] === gamegrid[positions[1]]) && (gamegrid[positions[1]] === gamegrid[positions[2]]) )
        {
            if(gamegrid[positions[0]] === "X")
            {
                answer = "X";
            }
            else{
                answer = "O";
            }

            boxes.forEach((box)=>{
                 box.style.pointerEvents = "none";
            })

            boxes[positions[0]].classList.add("add")
            boxes[positions[1]].classList.add("add")
            boxes[positions[2]].classList.add("add")

            conffitee.classList.add("conffitee-popup");
            // console.log("win")
            // setTimeout( conffitee.classList.add("conffitee-popup") , 500)
            
        }
        // conffitee.classList.add("active");
    })
 
    if(answer !== "")
        {   
            gameinfo.innerText = `Winner - ${answer}`;
            newgamebtn.classList.add("active");
            return;
        }

    let fillcount = 0;
    gamegrid.forEach((box)=>{
        if(box !== "")
        {
            fillcount++;
        }
    })

    if(fillcount === 9)
    {
        gameinfo.innerText = `Game Tied`;
        newgamebtn.classList.add("active");
    }

}

function handleclick(index)
{
    if(gamegrid[index] === "")
    {
        boxes[index].innerText = currentplayer
        gamegrid[index] = currentplayer;
        boxes[index].style.pointerEvents = "none";
        Swapplayer();
        checkwinner();
    }
}

newgamebtn.addEventListener("click", ()=>{
    initialisedgame();
});

