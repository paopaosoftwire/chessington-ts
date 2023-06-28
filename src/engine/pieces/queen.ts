import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Queen extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const currentPosition = board.findPiece(this); // returns Square.at(row, col)
        let newPosition = [];

        for (let column = 0; column < 8; column++){
            if (column !== currentPosition.col){
                newPosition.push(Square.at(currentPosition.row, column));
            }
        }
        for (let row = 0; row < 8; row++){
            if (row !== currentPosition.row){
                newPosition.push(Square.at(row, currentPosition.col));
            }
        }

        let currentRow = currentPosition.row;
        let currentCol = currentPosition.col;

        while (currentRow > 0 && currentCol > 0){
            newPosition.push(Square.at(--currentRow, --currentCol));
        }

        currentRow = currentPosition.row;
        currentCol = currentPosition.col;

        while (currentRow > 0 && currentCol < 7){
            newPosition.push(Square.at(--currentRow, ++currentCol));
        }

        currentRow = currentPosition.row;
        currentCol = currentPosition.col;

        while (currentRow < 7 && currentCol > 0){
            newPosition.push(Square.at(++currentRow, --currentCol));
        }

        currentRow = currentPosition.row;
        currentCol = currentPosition.col;

        while (currentRow < 7 && currentCol < 7){
            newPosition.push(Square.at(++currentRow, ++currentCol));
        }

        return newPosition;
    }
}
