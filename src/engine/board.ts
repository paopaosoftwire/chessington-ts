import Player from './player';
import GameSettings from './gameSettings';
import Square from './square';
import Piece from './pieces/piece';
import King from './pieces/king';
import Rook from './pieces/rook';


export default class Board {
    public currentPlayer: Player;
    public previousMove: (Square[]) = [];
    private readonly board: (Piece | undefined)[][];

    public constructor(currentPlayer?: Player) {
        this.currentPlayer = currentPlayer ? currentPlayer : Player.WHITE;
        this.board = this.createBoard();
    }

    public setPiece(square: Square, piece: Piece | undefined) {
        this.board[square.row][square.col] = piece;
    }

    public getPiece(square: Square) {
        return this.board[square.row][square.col];
    }

    public findPiece(pieceToFind: Piece) {
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                if (this.board[row][col] === pieceToFind) {
                    return Square.at(row, col);
                }
            }
        }
        throw new Error('The supplied piece is not on the board');
    }

    public movePiece(fromSquare: Square, toSquare: Square) {
        const movingPiece = this.getPiece(fromSquare);        
        if (!!movingPiece && movingPiece.player === this.currentPlayer) {
            this.setPiece(toSquare, movingPiece);
            this.setPiece(fromSquare, undefined);
            this.currentPlayer = (this.currentPlayer === Player.WHITE ? Player.BLACK : Player.WHITE);
            this.previousMove = [fromSquare, toSquare];
        }
    }

    public isInBoard(square: Square){
        const row = square.row;
        const column = square.col;
        return row >= 0 && column >= 0 && row <= 7 && column <= 7;
    }

    public squareIsOccupied(position: Square){
        const possiblePiece = this.getPiece(position);
        return possiblePiece !== undefined
    }

    public squareHasCapturablePiece(position: Square, captureKing = false){
        const possiblePiece = this.getPiece(position);
        if (captureKing) {
            return possiblePiece!.player !== this.currentPlayer;
        }
        else {
            return possiblePiece!.player !== this.currentPlayer && !(possiblePiece instanceof King);
        }
    }

    public rookInStartingPosition(){
        const allRooksInStartingPosition = [];

        if (this.currentPlayer === Player.WHITE){
            for (const square of [Square.at(0,0), Square.at(0,7)]){
                const piece = this.getPiece(square);
                if (piece instanceof Rook && piece.player === this.currentPlayer && !piece.MOVED) allRooksInStartingPosition.push(square);
            }
        } else {
            for (const square of [Square.at(7,0), Square.at(7,7)]){
                const piece = this.getPiece(square);
                if (piece instanceof Rook && piece.player === this.currentPlayer && !piece.MOVED) allRooksInStartingPosition.push(square);
            }
        }
        return allRooksInStartingPosition;
    }

    private createBoard() {
        const board = new Array(GameSettings.BOARD_SIZE);
        for (let i = 0; i < board.length; i++) {
            board[i] = new Array(GameSettings.BOARD_SIZE);
        }
        return board;
    }
}
