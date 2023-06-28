import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const currentPosition = board.findPiece(this);

        return this.helpGetAvailableMoves(currentPosition);
    }

    public helpGetAvailableMoves(currentPosition: Square){
        let newPosition = [];

        for (let column = 0; column < 8; column++){
            if (column !== currentPosition.col){
                newPosition.push(Square.at(currentPosition.row, column));
            }
        }
        for (let row = 0; row < 8; row++){
            if (row !== currentPosition.row){
                newPosition.push(Square.at(row, currentPosition.col));
            }
        }

        return newPosition;
    }
}
