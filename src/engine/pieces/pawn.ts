import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const currentPosition = board.findPiece(this); // returns Square.at(row, col)
        let newPosition = [];
        let factor = 1;
        let startRow = 1;

        if (this.player === Player.BLACK) {
            factor = -1;
            startRow = 6;
        }

        const oneUp = Square.at(currentPosition.row + factor, currentPosition.col);
        const twoUp = Square.at(currentPosition.row + 2*factor, currentPosition.col);
        if (board.getPiece(oneUp) === undefined) {

            if (currentPosition.row === startRow && board.getPiece(twoUp) === undefined ) {
                newPosition.push(twoUp);
            }

            newPosition.push(oneUp);
        }

        return newPosition;
    }
}
