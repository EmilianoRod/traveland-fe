import {
  Autocomplete,
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useState } from "react";

function UserUpdate({
  id,
  nombre,
  apellido,
  telefono,
  email,
  rol,
  actualizado,
}) {
  const [nombreUsuario, setNombreUsuario] = useState(nombre);
  const [apellidoUsuario, setApellidoUsuario] = useState(apellido);
  const [telefonoUsuario, setTelefonoUsuario] = useState(telefono);
  const [emailUsuario, setEmailUsuario] = useState(email);
  const [idUsuario, setIdUsuario] = useState(id);
  const [rolUsuario, setRolUsuario] = useState(rol);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const usuario = {
      id: idUsuario,
      nombre: nombreUsuario,
      apellido: apellidoUsuario,
      email: emailUsuario,
      telefono: telefonoUsuario,
      rol: document.getElementById("user_role").value,
    };
    console.log(usuario);
    fetch(`http://107.20.56.84/api/usuario/${idUsuario}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(usuario),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        console.log(data);
        setSuccess("Usuario modificado exitosamente");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }
  function getRoles() {
    const roles = ["ADMIN", "USER"];
    const listaRoles = document.querySelector("#user_role");
    roles.forEach((role) => {
      console.log(role);
      listaRoles.innerHTML += `<option value="${role}">${role}</option>`;
    });
  }

  useEffect(() => {
    getRoles();
  }, []);
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        marginBottom: "auto",
      }}
    >
      <TextField
        sx={{ margin: "1rem 0", width: "100%" }}
        id="nombre"
        type={"text"}
        value={nombreUsuario}
        onChange={(e) => setNombreUsuario(e.target.value)}
        label="Nombre"
        variant="outlined"
      />
      <TextField
        sx={{ margin: "1rem 0", width: "100%" }}
        id="apellido"
        type={"text"}
        value={apellidoUsuario}
        onChange={(e) => setApellidoUsuario(e.target.value)}
        label="Apellido"
        variant="outlined"
      />
      <TextField
        sx={{ margin: "1rem 0", width: "100%" }}
        id="email"
        type={"text"}
        value={emailUsuario}
        onChange={(e) => setEmailUsuario(e.target.value)}
        label="Email"
        variant="outlined"
      />
      <TextField
        sx={{ margin: "1rem 0", width: "100%" }}
        id="telefono"
        type={"text"}
        value={telefonoUsuario}
        onChange={(e) => setTelefonoUsuario(e.target.value)}
        label="Telefono"
        variant="outlined"
      />
      <select
        style={{ margin: "1rem 0", width: "50%", padding: "1rem" }}
        id="user_role"
        value={rolUsuario}
        onChange={(e) => setRolUsuario(e.target.value)}
      ></select>
      <Button
        onClick={handleSubmit}
        sx={{
          display: "block",
          fontSize: "1.5rem",
          border: 2,
          borderRadius: 2,
        }}
      >
        Modificar
      </Button>
      {success ? (
        <Typography
          sx={{ display: "block", marginLeft: "auto", marginRight: "auto" }}
        >
          {success}
        </Typography>
      ): null}
      {loading ? (
        <CircularProgress
          sx={{ display: "block", marginLeft: "auto", marginRight: "auto" }}
          size={50}
        />
      ) : null}
    </Box>
  );
}

export default UserUpdate;
