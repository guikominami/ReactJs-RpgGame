/* eslint-disable react/prop-types */
import RoundSummaryColumn from "./RoundSummaryColumn";
import "./RoundSummary.css";

export default function RoundSummary({ playerAttack, playerDefend }) {
  const damage = playerAttack.points - playerDefend.points;

  return (
    <>
      <h2>End of Round</h2>
      <div className="main-summary">
        <RoundSummaryColumn
          type="Attack"
          multiplier={playerAttack.multiplier}
          dice={playerAttack.dice}
          power={playerAttack.power}
          points={playerAttack.points}
        />
        <RoundSummaryColumn
          type="Block"
          multiplier={playerDefend.multiplier}
          dice={playerDefend.dice}
          power={playerDefend.power}
          points={playerDefend.points}
        />
      </div>
      <div>
        <p>
          <b>Round Result: </b>
        </p>
        <p>
          Attack points - Defense points: {playerAttack.points} -{" "}
          {playerDefend.points}
        </p>
        <p>
          Health for Player {playerAttack.id + 1}:{" "}
          {playerDefend.health}
        </p>
        <p>
          <b>
            {" "}
            Damage:{" "}
            {damage < 0
              ? "0 (Attack points less than defense)"
              : damage}
          </b>
        </p>
      </div>
    </>
  );
}
