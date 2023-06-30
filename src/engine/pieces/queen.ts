import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import Bishop from "./bishop";
import Rook from "./rook";

export default class Queen extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board, captureKing = false) {
        const currentPosition = board.findPiece(this); // returns Square.at(row, col)

        const dummyBishop = new Bishop(this.player);
        const dummyRook = new Rook(this.player);

        const diagonalMoves = dummyBishop.helpGetAvailableMoves(currentPosition, board, captureKing);
        const lateralMoves = dummyRook.helpGetAvailableMoves(currentPosition, board, captureKing);

        return diagonalMoves.concat(lateralMoves);
    }
}
