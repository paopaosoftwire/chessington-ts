import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import King from "./king";

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const currentPosition = board.findPiece(this);

        return this.helpGetAvailableMoves(currentPosition, board);
    }

    public helpGetAvailableMoves(currentPosition: Square, board:Board){
        let newPosition = [];

        let currentRow = currentPosition.row;
        let currentCol = currentPosition.col;

        for (let row = currentRow - 1; row >= 0; row--){
            const newPos = Square.at(row, currentCol);
            const possiblePiece = board.getPiece(newPos);
            if (possiblePiece !== undefined) {
                if (possiblePiece.player !== this.player && !(possiblePiece instanceof King)) {
                    newPosition.push(newPos);
                }
                break;
            }
            newPosition.push(newPos);
        }

        for (let row = currentRow + 1; row <= 7; row++){
            const newPos = Square.at(row, currentCol);
            const possiblePiece = board.getPiece(newPos);
            if (possiblePiece !== undefined) {
                if (possiblePiece.player !== this.player && !(possiblePiece instanceof King)) {
                    newPosition.push(newPos);
                }
                break;
            }
            newPosition.push(newPos);
        }

        for (let col = currentCol - 1; col >= 0; col--){
            const newPos = Square.at(currentRow, col);
            const possiblePiece = board.getPiece(newPos);
            if (possiblePiece !== undefined) {
                if (possiblePiece.player !== this.player && !(possiblePiece instanceof King)) {
                    newPosition.push(newPos);
                }
                break;
            }
            newPosition.push(newPos);
        }

        for (let col = currentCol + 1; col <= 7; col++){
            const newPos = Square.at(currentRow, col);
            const possiblePiece = board.getPiece(newPos);
            if (possiblePiece !== undefined) {
                if (possiblePiece.player !== this.player && !(possiblePiece instanceof King)) {
                    newPosition.push(newPos);
                }
                break;
            }
            newPosition.push(newPos);
        }

        return newPosition;
    }
}
