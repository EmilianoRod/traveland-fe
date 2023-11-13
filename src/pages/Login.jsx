import {
  Avatar,
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validEmail, setValidEmail] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [notSuccess, setNotSuccess] = useState();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const usuario = {
      email: email,
      password: password,
    };
    if (!error) {
      setNotSuccess("");
      fetch("http://localhost:8081/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setLoading(false);
          if (data.token) {
            localStorage.setItem("token", "Bearer " + data.token);
            localStorage.setItem("email", data.email);
            window.location.replace("/");
          }else{
            setNotSuccess("Credenciales incorrectas");
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
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
        <form
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          onSubmit={handleSubmit}
        >
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
            type={"password"}
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
          {loading ? (
            <CircularProgress sx={{ display: "block", marginLeft: "auto", marginRight: "auto" }} size={50} />
          ) : null}
          {notSuccess ? (
            <Typography variant="caption" sx={{ color: "red" }}>
              {notSuccess}
            </Typography>
          ) : null}
        </form>
      </Paper>
    </Grid>
  );
}

export default Login;
