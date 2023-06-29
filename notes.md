# ToDo

1. Refactor Pawn
2. Write Repeated Code
3. Write Remaining Functionalities (RED-GREEN-REFACTOR)



## Remaining functionalities 

### Castling 

* functionality made complete with check 

1. Have a MOVED Flag for each individual piece 
    - How do we determine individual pieces from each other? 
2. Check the MOVED Flag for both King and Rook
3. Check every square between King and Rook(s) -> i.e. Rook can reach its target square
4. If intermediary move contains a check, then castling is not allowed
5. If currently in check, castling not allowed 
6. If all tests pass, update available moves for King 
7. Override moveTo in King (treat Castling as a King move): 
    - check if castling is an available move, then update both King and Rook positions

### Pawn Promotion

1. WHen a moveTo is called on a pawn, check if the destination square has row 0 or 7
2. If so, auto=promote to a Queen piece

### Check and Check Mate 

1. _Check_ if at least one opponent piece has one available move that lands on current player's King 
    - Will first need to find King's position
    - Need to loop through all opponent pieces and their available moves 
2. _Legal_ if a possible move does not cause the player's King to be in check 
    - Need recalculation
3. _Check Mate_ if King is currently in _Check_ **and** there are no _Legal_ moves 

### Stalemate 

* functionality made complete with check 

1. Loop through all pieces on board belonging to the current player
2. Check that there are no available moves for any piece
3. Run check at every single move. 

## Big Picture 

### Main Classes 

#### Player 

1. Determine WHITE or BLACK

#### Board 

1. Is a 2D array of Pieces 
2. Keeps track of currentPlayer -> what is the significance of this? Are they (no they aren't) different boards?
3. defines the location of Pieces
4. defines the borders of the Board
5. defines the movement of Pieces on the board -> updates location of Piece, keeps track of most recent move. 

#### Square 

1. Holds coordinates of each square. (i.e. location on Board)

#### Piece (Parent Class)

1. Keeps track of player 
2. Encapsulates movement of pieces (calls from Board)
3. Gets available moves (calls from children classes)

### Global Variables 

1. MOVED Flag in Piece
2. _legal_ method defined in Piece, called in _getAvailableMoves_
3. _check_ method defined in Board, called in _legal_
4. _checkMate_ method defined in Board, called in _check_
5. _staleMate_ method defined in Board, called in _moveTo_

### Repeated Functionalities 

#### Queen 

1. lateral movements (i.e. Rook)
2. diagonal movements (i.e. Bishop)

#### King 

**1. checking if target square is available -> either free or able to capture (should be implemented separately)**

#### Rook

**1. traversing in 4 directions from itself**
2. checking if target square is available -> either free or able to capture 

#### Bishop

1. traversing in 4 directions from itself
2. checking if target square is available -> either free or able to capture 

* Same as Rook, except the 4 directions are different 

#### Knight 

1. checking if target square is available -> either free or able to capture 

#### Pawn

1. checking if target square is available -> either free or able to capture 
