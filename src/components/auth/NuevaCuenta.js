import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertaContext from '../../context/alertas/AlertaContext';
import AuthContext from '../../context/autenticacion/AuthContext';

const NuevaCuenta = (props) => {

    // extraer los valores del context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta} = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, registrarUsuario } = authContext;

    // En caso de que el usuario se haya registrado o autenticado o sea un registro duplicado
    useEffect(() =>{
        if(autenticado) {
            props.history.push('/proyectos');
        }
        if(mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        // eslint-disable-next-line
    }, [mensaje, autenticado, props.history]);

    // State para iniciar sesion
    const [usuario, guardarUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    });

    // extraer usuario
    const { nombre, email, password, confirmar } = usuario;

    const onChange = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
    }

    // cuando el usuario quiere iniciar sesion
    const onSubmit = e => {
        e.preventDefault();

        // validar que no haya campos vacios
        if(nombre.trim() === '' || email.trim() === '' || password.trim() === '' || confirmar.trim() === '') {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }

        // password minimo 6 caracteres
        if(password.length <6) {
            mostrarAlerta('El password debe tener como mínimo 6 caracteres', 'alerta-error');
            return;
        }

        // los dos password iguales
        if(password !== confirmar) {
            mostrarAlerta('los password no son iguales', 'alerta-error');
            return;
        }

        // pasarlo al action
        registrarUsuario({
            nombre,
            email,
            password
        });
    }

    return ( 
        <div className="form-usuario">
            {alerta ? ( <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> ) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Obtener una cuenta</h1>
                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input 
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Tu Nombre"
                            value={nombre}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu email"
                            value={email}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu Password"
                            value={password}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirmar password</label>
                        <input 
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            placeholder="Repite Tu Password"
                            value={confirmar}
                            onChange={onChange}
                        />
                    </div>
                    

                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block" value="Registrarme" />
                    </div>
                </form>

                <Link to={'/'} className="enlace-cuenta">
                    Iniciar sesión
                </Link>
            </div>
        </div>
     );
}
 
export default NuevaCuenta;