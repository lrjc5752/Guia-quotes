import React, {fragment, useState, useEffect} from 'react';
import Formulario from './components/formulario'
import Cita from './components/cita'
 
function App() {

  // Citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas')); // localStorage solo almacena string
   if(!citasIniciales) {
      citasIniciales = [];
   };

  // Arreglo de citas,en plural,donde van todas las citas
  const [citas,guardarCitas] = useState([citasIniciales]); 
  
    console.log(citas);
  // use Effect para realizar ciertas operaciones cuando el state cambia
    useEffect(()=> { // siempre es una arrow function,se ejecuta cuando el componente esta listo o cuando existen cambios en el componente
      if (citasIniciales) {
        localStorage.setItem('citas',JSON.stringify(citas));
      } else {
        localStorage.setItem('citas',JSON.stringify([]));
      };
    }, [citas]); // el arreglo vacio es para decirle que se ejecute una sola vez

  //funcion que tome las citas actuales y agregue la nueva
   const crearCita = cita => {  // sin las parentesis por es un solo parametro
      guardarCitas([
        ...citas,
        cita
      ]);
     // console.log(citas);
   }

   // funcion que elimina una cita por su id
   const eliminarCita = id => {
    // console.log(id);
    const nuevasCitas = citas.filter(cita => cita.id !== id );
    guardarCitas(nuevasCitas);
   }

   // mensaje condicional
   //console.log(citas.length)
   const titulo = citas.length === 0 ? 'No hay citas'  : 'Administra tus citas'

  return (
    <fragment> 
      <h1>Administrador de Pacientes</h1>
      <div className= 'container'>
        <div className='row'>
        <div className='one-half column'>
          <Formulario
            crearCita = {crearCita}
          />
        </div>
        <div className='one-half column'>
          <h2>{titulo}</h2>
          {citas.map(cita =>(
            <Cita
            key = {cita.id}
            cita = {cita}
            eliminarCita = {eliminarCita}
            />
          ))}
        </div>
        </div>
      </div>
    </fragment>
   
  );
}

export default App;
