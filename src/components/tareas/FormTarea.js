import React, { useContext, useState, useEffect } from 'react';
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import TareaContext from '../../context/tareas/TareaContext';

const FormTarea = () => {
    
    // extraer si un proyecto esta activo
    const proyectosContext = useContext(ProyectoContext);
    const {proyecto} = proyectosContext;

    // obtener la funcion del context de tareas
    const tareasContext = useContext(TareaContext);
    const { tareaseleccionada, 
            errortarea, 
            agregarTarea, 
            validarTarea, 
            obtenerTareas, 
            actualizarTarea, 
            limpiarTarea} = tareasContext;

    // Effect que detecta si hay una tarea seleccionada
    useEffect(() => {
        if(tareaseleccionada !== null) {
            guardarTarea(tareaseleccionada);
        } else {
            guardarTarea({
                nombre: ''
            });
        }
    }, [tareaseleccionada]);

    // state del formulario
    const [tarea, guardarTarea] = useState({
        nombre: ''
    });

    // Extraer el nombre del proyecto
    const {nombre} = tarea;

    // Si no hay proyecto seleccionado
    if(!proyecto) return null;

    // array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;

    // leer valores del formulario
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        });
    }

    const onSubmit = e => {
        e.preventDefault();

        // validar
        if(nombre.trim() === '') {
            validarTarea();
            return;
        }

        // Si es edicion o nueva tarea
        if(tareaseleccionada === null) {
            // agregar una nueva tarea al state de tarea
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
        } else {
            // Actualizar la tarea existente
            actualizarTarea(tarea);

            // Elimina tarea seleccionada del state
            limpiarTarea();
        }       

        // Obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyectoActual._id);

        // reiniciar el state
        guardarTarea({
            nombre: ''
        });
    }

    return ( 
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre tarea..."
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
                    />
                </div>
            </form>

            {errortarea ? <p class="mensaje error">El nombre de la tarea es obligatorio.</p> : null}
        </div>
    );
}

export default FormTarea;