import { useContext, useRef, useEffect } from "react";

import { Button, TextField } from "@mui/material";

import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

import { TodoContext } from "../TodoContext";

const TodoForm = () => {
  const inputAreaRef = useRef();

  const { showAlert, todo, setTodo } = useContext(TodoContext);

  const handleChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // e.preventDefault();
    // update todo
    if (todo?.hasOwnProperty("timestamp")) {
      const docRef = doc(db, "todos", todo.id);
      const todoUpdated = { ...todo, timestamp: serverTimestamp() };
      await updateDoc(docRef, todoUpdated);
      setTodo({ title: "", detail: "" });
      showAlert("success", `Todo with id ${docRef.id} is updated successfully`);
    } else {
      // add new todo
      const collectionRef = collection(db, "todos");
      const docRef = await addDoc(collectionRef, {
        ...todo,
        timestamp: serverTimestamp(),
      });
      setTodo({ title: "", detail: "" });
      showAlert("success", `Todo with id ${docRef.id} is added successfully`);
    }
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (!inputAreaRef.current.contains(e.target)) {
        console.log("Outside input area");
        setTodo({ title: "", detail: "" });
      } else {
        console.log("Inside input area");
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={inputAreaRef}>
      <TextField
        fullWidth
        label="title"
        margin="normal"
        name="title"
        value={todo?.title}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        label="detail"
        multiline
        maxRows={4}
        name="detail"
        value={todo?.detail}
        onChange={handleChange}
      />
      <Button variant="contained" sx={{ mt: 3 }} onClick={handleSubmit}>
        {todo?.hasOwnProperty("timestamp") ? "Update Todo" : "Add New Todo"}
      </Button>
    </div>
  );
};

export default TodoForm;
