import { useState } from "react";

import { TodoContext } from "../TodoContext";
import { db } from "../firebase";

import {
  Container,
  Snackbar,
  Alert,
  Typography,
  Box,
  Avatar,
  IconButton,
} from "@mui/material";

import { collection, query, getDocs, orderBy, where } from "firebase/firestore";

import { verifyIdToken } from "../firebaseAdmin";
import nookies from "nookies";

import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

import { useAuth } from "../Auth";
import { auth } from "../firebase";

export default function Home({ todoProps }) {
  const { currentUser } = useAuth();

  const [todo, setTodo] = useState({ title: "", detail: "" });

  const [open, setOpen] = useState(false);

  const [alertType, setAlertType] = useState("success");

  const [alertMessage, setAlertMessage] = useState("");

  const showAlert = (type, msg) => {
    setAlertType(type);
    setAlertMessage(msg);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <TodoContext.Provider value={{ showAlert, todo, setTodo }}>
      <Container maxWidth="sm">
        <Box sx={{ display: "flex", justifyContent: "space-between" }} mt={3}>
          <IconButton onClick={() => auth.signOut()}>
            <Avatar src={currentUser.photoURL} />
          </IconButton>
          <Typography variant="h5">{currentUser.displayName}</Typography>
        </Box>
        <TodoForm />
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={alertType}
            sx={{ width: "100%" }}
          >
            {alertMessage}
          </Alert>
        </Snackbar>
        <TodoList todoProps={todoProps} />
      </Container>
    </TodoContext.Provider>
  );
}

export async function getServerSideProps(context) {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    const { email } = token;
    const collectionRef = collection(db, "todos");
    const q = query(
      collectionRef,
      where("email", "==", email),
      orderBy("timestamp", "desc")
    );
    const querySnapshot = await getDocs(q);
    let todos = [];
    querySnapshot.forEach((doc) => {
      todos.push({
        ...doc.data(),
        id: doc.id,
        timestamp: doc.data().timestamp?.toDate().getTime(),
      });
    });

    return {
      props: {
        todoProps: JSON.stringify(todos) || [],
      },
    };
  } catch (error) {
    return { props: {} };
  }
}
