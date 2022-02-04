import React from "react";

import { Grid, Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

const Login = () => {
  const loginWithGoogle = () => {
    signInWithPopup(auth, provider);
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Button
        variant="contained"
        startIcon={<GoogleIcon />}
        onClick={loginWithGoogle}
      >
        Sign in google
      </Button>
    </Grid>
  );
};

export default Login;
