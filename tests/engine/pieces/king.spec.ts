import King from '../../../src/engine/pieces/king';
import Board from '../../../src/engine/board';
import Player from '../../../src/engine/player';
import Square from '../../../src/engine/square';
import Pawn from '../../../src/engine/pieces/pawn';
import Rook from "../../../src/engine/pieces/rook";
import Bishop from "../../../src/engine/pieces/bishop";

describe('King', () => {
    let board: Board;
    beforeEach(() => board = new Board());

    it('can move to adjacent squares', () => {
        const king = new King(Player.WHITE);
        board.setPiece(Square.at(3, 4), king);

        const moves = king.getAvailableMoves(board);

        const expectedMoves = [
            Square.at(2, 3), Square.at(2, 4), Square.at(2, 5), Square.at(3, 5),
            Square.at(4, 5), Square.at(4, 4), Square.at(4, 3), Square.at(3, 3)
        ];

        moves.should.deep.include.members(expectedMoves);
    });

    it('cannot make any other moves', () => {
        const king = new King(Player.WHITE);
        board.setPiece(Square.at(3, 4), king);

        const moves = king.getAvailableMoves(board);

        moves.should.have.length(8);
    });

    it('cannot leave the board', () => {
        const king = new King(Player.WHITE);
        board.setPiece(Square.at(0, 0), king);

        const moves = king.getAvailableMoves(board);

        const expectedMoves = [Square.at(0, 1), Square.at(1, 1), Square.at(1, 0)];

        moves.should.have.deep.members(expectedMoves);
    });

    it('can take opposing pieces', () => {
        const king = new King(Player.WHITE);
        const opposingPiece = new Pawn(Player.BLACK);
        board.setPiece(Square.at(4, 4), king);
        board.setPiece(Square.at(5, 5), opposingPiece);

        const moves = king.getAvailableMoves(board);

        moves.should.deep.include(Square.at(5, 5));
    });

    it('cannot take the opposing king', () => {
        const king = new King(Player.WHITE);
        const opposingKing = new King(Player.BLACK);
        board.setPiece(Square.at(4, 4), king);
        board.setPiece(Square.at(5, 5), opposingKing);

        const moves = king.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(5, 5));
    });

    it('cannot take friendly pieces', () => {
        const king = new King(Player.WHITE);
        const friendlyPiece = new Pawn(Player.WHITE);
        board.setPiece(Square.at(4, 4), king);
        board.setPiece(Square.at(5, 5), friendlyPiece);

        const moves = king.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(5, 5));
    });

    it("can castle on the king side if king and rook hasn't moved", () => {
        const king = new King(Player.WHITE);
        const rook = new Rook(Player.WHITE);
        board.setPiece(Square.at(0,4), king);
        board.setPiece(Square.at(0,7), rook);

        const moves = king.getAvailableMoves(board);

        moves.should.deep.include(Square.at(0,6));
    }) // includes both black and white

    it("cannot castle on the king side if king and rook not in starting positions", () => {
        const king = new King(Player.WHITE);
        const rook = new Rook(Player.WHITE);
        board.setPiece(Square.at(1,4), king);
        board.setPiece(Square.at(0,7), rook);

        const moves = king.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(0,6));
    })

    it("cannot castle on the king side if king and rook in starting positions but has moved", () => {
        const king = new King(Player.WHITE);
        const rook = new Rook(Player.WHITE);
        board.setPiece(Square.at(0,3), king);
        board.setPiece(Square.at(5,7), rook);

        king.moveTo(board, Square.at(0,4));
        rook.moveTo(board, Square.at(0,7));

        const moves = king.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(0,6));
    })

    it("can castle on the queen side if king and rook hasn't moved", () => {
        const king = new King(Player.WHITE);
        const rook = new Rook(Player.WHITE);
        board.setPiece(Square.at(0,4), king);
        board.setPiece(Square.at(0,0), rook);

        const moves = king.getAvailableMoves(board);

        moves.should.deep.include(Square.at(0,2));
    })

    it("cannot castle on the queen side if king and rook not in starting positions", () => {
        const king = new King(Player.WHITE);
        const rook = new Rook(Player.WHITE);
        board.setPiece(Square.at(1,4), king);
        board.setPiece(Square.at(5,0), rook);

        const moves = king.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(0,2));
    })

    it("cannot castle on the queen side if king and rook in starting positions but has moved", () => {
        const king = new King(Player.WHITE);
        const rook = new Rook(Player.WHITE);
        board.setPiece(Square.at(1,4), king);
        board.setPiece(Square.at(5,0), rook);

        king.moveTo(board, Square.at(0,4));
        rook.moveTo(board, Square.at(0,0));

        const moves = king.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(0,2));
    })

    it("cannot castle if piece in between king and rook", () => {
        const king = new King(Player.WHITE);
        const rook = new Rook(Player.WHITE);
        const bishop = new Bishop(Player.WHITE);
        board.setPiece(Square.at(0,4), king);
        board.setPiece(Square.at(0,0), rook);
        board.setPiece(Square.at(0,2), bishop);

        const moves = king.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(0,2));
    })

    it("rook in correct position after king side castle", () => {
        const king = new King(Player.WHITE);
        const rook = new Rook(Player.WHITE);
        board.setPiece(Square.at(0,4), king);
        board.setPiece(Square.at(0,7), rook);

        king.moveTo(board, Square.at(0,6));

        const piece = board.getPiece(Square.at(0,5));

        (piece instanceof Rook).should.be.true;

    })

    it("rook in correct position after queen side castle", () => {
        const king = new King(Player.WHITE);
        const rook = new Rook(Player.WHITE);
        board.setPiece(Square.at(0,4), king);
        board.setPiece(Square.at(0,0), rook);

        king.moveTo(board, Square.at(0,2));

        const piece = board.getPiece(Square.at(0,3));

        (piece instanceof Rook).should.be.true;

    })

    it("rook in correct position after queen side castle black pieces", () => {
        board.currentPlayer = Player.BLACK;
        const king = new King(Player.BLACK);
        const rook = new Rook(Player.BLACK);
        board.setPiece(Square.at(7,4), king);
        board.setPiece(Square.at(7,0), rook);

        king.moveTo(board, Square.at(7,2));

        const piece = board.getPiece(Square.at(7, 3));

        (piece instanceof Rook).should.be.true;

    })
});
