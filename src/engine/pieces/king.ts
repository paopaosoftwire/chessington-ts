import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class King extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const currentPosition = board.findPiece(this);
        let newPosition = [];

        let currentRow = currentPosition.row;
        let currentCol = currentPosition.col;

        const changeFactors = [[0,1],[1,0],[1,1],[-1,-1],[-1,0],[0,-1],[1,-1],[-1,1]];

        for (const factor of changeFactors){
            const newRow = currentRow+factor[0];
            const newCol = currentCol+factor[1];
            if (board.isInBoard(newRow, newCol)){
                newPosition.push(Square.at(newRow, newCol));
            }
        }

        return newPosition;
    }
}
