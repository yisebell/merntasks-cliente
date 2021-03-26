import React, { useContext } from 'react';
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import TareaContext from '../../context/tareas/TareaContext';

const Proyecto = ({proyecto}) => {

    // extraer proyectos de proyectos
    const proyectosContext = useContext(ProyectoContext);
    const {proyectoActual} = proyectosContext;

    // obtener la funcion del context de tareas
    const tareasContext = useContext(TareaContext);
    const {obtenerTareas} = tareasContext;

    // funcion para agregar el proyecto actual
    const seleccionarProyecto = id => {
        proyectoActual(id); // Fijar un proyecto actual
        obtenerTareas(id);
    }

    return ( 
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => seleccionarProyecto(proyecto._id)}
            >{proyecto.nombre}</button>
        </li>
     );
}
 
export default Proyecto;