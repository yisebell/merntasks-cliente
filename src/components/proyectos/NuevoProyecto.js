import React, { Fragment, useContext, useState } from 'react';
import ProyectoContext from '../../context/proyectos/ProyectoContext';

const NuevoProyecto = () => {

    // Obtener el state del formulario
    const proyectosContext = useContext(ProyectoContext);

    const {formulario, errorFormulario, mostrarFormulario, agregarProyecto, mostrarError} = proyectosContext;

    // state para proyecto
    const [proyecto, guardarProyecto] = useState({
        nombre: ''
    });

    // extrater nombre de proyecto
    const {nombre} = proyecto;

    // lee los contenidos del input
    const onChangeProyecto = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        })
    }

    // Cuando el usuario envia un proyecto
    const onSubmitProyecto = (e) => {
        e.preventDefault();

        // validar el proyecto
        if(nombre === '') {
            mostrarError();
            return;
        }

        // agregar al state
        agregarProyecto(proyecto);

        // reiniciar el form
        guardarProyecto({
            nombre: ''
        })
    };

    const onClickFormulario = () => {
        mostrarFormulario();
    }

    return ( 
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={onClickFormulario}
            >Nuevo Proyecto</button>

            {
                formulario
                ?
                    (
                        <form
                            className="formulario-nuevo-proyecto"
                            onSubmit={onSubmitProyecto}
                        >
                            <input 
                                type="text"
                                className="input-text"
                                placeholder="Nombre del proyecto"
                                value={nombre}
                                name="nombre"
                                onChange={onChangeProyecto}
                            />

                            <input 
                                type="submit"
                                className="btn btn-primario btn-block"
                                value="Agregar proyecto"
                            />
                        </form>
                    )
                : null
            }
            {
                errorFormulario ? <p className="mensaje error">El nombre del proyecto es obligatorio</p> : null
            }
        </Fragment>
     );
}
 
export default NuevoProyecto;