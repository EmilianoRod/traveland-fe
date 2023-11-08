import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validEmail, setValidEmail] = useState();
  const [error, setError] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    const usuario = {
      email: email,
      password: password,
    }
    if(!error){
        fetch("http://13.58.107.197/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(usuario),
        }).then((response) => response.json()).then((data) => {
          console.log(data);
        })
    }
  }

  return (
    <Grid sx={{ mt: 25 }}>
      <Paper
        elevation={20}
        sx={{ padding: "30px 20px", width: 300, margin: "20px auto" }}
      >
        <Grid align="center">
          <Avatar sx={{ backgroundColor: "#005F6B" }}>
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          <h2 style={{ margin: 0 }}>Login</h2>
          <Typography variant="caption" gutterBottom>
            Ingresa tus datos para iniciar sesion!
          </Typography>
        </Grid>
        <form style={{display: 'flex', flexDirection: 'column', gap: '1rem'}} onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setValidEmail("");
              setError(false);
              if (
                email == "" ||
                email.length < 3 ||
                email.length > 50 ||
                !email.includes("@")
              ) {
                setValidEmail("Debe ingresar un correo electronico valido");
                setError(true);
              }
            }}
          ></TextField>
          {validEmail ? (
            <Typography variant="caption" sx={{ color: "red" }}>
              {validEmail}
            </Typography>
          ) : null}
          <TextField
            fullWidth
            label="Contraseña"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></TextField>

          <Button
            sx={{ display: "block" }}
            type="submit"
            variant="contained"
            color="primary"
          >
            Sign Up
          </Button>
        </form>
      </Paper>
    </Grid>
  );
}

export default Login;
