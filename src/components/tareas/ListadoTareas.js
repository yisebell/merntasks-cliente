import React, { Fragment, useContext } from 'react';
import Tarea from './Tarea';
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import TareaContext from '../../context/tareas/TareaContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ListadoTareas = () => {

    // extraer proyectos de proyectos
    const proyectosContext = useContext(ProyectoContext);
    const {proyecto, eliminarProyecto} = proyectosContext;

    // obtener la funcion del context de tareas
    const tareasContext = useContext(TareaContext);
    const {tareasproyecto} = tareasContext;

    // Si no hay proyecto seleccionado
    if(!proyecto) return <h2>Selecciona un proyecto</h2>

    // array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;

    // Elimina un proyecto
    const onClickEliminar = () => {
        eliminarProyecto(proyectoActual._id);
    }

    return ( 
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2>

            <ul className="listado-tareas">
                { tareasproyecto.length === 0
                    ? (<li className="tarea"><p>No hay tareas</p></li>)
                    : <TransitionGroup>
                        {tareasproyecto.map(tarea => (
                            <CSSTransition
                                key={tarea._id}
                                timeout={200}
                                classNames="tarea"
                            >
                                <Tarea                                   
                                    tarea={tarea}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                }
            </ul>

            <button
                type="button"
                className="btn btn-eliminar sombra"
                onClick={onClickEliminar}
            >Eliminar Proyecto &times;</button>
        </Fragment>
     );
}
 
export default ListadoTareas;