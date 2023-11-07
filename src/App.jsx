import { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Pacientes from "./components/Pacientes";

function App() {
  const [DB, setDB]=useState()
  const [pacienteParaEditar, setPacienteParaEditar] = useState(null)
  useEffect(() => {
    
    const crearDB = () => {
      //crear la base de datos en version 1.0
      const crearDB = window.indexedDB.open("citas", 1);

      //si hay un error
      crearDB.onerror = function () {
        console.log("hubo un error");
      };

      //si no hay errores
      crearDB.onsuccess = function () {
        console.log("DB creada");

        setDB(crearDB.result)
      };

      //Definir el esquema

      crearDB.onupgradeneeded=function(e){
        const db=e.target.result

        const objectStore=db.createObjectStore('citas',{
          keyPath:'id',
          autoIncrement:true
        })

        objectStore.createIndex('paciente', 'paciente', {unique:false})
        objectStore.createIndex('fecha', 'fecha', {unique:false})
        objectStore.createIndex('especialidad', 'especialidad', {unique:false})
        objectStore.createIndex('nombre', 'nombre', {unique:false})
        objectStore.createIndex('tratamiento', 'tratamiento', {unique:false})
        objectStore.createIndex('id', 'id', {unique:true})

        console.log('DB creada y lista')


      }
    };

    crearDB();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl mt-5 text-center font-bold text-white ">
        Administrador de Pacientes
      </h1>
      <div className="flex mx-5 justify-between mt-28">
        <div className="w-1/2">
          <Formulario DB={DB} pacienteParaEditar={pacienteParaEditar} />
        </div>
        <div className="">
          <Pacientes DB={DB} setPacienteParaEditar={setPacienteParaEditar} />
        </div>
      </div>
    </div>
  );
}

export default App;
