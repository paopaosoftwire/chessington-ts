import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const currentPosition = board.findPiece(this);
        let newPosition = [];

        let currentRow = currentPosition.row;
        let currentCol = currentPosition.col;

        if (currentRow+2 <= 7){
            if (currentCol-1 >= 0){
                newPosition.push(Square.at(currentRow+2, currentCol-1));
            }
            if (currentCol+1 <= 7){
                newPosition.push(Square.at(currentRow+2, currentCol+1));
            }
        }

        if (currentRow-2 >= 0){
            if (currentCol-1 >= 0){
                newPosition.push(Square.at(currentRow-2, currentCol-1));
            }
            if (currentCol+1 <= 7){
                newPosition.push(Square.at(currentRow-2, currentCol+1));
            }
        }

        if (currentCol+2 <= 7){
            if (currentRow-1 >= 0){
                newPosition.push(Square.at(currentRow-1, currentCol+2));
            }
            if (currentRow+1 <= 7){
                newPosition.push(Square.at(currentRow+1, currentCol+2));
            }
        }

        if (currentCol-2 >= 0){
            if (currentRow-1 >= 0){
                newPosition.push(Square.at(currentRow-1, currentCol-2));
            }
            if (currentRow+1 <= 7){
                newPosition.push(Square.at(currentRow+1, currentCol-2));
            }
        }

        return newPosition;

    }
}
