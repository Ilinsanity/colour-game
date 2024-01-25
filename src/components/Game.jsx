import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { getDatabase, ref, set } from "firebase/database";
import { firestore } from "../firebase_setup";
import { useRef } from "react";

import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "@firebase/firestore";
import { async } from "@firebase/util";

function Game() {
  document.addEventListener("contextmenu", (event) => event.preventDefault());
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

  const [timed, settimed] = useState(false);
  const [correct, setcorrect] = useState("c");
  const [showgame, setshowgame] = useState(false);
  const [showstart, setStart] = useState(true);
  const [endgame1, setend1] = useState(false);
  const [endgame2, setend2] = useState(false);
  const [showlogin, setlogin] = useState(false);
  const [showRegister, setRegister] = useState(false);
  const [currentUsername, setUsername] = useState("");
  const [currentPassword, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [ErrorChange, setErrorChange] = useState("");
  const [hasUser, setHasUser] = useState(false);
  const [currentUserHighscore, setcurrentUserHighscore] = useState(0);
  const [isLoggedin, setloggedIn] = useState(false);
  const [LeaderBoard1, setLeaderBoard1] = useState([]);
  const [LeaderBoard2, setLeaderBoard2] = useState([]);
  const [LeaderBoard3, setLeaderBoard3] = useState([]);
  const [timedBoard1, settimedBoard1] = useState([]);
  const [timedBoard2, settimedBoard2] = useState([]);
  const [timedBoard3, settimedBoard3] = useState([]);
  const [leaderboardPage, setLeaderboardPage] = useState(false);
  const [toggleLeaderboard, setToggleLeaderboard] = useState(false);
  // const [cdown, setcdown] = useState(10);
  const uuid = require("uuid");
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

  useEffect(() => {
    fetchLeaderBoard();
    fetchtimedBoard();
  }, []);

  async function fetchLeaderBoard() {
    const colRef = collection(firestore, "normal");
    const docsSnap = await getDocs(colRef);

    const array = [];
    docsSnap.forEach((doc) => {
      array.push(doc.data());
    });
    array.sort((a, b) => {
      return b.score - a.score;
    });
    const size1 = Math.min(array.length, 20);
    const size2 = Math.min(array.length - size1, 20);
    const size3 = Math.max(array.length - size1 - size2, 10);

    const firstChunk = array.slice(0, size1);
    const secondChunk = array.slice(size1, size1 + size2);
    const lastChunk = array.slice(size1 + size2, size1 + size2 + size3);
    setLeaderBoard1(firstChunk);
    setLeaderBoard2(secondChunk);
    setLeaderBoard3(lastChunk);
  }

  async function fetchtimedBoard() {
    const colRef = collection(firestore, "timed");
    const docsSnap = await getDocs(colRef);

    const array = [];
    docsSnap.forEach((doc) => {
      array.push(doc.data());
    });
    array.sort((a, b) => {
      return b.score - a.score;
    });

    const size1 = Math.min(array.length, 20);
    const size2 = Math.min(array.length - size1, 20);
    const size3 = Math.max(array.length - size1 - size2, 10);

    const firstChunk = array.slice(0, size1);
    const secondChunk = array.slice(size1, size1 + size2);
    const lastChunk = array.slice(size1 + size2, size1 + size2 + size3);
    settimedBoard1(firstChunk);
    settimedBoard2(secondChunk);
    settimedBoard3(lastChunk);
  }

  function Register() {
    setlogin(false);
    setRegister(true);
  }

  function generateRandomUserId() {
    // Generate a v4 UUID
    const userId = uuid.v4();

    return userId;
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
    } catch (e) {}
  };
  async function writeUserData() {
    const playersRef = collection(firestore, "players");

    await setDoc(doc(playersRef, "Hanni"), {
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
        const highscore = getHighscore();
        setcurrentUserHighscore(highscore);
        setBg();
        setloggedIn(true);
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
    const randomID = generateRandomUserId();
    const docRef = doc(firestore, "players", currentUsername);
    const docSnap = await getDoc(docRef);
    if (timed) {
      const dbRef = collection(firestore, "timed");
      await setDoc(doc(dbRef, randomID), {
        username: currentUsername,
        score: level,
      });
      setErrorChange("");
      console.log(currentUsername, level);
      GameOver2();
    } else {
      const dbRef = collection(firestore, "normal");
      await setDoc(doc(dbRef, randomID), {
        username: currentUsername,
        score: level,
      });
      setErrorChange("");
      console.log(currentUsername, level);
      GameOver2();
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
    setend1(true);
    // setshowgame(false);
    // getHighscore();
    // const docRef = doc(firestore, "players", currentUsername);
    // if (currentUserHighscore < level) {
    //   const updates = {
    //     highscore: level,
    //   };

    //   updateDoc(docRef, updates);
    // }

    // setStart(false);
  }
  function GameOver2() {
    setend1(false);
    setend2(true);
  }

  function BackToStart() {
    setStart(true);
    setlogin(false);
    setshowgame(false);
    setend1(false);
    setend2(false);
    setlevel(0);
    fetchLeaderBoard();
    setLeaderboardPage(false);
    stopCounter();
  }

  function Logout() {
    setUsername("");
    setPassword("");
    setloggedIn(false);
    setHasUser(false);
  }

  function SLogin() {
    setStart(false);
    setlogin(true);
    setRegister(false);
    setErrorChange("");
  }

  function restartGame() {
    setlevel(0);
    setend2(false);
    setBg();
  }

  function showLeaderboard() {
    fetchLeaderBoard();
    fetchtimedBoard();
    setLeaderboardPage(true);
    setStart(false);
    setlogin(false);
  }

  function setLeaderBoardRegular() {
    setToggleLeaderboard(false);
  }

  function setLeaderBoardTimed() {
    setToggleLeaderboard(true);
  }

  function timedgame() {
    settimed(true);
    setBg();
  }

  function normalgame() {
    settimed(false);
    setBg();
  }

  function setBg() {
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
        shade = 50;
      } else {
        shade = -50;
      }
    } else if (level > 5 && level <= 10) {
      if (num == 1) {
        shade = 45;
      } else {
        shade = -45;
      }
    } else if (level > 10 && level <= 15) {
      if (num == 1) {
        shade = 40;
      } else {
        shade = -40;
      }
    } else if (level > 10 && level <= 15) {
      if (num == 1) {
        shade = 35;
      } else {
        shade = -35;
      }
    } else if (level > 15 && level <= 20) {
      if (num == 1) {
        shade = 30;
      } else {
        shade = -30;
      }
    } else if (level > 20 && level <= 25) {
      if (num == 1) {
        shade = 25;
      } else {
        shade = -25;
      }
    } else if (level > 25 && level <= 30) {
      if (num == 1) {
        shade = 15;
      } else {
        shade = -15;
      }
    } else if (level > 30 && level <= 35) {
      if (num == 1) {
        shade = 10;
      } else {
        shade = -10;
      }
    } else if (level > 35 && level <= 40) {
      if (num == 1) {
        shade = 9;
      } else {
        shade = -9;
      }
    } else if (level > 40 && level <= 45) {
      if (num == 1) {
        shade = 8;
      } else {
        shade = -8;
      }
    } else if (level > 45 && level <= 50) {
      if (num == 1) {
        shade = 7;
      } else {
        shade = -7;
      }
    } else if (level > 50 && level <= 55) {
      if (num == 1) {
        shade = 6;
      } else {
        shade = -6;
      }
    } else if (level > 55 && level <= 60) {
      if (num == 1) {
        shade = 5;
      } else {
        shade = -5;
      }
    } else if (level > 60 && level <= 65) {
      if (num == 1) {
        shade = 4;
      } else {
        shade = -4;
      }
    } else if (level > 65 && level <= 70) {
      if (num == 1) {
        shade = 3;
      } else {
        shade = -3;
      }
    } else if (level > 70 && level <= 75) {
      if (num == 1) {
        shade = 2;
      } else {
        shade = -2;
      }
    } else if (level > 75 && level <= 80) {
      if (num == 1) {
        shade = 1.9;
      } else {
        shade = -1.9;
      }
    } else if (level > 80) {
      if (num == 1) {
        shade = 1.7;
      } else {
        shade = -1.7;
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
  const [refreshId, setRefreshId] = useState();
  function StartTimer() {
    document.getElementById("countdown").innerText = 10;
    let seconds = 10;
    const myInterval = setInterval(function () {
      seconds--;
      document.getElementById("countdown").innerText = seconds;
      if (seconds < 0) {
        document.getElementById("countdown").innerText = 10;
        clearInterval(myInterval);

        // Call your function when seconds hits 0
        GameOver();
      }
    }, 1000);

    setRefreshId(myInterval);
  }

  const stopCounter = () => {
    clearInterval(refreshId);
  };
  let started = false;
  let timeoutId;
  let counterValue = 0;

  const CheckA = (e) => {
    const c = e.target.getAttribute("id");

    if (c == correct) {
      setBg();
      if (timed) {
        StartTimer();
        stopCounter();
      }

      setlevel(level + 1);
    } else {
      GameOver();
    }
  };

  // document.addEventListener("DOMContentLoaded", function () {
  //   // Trigger the animation when the page is loaded
  //   animateLetters("Colour");
  // });

  // function animateLetters(word) {
  //   // Select all the spans inside the animated-word div
  //   var letters = document.querySelectorAll(".colanim span");

  //   // Loop through each letter and apply the animation
  //   letters.forEach(function (letter, index) {
  //     // Calculate a delay based on the index to stagger the animation
  //     var delay = index * 0.5; // Adjust the delay as needed

  //     // Apply the animation and delay
  //     letter.style.animation =
  //       "slideUp 0.8s ease-in-out forwards" + delay + "s";
  //   });
  // }
  return (
    <div className="gamecont">
      {endgame1 && (
        <div className="Gameovercont z-20 absolute flex justify-center items-center">
          <div className="bg-gameoverbrush gameover-brush absolute flex"></div>
          <div className="mobile-gameover"></div>
          <div className="w-full sm:w-3/4 h-max p-24 pt-32 rounded relative mobilegameovercont">
            <p className="GameOverTitle text-white lineh-06 text-[6rem] sm:text-[8rem]">
              Game Over!
            </p>

            <p className="downhere text-5xl sm:text-4xl text-score">
              Score: {level}
            </p>

            <div className="results">
              <table className="endtab">
                <tr>
                  <td
                    className="endcircle1"
                    id="s1"
                    style={{
                      backgroundColor: c1,
                      border:
                        correct == "s1"
                          ? "4px dashed green"
                          : "2px solid black",
                    }}
                  ></td>
                  <td
                    className="endcircle2"
                    id="s2"
                    style={{
                      backgroundColor: c2,
                      border:
                        correct == "s2"
                          ? "4px dashed green"
                          : "2px solid black",
                    }}
                  ></td>
                  <td
                    className="endcircle3"
                    id="s3"
                    style={{
                      backgroundColor: c3,
                      border:
                        correct == "s3"
                          ? "4px dashed green"
                          : "2px solid black",
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
                        correct == "s4"
                          ? "4px dashed green"
                          : "2px solid black",
                    }}
                  ></td>
                  <td
                    className="endcircle5"
                    id="s5"
                    style={{
                      backgroundColor: c5,
                      border:
                        correct == "s5"
                          ? "4px dashed green"
                          : "2px solid black",
                    }}
                  ></td>
                  <td
                    className="endcircle6"
                    id="s6"
                    style={{
                      backgroundColor: c6,
                      border:
                        correct == "s6"
                          ? "4px dashed green"
                          : "2px solid black",
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
                        correct == "s7"
                          ? "4px dashed green"
                          : "2px solid black",
                    }}
                  ></td>
                  <td
                    className="endcircle8"
                    id="s8"
                    style={{
                      backgroundColor: c8,
                      border:
                        correct == "s8"
                          ? "4px dashed green"
                          : "2px solid black",
                    }}
                  ></td>
                  <td
                    className="endcircle9"
                    id="s9"
                    style={{
                      backgroundColor: c9,
                      border:
                        correct == "s9"
                          ? "4px dashed green"
                          : "2px solid black",
                    }}
                  ></td>
                </tr>
              </table>
            </div>
            <div className="flex flex-col w-max m-auto items-center">
              <p className="downhere text-lb text-lg">
                Please enter and submit your name to SAVE score
              </p>
              <div className="flex name-input ">
                <p className="text-5xl inscore mr-3">Name:</p>
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  id="ScoreName"
                  name="NameField"
                  maxlength="50"
                  className=" text-5xl inscore text-white"
                  required
                ></input>
              </div>
              <input
                type="submit"
                value=" "
                className="bg-submitbutton submit-button mt-3 mb-1 hover:scale-110"
                onClick={CheckRegister}
              ></input>

              <p
                className="downhere underline text-white skip hover:scale-110"
                onClick={GameOver2}
              >
                Skip
              </p>
            </div>

            {/* <button className="Restartbutton" onClick={restartGame}>
              Try Again
            </button>
            <button className="Restartbutton" onClick={BackToStart}>
              Back to Main Screen
            </button> */}
          </div>
        </div>
      )}

      {endgame2 && (
        <div className="Gameovercont z-20 absolute flex justify-center items-center">
          <div className="bg-gameoverbrush gameover-brush absolute flex"></div>
          <div className="mobile-gameover"></div>

          <div className="w-3/4 h-max p-24 pt-32 rounded relative flex justify-center ">
            <div className="sm:w-14 sm:h-14 sm:absolute sm:top-12rem mr-custom2 custom-home-margin pointer">
              <div
                className="bg-home2 bg-cover w-14 h-14 pointer transition ease-in-out hover:-translate-y-1 hover:scale-110  duration-300"
                onClick={BackToStart}
              ></div>
            </div>
            <p
              className="GameOverTitle text-white lineh-07 pointer flex justify-center items-center transition ease-in-out hover:-translate-y-1 hover:scale-110  duration-300"
              onClick={restartGame}
            >
              <span className="arrowspan flex justify-center items-center mr-4">
                &gt;
              </span>
              <span className="play-again">Play Again?</span>
            </p>

            {/* <button className="Restartbutton" onClick={restartGame}>
              Try Again
            </button>
            <button className="Restartbutton" onClick={BackToStart}>
              Back to Main Screen
            </button> */}
          </div>
        </div>
      )}

      {showgame && (
        <div className="w-screen h-screen flex flex-col justify-center items-center z-10 absolute">
          <div
            className="bg-home bg-cover w-14 h-14 absolute top-10 left-20 pointer transition ease-in-out hover:-translate-y-1 hover:scale-110  duration-300"
            onClick={BackToStart}
          ></div>
          <div className="bg-gamebrush w-screen h-500 z-neg1 absolute max-sm gamebrush"></div>
          <div className="w-screen h-3/5 flex flex-col justify-center items-center">
            {timed && (
              <div className="flex sm:absolute sm:top-1/4 sm:left-1/4 items-center color-beige p-4 rounded-lg">
                <div className="bg-clock clock-di"></div>
                <p
                  className="downhere text-7xl ml-3 color-white"
                  id="countdown"
                >
                  10
                </p>
              </div>
            )}
            <table className="">
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

            <div className="levelcont flex justify-center items-center">
              <div className="h-6 w-52 bg-linescore bg-cover "></div>
              <h1
                className="sister text-9xl ml-8 mr-8 "
                style={{ color: lvlColour }}
              >
                {level}
              </h1>
              <div className="h-6 w-52 bg-linescore bg-cover "></div>
            </div>
            <div className="absolute sm:left-20 sm:w-56 sm:rotate-24 sm:bottom-56 bottom-0 flex flex-col">
              <p className="jah text-2xl text-black sm:text-white">
                How To Play
              </p>
              <p className="jah text-1xl text-black sm:text-white">
                Pick the colour that doesn’t match the rest!!!! Tip: Turn your
                brightness up ;){" "}
              </p>
            </div>
          </div>
        </div>
      )}

      {showstart && (
        <div className="">
          <div className="start-mobile absolute z-20"></div>
          <div className="w-screen h-1/2 sm:h-80 flex  bg-no-repeat bg-cover bg-bottom fixed z-30 -bottom-6 justify-center svg-cont ">
            <div className=" flex flex-col items-center justify-center ">
              <div className=" flex flex-col items-center justify-center">
                <div
                  className="flex mr-40 transition ease-in-out hover:-translate-y-1 hover:scale-110  duration-300 absolute top-4"
                  onClick={normalgame}
                >
                  <div className="bg-arrow bg-contain bg-no-repeat h-38 w-48 mr-4 mt-4 inline-block rot pointer"></div>
                  <div className="flex flex-col text-center startanimation pointer">
                    <p className="text-6xl sm:text-8xl sister text-sg start-game">
                      Start Game!
                    </p>
                    <p className="text-4xl downhere-small text-white sm:absolute sm:top-20 sm:left-24 rotate-18 mobile-header">
                      play with unlimited time
                    </p>
                  </div>
                </div>

                <div className="flex  mobile-column">
                  <div
                    className="mt-14 mr-20 timedanimation flex flex-col pr-16 transition ease-in-out hover:-translate-y-1 hover:scale-110  duration-300"
                    onClick={timedgame}
                  >
                    <p className="pointer text-6xl ml-3 sm:ml-0 downhere text-timed transition ease-in-out hover:-translate-y-1 hover:scale-110  duration-300 ">
                      Timed Challenge
                    </p>
                    <p className="text-2xl text-right sm:text-1xl downhere-small text-white time-header ml-3 sm:absolute sm:top-14 mobile-header">
                      Ready to test your skills?
                    </p>
                  </div>
                  <div
                    className="mt-14 ldbdanimation flex flex-col text-right  transition ease-in-out  hover:-translate-y-1 hover:scale-110  duration-300 pointer hover:-translate-y-1 hover:scale-110  duration-300"
                    onClick={showLeaderboard}
                  >
                    <p className="text-6xl mr-3 downhere text-ldbd leaderboard-butt transition ease-in-out hover:-translate-y-1 hover:scale-110  duration-300">
                      LeaderBoards
                    </p>
                    <p className="text-2xl text-left downhere-small text-white leaderboard-head sm:absolute sm:top-14 sm:-right-2 mobile-header">
                      Check out the top scores!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-screen h-screen flex justify-start items-start z-20 relative ">
            <div className="flex mt-12 sm:absolute bottom-100 sm:left-56 z-20 mobile-top">
              <div className="flex flex-col relative">
                <p className="jah1 text-black p-0 color-title">
                  <span className="text-c1 colanim">C</span>
                  <span className="text-c2 colanim">o</span>
                  <span className="text-c3 colanim">l</span>
                  <span className="text-c4 colanim">o</span>
                  <span className="text-c5 colanim">u</span>
                  <span className="text-c6 colanim">r</span>
                </p>
                <div className="h-6 w-full bg-nund bg-contain bg-no-repeat absolute bottom-9 dashline"></div>
                <p className="logo-grey nanum text-4xl absolute bottom-0 ml-3">
                  By Issac Lin
                </p>
              </div>
              <div className="relative">
                <p className="jah logo-grey text-7xl absolute bottom-8 blind ml-2 mt-3">
                  Blind
                </p>
              </div>
            </div>
            <div className="meshstyle bg-mesh bg-no-repeat bg-contain bg-center z-10 absolute right-0 sm:right-40 sm:top-0 sm:mr-12"></div>
            <div className="w-screen h-screen flex items-center justify-end bg-bluepaint bg-no-repeat bg-contain bg-bottom absolute z-30 bot-0 "></div>
          </div>
          {/* landgrad*/}
          <div className="w-screen h-screen landgrad bg-white absolute z-10 top-0"></div>

          {/* {hasUser && (
              <h3 className="profile">
                <i class="fas fa-user"></i>
                {currentUsername}
              </h3>
            )} */}
          {/* <div className="leaderboardcont">
              <p className="ldbd">LeaderBoard</p>
              {LeaderBoard.map((plyr, index) => {
                return (
                  <div>
                    <p className="plyrUsername">
                      {" "}
                      #{index + 1} {plyr.username}
                    </p>
                    <p className="plyrScore">{plyr.highscore}</p>
                  </div>
                );
              })}
            </div> */}

          {/* <button className="colourbutton" onClick={setBg}>
              Start Game
            </button> */}
          {/* <div className="w-screen h-screen flex flex-col justify-center items-center z-20 relative ">
            <p className="text-9xl name text-white">Issac</p>
            <p className="text-9xl name text-gold ">Lin</p> */}
          {/* <p className="text-4xl text-gold"> Now this is Epic</p> */}
          {/* </div> */}
          {/* {isLoggedin ? (
              <button className="colourbutton-2" onClick={Logout}>
                Log Out
              </button>
            ) : (
              <button className="colourbutton-2" onClick={SLogin}>
                Login/Register
              </button>
            )} */}

          {/* <div className="w-screen h-screen bg-white bg-cover bg-center absolute z-10 top-0 bg-fixed"></div> */}
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

      {leaderboardPage && (
        <div className="w-screen h-screen flex flex-col justify-left items-left z-10 absolute">
          <div
            className="bg-home bg-cover w-14 h-14 absolute top-10 left-20 pointer transition ease-in-out hover:-translate-y-1 hover:scale-110  duration-300 z-50"
            onClick={BackToStart}
          ></div>
          <div className="bg-purplebru w-full h-full fixed bg-cover"></div>
          <div className="leaderboard-container z-50">
            <div className="leaderboard-title-container sister-leaderboard ">
              <h1 className="leaderboard-title">Leaderboards</h1>
              <div className="leaderboard-section-container ">
                <h4
                  className={
                    !toggleLeaderboard
                      ? "selectedLeaderboard pointer"
                      : "pointer hover:scale-105"
                  }
                  onClick={() => setToggleLeaderboard(false)}
                >
                  Regular
                </h4>
                <div>|</div>
                <h4
                  className={
                    toggleLeaderboard
                      ? "selectedLeaderboard pointer"
                      : "pointer hover:scale-105"
                  }
                  onClick={() => setToggleLeaderboard(true)}
                >
                  Timed
                </h4>
              </div>
            </div>

            {!toggleLeaderboard && (
              <div className="leaderboard-body downhere">
                <div className="leaderboard-column">
                  <table className="leaderboard-table">
                    <tr>
                      <td className="leaderboard-data underline">Rank</td>
                      <h3></h3>
                      <td className="leaderboard-data text-center underline">
                        Name
                      </td>
                      <h3></h3>
                      <td className="leaderboard-data underline">Score</td>
                    </tr>

                    {LeaderBoard1.map((plyr, index) => {
                      return (
                        <tr>
                          <td className="leaderboard-data">#{index + 1}</td>
                          <h3></h3>
                          <td className="leaderboard-data pr-2">
                            {plyr.username}
                          </td>
                          <h3></h3>
                          <td className="leaderboard-data">{plyr.score}</td>
                        </tr>
                      );
                    })}
                  </table>
                </div>

                <div className="leaderboard-column">
                  <table className="leaderboard-table">
                    <tr>
                      <td className="leaderboard-data underline">Rank</td>
                      <h3></h3>
                      <td className="leaderboard-data underline">Name</td>
                      <h3></h3>
                      <td className="leaderboard-data underline">Score</td>
                    </tr>
                    {LeaderBoard2.map((plyr, index) => {
                      return (
                        <tr>
                          <td className="leaderboard-data">
                            #{index + 1 + 20}
                          </td>
                          <h3></h3>
                          <td className="leaderboard-data pr-2">
                            {plyr.username}
                          </td>
                          <h3></h3>
                          <td className="leaderboard-data">{plyr.score}</td>
                        </tr>
                      );
                    })}
                  </table>
                </div>

                <div className="leaderboard-column">
                  <table className="leaderboard-table">
                    <tr>
                      <td className="leaderboard-data underline">Rank</td>
                      <h3></h3>
                      <td className="leaderboard-data underline">Name</td>
                      <h3></h3>
                      <td className="leaderboard-data underline">Score</td>
                    </tr>
                    {LeaderBoard3.map((plyr, index) => {
                      return (
                        <tr>
                          <td className="leaderboard-data">
                            #{index + 1 + 40}
                          </td>
                          <h3></h3>
                          <td className="leaderboard-data pr-2">
                            {plyr.username}
                          </td>
                          <h3></h3>
                          <td className="leaderboard-data">{plyr.score}</td>
                        </tr>
                      );
                    })}
                  </table>
                </div>
              </div>
            )}
            {toggleLeaderboard && (
              <div className="leaderboard-body downhere">
                <div className="leaderboard-column">
                  <table className="leaderboard-table">
                    <tr>
                      <td className="leaderboard-data underline">Rank</td>
                      <h3></h3>
                      <td className="leaderboard-data text-center underline">
                        Name
                      </td>
                      <h3></h3>
                      <td className="leaderboard-data underline">Score</td>
                    </tr>

                    {timedBoard1.map((plyr, index) => {
                      return (
                        <tr>
                          <td className="leaderboard-data ">#{index + 1}</td>
                          <h3></h3>
                          <td className="leaderboard-data pr-2">
                            {plyr.username}
                          </td>
                          <h3></h3>
                          <td className="leaderboard-data">{plyr.score}</td>
                        </tr>
                      );
                    })}
                  </table>
                </div>

                <div className="leaderboard-column">
                  <table className="leaderboard-table">
                    <tr>
                      <td className="leaderboard-data">Rank</td>
                      <h3></h3>
                      <td className="leaderboard-data">Name</td>
                      <h3></h3>
                      <td className="leaderboard-data">Score</td>
                    </tr>
                    {timedBoard2.map((plyr, index) => {
                      return (
                        <tr>
                          <td className="leaderboard-data">
                            #{index + 1 + 20}
                          </td>
                          <h3></h3>
                          <td className="leaderboard-data pr-2">
                            {plyr.username}
                          </td>
                          <h3></h3>
                          <td className="leaderboard-data">{plyr.score}</td>
                        </tr>
                      );
                    })}
                  </table>
                </div>

                <div className="leaderboard-column">
                  <table className="leaderboard-table">
                    <tr>
                      <td className="leaderboard-data">Rank</td>
                      <h3></h3>
                      <td className="leaderboard-data">Name</td>
                      <h3></h3>
                      <td className="leaderboard-data">Score</td>
                    </tr>
                    {timedBoard3.map((plyr, index) => {
                      return (
                        <tr>
                          <td className="leaderboard-data">
                            #{index + 1 + 40}
                          </td>
                          <h3></h3>
                          <td className="leaderboard-data pr-2">
                            {plyr.username}
                          </td>
                          <h3></h3>
                          <td className="leaderboard-data">{plyr.score}</td>
                        </tr>
                      );
                    })}
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Game;
