import React, { useState, useEffect } from "react";

import Todo from "./Todo";

import { db } from "../firebase";

import { collection, query, onSnapshot, orderBy } from "firebase/firestore";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const collectionRef = collection(db, "todos");

    const q = query(collectionRef, orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      setTodos(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          timestamp: doc.data().timestamp?.toDate().getTime(),
        }))
      );

      return await unsubscribe;
    });
  }, []);

  return (
    <div>
      {todos?.map((todo) => (
        <Todo
          key={todo.id}
          id={todo.id}
          title={todo.title}
          detail={todo.detail}
          timestamp={todo.timestamp}
        />
      ))}
    </div>
  );
};

export default TodoList;
