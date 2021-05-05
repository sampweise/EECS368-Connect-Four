let canvas;
let context;

//Model used to represent the board and keep track of the turn and the winner
let model = {
  turn: 0,
  board: [['.','.','.','.','.','.','.'],
          ['.','.','.','.','.','.','.'],
          ['.','.','.','.','.','.','.'],
          ['.','.','.','.','.','.','.'],
          ['.','.','.','.','.','.','.'],
          ['.','.','.','.','.','.','.']],

  winner: 0
}

//function used to make the refresh rate fast
function tick() {
    window.requestAnimationFrame(splat)
}


//Checking the winner of the game after each piece is placed
function checkWinner(color)
{
  let count=0
  let c;

  //Assigns the color to check for
  if(color=='R')
  {
    c='R'
  }
  else
  {
    c='Y'
  }

  //Check horizontally
  for(let i=0; i<6; i++)
  {
    count=0
    for(let j=0; j<7; j++)
    {
      if(model.board[i][j]==c)
      {
        count++
      }
      else
      {
        count=0
      }
      if(count==4)
      {
        return true
      }
    }
  }
  count=0

  //Check Vertically
  for(let i=0; i<7; i++)
  {
    count=0
    for(let j=0; j<6; j++)
    {
      if(model.board[j][i]==c)
      {
        count++
      }
      else
      {
        count=0
      }
      if(count==4)
      {
        return true
      }
    }
  }
  count=0

  //Check Horizontally from left to right
  i_index=[2,1,0,0,0,0]
  j_index=[0,0,0,1,2,3]
  for(let k=0; k<6; k++)
  {
    count=0
    for(let i = i_index[k],j = j_index[k]; i<6, j<7; i++, j++)
    {
      if(i>5 || j>6)
      {
        break
      }
      if(model.board[i][j]==c)
      {
        count++
      }
      else
      {
        count=0
      }
      if(count==4)
      {
        return true
      }

    }
  }

  //Check Horizontally from right to left
  i2_index=[0,0,0,0,1,2]
  j2_index=[3,4,5,6,6,6]
  for(let k=0; k<6; k++)
  {
    count=0
    for(let i = i2_index[k],j = j2_index[k]; i<6, j>=0; i++, j--)
    {
      if(i>5 || j<0)
      {
        break
      }
      if(model.board[i][j]==c)
      {
        count++
      }
      else
      {
        count=0
      }
      if(count==4)
      {
        return true
      }
    }
  }
  return false
}

//Checks the stack of the incoming piece so that it can properly place as close to the bottom of the board as possible
function checkStack(j) {
  for (let i=5; i>=0; i--)
  {
    if(model.board[i][j]=='.')
    {
      return i
    }
  }
  return 10
}


const splat = (n) => {
    //Clears the screen
    context.clearRect(0,0,canvas.width, canvas.height);

    //splats the Title for Connnect Four
    context.font = "40pt Calibri";
    context.fillStyle = "Black";
    context.fillText("Connect Four",100, 50)

    //Checks to see if there is a winner and gives directions to play again
    //If there is not a winner it splats whose turn it is
    if(model.winner!=0)
    {
      context.font = "20pt Calibri";
      context.fillStyle = "Black";
      context.fillText("Hit Refresh to Play Again!",100, 150)
    }
    else
    {
      //Check to see whose turn it is
      if(model.turn == 0)
      {
        //Prints a black rectangle in order to see the turn label better
        context.fillStyle = "Black"
        context.fillRect(90, 70, 125, 50)

        //splats the turn that game is on
        context.font = "20pt Calibri";
        context.fillStyle = "Red";
        context.fillText("Red's turn",100, 100)
      }
      else
      {
        //Prints a black rectangle in order to see the turn label better
        context.fillStyle = "Black"
        context.fillRect(90, 70, 175, 50)

        //splats the turn that the game is on
        context.font = "20pt Calibri";
        context.fillStyle = "Yellow";
        context.fillText("Yellow's turn",100, 100)
      }
    }


    //splats the blue background of the board
    context.fillStyle = "Blue"
    context.fillRect(100, 200, 432, 370)


    //splats the white circles on the blue board indicate the open spots
    for (let i=0; i<7; i++)
    {
      for(let j=0; j<6; j++)
      {
        context.fillStyle = "White"
        context.beginPath()
        context.moveTo(133+(i*61), 233+(j*61))
        context.arc(133+(i*61), 233+(j*61), 28, 0, 360)
        context.fill()
        context.closePath()
      }
    }

    //Goes through the board and fills the spots where the pieces are red or yellow
    for(let i=0; i<6; i++)
    {
        for(let j=0; j<7; j++)
        {
          let me = model.board[i][j]
          if(me!='.')
          {
            context.fillStyle = "Black"
            context.beginPath()
            context.moveTo(133+(j*61), 233+(i*61))
            context.arc(133+(j*61), 233+(i*61), 28, 0, 360)
            context.fill()
            context.closePath()
            if(me=='R')
            {
              context.fillStyle = "Red"
              context.fillText(me,128+j*61,238+i*61);
            }
            else
            {
              context.fillStyle = "Yellow"
              context.fillText(me,128+j*61,238+i*61);
            }
          }
        }
    }

    //Checks to see if there is a winner and splats the winner
    if(model.winner==1)
    {
      context.fillStyle = "Black"
      context.fillRect(90, 60, 240, 60)
      context.font = "40pt Calibri";
      context.fillStyle = "Red";
      context.fillText("Red Wins!",100, 110)
    }
    else if(model.winner==2)
    {
      context.fillStyle = "Black"
      context.fillRect(90, 60, 310, 60)
      context.font = "40pt Calibri";
      context.fillStyle = "Yellow";
      context.fillText("Yellow Wins!",100, 110)
    }
    else
    {
      //Calls tick in order for the refresh rate to be fast
      tick()
    }


}

//Functions used to turns the page coordinates into list indices
function roundMe(x,y) {return [(Math.ceil((x-110)/61)-1), (Math.ceil((y-210)/61)-1)]}

//Callback that occurs when someone clicks on the screen
document.addEventListener("click", e=>
{
  console.log(e.pageX,e.pageY)
  //Uses round me to turn page x and y into the i and j used for the board 2D list
  let [j,i]=roundMe(e.pageX,e.pageY)
  console.log(i,j)

  //Checks where to put the piece since connect four starts from the bottom up
  //If the stack on piece in a particular column are full the function will return 10
  if(checkStack(j)!=10)
  {
    //Makes sure that the piece gets place on the correct row
    i=checkStack(j)

    //Changes the board based on whose turn it is and at the correct index
    if(model.turn==0)
    {
      model.board[i][j]='R'
      model.turn = 1
    }
    else
    {
      model.board[i][j]='Y'
      model.turn = 0
    }

    //Checks to see if there is winner based on the piece that was just placed on the board
    if(model.turn==1)
    {
      if(checkWinner('R'))
      {
        model.winner=1
      }
    }
    else
    {
      if(checkWinner('Y'))
      {
        model.winner=2
      }
    }
  }
})

//Callback used once the DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
    //makes the canvas equal to the DOM canvas
    canvas = document.querySelector('#myCanvas');
    //makes context equal to the 2D context of the webpage
    context = canvas.getContext("2d");
    //Prints the propertys that this context holds
    console.log(context);
    //Calls splat to splat to the screen the connect 4
    splat();
})
