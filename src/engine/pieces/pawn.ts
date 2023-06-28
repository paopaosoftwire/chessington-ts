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

        if (this.player === Player.BLACK) {
            factor = -1;
            startRow = 6;
        }

        const oneUp = Square.at(currentPosition.row + factor, currentPosition.col);
        const twoUp = Square.at(currentPosition.row + 2*factor, currentPosition.col);
        if (board.isInBoard(currentPosition.row + factor, currentPosition.col) && board.getPiece(oneUp) === undefined) {
            if (board.isInBoard(currentPosition.row + 2*factor, currentPosition.col) && currentPosition.row === startRow && board.getPiece(twoUp) === undefined ) {
                newPosition.push(twoUp);
            }

            newPosition.push(oneUp);
        }

        const upLeft = Square.at(currentPosition.row + factor, currentPosition.col - 1);
        const upRight = Square.at(currentPosition.row + factor, currentPosition.col + 1);

        if (board.isInBoard(currentPosition.row + factor, currentPosition.col - 1)) {
            const upLeftPiece = board.getPiece(upLeft);
            if (upLeftPiece !== undefined && upLeftPiece.player !== this.player && !(upLeftPiece instanceof King)) {
                newPosition.push(upLeft);
            }
        }

        if (board.isInBoard(currentPosition.row + factor, currentPosition.col + 1)) {
            const upRightPiece = board.getPiece(upRight);
            if (upRightPiece !== undefined && upRightPiece.player !== this.player && !(upRightPiece instanceof King)) {
                newPosition.push(upRight);
            }
        }


        return newPosition;
    }
}
