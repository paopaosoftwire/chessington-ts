import Player from '../player';
import Board from '../board';
import Square from '../square';
import King from "./king";

export default class Piece {
    public player: Player;

    public constructor(player: Player) {
        this.player = player;
    }

    public getAvailableMoves(board: Board) {
        throw new Error('This method must be implemented, and return a list of available moves');
    }

    public moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
    }

    //TODO: Add checkPiece function with less dependencies (i.e. newPosition array)

    // public canCapture(possiblePiece: Piece) {
    //     return (possiblePiece.player !== this.player && !(possiblePiece instanceof King))
    // }
    //
    // public checkPiece(board: Board, position: Square, arrayToUpdate: Square[]) {
    //     const possiblePiece = board.getPiece(position);
    //     if (possiblePiece !== undefined) {
    //         if (this.canCapture(possiblePiece)) {
    //             arrayToUpdate.push(position)
    //         }
    //         return [true, arrayToUpdate]
    //     }
    //     return [false, arrayToUpdate]
    // }
}

