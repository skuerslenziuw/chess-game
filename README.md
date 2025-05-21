# 🧩 Chess Game CLI (JavaScript)

This is a simple command-line chess game implemented in JavaScript. The game supports basic piece movement, board display, input handling, and ends when a king is captured.

# ♙ Piece Representation
White pieces are represented by uppercase letters:
P (Pawn), R (Rook), N (Knight), B (Bishop), Q (Queen), K (King)

Black pieces are represented by lowercase letters:
p (Pawn), r (Rook), n (Knight), b (Bishop), q (Queen), k (King)

---

## 📦 Requirements

- Node.js (v14 or higher recommended)  
- npm (Node Package Manager)

---

## 🚀 Getting Started

### 1. Download the Chess Game

Download the project folder (e.g., from email), then open a terminal and navigate into the folder:

cmd:
cd chess-game

### 2. Install Dependencies
npm install

---

### ▶️ Running the Game

To start the chess game, run:
node index.js

You will be prompted to enter moves in standard chess notation.

### Examples:
 1. e2 e4 → Moves a piece from e2 to e4
 2. b1 c3 → Moves a piece from b1 to c3

 # The board will update after each valid move.
 ## The game ends when a King is captured.

---

#### 🧪 Running Tests
Unit tests are written using Jest.

To run all tests:
npx jest

Test Coverage Includes:
✅ Board setup and initialization
✅ Valid and invalid piece movements
✅ Win condition (king capture)
✅ Input validation
✅ Board protection against illegal modifications

---

##### ⚠️ Limitations
-No check/checkmate logic yet
-No en passant, castling, or promotion
-Input assumes well-formed chess coordinates
-The game ends only when a King is captured

---

###### 📁 File Structure
chess-game/
├── App.js                    # Main game entry point
├── board.js                  # Board setup and print functions
├── game.js                   # Game logic (moves, turn handling)
├── __tests__/                # Unit tests
├── package.json              # npm configuration
└── README.md                 # Project instructions




