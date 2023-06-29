import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import King from "./king";

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const currentPosition = board.findPiece(this); // returns Square.at(row, col)
        let newPosition = [];
        let factor = 1;
        let startRow = 1;
        
        // Different functionalities for BLACK or WHITE player
        if (this.player === Player.BLACK) {
            factor = -1;
            startRow = 6;
        }
        //END

        // Normal movements (Including from initial position)
        const oneUp = Square.at(currentPosition.row + factor, currentPosition.col);
        const twoUp = Square.at(currentPosition.row + 2*factor, currentPosition.col);
        if (board.isInBoard(currentPosition.row + factor, currentPosition.col) && board.getPiece(oneUp) === undefined) {
            if (board.isInBoard(currentPosition.row + 2*factor, currentPosition.col) && currentPosition.row === startRow && board.getPiece(twoUp) === undefined ) {
                newPosition.push(twoUp);
            }

            newPosition.push(oneUp);
        }
        // END

        // Capturing opponent pieces
        const upLeft = Square.at(currentPosition.row + factor, currentPosition.col - 1);
        const upRight = Square.at(currentPosition.row + factor, currentPosition.col + 1);

        if (board.isInBoard(currentPosition.row + factor, currentPosition.col - 1)) {
            const upLeftPiece = board.getPiece(upLeft);
            if (upLeftPiece !== undefined && upLeftPiece.player !== this.player && !(upLeftPiece instanceof King)) {
                newPosition.push(upLeft);
            }
        }

        if (board.isInBoard(currentPosition.row + factor, currentPosition.col + 1)) {
            const upRightPiece = board.getPiece(upRight);
            if (upRightPiece !== undefined && upRightPiece.player !== this.player && !(upRightPiece instanceof King)) {
                newPosition.push(upRight);
            }
        }
        // END
        
        // En Passant
        for (const direction of [1,-1]){ 
            if (currentPosition.row === 7-startRow-factor*2){  
                if (board.isInBoard(currentPosition.row, currentPosition.col+direction)){ 
                    const possibleOpponentPiece = board.getPiece(Square.at(currentPosition.row, currentPosition.col+direction)); 
                    console.log("no hi");
                    
                    if (possibleOpponentPiece !== undefined && possibleOpponentPiece.player != this.player && possibleOpponentPiece instanceof Pawn){
                        console.log("hi");
                        
                        const newPos = Square.at(currentPosition.row+factor, currentPosition.col+direction);  
                        const targetSquare = board.getPiece(newPos); 
                        if (targetSquare === undefined){ 
                            newPosition.push(newPos);
                        }
                    }
                }
            }
        }

        return newPosition;
    }
}
