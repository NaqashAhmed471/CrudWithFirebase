import { useContext } from "react";

import { TodoContext } from "../TodoContext";

import { IconButton, ListItem, ListItemText } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import moment from "moment";

import { db } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";

import { useRouter } from "next/router";

const Todo = ({ id, title, detail, timestamp }) => {
  const { showAlert, setTodo } = useContext(TodoContext);

  const router = useRouter();

  const deleteTodo = async (id, e) => {
    e.stopPropagation();
    const deleteRef = doc(db, "todos", id);
    await deleteDoc(deleteRef);
    showAlert("error", `Todo with id ${id} deleted successfully`);
  };

  const seeMore = (id, e) => {
    e.stopPropagation();
    router.push(`/todos/${id}`);
  };

  return (
    <ListItem
      sx={{ mt: 3, boxShadow: 3 }}
      style={{ backgroundColor: "#FAFAFA" }}
      secondaryAction={
        <>
          <IconButton
            onClick={(e) => {
              deleteTodo(id, e);
            }}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={() => setTodo({ id, title, detail, timestamp })}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={(e) => seeMore(id, e)}>
            <MoreVertIcon />
          </IconButton>
        </>
      }
    >
      <ListItemText
        primary={title}
        secondary={moment(timestamp).format("MMM Do, YY")}
      />
    </ListItem>
  );
};

export default Todo;
