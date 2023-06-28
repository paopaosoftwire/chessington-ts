import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Bishop extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const currentPosition = board.findPiece(this); // returns Square.at(row, col)
        let newPosition = [];

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
