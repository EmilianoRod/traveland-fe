import { Box, Button, Pagination, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import User from "../components/User";
import UserUpdate from "../components/UserUpdate";

function PanelUsuarios() {
  const [data, setData] = useState([]);
  const [renderUpdate, setRenderUpdate] = useState(false);
  const [updateUser, setUpdateUser] = useState({});

  function handleFetch() {
    fetch("http://13.58.107.197/api/usuario", {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        data.map((user) => {
          setData((rows) => [...rows, user]);
        });
      });
  }
  useEffect(() => {
    handleFetch();
  }, []);

  function handleDelete(id) {
    fetch("http://13.58.107.197/api/usuario/" + id, { method: "DELETE", headers: {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem("token"),
    }})
      .then((response) => response.json())
      .then(() => {
        setData(data.filter((card) => card.id !== id));
      });
  }
  function handleUpdate(id) {
    let usuario = data.filter((card) => card.id === id)[0];
    console.log(usuario);
    window.scrollTo(0, 0);
    setRenderUpdate(!renderUpdate);
    setUpdateUser(usuario);
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        marginBottom: "auto",
        marginTop: "7rem",
      }}
    >
      <Button href="/administracion">Volver al Menú de Administracion</Button>
      <Typography variant="h2">Panel de Usuarios</Typography>
      {renderUpdate ? (
        <UserUpdate
          actualizado={(update) => {
            setRenderUpdate(update);
          }}
          id={updateUser.id}
          nombre={updateUser.nombre}
          apellido={updateUser.apellido}
          telefono={updateUser.telefono}
          email={updateUser.email}
          rol={updateUser.roles[0].id}
        />
      ) : null}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
          width: "100%",
          height: "auto",
        }}
      >
        <Typography sx={{ width: 50, fontWeight: "bold" }}>ID</Typography>
        <Typography sx={{ width: 50, fontWeight: "bold" }}>Nombre</Typography>
        <Typography sx={{ width: 50, fontWeight: "bold" }}>Apellido</Typography>
        <Typography sx={{ width: 50, fontWeight: "bold" }}>Telefono</Typography>
        <Typography sx={{ width: 50, fontWeight: "bold" }}>Email</Typography>
      </Box>
      {data.map((user) => {
        return (
          <User
            key={user.id}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
            id={user.id}
            nombre={user.nombre}
            apellido={user.apellido}
            telefono={user.telefono}
            email={user.email}
          />
        );
      })}
    </Box>
  );
}

export default PanelUsuarios;
