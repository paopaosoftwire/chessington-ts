import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import King from "./king";

export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board, captureKing = false) {
        const currentPosition = board.findPiece(this);
        let newPosition = [];

        let currentRow = currentPosition.row;
        let currentCol = currentPosition.col;

        const changeFactors = [[2, 1], [2, -1], [1, 2], [-1, 2], [-2, 1], [-2, -1], [-1, -2], [1, -2]];

        for (const factor of changeFactors){
            const newRow = currentRow+factor[0];
            const newCol = currentCol+factor[1];
            const newPos = Square.at(newRow, newCol);
            if (board.isInBoard(newPos)){
                if (board.squareIsOccupied(newPos) && board.squareHasCapturablePiece(newPos, captureKing) || !board.squareIsOccupied(newPos)){
                    newPosition.push(newPos);
                }
            }
        }

        return newPosition;
    }
}
