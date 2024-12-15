import Player from "./components/Player";
import StatusGame from "./components/StatusGame";

function App() {
  return (
    <>
      <div id="main-area">
        <Player />
        <Player />
        <StatusGame />
      </div>
    </>
  );
}

export default App;
