import "./StatusGame.css";

export default function StatusGame() {
  return (
    <section className="status-game">
      <div className="status-game-column">
        <h2>Game Status</h2>
        <span>Player 1 attacked player 2</span>
        <span>3 acertos de 3 respostas</span>
        <span>Dice from 6 to 5</span>
      </div>
      <div className="status-game-column">
        <h2>Question</h2>
        <span>Pergunta: O que é isso?</span>
        <span>Opções: 1- 2- 3- </span>
        <span>Resposta correta</span>
      </div>
    </section>
  );
}
