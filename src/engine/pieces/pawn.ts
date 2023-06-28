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
        let startPosition = 1;

        if (this.player === Player.BLACK) {
            factor = -1;
            startPosition = 6;
        }

        if (currentPosition.row === startPosition) {
            newPosition.push(Square.at(currentPosition.row + 2*factor, currentPosition.col));
        }
        newPosition.push(Square.at(currentPosition.row + factor, currentPosition.col));

        return newPosition;
    }
}
