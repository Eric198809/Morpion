import { useState } from "react";
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [playersOk, setPlayersOk] = useState(false);
  const [errorPlayersNames, setErrorPlayersNames] = useState(false);

  const [isXTurn, setIsXTurn] = useState(true);

  const winCombinations: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
  ];

  const getWinner = (squares: string[]) => {
    for (const combination of winCombinations) {
      const [a, b, c] = combination;

      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        if (squares[a] === "X") {
          return player1;
        }
        if (squares[a] === "O") {
          return player2;
        }
      }
    }
    return null;
  };

  const handleSquareClick = (index: number) => {
    if (board[index] || getWinner(board)) {
      return;
    }
    if (playersOk) {
      const uptdateBoard = [...board];
      uptdateBoard[index] = isXTurn ? "X" : "O";
      setBoard(uptdateBoard);
      setIsXTurn(!isXTurn);
    } else {
      setErrorPlayersNames(true);
    }
  };

  const getGameStatus = () => {
    const winner = getWinner(board);


    if (winner) {
      return `Le vainqueur est ${winner}`; // Retourne le message
    }

    if (board.every((square) => square !== null)) {
      return "Egalité ";
    } else {
      return ` C'est à  ${isXTurn ? player1 : player2} de jouer`;
    }
  };

  const submitPlayers = (e: React.FormEvent) => {
    e.preventDefault();
    if (player1 !== "" && player2 !== "") {
      setPlayersOk(!playersOk);
    } else {
      setErrorPlayersNames(!errorPlayersNames);
    }
  };

  const resetGame = () : void => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setPlayersOk(false);
    setPlayer1("");
    setPlayer2("");
  };



  return (
    <div className="main-container">
      <div className="">
        <h1>
          Une partie de <span>MORPION</span>
        </h1>
        {playersOk ? (
          ""
        ) : (
          <div
            className="players-form-container"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              gap: "30px",
            }}
          >
            <form className="select-players-forms"
              action=""
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                gap: "30px",
              }}
            >
              <h2>Joueur 1</h2>
              <input
                type="text"
                value={player1}
                placeholder="Entrez votre prénom"
                onChange={(e) => setPlayer1(e.target.value)}
              />
              <h2>Joueur 2</h2>
              <input
                type="text"
                value={player2}
                placeholder="Entrez votre prénom"
                onChange={(e) => setPlayer2(e.target.value)}
              />
              <input type="submit" value=" Commencer" onClick={submitPlayers} />
            </form>
            {errorPlayersNames && (
              <p
                className="error-message"
                style={{
                  color: "red",
                  background: "white",
                  maxWidth: "fit-content",
                  padding: "15px",
                }}
              >
                Merci de renseigner le nom des joueurs
              </p>
            )}
          </div>
        )}
        {playersOk && (
          <div className="">
            {" "}
            <strong> {getGameStatus()} </strong>
          </div>
        )}

        <div className="grid">
          {board.map((square, index: number) => (
            <button
              style={{ width: "100px", height: "100px", background: "white" }}
              key={index}
              onClick={() => handleSquareClick(index)}
            >
              {square}
            </button>
          ))}
        </div>
        <button onClick={resetGame}> Nouvelle partie</button>
      </div>
    </div>
  );
}

export default App;
