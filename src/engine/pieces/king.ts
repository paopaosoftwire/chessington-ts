import Piece from './piece';
import Player from '../player';
import player from '../player';
import Board from '../board';
import Square from "../square";
import Rook from "./rook";


export default class King extends Piece {

    public originalPosition = (this.player === Player.WHITE)? Square.at(0, 4) : Square.at(7,4);

    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const currentPosition = board.findPiece(this);
        let newPosition = [];

        let currentRow = currentPosition.row;
        let currentCol = currentPosition.col;

        const changeFactors = [[0,1],[1,0],[1,1],[-1,-1],[-1,0],[0,-1],[1,-1],[-1,1]];

        for (const factor of changeFactors){
            const newRow = currentRow+factor[0];
            const newCol = currentCol+factor[1];
            const newPos = Square.at(newRow, newCol);
            if (board.isInBoard(newPos)){
                if (board.squareIsOccupied(newPos) && board.squareHasCapturablePiece(newPos) || !board.squareIsOccupied(newPos)){
                    newPosition.push(newPos);
                }
            }
        }

        // Castling 
        
        if (board.findPiece(this).equals(this.originalPosition) && !this.MOVED){
            
            for(const rookPos of board.rookInStartingPosition()){
                if (rookPos.col > this.originalPosition.col){
                    const rook = board.getPiece(rookPos) as Rook;
                    const rookMoves = rook.getAvailableMoves(board);
                    console.log(rookMoves);
                    console.log(Square.at(this.originalPosition.row, this.originalPosition.col + 1));
                    
                    for(const targetSquare of rookMoves) {
                        if (targetSquare.equals(Square.at(this.originalPosition.row, this.originalPosition.col + 1))) {
                            newPosition.push(Square.at(this.originalPosition.row, this.originalPosition.col+2));
                        }
                    }
                } else {
                    const rook = board.getPiece(rookPos) as Rook;
                    const rookMoves = rook.getAvailableMoves(board);
                    for(const targetSquare of rookMoves) {
                        if (targetSquare.equals(Square.at(this.originalPosition.row, this.originalPosition.col - 1))) {
                            newPosition.push(Square.at(this.originalPosition.row, this.originalPosition.col-2));
                        }
                    }
                }
            }
        }
        return newPosition;
    }

    public moveTo(board: Board, newSquare: Square) {
        const startingSquare = board.findPiece(this);
        super.moveTo(board, newSquare);
        if (Math.abs(newSquare.col - startingSquare.col) === 2) {

            let rookRow: number;
            let rookEndCol: number;
            let rookStartCol: number;

            // Figure out which rook needs to move
            (this.player === player.WHITE)? rookRow = 0: rookRow = 7;
            (newSquare.col === 2)? rookEndCol = 3: rookEndCol = 5;
            (newSquare.col === 2)? rookStartCol = 0: rookStartCol = 7;

            // Move the rook
            const rook = board.getPiece(Square.at(rookRow, rookStartCol));
            (board.currentPlayer === player.WHITE) ? board.currentPlayer = player.BLACK : board.currentPlayer = player.WHITE;
            rook!.moveTo(board, Square.at(rookRow, rookEndCol));
        }
    }
}
