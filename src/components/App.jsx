import React, { useState } from "react";
import Game from "./Game";

function App() {
  const [showgame, setshowgame] = useState(false);

  return (
    <div>
      <Game />
    </div>
  );
}

export default App;
