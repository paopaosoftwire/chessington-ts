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

        return this.helpGetAvailableMoves(currentPosition);
    }

    public helpGetAvailableMoves(currentPosition: Square){
        let newPosition = [];

        let changeFactors = [[-1, -1], [-1, 1], [1, -1], [1, 1]];

        for (const factor of changeFactors){
            let currentRow = currentPosition.row;
            let currentCol = currentPosition.col;
            const limits = () => currentRow > 0 && currentCol > 0 && currentRow < 7 && currentCol < 7;
            while (limits()){
                currentRow += factor[0];
                currentCol += factor[1];
                newPosition.push(Square.at(currentRow, currentCol));
            }
        }
        return newPosition;
    }
}
