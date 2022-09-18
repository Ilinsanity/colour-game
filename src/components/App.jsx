import React, { useState } from "react";
import Game from "./Game";
function App() {
  const [reveal, setreveal] = useState(false);
  // const [letter, setletter] = useState(1);

  const [title1, setT1] = useState("white");
  const [title2, setT2] = useState("white");
  // const [title3, setT3] = useState("black");
  // const [title4, setT4] = useState("black");
  // const [title5, setT5] = useState("black");
  // const [title6, setT6] = useState("black");
  // const [title7, setT7] = useState("black");
  // const [title8, setT8] = useState("black");
  // const [title9, setT9] = useState("black");
  // const [title10, setT10] = useState("black");
  // const [title11, setT11] = useState("black");

  function changeReveal() {
    setreveal(true);
  }

  setInterval(changeColour, 3500);
  function changeColour() {
    const randomColor =
      "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");

    const randomColor2 =
      "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");

    setT1(randomColor);
    setT2(randomColor2);
  }
  // function changeColour() {
  //   const randomColor =
  //     "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");

  //   switch (letter) {
  //     case 1:
  //       setT1(randomColor);
  //       setT2("black");
  //       setT3("black");
  //       setT4("black");
  //       setT5("black");
  //       setT6("black");
  //       setT7("black");
  //       setT8("black");
  //       setT9("black");
  //       setT10("black");
  //       setT11("black");
  //       break;
  //     case 2:
  //       setT1("black");
  //       setT2(randomColor);
  //       setT3("black");
  //       setT4("black");
  //       setT5("black");
  //       setT6("black");
  //       setT7("black");
  //       setT8("black");
  //       setT9("black");
  //       setT10("black");
  //       setT11("black");
  //       break;
  //     case 3:
  //       setT1("black");
  //       setT2("black");
  //       setT3(randomColor);
  //       setT4("black");
  //       setT5("black");
  //       setT6("black");
  //       setT7("black");
  //       setT8("black");
  //       setT9("black");
  //       setT10("black");
  //       setT11("black");
  //       break;
  //     case 4:
  //       setT1("black");
  //       setT2("black");
  //       setT3("black");
  //       setT4(randomColor);
  //       setT5("black");
  //       setT6("black");
  //       setT7("black");
  //       setT8("black");
  //       setT9("black");
  //       setT10("black");
  //       setT11("black");
  //       break;
  //     case 5:
  //       setT1("black");
  //       setT2("black");
  //       setT3("black");
  //       setT4("black");
  //       setT5(randomColor);
  //       setT6("black");
  //       setT7("black");
  //       setT8("black");
  //       setT9("black");
  //       setT10("black");
  //       setT11("black");
  //       break;
  //     case 6:
  //       setT1("black");
  //       setT2("black");
  //       setT3("black");
  //       setT4("black");
  //       setT5("black");
  //       setT6(randomColor);
  //       setT7("black");
  //       setT8("black");
  //       setT9("black");
  //       setT10("black");
  //       setT11("black");
  //       break;
  //     case 7:
  //       setT1("black");
  //       setT2("black");
  //       setT3("black");
  //       setT4("black");
  //       setT5("black");
  //       setT6("black");
  //       setT7(randomColor);
  //       setT8("black");
  //       setT9("black");
  //       setT10("black");
  //       setT11("black");
  //       break;
  //     case 8:
  //       setT1("black");
  //       setT2("black");
  //       setT3("black");
  //       setT4("black");
  //       setT5("black");
  //       setT6("black");
  //       setT7("black");
  //       setT8(randomColor);
  //       setT9("black");
  //       setT10("black");
  //       setT11("black");
  //       break;
  //     case 9:
  //       setT1("black");
  //       setT2("black");
  //       setT3("black");
  //       setT4("black");
  //       setT5("black");
  //       setT6("black");
  //       setT7("black");
  //       setT8("black");
  //       setT9(randomColor);
  //       setT10("black");
  //       setT11("black");
  //       break;
  //     case 10:
  //       setT1("black");
  //       setT2("black");
  //       setT3("black");
  //       setT4("black");
  //       setT5("black");
  //       setT6("black");
  //       setT7("black");
  //       setT8("black");
  //       setT9("black");
  //       setT10(randomColor);
  //       setT11("black");
  //       break;
  //     case 11:
  //       setT1("black");
  //       setT2("black");
  //       setT3("black");
  //       setT4("black");
  //       setT5("black");
  //       setT6("black");
  //       setT7("black");
  //       setT8("black");
  //       setT9("black");
  //       setT10("black");
  //       setT11(randomColor);
  //       break;
  //     default:
  //       setT1("black");
  //       setT2("black");
  //       setT3("black");
  //       setT4("black");
  //       setT5("black");
  //       setT6("black");
  //       setT7("black");
  //       setT8("black");
  //       setT9("black");
  //       setT10("black");
  //       setT11(randomColor);
  //   }
  //   setletter(letter + 1);
  //   if (letter == 12) {
  //     setletter(1);
  //   }
  // }
  function Nextgame() {
    setreveal(true);
  }

  return (
    <div>
      {!reveal && (
        <div className="landing">
          <p className="bHeader">
            <span className="ti1" style={{ color: title1 }}>
              C
            </span>{" "}
            <span className="ti2" style={{ color: title1 }}>
              o
            </span>{" "}
            <span className="ti3" style={{ color: title1 }}>
              l
            </span>{" "}
            <span className="ti4" style={{ color: title1 }}>
              o
            </span>{" "}
            <span className="ti5" style={{ color: title1 }}>
              u
            </span>{" "}
            <span className="ti6" style={{ color: title1 }}>
              r
            </span>
          </p>

          <p className="bHeader">
            <span className="ti7" style={{ color: title2 }}>
              B
            </span>{" "}
            <span className="ti8" style={{ color: title2 }}>
              l
            </span>{" "}
            <span className="ti9" style={{ color: title2 }}>
              i
            </span>{" "}
            <span className="ti10" style={{ color: title2 }}>
              n
            </span>{" "}
            <span className="ti11" style={{ color: title2 }}>
              d
            </span>
          </p>

          <button className="Lbutton" onClick={Nextgame}>
            Play!
          </button>
        </div>
      )}

      {reveal && <Game />}
    </div>
  );
}

export default App;
