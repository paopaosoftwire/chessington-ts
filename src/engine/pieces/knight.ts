import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import King from "./king";

export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
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
                const possiblePiece = board.getPiece(newPos);
                if ((possiblePiece !== undefined && possiblePiece.player !== this.player && !(possiblePiece instanceof King))
                    || (possiblePiece === undefined)) {
                    newPosition.push(newPos);
                }
            }
        }
        return newPosition;
    }
}
