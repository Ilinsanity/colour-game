import { firestore } from "../firebase_setup";
import { useRef } from "react";
import { addDoc, collection } from "@firebase/firestore";

function Board() {
  const messageRef = useRef();
  const ref = collection(firestore, "players");

  const handleSave = async (e) => {
    e.preventDefault();
    console.log(messageRef.current.value);
    let data = {
      player: messageRef.current.value,
    };

    try {
      addDoc(ref, data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <form onSubmit={handleSave}>
        <input type="text" ref={messageRef} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default Board;
