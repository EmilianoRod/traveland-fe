import { Avatar, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from "react";

function Register() {

    const formik = useFormik({
        initialValues: {
            name: '',
            surname: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: ''
        },
        onSubmit : (values, props) => {
            console.log(values);
            console.log(props);
            setTimeout(() => {
                props.resetForm();
                props.setSubmitting(false)
            },2000)
    }});

    // const initialValues = {
    //     name: '',
    //     surname: '',
    //     email: '',
    //     phone: '',
    //     password: '',
    //     confirmPassword: ''
    // }

    // const onSubmit = (values, props) => {
    //     console.log(values);
    //     console.log(props);
    //     setTimeout(() => {
    //         props.resetForm();
    //         props.setSubmitting(false)
    //     },2000)
    // }

    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, "Nombre muy corto").required("Requerido"),
        surname: Yup.string().min(3, "Apellido muy corto").required("Requerido"),
        email: Yup.string().email("Ingresa un email valido").required("Requerido"),
        phone: Yup.number().typeError("Ingresa un numero de telefono valido").required("Requerido"),
        password: Yup.string().min(8, "La contraseña debe tener al menos 8 caracteres").required("Requerido"),
        confirmPassword: Yup.string().oneOf([Yup.ref('password')], "Las contraseñas no coinciden").required("Requerido")
    })

    return (
        <Grid sx={{ mt: 25 }}>
            <Paper elevation={20} sx={{ padding: '30px 20px', width: 300, margin: '20px auto' }} >
                <Grid align='center'>
                    <Avatar sx={{ backgroundColor: '#005F6B' }}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={{ margin: 0 }}>Registrarse</h2>
                    <Typography variant="caption" gutterBottom>Por favor, llena el siguiente formulario para crear una cuenta</Typography>
                </Grid>
                <Formik initialValues={formik.initialValues} onSubmit={formik.onSubmit} validationSchema={validationSchema}>
                    {(props) => (
                        <Form>
                            <Field as={TextField} fullWidth name="name" label="Nombre"
                                helperText={
                                    <ErrorMessage name="name">
                                        {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                    </ErrorMessage>
                                }>
                            </Field>
                            <Field as={TextField} fullWidth name="surname" label="Apellido"
                                helperText={
                                    <ErrorMessage name="surname">
                                        {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                    </ErrorMessage>
                                }>
                            </Field>
                            <Field as={TextField} fullWidth name="email" label="Email"
                                helperText={
                                    <ErrorMessage name="email">
                                        {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                    </ErrorMessage>
                                }>
                            </Field>
                            <Field as={TextField} fullWidth name="phone" label="Telefono"
                                helperText={
                                    <ErrorMessage name="phone">
                                        {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                    </ErrorMessage>
                                }>
                            </Field>
                            <Field as={TextField} fullWidth name="password" label="Contraseña" type="password"
                                helperText={
                                    <ErrorMessage name="password">
                                        {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                    </ErrorMessage>
                                }>
                            </Field>
                            <Field as={TextField} fullWidth name="confirmPassword" label="Confirmar Contraseña" type="password"
                                helperText={
                                    <ErrorMessage name="confirmPassword">
                                        {msg => <div style={{ color: 'red' }}>{msg}</div>}
                                    </ErrorMessage>
                                }>
                            </Field>
                            <Button type="submit" variant="contained" color="primary" disabled={props.isSubmitting}>
                                {props.isSubmitting ? "Cargando" : "Registrarse"}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Grid>
    )
}

export default Register;