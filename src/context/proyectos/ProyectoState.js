import React, { useReducer } from 'react';
import ProyectoContext from './ProyectoContext';
import ProyectoReducer from './ProyectoReducer';
import {
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    PROYECTO_ERROR
} from '../../types';

import clienteAxios from '../../config/axios';

const ProyectoState = props => {

    const initialState = {
        proyectos: [],
        formulario: false,
        errorFormulario: false,
        proyecto: null,
        mensaje: null
    }

    // dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(ProyectoReducer, initialState);

    // serie de funciones para el CRUD
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        });
    }

    // Obtener los proyectos
    const obtenerProyectos = async () => {
        try {
            const resultado = await clienteAxios.get('/api/proyectos');
            //console.log(resultado);
            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resultado.data.proyectos
            });
        } catch (error) {
            console.log(error);
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            });
        }
    }

    //Agregar nuevo proyecto
    const agregarProyecto = async proyecto => {

        try {
            const resultado = await clienteAxios.post('/api/proyectos', proyecto);
            //console.log(resultado);

            // Insertar el proyecto al state
            dispatch({
                type: AGREGAR_PROYECTO,
                payload: resultado.data
            });
        } catch (error) {
            console.log(error);
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            });
        }
    }

    // validar formulario por errores
    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        });
    };

    // selecciona el proyecto que el usuario dio clic
    const proyectoActual = proyectoId => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        });
    }

    // elimina un proyecto
    const eliminarProyecto = async proyectoId => {
        try {
            await clienteAxios.delete(`/api/proyectos/${proyectoId}`);
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            });
        } catch (error) {
            console.log(error);
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            });
        }
    }

    return (
        <ProyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorFormulario: state.errorFormulario,
                proyecto: state.proyecto,
                mensaje: state.mensaje,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}
        >
            {props.children}
        </ProyectoContext.Provider>
    );
}

export default ProyectoState;