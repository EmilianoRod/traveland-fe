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

function Register() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [notSuccess, setNotSuccess] = useState();
  const [validName, setValidName] = useState();
  const [validLastName, setValidLastName] = useState();
  const [validEmail, setValidEmail] = useState();
  const [validPhone, setValidPhone] = useState();
  const [validPassword, setValidPassword] = useState();
  const [validConfirmPassword, setValidConfirmPassword] = useState();
  const [loading, setLoading] = useState(false);

  // Se realiza el fetch para crear una nueva cuenta
  function handleSubmit(e) {
    e.preventDefault();
    setValidConfirmPassword("");
    setLoading(true);
    // Se crea el objeto con los datos del usuario
    const usuario = {
      nombre: nombre,
      apellido: apellido,
      email: email,
      telefono: telefono,
      password: password,
    };
    // Se realizan validaciones y se pasa el error en caso que este exista
    if (password !== confirmPassword) {
      setValidConfirmPassword("Las contraseñas no coinciden");
    }
    // Si el password no es vacio, y coincide con la confirmacion, y no existen errores, se crea la cuenta
    if (password !== "" && password === confirmPassword && !error) {
      fetch("http://107.20.56.84/auth/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
      })
        .then((response) => response.json())
        .then((data) => {
          setSuccess(
            "Cuenta creada exitosamente, revise su correo para confirmar su cuenta"
          );
          console.log(usuario);
          setNombre("");
          setApellido("");
          setEmail("");
          setTelefono("");
          setPassword("");
          setConfirmPassword("");
          setLoading(false);
        }).catch((error) => {
            console.log(error);
            setLoading(false);
            setNotSuccess("Hubo un error al crear la cuenta");
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
          <h2 style={{ margin: 0 }}>Registrarse</h2>
          <Typography variant="caption" gutterBottom>
            Por favor, llena el siguiente formulario para crear una cuenta
          </Typography>
        </Grid>
        <form  style={{display: 'flex', flexDirection: 'column', gap: '1rem'}} onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Nombre"
            value={nombre}
            onChange={(e) => {
              setNombre(e.target.value);
              setValidName("");
              setError(false);
              if (nombre == "" || nombre.length < 3 || nombre.length > 30) {
                setValidName("El nombre debe tener entre 3 y 30 caracteres");
                setError(true);
              }
            }}
          ></TextField>
          {validName ? (
            <Typography variant="caption" sx={{ color: "red" }}>
              {validName}
            </Typography>
          ) : null}
          <TextField
            fullWidth
            label="Apellido"
            value={apellido}
            onChange={(e) => {
              setApellido(e.target.value);
              setValidLastName("");
              setError(false);
              if (
                apellido == "" ||
                apellido.length < 3 ||
                apellido.length > 30
              ) {
                setValidLastName(
                  "El apellido debe tener entre 3 y 30 caracteres"
                );
                setError(true);
              }
            }}
          ></TextField>
          {validLastName ? (
            <Typography variant="caption" sx={{ color: "red" }}>
              {validLastName}
            </Typography>
          ) : null}
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
            label="Telefono"
            value={telefono}
            onChange={(e) => {
              setTelefono(e.target.value);
              setValidPhone("");
              setError(false);

              if (
                telefono == "" ||
                telefono.length < 3 ||
                telefono.length > 20
              ) {
                setValidPhone("El telefono no debe estar vacio");
                setError(true);
              }
            }}
          ></TextField>
          {validPhone ? (
            <Typography variant="caption" sx={{ color: "red" }}>
              {validPhone}
            </Typography>
          ) : null}
          <TextField
            fullWidth
            label="Contraseña"
            value={password}
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
              setValidPassword("");
              setError(false);

              if (
                password == "" ||
                password.length < 3 ||
                password.length > 30
              ) {
                setValidPassword(
                  "La contraseña debe tener entre 3 y 30 caracteres"
                );
                setError(true);
              }
            }}
          ></TextField>
          {validPassword ? (
            <Typography variant="caption" sx={{ color: "red" }}>
              {validPassword}
            </Typography>
          ) : null}
          <TextField
            fullWidth
            label="Confirmar Contraseña"
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          ></TextField>
          {validConfirmPassword ? (
            <Typography variant="caption" sx={{ color: "red" }}>
              {validConfirmPassword}
            </Typography>
          ) : null}
          <Button
            sx={{ display: "block" }}
            type="submit"
            variant="contained"
            color="primary"
          >
            Sign Up
          </Button>
          {success ? (
            <Typography variant="caption" sx={{ color: "green" }}>{success}</Typography>
          ) : null}
          {notSuccess ? (
            <Typography variant="caption" sx={{ color: "red" }}>{notSuccess}</Typography>
          ): null}
        </form>
      </Paper>
      {loading ? (
            <CircularProgress sx={{ display: "block", marginLeft: "auto", marginRight: "auto" }} size={50} />
          ) : null}
    </Grid>
    
  );
}

export default Register;
