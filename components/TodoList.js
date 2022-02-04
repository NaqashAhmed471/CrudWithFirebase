import React, { useState, useEffect } from "react";

import Todo from "./Todo";

import { db } from "../firebase";

import {
  collection,
  query,
  onSnapshot,
  orderBy,
  where,
} from "firebase/firestore";

import { useAuth } from "../Auth";

const TodoList = ({ todoProps }) => {
  const { currentUser } = useAuth();
  const [todos, setTodos] = useState([]);

  // server side code
  useEffect(() => {
    setTodos(JSON.parse(todoProps));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const collectionRef = collection(db, "todos");

    const q = query(
      collectionRef,
      where("email", "==", currentUser?.email),
      orderBy("timestamp", "desc")
    );

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
