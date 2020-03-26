import React from 'react';
import './App.css';
import { runInThisContext } from 'vm';

type ONGOING_GAME = -1
const ONGOING_GAME = -1

enum Player{
  None = 0,
  One = 1,
  Two = 2
}
interface IState{
  board:Player[],
  nexPlearTurn:Player,
  gameIsWon:Player | ONGOING_GAME
}
class App extends React.Component<{},IState> {    // the {} is props, next IState is the state
  public state = {
    board:[Player.None,Player.None,Player.None,Player.None,Player.None,Player.None,Player.None,Player.None,Player.None],// [0,0,0,0,0,0,0,0,0,] // 9 cell
    nexPlearTurn: Player.One,
    gameIsWon:ONGOING_GAME
  }
  // every time when is move we want a call func that check if game is over
  public checkIfGameisOver = (board: Player[]) => {
    if (board[0] === board[1] && board[1] === board[2] && board[2] !== Player.None) {
      return board[0]
    } else if (board[3] === board[4] && board[4] === board[5] && board[5] !== Player.None) {
      return board[3]
    } else if (board[6] === board[7] && board[7] === board[8] && board[8] !== Player.None) {
      return board[6]
    } else if (board[0] === board[3] && board[3] === board[6] && board[6]!== Player.None) {
      return board[0]
    } else if (board[1] === board[4] && board[4] === board[7] && board[7]!== Player.None) {
      return board[1]
    } else if (board[2] === board[5] && board[5] === board[8] && board[8] !== Player.None) {
      return board[2]
    }else if (board[0] === board[4] && board[4] === board[8] && board[8] !== Player.None) {
      return board[0]
    }else if (board[2] === board[4] && board[4] === board[6] && board[6] !== Player.None) {
      return board[2]
    }

    return -1
  }
  public createClickhandeler = (index:number) => () =>{
    const {board, nexPlearTurn} = this.state;
    // when click we want to disable click again 
    //if is not an empty cell
    if(board[index] !== Player.None){
      return
    }
   
    const newBoard = board.slice()
    newBoard[index] = nexPlearTurn
    const gameIsWon = this.checkIfGameisOver(newBoard)
    this.setState({board:newBoard, nexPlearTurn:3 - nexPlearTurn, gameIsWon })
  }
  // draw the cell
  public renderCell = (index: number) => { // cell is a number
    const { board } = this.state
    return <div
      data-player={board[index]}
      className='cell'
      onClick={this.createClickhandeler(index)}
    ></div>
  }

  // we want to atach the winner - who is who
public renderStatus = () => {
  const {gameIsWon} = this.state;
  const winningText = gameIsWon !== Player.None ? `Player ${gameIsWon} won` : 'The game is draw'
  return <div>
    {`player 1 Green - green`} <br/>
    {`player 2 Red - red`} <br/>
   <strong>{gameIsWon === ONGOING_GAME ? `game is ongoing` : winningText }</strong> 
  </div>
}
  // draw the board
  public renderBoard = ()=>{ 
    const {board} = this.state

    //board  will return a cell with value and key
    return <div className='board-container'>{board.map((value,key) =>this.renderCell(key))}</div>
  }
  public render(){
    return (
      <div className="App">
        {this.renderBoard()}
        {this.renderStatus()}
      </div>
    );
  }

}

export default App;
