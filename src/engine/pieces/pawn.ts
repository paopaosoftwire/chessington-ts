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
        if (board.isInBoard(oneUp) && board.getPiece(oneUp) === undefined) {
            if (board.isInBoard(twoUp) && currentPosition.row === startRow && board.getPiece(twoUp) === undefined ) {
                newPosition.push(twoUp);
            }

            newPosition.push(oneUp);
        }
        // END

        // Capturing opponent pieces
        const leftRight = [-1, 1];

        for (const columnChange of leftRight){
            const newPos = Square.at(currentPosition.row + factor, currentPosition.col + columnChange);

            if (board.isInBoard(newPos)) {
                const upLeftPiece = board.getPiece(newPos);
                if (upLeftPiece !== undefined && upLeftPiece.player !== this.player && !(upLeftPiece instanceof King)) {
                    newPosition.push(newPos);
                }
            }
        }
        // END
        
        // En Passant
        for (const columnChange of leftRight){ 
            const possibleOpponenetSquare = Square.at(currentPosition.row, currentPosition.col+columnChange);
            if (currentPosition.row === 7-startRow-factor*2){  
                if (board.isInBoard(possibleOpponenetSquare)){ 
                    const possibleOpponentPiece = board.getPiece(possibleOpponenetSquare);                     
                    if (possibleOpponentPiece !== undefined && possibleOpponentPiece.player != this.player && possibleOpponentPiece instanceof Pawn){                        
                        const newPos = Square.at(currentPosition.row+factor, currentPosition.col+columnChange);  
                        const targetSquare = board.getPiece(newPos); 
                        const opponentOrigin = Square.at(currentPosition.row+2*factor, currentPosition.col+columnChange); // where opponent piece moved from
                        if (targetSquare === undefined && opponentOrigin.equals(board.previousMove[0]) && possibleOpponenetSquare.equals(board.previousMove[1])){
                                newPosition.push(newPos);
                        }
                    }
                }
            }
        }
        // END

        return newPosition;
    }

    moveTo(board:Board, square:Square){
        if (board.findPiece(this).col !== square.col && board.getPiece(square) === undefined){
            const change = (this.player === Player.WHITE) ? -1 : 1;
            const capturedSquare = Square.at(square.row+change, square.col);
            board.setPiece(capturedSquare, undefined);
        }
        super.moveTo(board, square);
    }
    
}
