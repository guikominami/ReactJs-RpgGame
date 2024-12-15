import Player from "./components/Player";
import SetupGame from "./components/SetupGame";
import StatusGame from "./components/StatusGame";

function App() {
  return (
    <>
      <div id="main-area">
        <Player />
        <Player />
        <SetupGame />
        <StatusGame />
      </div>
    </>
  );
}

export default App;
