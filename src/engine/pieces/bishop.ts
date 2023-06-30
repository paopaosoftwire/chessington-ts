import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import King from "./king";

export default class Bishop extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board, captureKing = false) {
        const currentPosition = board.findPiece(this); // returns Square.at(row, col)

        return this.helpGetAvailableMoves(currentPosition, board, captureKing);
    }

    public helpGetAvailableMoves(currentPosition: Square, board:Board, captureKing = false){
        let newPosition = [];
        const ourPlayer = this.player;

        const changeFactors = [[-1, -1], [-1, 1], [1, -1], [1, 1]];

        for (const factor of changeFactors){
            let currentRow = currentPosition.row+factor[0];
            let currentCol = currentPosition.col+factor[1];
            let newPos = Square.at(currentRow, currentCol);
            while (board.isInBoard(newPos)){
                if (checkPiece(newPos)) break;
                newPosition.push(newPos);
                currentRow += factor[0];
                currentCol += factor[1];
                newPos = Square.at(currentRow, currentCol);
            }
        }

        function checkPiece(position: Square){
            if (board.squareIsOccupied(position)){
                if (board.squareHasCapturablePiece(position, captureKing)){
                    newPosition.push(position);
                }
                return true;
            }
            return false;
        }

        return newPosition;
    }
}
