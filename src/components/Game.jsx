import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { getDatabase, ref, set } from "firebase/database";
import { firestore } from "../firebase_setup";
import { useRef } from "react";
import { addDoc, collection, doc, getDoc, setDoc } from "@firebase/firestore";
import { async } from "@firebase/util";

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
  const [showlogin, setlogin] = useState(false);
  const [showRegister, setRegister] = useState(false);
  const [currentUsername, setUsername] = useState("");
  const [currentPassword, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [ErrorChange, setErrorChange] = useState("");
  const [hasUser, setHasUser] = useState(false);
  const [currentUserHighscore, setcurrentUserHighscore] = useState(0);
  const [Error, setError] = useState("");
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

  function Register() {
    setlogin(false);
    setRegister(true);
  }

  const ref = collection(firestore, "players");

  const handleSave = async (e) => {
    e.preventDefault();
    let data = {
      Username: "issac",
      Password: "Kewlbeans",
      highscore: 20,
    };

    try {
      addDoc(ref, data);
    } catch (e) {
      console.log(e);
    }
  };
  async function writeUserData() {
    const citiesRef = collection(firestore, "players");

    await setDoc(doc(citiesRef, "Hanni"), {
      username: "Hanni",
      password: "Ipham",
      highscore: 20,
    });
  }

  async function checkForUsername() {
    const docRef = doc(firestore, "players", currentUsername);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return true;
    } else {
      console.log("No such document!");
      return false;
    }
  }

  async function checkLogin() {
    const docRef = doc(firestore, "players", currentUsername);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const object = docSnap.data();
      if (object.password == currentPassword) {
        setHasUser(true);
        const highscore = getHighscore;
        setcurrentUserHighscore(highscore);
        setBg();
      } else {
        setErrorChange("Incorrect Password");
      }
      console.log("Document data:", docSnap.data());
    } else {
      setErrorChange("User does not exist");
      console.log("No such document!");
    }
  }

  async function CheckRegister() {
    const docRef = doc(firestore, "players", currentUsername);
    const docSnap = await getDoc(docRef);
    if (
      currentPassword === ConfirmPassword &&
      currentPassword !== "" &&
      ConfirmPassword !== "" &&
      currentUsername !== ""
    ) {
      if (docSnap.exists()) {
        setErrorChange("Username already exists!");
        console.log("found");
      } else {
        const dbRef = collection(firestore, "players");

        await setDoc(doc(dbRef, currentUsername), {
          username: currentUsername,
          password: currentPassword,
          highscore: 0,
        });
        SLogin();
        setErrorChange("");
        console.log("gone");
      }
    } else if (
      currentUsername == "" ||
      currentPassword == "" ||
      ConfirmPassword == ""
    ) {
      setErrorChange("Missing Field!");
    } else if (currentPassword != ConfirmPassword) {
      setErrorChange("Passwords are not the same");
    }
  }
  async function getHighscore() {
    const docRef = doc(firestore, "players", currentUsername);
    const docSnap = await getDoc(docRef);

    const object = docSnap.data();
    const highscore = object.highscore;
    console.log(highscore);
    setcurrentUserHighscore(highscore);
  }
  function GameOver() {
    getHighscore();

    setend(true);
    setshowgame(false);
    // setStart(false);
  }

  function BackToStart() {
    setStart(true);
    setlogin(false);
    setshowgame(false);
    setend(false);
  }

  function SLogin() {
    setStart(false);
    setlogin(true);
    setRegister(false);
    setErrorChange("");
  }

  function restartGame() {
    setlevel(0);
    setend(false);
    setBg();
  }
  function setBg() {
    console.log(currentUsername);
    setshowgame(true);
    setStart(false);
    setlogin(false);
    var shade = 10;

    // const randomColor = "rgb(" + r + "," + g + "," + b + ")";
    const randomColor =
      "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
    const randomsquare = Math.floor(Math.random() * 9);

    var num = Math.random() <= 0.5 ? 1 : 2;
    if (level <= 5) {
      if (num == 1) {
        shade = 80;
      } else {
        shade = -80;
      }
    } else if (level > 5 && level <= 10) {
      if (num == 1) {
        shade = 70;
      } else {
        shade = -70;
      }
    } else if (level > 10 && level <= 15) {
      if (num == 1) {
        shade = 60;
      } else {
        shade = -60;
      }
    } else if (level > 10 && level <= 15) {
      if (num == 1) {
        shade = 50;
      } else {
        shade = -50;
      }
    } else if (level > 15 && level <= 20) {
      if (num == 1) {
        shade = 40;
      } else {
        shade = -40;
      }
    } else if (level > 20 && level <= 25) {
      if (num == 1) {
        shade = 30;
      } else {
        shade = -30;
      }
    } else if (level > 25 && level <= 30) {
      if (num == 1) {
        shade = 20;
      } else {
        shade = -20;
      }
    } else if (level > 30 && level <= 35) {
      if (num == 1) {
        shade = 10;
      } else {
        shade = -10;
      }
    } else if (level > 35) {
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
          {hasUser && (
            <h3 className="profile">
              <i class="fas fa-user"></i>
              {currentUsername}
            </h3>
          )}
          <p className="GameOverTitle">Game Over</p>

          <p className="score">Your Score: {level}</p>
          <p className="prevscore">Your Score: {currentUserHighscore}</p>
          <div className="results">
            <table>
              <tr>
                <td
                  className="endcircle1"
                  id="s1"
                  style={{
                    backgroundColor: c1,
                    border:
                      correct == "s1" ? "4px dashed green" : "2px solid black",
                  }}
                ></td>
                <td
                  className="endcircle2"
                  id="s2"
                  style={{
                    backgroundColor: c2,
                    border:
                      correct == "s2" ? "4px dashed green" : "2px solid black",
                  }}
                ></td>
                <td
                  className="endcircle3"
                  id="s3"
                  style={{
                    backgroundColor: c3,
                    border:
                      correct == "s3" ? "4px dashed green" : "2px solid black",
                  }}
                ></td>
              </tr>

              <tr>
                <td
                  className="endcircle4"
                  id="s4"
                  style={{
                    backgroundColor: c4,
                    border:
                      correct == "s4" ? "4px dashed green" : "2px solid black",
                  }}
                ></td>
                <td
                  className="endcircle5"
                  id="s5"
                  style={{
                    backgroundColor: c5,
                    border:
                      correct == "s5" ? "4px dashed green" : "2px solid black",
                  }}
                ></td>
                <td
                  className="endcircle6"
                  id="s6"
                  style={{
                    backgroundColor: c6,
                    border:
                      correct == "s6" ? "4px dashed green" : "2px solid black",
                  }}
                ></td>
              </tr>

              <tr>
                <td
                  className="endcircle7"
                  id="s7"
                  style={{
                    backgroundColor: c7,
                    border:
                      correct == "s7" ? "4px dashed green" : "2px solid black",
                  }}
                ></td>
                <td
                  className="endcircle8"
                  id="s8"
                  style={{
                    backgroundColor: c8,
                    border:
                      correct == "s8" ? "4px dashed green" : "2px solid black",
                  }}
                ></td>
                <td
                  className="endcircle9"
                  id="s9"
                  style={{
                    backgroundColor: c9,
                    border:
                      correct == "s9" ? "4px dashed green" : "2px solid black",
                  }}
                ></td>
              </tr>
            </table>
          </div>

          <button className="Restartbutton" onClick={restartGame}>
            Try Again
          </button>
          <button className="Restartbutton">Check LeaderBoard</button>
          <button className="Restartbutton" onClick={BackToStart}>
            Back to Main Screen
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
          {hasUser && (
            <h3 className="profile">
              <i class="fas fa-user"></i>
              {currentUsername}
            </h3>
          )}

          <h2 className="title">Colour</h2>
          <h2 className="title2">Game</h2>
          <button className="colourbutton" onClick={setBg}>
            Start Game
          </button>
          <br></br>
          <button className="colourbutton-2" onClick={SLogin}>
            Login/Register
          </button>
        </div>
      )}

      {showlogin && (
        <div className="LoginContainer">
          <h1 className="logintitle">Welcome</h1>
          <TextField
            className="Username"
            id="standard-basic"
            label="Username"
            variant="standard"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            className="Password"
            id="standard-basic"
            label="Password"
            variant="standard"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={checkLogin} className="loginbutton">
            Log In
          </button>
          <p className="error">{ErrorChange}</p>
          <button onClick={Register} className="loginbutton">
            Register
          </button>
          <button onClick={BackToStart} className="loginbutton">
            Back To Game
          </button>
        </div>
      )}

      {showRegister && (
        <div>
          <div className="LoginContainer">
            <h1 className="logintitle">Register</h1>
            <TextField
              className="Username"
              id="standard-basic"
              label="Username"
              variant="standard"
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              className="Password"
              id="standard-basic"
              label="Password"
              variant="standard"
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              className="Password"
              id="standard-basic"
              label="Confirm Password"
              variant="standard"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={CheckRegister} className="loginbutton">
              Register
            </button>
            <p className="error">{ErrorChange}</p>
            <button onClick={SLogin} className="loginbutton">
              Back to Login
            </button>
          </div>
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
