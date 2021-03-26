import React, { useContext } from 'react';
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import TareaContext from '../../context/tareas/TareaContext';

const Tarea = ({tarea}) => {

    // extraer si un proyecto esta activo
    const proyectosContext = useContext(ProyectoContext);
    const {proyecto} = proyectosContext;

    // obtener la funcion del context de tareas
    const tareasContext = useContext(TareaContext);
    const {eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual} = tareasContext;

    // extraer el proyecto
    const [proyectoActual] = proyecto;

    // Funcion que se ejecuta cuando el usuario presiona el boton de eliminar tarea
    const tareaEliminar = id => {
        eliminarTarea(id, proyectoActual._id);
        obtenerTareas(proyectoActual._id);
    };

    // Funcion que modifica el estado de las tareas
    const cambiarEstado = tarea => {
        tarea.estado = tarea.estado ? false : true;
        actualizarTarea(tarea);
    };

    // Agrega una tarea actual cuando el usuario desea editarla
    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea);
    };

    return ( 
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>

            <div className="estado">
                {tarea.estado
                    ?   
                        (
                            <button
                                type="button"
                                className="completo"
                                onClick={() => cambiarEstado(tarea)}
                            >Completo</button>
                        )
                    :
                        (
                            <button
                                type="button"
                                className="incompleto"
                                onClick={() => cambiarEstado(tarea)}
                            >Incompleto</button>
                        )
                }
            </div>

            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => seleccionarTarea(tarea)}
                >Editar</button>
                
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => tareaEliminar(tarea._id)}
                >Eliminar</button>
            </div>
        </li>
     );
}
 
export default Tarea;