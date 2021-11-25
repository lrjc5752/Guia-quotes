import React, {Fragment,useState} from 'react';
import uuid from 'uuid/dist/v4';
import PropTypes from 'prop-types'; // una forma de documental los componentes

const Formulario = ({crearCita})=>{
    // Crear State de Cita, una sola,individual
     const [cita,actualizarCita] = useState({
         mascota:'',
         propietario:'',
         fecha:'',
         hora:'',
         sintomas:''
     });
     const [error,actualizarError] = useState(false);
    // funcion que se ejejcuta cada que el usuario escribe en un input
    const actualizarState = evento => {
        // console.log(evento.target.name);
        // console.log(evento.target.value);
        actualizarCita({
            ...cita,
            [evento.target.name]:evento.target.value
        })
    }
    // extraer los valores para evitar la notacion de punto..(con el destructuring)
    const {mascota,propietario,fecha,hora,sintomas} = cita;
    //Cuando el usuario presiona agregar cita
    const submitCita = evento=>{
        evento.preventDefault();
       // alert('Enviando')
       // validar
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || 
        hora.trim() === '' || sintomas.trim() === ''){
             actualizarError(true);
            return
        }
        // Eliminar el  mensaje de error
        actualizarError(false);
         // Asignar un ID
         cita.id = uuid();
        
         //Crear la cita
            crearCita(cita);

         // reiniciar el form 
         actualizarCita({
            mascota:'',
            propietario:'',
            fecha:'',
            hora:'',
            sintomas:''
         });
    };
    return(
        <Fragment>
            <h1>Crear Cita</h1>
            {error ? <p className='alerta-error'>Todos los campos son obligatorios</p>  : null}
            <form onSubmit={submitCita}
            >
                <label>Nombre de la Mascota</label>
                <input 
                    type='text'
                    name='mascota'
                    className='u-full-width'
                    placeholder='Nombre Mascota'
                    onChange={actualizarState}
                    value={mascota}
                />
                <label>Nombre del Dueño</label>
                <input 
                    type='text'
                    name='propietario'
                    className='u-full-width'
                    placeholder='Nombre Dueño de la mascota'
                    onChange={actualizarState}
                    value={propietario}
                />
                <label>Fecha</label>
                <input 
                    type='date'
                    name='fecha'
                    className='u-full-width'
                    onChange={actualizarState}
                    value={fecha}
                />
                <label>Hora</label>
                    <input 
                        type='time'
                        name='hora'
                        className='u-full-width'
                        onChange={actualizarState}
                        value={hora}
                    />
                <label>Sintomas</label>
                    <textarea
                        className='u-full-width'
                        name='sintomas'
                        onChange={actualizarState}
                        value={sintomas}
                        >
                            
                    </textarea>
                    <button type='submit' className='u-full-width button-primary'>
                        Agregar Cita
                    </button>
            </form>
        </Fragment>
    );
};
Formulario.propTypes = {
    crearCita:PropTypes.func.isRequired
}
export default Formulario;