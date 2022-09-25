import React, { useState } from "react";

function Game() {
  const [c1, setC1] = useState("white");
  const [c2, setC2] = useState("white");
  const [c3, setC3] = useState("white");
  const [c4, setC4] = useState("white");
  const [c5, setC5] = useState("white");
  const [c6, setC6] = useState("white");
  const [c7, setC7] = useState("white");
  const [c8, setC8] = useState("white");
  const [c9, setC9] = useState("white");

  const [lvlColour, setlvlColour] = useState("black");
  const [lvlender, setlvlender] = useState("black");

  const [correct, setcorrect] = useState("c");
  const [showgame, setshowgame] = useState(false);
  const [showstart, setStart] = useState(true);
  const [endgame, setend] = useState(false);
  // const [cdown, setcdown] = useState(10);

  const cdown = 10;
  const [level, setlevel] = useState(0);
  function shadeColor(color, percent) {
    var R = parseInt(color.substring(1, 3), 16);
    var G = parseInt(color.substring(3, 5), 16);
    var B = parseInt(color.substring(5, 7), 16);

    R = parseInt((R * (100 + percent)) / 100);
    G = parseInt((G * (100 + percent)) / 100);
    B = parseInt((B * (100 + percent)) / 100);

    R = R < 255 ? R : 255;
    G = G < 255 ? G : 255;
    B = B < 255 ? B : 255;

    var RR = R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
    var GG = G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
    var BB = B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);

    return "#" + RR + GG + BB;
  }

  // function StartTimer(sec) {
  //   var count = sec;
  //   var IntervalID = setInterval(function () {
  //     if (count < 0) {
  //       clearInterval(IntervalID);
  //       GameOver();
  //     } else {
  //       count--;
  //       cdown = count;
  //     }
  //   }, 1000);
  // }

  function GameOver() {
    setend(true);
    setshowgame(false);
    // setStart(false);
  }

  function restartGame() {
    setlevel(0);
    setend(false);
    setBg();
  }
  function setBg() {
    setshowgame(true);
    setStart(false);
    var shade = 10;
    // const randomBetween = (min, max) =>
    //   min + Math.floor(Math.random() * (max - min + 1));
    // const r = randomBetween(0, 255);
    // const g = randomBetween(0, 255);
    // const b = randomBetween(0, 255);

    // const randomColor = "rgb(" + r + "," + g + "," + b + ")";
    const randomColor =
      "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
    const randomsquare = Math.floor(Math.random() * 9);

    var num = Math.random() <= 0.5 ? 1 : 2;
    if (level <= 5) {
      if (num == 1) {
        shade = 50;
      } else {
        shade = -50;
      }
    } else if (level > 5 && level <= 10) {
      if (num == 1) {
        shade = 40;
      } else {
        shade = -40;
      }
    } else if (level > 10 && level <= 15) {
      if (num == 1) {
        shade = 30;
      } else {
        shade = -30;
      }
    } else if (level > 10 && level <= 15) {
      if (num == 1) {
        shade = 20;
      } else {
        shade = -20;
      }
    } else if (level > 15 && level <= 20) {
      if (num == 1) {
        shade = 10;
      } else {
        shade = -10;
      }
    } else if (level > 20) {
      if (num == 1) {
        shade = 5;
      } else {
        shade = -5;
      }
    }

    const answer = shadeColor(randomColor, shade);
    setlvlender(answer);
    switch (randomsquare) {
      case 0:
        setC1(answer);
        setC2(randomColor);
        setC3(randomColor);
        setC4(randomColor);
        setC5(randomColor);
        setC6(randomColor);
        setC7(randomColor);
        setC8(randomColor);
        setC9(randomColor);
        setlvlColour(randomColor);
        setcorrect("s1");
        break;
      case 1:
        setC1(randomColor);
        setC2(answer);
        setC3(randomColor);
        setC4(randomColor);
        setC5(randomColor);
        setC6(randomColor);
        setC7(randomColor);
        setC8(randomColor);
        setC9(randomColor);
        setlvlColour(randomColor);
        setcorrect("s2");
        break;
      case 2:
        setC1(randomColor);
        setC2(randomColor);
        setC3(answer);
        setC4(randomColor);
        setC5(randomColor);
        setC6(randomColor);
        setC7(randomColor);
        setC8(randomColor);
        setC9(randomColor);
        setlvlColour(randomColor);
        setcorrect("s3");
        break;
      case 3:
        setC1(randomColor);
        setC2(randomColor);
        setC3(randomColor);
        setC4(answer);
        setC5(randomColor);
        setC6(randomColor);
        setC7(randomColor);
        setC8(randomColor);
        setC9(randomColor);
        setlvlColour(randomColor);
        setcorrect("s4");
        break;
      case 4:
        setC1(randomColor);
        setC2(randomColor);
        setC3(randomColor);
        setC4(randomColor);
        setC5(answer);
        setC6(randomColor);
        setC7(randomColor);
        setC8(randomColor);
        setC9(randomColor);
        setlvlColour(randomColor);
        setcorrect("s5");
        break;
      case 5:
        setC1(randomColor);
        setC2(randomColor);
        setC3(randomColor);
        setC4(randomColor);
        setC5(randomColor);
        setC6(answer);
        setC7(randomColor);
        setC8(randomColor);
        setC9(randomColor);
        setlvlColour(randomColor);
        setcorrect("s6");
        break;
      case 6:
        setC1(randomColor);
        setC2(randomColor);
        setC3(randomColor);
        setC4(randomColor);
        setC5(randomColor);
        setC6(randomColor);
        setC7(answer);
        setC8(randomColor);
        setC9(randomColor);
        setlvlColour(randomColor);
        setcorrect("s7");
        break;
      case 7:
        setC1(randomColor);
        setC2(randomColor);
        setC3(randomColor);
        setC4(randomColor);
        setC5(randomColor);
        setC6(randomColor);
        setC7(randomColor);
        setC8(answer);
        setC9(randomColor);
        setlvlColour(randomColor);
        setcorrect("s8");
        break;
      case 8:
        setC1(randomColor);
        setC2(randomColor);
        setC3(randomColor);
        setC4(randomColor);
        setC5(randomColor);
        setC6(randomColor);
        setC7(randomColor);
        setC8(randomColor);
        setlvlColour(randomColor);
        setC9(answer);
        setcorrect("s9");
        break;
      default:
        setC1(randomColor);
        setC2(randomColor);
        setC3(answer);
        setC4(randomColor);
        setC5(randomColor);
        setC6(randomColor);
        setC7(randomColor);
        setC8(randomColor);
        setC9(randomColor);
        setlvlColour(randomColor);
        setcorrect("s3");
    }
    // StartTimer(10);
  }

  const CheckA = (e) => {
    const c = e.target.getAttribute("id");
    console.log(c);
    if (c == correct) {
      setBg();
      setlevel(level + 1);
    } else {
      GameOver();
    }
  };
  return (
    <div className="gamecont">
      {endgame && (
        <div className="Gameovercont">
          <p className="GameOverTitle">GAME OVER</p>

          <p className="score">Your Score: {level}</p>
          <div className="results">
            <div
              className="rightcolour"
              style={{ backgroundColor: lvlColour }}
            ></div>
            <div
              className="wrongcolour"
              style={{ backgroundColor: lvlender }}
            ></div>
          </div>

          <button className="Restartbutton" onClick={restartGame}>
            Try Again
          </button>
        </div>
      )}
      {showgame && (
        <table>
          <tr>
            <td
              className="square1"
              id="s1"
              style={{ backgroundColor: c1 }}
              onClick={CheckA}
            ></td>
            <td
              className="square2"
              id="s2"
              style={{ backgroundColor: c2 }}
              onClick={CheckA}
            ></td>
            <td
              className="square3"
              id="s3"
              style={{ backgroundColor: c3 }}
              onClick={CheckA}
            ></td>
          </tr>

          <tr>
            <td
              className="square4"
              id="s4"
              style={{ backgroundColor: c4 }}
              onClick={CheckA}
            ></td>
            <td
              className="square5"
              id="s5"
              style={{ backgroundColor: c5 }}
              onClick={CheckA}
            ></td>
            <td
              className="square6"
              id="s6"
              style={{ backgroundColor: c6 }}
              onClick={CheckA}
            ></td>
          </tr>

          <tr>
            <td
              className="square7"
              id="s7"
              style={{ backgroundColor: c7 }}
              onClick={CheckA}
            ></td>
            <td
              className="square8"
              id="s8"
              style={{ backgroundColor: c8 }}
              onClick={CheckA}
            ></td>
            <td
              className="square9"
              id="s9"
              style={{ backgroundColor: c9 }}
              onClick={CheckA}
            ></td>
          </tr>
        </table>
      )}

      {showstart && (
        <div className="StartBcont">
          <button className="colourbutton" onClick={setBg}>
            Start Game
          </button>
        </div>
      )}

      {showgame && (
        <div className="levelcont">
          <h1 className="showlevel" style={{ color: lvlColour }}>
            {level}
          </h1>
        </div>
      )}
      {/* {showgame && <h1>{cdown}</h1>} */}
    </div>
  );
}

export default Game;
