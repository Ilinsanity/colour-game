import React, { useState } from "react";

function App() {
  return (
    // <div className="cont">
    //   <div className="row1">
    //     <div className="square1"></div>
    //     <div className="square2"></div>
    //     <div className="square3"></div>
    //   </div>
    //   <div className="row2">
    //     <div className="square4"></div>
    //     <div className="square5"></div>
    //     <div className="square6"></div>
    //   </div>
    // </div>

    <table>
      <tr>
        <td className="square1" id="s1"></td>
        <td className="square2" id="s2"></td>
        <td className="square3" id="s3"></td>
      </tr>

      <tr>
        <td className="square4" id="s4"></td>
        <td className="square5" id="s5"></td>
        <td className="square6" id="s6"></td>
      </tr>

      <tr>
        <td className="square7" id="s7"></td>
        <td className="square8" id="s8"></td>
        <td className="square9" id="s9"></td>
      </tr>
    </table>
  );
}

export default App;
