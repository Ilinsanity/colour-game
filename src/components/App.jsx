import React, { useState } from "react";
import Game from "./Game";
function App() {
  const [reveal, setreveal] = useState(false);

  function changeReveal() {
    setreveal(true);
  }
  return (
    <div>
      <p className="BeginningHeader">Colour Blind</p>

      {reveal && <Game />}
    </div>
  );
}

export default App;
