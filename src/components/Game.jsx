import React, { useState } from "react";

function Game() {
  const [c1, setC1] = useState("blue");
  const [c2, setC2] = useState("red");
  const [c3, setC3] = useState("purple");
  const [c4, setC4] = useState("blue");
  const [c5, setC5] = useState("blue");
  const [c6, setC6] = useState("blue");
  const [c7, setC7] = useState("blue");
  const [c8, setC8] = useState("blue");
  const [c9, setC9] = useState("blue");

  const [correct, setcorrect] = useState("c");

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

  function setBg() {
    // const randomBetween = (min, max) =>
    //   min + Math.floor(Math.random() * (max - min + 1));
    // const r = randomBetween(0, 255);
    // const g = randomBetween(0, 255);
    // const b = randomBetween(0, 255);

    // const randomColor = "rgb(" + r + "," + g + "," + b + ")";
    const randomColor =
      "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
    const randomsquare = Math.floor(Math.random() * 9);
    console.log(randomColor);
    console.log(randomsquare);

    const answer = shadeColor(randomColor, 15);
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
        setcorrect("s3");
    }
  }

  const CheckA = (e) => {
    const c = e.target.getAttribute("id");
    console.log(c);
    if (c == correct) {
      setBg();
      setlevel(level + 1);
    } else {
      //end game screen
    }
  };
  return (
    <div>
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

      <button id="colourbutton" onClick={setBg}>
        Generate Random Colour
      </button>

      <h1>LEVEL: {level}</h1>
    </div>
  );
}

export default Game;
